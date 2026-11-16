import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import type { Page } from "@playwright/test";
import { PAGE_ROUTES } from "@tests/pages";
import { expect, EXPECTS_404, isPhone, test } from "./fixtures";

// Each payload sets this flag and opens a dialog if it ever runs, and tags
// any element it manages to add with the marker id.
const MARKER = "xss-probe";
const RUN = "window.__xss=1;alert(1)";
const PAYLOAD = [
  `<script id="${MARKER}">${RUN}</script>`,
  `"><img id="${MARKER}" src=x onerror="${RUN}">`,
  `'><svg id="${MARKER}" onload="${RUN}">`,
  `javascript:${RUN}`,
  `data:text/html,<script>${RUN}</script>`,
].join("");
const ENCODED = encodeURIComponent(PAYLOAD);

// The payload as live markup in the HTML the server sends.
const REFLECTED_MARKUP = new RegExp(`<(script|img|svg)[^>]*${MARKER}`, "i");

/** Loads a page and waits until React has taken it over. */
async function visit(page: Page, path: string) {
  const response = await page.goto(path);
  await page.waitForFunction(() => {
    const navbar = document.querySelector("header");
    return !!navbar && Object.keys(navbar).some((key) => key.startsWith("__reactFiber"));
  });
  return response;
}

/** Loads the address and checks the payload in it never became markup or ran. */
async function expectPayloadInert(page: Page, path: string) {
  const dialogs: string[] = [];
  page.on("dialog", (dialog) => {
    dialogs.push(dialog.message());
    void dialog.dismiss();
  });

  const response = await visit(page, path);
  expect(await response?.text()).not.toMatch(REFLECTED_MARKUP);

  // Gives a late script (an image error, a deferred handler) time to run.
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
  expect(await page.locator(`#${MARKER}`).count()).toBe(0);
  expect(await page.evaluate(() => "__xss" in window)).toBe(false);
  expect(dialogs).toEqual([]);
}

// The fixture also fails each test on any console error, which is where a
// blocked script would be reported.
test.describe("script payloads in the address", () => {
  for (const route of PAGE_ROUTES) {
    test(`are never reflected or run on ${route}`, async ({ page }) => {
      await expectPayloadInert(page, `${route}?q=${ENCODED}&${ENCODED}=1#${ENCODED}`);
    });
  }

  test.describe("in the path of a missing page", () => {
    test.beforeEach(({}, testInfo) => {
      testInfo.annotations.push({ type: EXPECTS_404 });
    });

    const paths: [string, string][] = [
      ["encoded once", `/${ENCODED}`],
      ["encoded twice", `/${encodeURIComponent(ENCODED)}`],
      ["below a page", `/about/${ENCODED}?q=${ENCODED}#${ENCODED}`],
    ];

    for (const [name, path] of paths) {
      test(`are never reflected or run: ${name}`, async ({ page }) => {
        await expectPayloadInert(page, path);
      });
    }
  });

  test("are never reflected by the sitemap, robots and share images", async ({ request }) => {
    for (const path of ["/sitemap.xml", "/robots.txt", "/opengraph-image"]) {
      const response = await request.get(`${path}?q=${ENCODED}`);
      expect(response.status(), path).toBe(200);
      expect((await response.body()).toString("latin1"), path).not.toContain(MARKER);
    }
  });
});

test.describe("the old /home address", () => {
  test("only ever redirects within the site", async ({ request, baseURL }) => {
    const site = new URL(baseURL!).origin;
    const attempts = [
      "/home?next=https://evil.example",
      "/home?url=//evil.example",
      "/home//evil.example",
      "/home/",
      "//evil.example/",
      "/%2F%2Fevil.example/",
      "/%5C%5Cevil.example/",
      "/.//evil.example/",
    ];
    for (const path of attempts) {
      // Joined as text: as a URL, "//evil.example/" alone would leave the site.
      const response = await request.get(`${site}${path}`, { maxRedirects: 0 });
      const location = response.headers()["location"];
      if (!location) continue;
      expect(new URL(location, site).origin, `${path} redirects to ${location}`).toBe(site);
    }
  });

  test("lands on the home page in the browser", async ({ page, baseURL }) => {
    await visit(page, "/home?next=https://evil.example");
    expect(new URL(page.url()).origin).toBe(new URL(baseURL!).origin);
    expect(new URL(page.url()).pathname).toBe("/");
  });
});

/**
 * Starts a real site on this machine, on a free port, whose only page frames
 * the given address. Local like the test server, so neither mixed-content
 * rules nor Chrome's guard for local addresses can be what blocks the frame.
 */
async function startFramingSite(target: string) {
  const server = createServer((_, response) => {
    response.setHeader("Content-Type", "text/html");
    response.end(
      `<!doctype html><title>attacker</title>` +
        `<iframe src="${target}" onload="document.title='framed'"></iframe>`,
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}/`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

test.describe("framing", () => {
  test("another site can't show the page in a frame", async ({ browser, baseURL }) => {
    const attacker = await startFramingSite(`${baseURL}/`);
    // A context of its own: the browser reports the blocked frame as a console
    // error, which is the expected outcome here.
    const context = await browser.newContext();
    const page = await context.newPage();
    // A framed page loads the site's scripts and styles. A blocked one stops
    // at the page itself, in every browser (some still show its address).
    const assets: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/_next/")) assets.push(request.url());
    });

    try {
      await page.goto(attacker.url);
      await expect(page).toHaveTitle("framed");
      await page.waitForLoadState("networkidle");
      expect(assets).toEqual([]);
    } finally {
      await context.close();
      await attacker.close();
    }
  });
});

test.describe("links that open a new tab", () => {
  for (const route of PAGE_ROUTES) {
    test(`can't reach back into the site on ${route}`, async ({ page, viewport }) => {
      await visit(page, route);
      // On phones, the menu holds more links.
      if (isPhone(viewport?.width)) {
        await page.getByRole("button", { name: "Open menu" }).click();
        await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
      }

      const links = await page.locator("a[target]").evaluateAll((anchors) =>
        anchors.map((anchor) => ({
          target: anchor.getAttribute("target"),
          rel: anchor.getAttribute("rel") ?? "",
        })),
      );
      for (const link of links) {
        expect(link.target).toBe("_blank");
        expect(link.rel.split(/\s+/)).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
      }
    });

    test(`never run code or load documents on ${route}`, async ({ page }) => {
      await visit(page, route);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href") ?? ""));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        expect(href.trim()).toMatch(/^(\/|#|https:\/\/|mailto:)/);
      }
    });
  }

  test("opens with no handle on this page and no referrer", async ({ page, context }) => {
    // Stands in for LinkedIn, so the test never depends on an outside site.
    await context.route("https://linkedin.com/**", (route) =>
      route.fulfill({ contentType: "text/html", body: "<title>LinkedIn</title>" }),
    );
    await visit(page, "/contact");
    const [opened] = await Promise.all([
      context.waitForEvent("page"),
      page.getByRole("link", { name: "View profile" }).click(),
    ]);
    await opened.waitForLoadState();
    expect(await opened.evaluate(() => window.opener)).toBeNull();
    expect(await opened.evaluate(() => document.referrer)).toBe("");
  });
});
