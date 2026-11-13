import type { Page } from "@playwright/test";
import { expect, isPhone, test } from "./fixtures";

const mainNav = (page: Page) => page.getByRole("navigation", { name: "Main" });
const menuButton = (page: Page) => page.getByRole("button", { name: "Open menu" });
const menu = (page: Page) => page.getByRole("dialog", { name: "Menu" });

test.describe("on desktop", () => {
  test.beforeEach(({ viewport }) => {
    test.skip(isPhone(viewport?.width), "desktop only");
  });

  test("shows the page links in the navbar, with no menu button", async ({ page }) => {
    await page.goto("/");
    await expect(mainNav(page).getByRole("link")).toHaveCount(5);
    await expect(menuButton(page)).toBeHidden();
  });

  test("goes to a page from the navbar and marks it as the current one", async ({ page }) => {
    await page.goto("/");
    await mainNav(page).getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL("/experience");
    await expect(mainNav(page).getByRole("link", { name: "Experience" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(mainNav(page).locator("[aria-current]")).toHaveCount(1);
  });

  test("reserves room for the longest status text, so the links never move", async ({ page }) => {
    await page.goto("/");
    const chips = page.locator(".MuiChip-root", { hasText: /^Open (for|to) opportunities$/ });
    const slot = chips.first().locator("..");
    const slotBox = (await slot.boundingBox())!;
    const widths = await chips.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().width),
    );
    expect(widths.length).toBeGreaterThan(1);
    expect(slotBox.width).toBeCloseTo(Math.max(...widths), 0);
    // Exactly one is shown; the others only hold the space.
    await expect(chips.filter({ visible: true })).toHaveCount(1);
  });
});

test.describe("on a phone", () => {
  test.beforeEach(({ viewport }) => {
    test.skip(!isPhone(viewport?.width), "phone only");
  });

  test("hides the navbar links behind a menu button", async ({ page }) => {
    await page.goto("/");
    await expect(mainNav(page)).toBeHidden();
    await expect(menuButton(page)).toBeVisible();
  });

  test("opens the menu and closes it with the close button", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await expect(menu(page).getByRole("link", { name: "Contact me" })).toBeVisible();
    await menu(page).getByRole("button", { name: "Close menu" }).click();
    await expect(menu(page)).toBeHidden();
  });

  test("closes the menu with Escape", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await expect(menu(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu(page)).toBeHidden();
  });

  test("goes to a page from the menu, closes it and marks the page", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await menu(page).getByRole("link", { name: "Personal Projects" }).click();
    await expect(page).toHaveURL("/projects");
    await expect(menu(page)).toBeHidden();
    await menuButton(page).click();
    await expect(menu(page).getByRole("link", { name: "Personal Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("closes the menu when the window grows to desktop size", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await expect(menu(page)).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(menu(page)).toBeHidden();
    await expect(mainNav(page)).toBeVisible();
    // Shrinking back must not reopen it.
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(menu(page)).toBeHidden();
  });
});
