import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { PAGE_ROUTES } from "@tests/pages";
import { EXPECTS_404, expect, test } from "./fixtures";

const MISSING_PAGE = "/this-page-does-not-exist";

/** Loads a page and waits until React has taken it over. */
async function visit(page: Page, path: string) {
  const response = await page.goto(path);
  // React marks the elements it has hydrated. Hydration errors are reported
  // by then, so the fixture sees them.
  await page.waitForFunction(() => {
    const navbar = document.querySelector("header");
    return !!navbar && Object.keys(navbar).some((key) => key.startsWith("__reactFiber"));
  });
  // Lets late requests finish too. The dev server can keep a connection open,
  // so this is a best effort rather than a requirement.
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
  return response;
}

async function expectNoAccessibilityViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const summary = violations.map(
    (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length}x)`,
  );
  expect(summary).toEqual([]);
}

// Every check below also fails on any browser problem, through the fixture:
// console errors, exceptions, hydration mismatches and failed requests.
for (const route of PAGE_ROUTES) {
  test.describe(`${route} page`, () => {
    test("loads cleanly from an empty cache", async ({ page }) => {
      const response = await visit(page, route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("has no accessibility violations", async ({ page }) => {
      await visit(page, route);
      await expectNoAccessibilityViolations(page);
    });
  });
}

test.describe("missing page", () => {
  test.beforeEach(({}, testInfo) => {
    testInfo.annotations.push({ type: EXPECTS_404 });
  });

  test("returns 404 and still loads cleanly", async ({ page }) => {
    const response = await visit(page, MISSING_PAGE);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("has no accessibility violations", async ({ page }) => {
    await visit(page, MISSING_PAGE);
    await expectNoAccessibilityViolations(page);
  });
});

test("sends the old /home address to the home page, permanently", async ({ request }) => {
  const response = await request.get("/home", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/");
});
