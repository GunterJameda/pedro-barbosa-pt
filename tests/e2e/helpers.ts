import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { expect } from "./fixtures";

/** Waits until the page on screen has loaded and React has taken it over. */
export async function settle(page: Page) {
  await page.waitForLoadState("load");
  // React marks the elements it has hydrated. Hydration errors are reported
  // by then, so the fixture sees them.
  await page.waitForFunction(() => {
    const navbar = document.querySelector("header");
    return !!navbar && Object.keys(navbar).some((key) => key.startsWith("__reactFiber"));
  });
  // Lets late requests finish too. The dev server can keep a connection open,
  // so this is a best effort rather than a requirement.
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
}

/** Loads a page and waits until React has taken it over. */
export async function visit(page: Page, path: string) {
  const response = await page.goto(path);
  await settle(page);
  return response;
}

export async function expectNoAccessibilityViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const summary = violations.map(
    (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length}x)`,
  );
  expect(summary).toEqual([]);
}

/** A page's address in Portuguese: "/about" is "/pt/about", and "/" is "/pt". */
export const portuguese = (route: string) => (route === "/" ? "/pt" : `/pt${route}`);

/**
 * Clicks a link that loads another page, and waits for that page. Playwright's
 * own wait after a click makes Firefox warn that layout was forced before the
 * page loaded, which the fixture counts as a problem, so the wait is done here.
 */
export async function followLink(page: Page, link: Locator, url: string) {
  await link.click({ noWaitAfter: true });
  await page.waitForURL(url);
  await settle(page);
}
