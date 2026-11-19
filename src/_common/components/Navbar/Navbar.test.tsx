import { usePathname } from "next/navigation";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@tests/render";
import { mockScreen } from "@tests/screen";
import { Navbar } from "./Navbar";

// Only the address is faked; the site's locale-aware navigation needs the rest.
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  usePathname: vi.fn(),
}));

beforeEach(() => {
  mockScreen({ isDesktop: false });
  vi.mocked(usePathname).mockReturnValue("/experience");
});

// Both link lists share one name, since only one shows at a time; the menu's sits in its panel.
const menuNav = () =>
  within(screen.getByRole("dialog", { name: "Menu" })).getByRole("navigation", { name: "Main" });

const desktopNav = () =>
  screen
    .getAllByRole("navigation", { name: "Main", hidden: true })
    .find((nav) => !nav.closest("[role=dialog]"))!;

const linksIn = (nav: HTMLElement) =>
  within(nav)
    .getAllByRole("link", { hidden: true })
    .map((link) => [link.textContent, link.getAttribute("aria-current")]);

describe("Navbar", () => {
  it("links home from the logo", () => {
    renderWithTheme(<Navbar />);
    const home = screen
      .getAllByRole("link", { hidden: true })
      .find((link) => link.textContent?.includes("Pedro Barbosa"));
    expect(home).toHaveAttribute("href", "/");
  });

  it("shows the same pages, and the same current one, in the desktop links and the menu", async () => {
    renderWithTheme(<Navbar />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(linksIn(menuNav())).toEqual(linksIn(desktopNav()));
    expect(linksIn(menuNav())).toContainEqual(["Experience", "page"]);
  });

  it("closes the menu after a page is chosen in it", async () => {
    renderWithTheme(<Navbar />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.click(within(menuNav()).getByRole("link", { name: "Contact" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument(),
    );
  });
});
