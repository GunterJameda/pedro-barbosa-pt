import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@tests/render";
import { mockScreen } from "@tests/screen";
import { Navbar } from "./Navbar";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

beforeEach(() => {
  mockScreen({ isDesktop: false });
  vi.mocked(usePathname).mockReturnValue("/experience");
});

const linksIn = (name: string) =>
  within(screen.getByRole("navigation", { name, hidden: true }))
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
    expect(linksIn("Mobile")).toEqual(linksIn("Main"));
    expect(linksIn("Mobile")).toContainEqual(["Experience", "page"]);
  });

  it("closes the menu after a page is chosen in it", async () => {
    renderWithTheme(<Navbar />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = within(screen.getByRole("navigation", { name: "Mobile" }));
    await userEvent.click(menu.getByRole("link", { name: "Contact" }));
    await waitFor(() =>
      expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument(),
    );
  });
});
