import type { Page } from "@playwright/test";
import { PAGE_ROUTES } from "@tests/pages";
import { expect, EXPECTS_404, isPhone, test } from "./fixtures";
import { followLink, portuguese, visit } from "./helpers";

const SITE = "https://pedrobarbosa.pt";
const COOKIE = "NEXT_LOCALE";

const cookieValue = async (page: Page) =>
  (await page.context().cookies()).find(({ name }) => name === COOKIE)?.value;

const suggestion = (page: Page) => page.locator("aside", { hasText: "Este site está disponível" });

/** The language switcher in the navbar, or in the phone menu once it's open. */
async function switcher(page: Page, isPhoneSize: boolean) {
  if (isPhoneSize) await page.getByRole("button", { name: /Open menu|Abrir menu/ }).click();
  return page
    .getByRole("group", { name: /^(Language|Idioma)$/ })
    .filter({ visible: true })
    .first();
}

async function saveChoice(page: Page, value: string) {
  const baseURL = test.info().project.use.baseURL!;
  await page.context().addCookies([{ name: COOKIE, value, url: baseURL }]);
}

test.describe("Portuguese pages", () => {
  for (const route of PAGE_ROUTES) {
    test(`${portuguese(route)} is in Portuguese, and declared so`, async ({ page }) => {
      await visit(page, portuguese(route));
      await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "pt_PT");
      await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute(
        "content",
        "en_GB",
      );
      const english = new URL(route, SITE).href.replace(/\/$/, "");
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        "href",
        english,
      );
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        "href",
        english,
      );
      await expect(page.locator('link[rel="alternate"][hreflang="pt-PT"]')).toHaveAttribute(
        "href",
        new URL(portuguese(route), SITE).href,
      );
    });
  }

  for (const route of PAGE_ROUTES) {
    test(`${portuguese(route)} previews with its own Portuguese share image`, async ({
      page,
      request,
    }) => {
      await visit(page, portuguese(route));
      const imagePath = `${portuguese(route)}/opengraph-image`;
      for (const name of ["og:image", "twitter:image"]) {
        await expect(
          page.locator(`meta[property="${name}"], meta[name="${name}"]`),
        ).toHaveAttribute("content", `${SITE}${imagePath}`);
      }
      for (const name of ["og:image:alt", "twitter:image:alt"]) {
        const alt = await page
          .locator(`meta[property="${name}"], meta[name="${name}"]`)
          .getAttribute("content");
        expect(alt).toContain("Frontend Engineer Sénior");
        expect(alt).not.toContain("Senior Frontend Engineer");
      }
      const response = await request.get(imagePath);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toBe("image/png");
    });

    test(`${route} previews with its own English share image`, async ({ page }) => {
      await visit(page, route);
      const imagePath = `${route === "/" ? "" : route}/opengraph-image`;
      for (const name of ["og:image", "twitter:image"]) {
        await expect(
          page.locator(`meta[property="${name}"], meta[name="${name}"]`),
        ).toHaveAttribute("content", `${SITE}${imagePath}`);
      }
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
        "content",
        /Senior Frontend Engineer/,
      );
    });
  }

  test("the home page greets in Portuguese", async ({ page }) => {
    await visit(page, "/pt");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Olá, sou o Pedro Barbosa.");
  });

  test("keeps its links inside the Portuguese pages", async ({ page }) => {
    await visit(page, "/pt/about");
    await expect(page.getByRole("link", { name: "Experiência" }).first()).toHaveAttribute(
      "href",
      "/pt/experience",
    );
  });

  test("writes career dates as a short month and the year", async ({ page }) => {
    await visit(page, "/pt/experience");
    await expect(page.getByText("mai. 2022").first()).toBeVisible();
    await expect(page.getByText(/\d{2}\/\d{4}/)).toHaveCount(0);
  });

  test("lists every page in both languages in the sitemap", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const route of PAGE_ROUTES) {
      const english = new URL(route, SITE).href;
      expect(sitemap).toContain(`<loc>${english}</loc>`);
      expect(sitemap).toContain(`<loc>${new URL(portuguese(route), SITE).href}</loc>`);
      expect(sitemap).toContain(`hreflang="pt-PT" href="${new URL(portuguese(route), SITE).href}"`);
      expect(sitemap).toContain(`hreflang="x-default" href="${english}"`);
    }
  });
});

test.describe("language switcher", () => {
  test("goes to the same page in the other language and back, saving each choice", async ({
    page,
    viewport,
  }) => {
    const isPhoneSize = isPhone(viewport?.width);
    await visit(page, "/contact");

    const toPortuguese = (await switcher(page, isPhoneSize)).getByRole("link", {
      name: "Português",
    });
    await followLink(page, toPortuguese, "/pt/contact");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
    expect(await cookieValue(page)).toBe("pt-PT");

    const group = await switcher(page, isPhoneSize);
    await expect(group.locator("[aria-current]")).toContainText("Português");
    await followLink(page, group.getByRole("link", { name: "English" }), "/contact");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(await cookieValue(page)).toBe("en");
    // Landing in English after choosing it, not sent back by an older choice.
    await expect(page).toHaveURL("/contact");
  });

  test("marks the current language without relying on colour, and links the other", async ({
    page,
    viewport,
  }) => {
    await visit(page, "/");
    const group = await switcher(page, isPhone(viewport?.width));
    const current = group.locator("[aria-current]");
    await expect(current).toHaveCount(1);
    await expect(current).toHaveCSS("font-weight", "700");
    const other = group.getByRole("link", { name: "Português" });
    await expect(other).toHaveAttribute("href", "/pt");
    await expect(other).toHaveAttribute("hreflang", "pt-PT");
    await expect(other).toHaveAttribute("lang", "pt-PT");
  });
});

test.describe("missing pages", () => {
  test.beforeEach(({}, testInfo) => {
    testInfo.annotations.push({ type: EXPECTS_404 });
  });

  // Next.js can only show the English global 404 for addresses without a page.
  for (const address of ["/xyz", "/pt/xyz"]) {
    test(`${address} is the English 404, and its language link leads to a home page`, async ({
      page,
      viewport,
    }) => {
      const response = await visit(page, address);
      expect(response?.status()).toBe(404);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const link = (await switcher(page, isPhone(viewport?.width))).getByRole("link", {
        name: "Português",
      });
      await expect(link).toHaveAttribute("href", "/pt");
      expect((await page.request.get("/pt")).status()).toBe(200);
    });
  }
});

test.describe("remembered choice", () => {
  test("sends a visitor who chose Portuguese from an English address to the Portuguese page", async ({
    page,
  }) => {
    await saveChoice(page, "pt-PT");
    await visit(page, "/about");
    await expect(page).toHaveURL("/pt/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
  });

  test("sends a visitor who chose English from a Portuguese address to the English page", async ({
    page,
  }) => {
    await saveChoice(page, "en");
    await visit(page, "/pt/about");
    await expect(page).toHaveURL("/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("redirects temporarily, and only with the cookie", async ({ request, baseURL }) => {
    const withCookie = await request.get("/about", {
      maxRedirects: 0,
      headers: { Cookie: `${COOKIE}=pt-PT` },
    });
    expect(withCookie.status()).toBe(307);
    expect(withCookie.headers().location).toBe("/pt/about");

    for (const [address, cookie] of [
      ["/about", undefined],
      ["/pt/about", undefined],
      ["/about", `${COOKIE}=dismissed`],
      ["/pt/about", `${COOKIE}=pt-PT`],
    ] as const) {
      const response = await request.get(address, {
        maxRedirects: 0,
        headers: cookie ? { Cookie: cookie } : {},
      });
      expect(response.status(), `${address} with ${cookie}`).toBe(200);
    }
    expect(baseURL).toBeTruthy();
  });

  test("leaves a visitor without a choice where they are", async ({ page }) => {
    await visit(page, "/pt/about");
    await expect(page).toHaveURL("/pt/about");
    await visit(page, "/about");
    await expect(page).toHaveURL("/about");
  });
});

test.describe("language suggestion for a Portuguese browser", () => {
  test.use({ locale: "pt-PT" });

  test("shows on an English page, linking to the same page in Portuguese", async ({ page }) => {
    await visit(page, "/projects");
    await expect(suggestion(page)).toBeVisible();
    await expect(suggestion(page).getByRole("link", { name: "Ver em português" })).toHaveAttribute(
      "href",
      "/pt/projects",
    );
    await expect(suggestion(page).getByRole("button", { name: "Fechar" })).toBeVisible();
  });

  test("is not in the page's HTML, only added in the browser", async ({ request }) => {
    const html = await (await request.get("/projects")).text();
    // The words travel with the page's messages; the bar itself isn't drawn.
    expect(html).not.toContain("<aside");
  });

  test("doesn't show on a Portuguese page", async ({ page }) => {
    await visit(page, "/pt/projects");
    await expect(suggestion(page)).toHaveCount(0);
  });

  test("closing it saves a dismissal, and it doesn't come back", async ({ page }) => {
    await visit(page, "/");
    await suggestion(page).getByRole("button", { name: "Fechar" }).click();
    await expect(suggestion(page)).toHaveCount(0);
    expect(await cookieValue(page)).toBe("dismissed");
    await visit(page, "/about");
    await expect(suggestion(page)).toHaveCount(0);
    await expect(page).toHaveURL("/about");
  });

  test("choosing Portuguese goes there, saves the choice, and it doesn't come back", async ({
    page,
  }) => {
    await visit(page, "/about");
    await followLink(
      page,
      suggestion(page).getByRole("link", { name: "Ver em português" }),
      "/pt/about",
    );
    expect(await cookieValue(page)).toBe("pt-PT");
    // An English address now leads back to the Portuguese page.
    await visit(page, "/contact");
    await expect(page).toHaveURL("/pt/contact");
    await expect(suggestion(page)).toHaveCount(0);
  });
});

test.describe("language suggestion for an English browser", () => {
  test.use({ locale: "en-GB" });

  test("doesn't show", async ({ page }) => {
    await visit(page, "/");
    // Gives a late, client-only bar the time it would need to appear.
    await page.waitForTimeout(500);
    await expect(suggestion(page)).toHaveCount(0);
  });
});
