import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { renderWithTheme } from "@tests/render";
import { mockScreen } from "@tests/screen";
import { MobileMenu } from "./MobileMenu";

function renderMenu() {
  renderWithTheme(
    <MobileMenu
      brand={<a href="#home">Brand</a>}
      nav={
        <nav aria-label="Mobile">
          <a href="#about">About</a>
          <span>Not a link</span>
        </nav>
      }
    />,
  );
}

// While the menu is open, the page behind it is hidden from assistive tech.
const openButton = () => screen.getByRole("button", { name: "Open menu", hidden: true });
const menu = () => screen.queryByRole("navigation", { name: "Mobile" });

async function openMenu() {
  await userEvent.click(openButton());
  expect(menu()).toBeVisible();
}

const waitUntilClosed = () => waitFor(() => expect(menu()).not.toBeInTheDocument());

beforeEach(() => {
  mockScreen({ isDesktop: false });
});

describe("MobileMenu", () => {
  it("starts closed", () => {
    renderMenu();
    expect(menu()).not.toBeInTheDocument();
    expect(openButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("opens from the menu button, and the button says it's open", async () => {
    renderMenu();
    await openMenu();
    expect(openButton()).toHaveAttribute("aria-expanded", "true");
  });

  it("closes from the close button", async () => {
    renderMenu();
    await openMenu();
    await userEvent.click(screen.getByRole("button", { name: "Close menu" }));
    await waitUntilClosed();
    expect(openButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes with the Escape key", async () => {
    renderMenu();
    await openMenu();
    await userEvent.keyboard("{Escape}");
    await waitUntilClosed();
  });

  it.each(["About", "Brand", "Contact me"])("closes when %s is followed", async (name) => {
    renderMenu();
    await openMenu();
    await userEvent.click(screen.getByRole("link", { name }));
    await waitUntilClosed();
  });

  it("stays open when something that isn't a link is clicked", async () => {
    renderMenu();
    await openMenu();
    await userEvent.click(screen.getByText("Not a link"));
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(menu()).toBeVisible();
  });

  it("can be opened again after closing", async () => {
    renderMenu();
    await openMenu();
    await userEvent.keyboard("{Escape}");
    await waitUntilClosed();
    await openMenu();
  });

  it("closes when the screen grows to desktop width while it's open", async () => {
    const screenSize = mockScreen({ isDesktop: false });
    renderMenu();
    await openMenu();
    screenSize.resize({ isDesktop: true });
    await waitUntilClosed();
  });

  it("stays closed when the screen shrinks back to mobile width", async () => {
    const screenSize = mockScreen({ isDesktop: false });
    renderMenu();
    await openMenu();
    screenSize.resize({ isDesktop: true });
    await waitUntilClosed();
    screenSize.resize({ isDesktop: false });
    // Give a wrongly reopening menu time to appear.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(menu()).not.toBeInTheDocument();
    expect(openButton()).toHaveAttribute("aria-expanded", "false");
  });
});
