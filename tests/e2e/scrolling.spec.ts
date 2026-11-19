import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/** How far below the top of the window a section may land, navbar included. */
const LANDING_ZONE_PX = 160;

/** Where a section sits after a jump, read in the page in one go. */
const landing = (page: Page, id: string) =>
  page.evaluate(
    ({ id, zone }) => {
      const top = document.getElementById(id)!.getBoundingClientRect().top;
      const navbar = document.querySelector("header")!.getBoundingClientRect().height;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return { top, navbar, nearTop: top < zone, atBottom: window.scrollY >= maxScroll - 1 };
    },
    { id, zone: LANDING_ZONE_PX },
  );

/** How long the scroll position must stay put to count as stopped. */
const SETTLE_MS = 300;

/**
 * Waits until the page has scrolled away from the top and stopped moving. It
 * watches inside the page, frame by frame, because a busy machine can stall a
 * round trip from the test for seconds, which a polling loop would mistake for
 * the scroll never ending.
 */
const waitForScrollToStop = (page: Page) =>
  page.evaluate(
    (settleMs) =>
      new Promise<void>((resolve) => {
        let lastY = -1;
        let since = performance.now();
        const check = () => {
          const now = performance.now();
          if (window.scrollY !== lastY) {
            lastY = window.scrollY;
            since = now;
          } else if (lastY > 0 && now - since >= settleMs) {
            resolve();
            return;
          }
          requestAnimationFrame(check);
        };
        check();
      }),
    SETTLE_MS,
  );

// Every page with a Fast Navigation card, and the name of its navigation.
const FAST_NAVIGATION = [
  { path: "/experience", label: "Companies" },
  { path: "/projects", label: "Projects" },
];

for (const { path, label } of FAST_NAVIGATION) {
  test(`Fast Navigation on ${path} reaches every section, clear of the navbar`, async ({
    page,
  }) => {
    await page.goto(path);
    const links = page.getByRole("navigation", { name: label }).getByRole("link");
    const targets = await links.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href")!.slice(1)),
    );
    expect(targets.length).toBeGreaterThan(0);

    for (const [index, id] of targets.entries()) {
      // Starts from the top each time, so every jump is a real scroll.
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await links.nth(index).click();

      await expect(page).toHaveURL(`${path}#${id}`);
      // Smooth scrolling passes through every position on the way, so only the
      // final one counts: near the top, below the navbar. The last sections
      // can't reach the top, so for them the page must be scrolled to its end.
      await waitForScrollToStop(page);
      // A stall in the middle of the scroll can look like a stop, so the landing
      // is retried until it holds instead of being judged on one reading.
      await expect
        .poll(
          async () => {
            const { top, navbar, nearTop, atBottom } = await landing(page, id);
            return top >= navbar - 1 && (nearTop || atBottom);
          },
          {
            message: `#${id} lands below the navbar, near the top or with the page at its end`,
            timeout: 10_000,
          },
        )
        .toBe(true);
    }
  });
}

test.describe("go-to-top button", () => {
  const button = (page: Page) => page.getByRole("button", { name: "Go to top" });

  test("stays hidden at the top of the page", async ({ page }) => {
    await page.goto("/experience");
    await expect(button(page)).toBeHidden();
  });

  test("appears after scrolling down and brings the page back to the top", async ({ page }) => {
    await page.goto("/experience");
    await page.evaluate(() => window.scrollTo({ top: 2000, behavior: "instant" }));
    await expect(button(page)).toBeVisible();

    await button(page).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(button(page)).toBeHidden();
  });
});
