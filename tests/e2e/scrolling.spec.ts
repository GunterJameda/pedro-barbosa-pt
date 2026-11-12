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

/** Waits until the page has scrolled away from the top and stopped moving. */
async function waitForScrollToStop(page: Page) {
  const scrollY = () => page.evaluate(() => window.scrollY);
  await expect
    .poll(async () => {
      const before = await scrollY();
      await page.waitForTimeout(200);
      return before > 0 && before === (await scrollY());
    }, { message: "the page scrolls to the section and stops" })
    .toBe(true);
}

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
      const { top, navbar, nearTop, atBottom } = await landing(page, id);
      expect(top, `#${id} lands below the navbar`).toBeGreaterThanOrEqual(navbar - 1);
      expect(nearTop || atBottom, `#${id} lands near the top, or the page is at its end`).toBe(
        true,
      );
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
