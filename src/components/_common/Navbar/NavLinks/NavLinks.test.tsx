import { screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { PAGES } from "@/constants";
import { renderWithTheme } from "@tests/render";
import { NavLinks } from "./NavLinks";
import type { NavLinksVariant } from "./types";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

const NAV_NAMES: Record<NavLinksVariant, string> = { desktop: "Main", mobile: "Mobile" };

function renderAt(pathname: string, variant: NavLinksVariant = "desktop") {
  vi.mocked(usePathname).mockReturnValue(pathname);
  renderWithTheme(<NavLinks variant={variant} />);
  // jsdom can't evaluate breakpoints, so the desktop links count as hidden.
  return screen.getByRole("navigation", { name: NAV_NAMES[variant], hidden: true });
}

const linksIn = (nav: HTMLElement) => within(nav).getAllByRole("link", { hidden: true });

const currentLinks = (nav: HTMLElement) =>
  linksIn(nav)
    .filter((link) => link.getAttribute("aria-current") === "page")
    .map((link) => link.textContent);

describe.each<NavLinksVariant>(["desktop", "mobile"])("NavLinks (%s)", (variant) => {
  it("links to every page, in order", () => {
    const nav = renderAt("/", variant);
    expect(linksIn(nav).map((link) => link.getAttribute("href"))).toEqual(
      PAGES.map((page) => page.href),
    );
  });

  it.each([
    ["/", "Home"],
    ["/about", "About"],
    ["/experience", "Experience"],
    ["/projects", "Personal Projects"],
    ["/contact", "Contact"],
  ])("marks only %s as the current page", (pathname, name) => {
    expect(currentLinks(renderAt(pathname, variant))).toEqual([name]);
  });

  it("marks Home only on the home page itself, though every address starts with /", () => {
    expect(currentLinks(renderAt("/about", variant))).not.toContain("Home");
  });

  it("marks a section for addresses inside it", () => {
    expect(currentLinks(renderAt("/about/team", variant))).toEqual(["About"]);
  });

  it("marks a section when its address ends with a slash", () => {
    expect(currentLinks(renderAt("/about/", variant))).toEqual(["About"]);
  });

  it("doesn't mark a section for an address that only starts with the same letters", () => {
    expect(currentLinks(renderAt("/aboutme", variant))).toEqual([]);
  });

  it("marks nothing on an unknown address", () => {
    expect(currentLinks(renderAt("/no-such-page", variant))).toEqual([]);
  });
});
