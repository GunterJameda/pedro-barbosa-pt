import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import type { Availability } from "@/constants";
import { setProfile } from "@tests/profile";
import { renderWithTheme } from "@tests/render";
import { mockScreen } from "@tests/screen";
import { MobileMenu } from "./MobileMenu";
import type { MobileMenuLink } from "./types";

const LINKS: MobileMenuLink[] = [
  { name: "Home", href: "/", isActive: false },
  { name: "About", href: "/about", isActive: true },
  { name: "Contact", href: "/contact", isActive: false },
];

function renderMenu(menu = MobileMenu) {
  const Menu = menu;
  renderWithTheme(
    <Menu
      links={LINKS}
      renderBrand={(close) => (
        <button type="button" onClick={close}>
          Brand
        </button>
      )}
    />,
  );
}

// While the menu is open, the page behind it is hidden from assistive tech.
const openButton = () =>
  screen.getByRole("button", { name: "Open menu", hidden: true });
const menu = () => screen.queryByRole("navigation", { name: "Mobile" });

async function openMenu() {
  await userEvent.click(openButton());
  return within(menu()!);
}

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
    expect(menu()).toBeVisible();
    expect(openButton()).toHaveAttribute("aria-expanded", "true");
  });

  it("lists every link it's given, in order", async () => {
    renderMenu();
    const nav = await openMenu();
    const links = nav.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["Home", "About", "Contact"]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/", "/about", "/contact"]);
  });

  it("marks the current page", async () => {
    renderMenu();
    const nav = await openMenu();
    expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(nav.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
    expect(nav.getByRole("link", { name: "Contact" })).not.toHaveAttribute("aria-current");
  });

  it("closes from the close button", async () => {
    renderMenu();
    await openMenu();
    await userEvent.click(screen.getByRole("button", { name: "Close menu" }));
    await waitFor(() => expect(menu()).not.toBeInTheDocument());
    expect(openButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes with the Escape key", async () => {
    renderMenu();
    await openMenu();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(menu()).not.toBeInTheDocument());
  });

  it("closes when a page is chosen", async () => {
    renderMenu();
    const nav = await openMenu();
    await userEvent.click(nav.getByRole("link", { name: "Contact" }));
    await waitFor(() => expect(menu()).not.toBeInTheDocument());
  });

  it("closes when the brand inside it is used", async () => {
    renderMenu();
    await openMenu();
    await userEvent.click(screen.getByRole("button", { name: "Brand" }));
    await waitFor(() => expect(menu()).not.toBeInTheDocument());
  });

  it("can be opened again after closing", async () => {
    renderMenu();
    await openMenu();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(menu()).not.toBeInTheDocument());
    await openMenu();
    expect(menu()).toBeVisible();
  });

  it("closes when the screen grows to desktop width while it's open", async () => {
    const screenSize = mockScreen({ isDesktop: false });
    renderMenu();
    await openMenu();
    screenSize.resize({ isDesktop: true });
    await waitFor(() => expect(menu()).not.toBeInTheDocument());
  });

  it("stays closed when the screen shrinks back to mobile width", async () => {
    const screenSize = mockScreen({ isDesktop: false });
    renderMenu();
    await openMenu();
    screenSize.resize({ isDesktop: true });
    await waitFor(() => expect(menu()).not.toBeInTheDocument());
    screenSize.resize({ isDesktop: false });
    // Give a wrongly reopening menu time to appear.
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(menu()).not.toBeInTheDocument();
    expect(openButton()).toHaveAttribute("aria-expanded", "false");
  });

  it("opens social profiles in a new tab", async () => {
    renderMenu();
    await openMenu();
    for (const name of ["GitHub", "LinkedIn"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("target", "_blank");
    }
  });

  describe("availability", () => {
    async function renderWith(availability: Availability) {
      setProfile({ availability });
      const { MobileMenu: Menu } = await import("./MobileMenu");
      renderMenu(Menu);
      await openMenu();
    }

    it("says the start is immediate", async () => {
      await renderWith("immediate");
      expect(screen.getByText("Availability")).toBeVisible();
      expect(screen.getByText("Immediate")).toBeVisible();
    });

    it("says open to opportunities, without a start date", async () => {
      await renderWith("open");
      expect(screen.getByText("Open to opportunities")).toBeVisible();
      expect(screen.queryByText("Immediate")).not.toBeInTheDocument();
    });

    it("says nothing about availability when not looking", async () => {
      await renderWith("not-looking");
      expect(screen.queryByText("Availability")).not.toBeInTheDocument();
      expect(screen.queryByText(/immediate|opportunit/i)).not.toBeInTheDocument();
    });
  });
});
