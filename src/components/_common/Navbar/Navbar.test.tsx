import { screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { type Availability, PAGES } from "@/constants";
import { setProfile } from "@tests/profile";
import { renderWithTheme } from "@tests/render";
import { Navbar } from "./Navbar";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

function renderAt(pathname: string, navbar = Navbar) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  const Bar = navbar;
  renderWithTheme(<Bar />);
}

// jsdom can't evaluate breakpoints, so the desktop-only parts count as hidden.
// Queries include hidden elements, and visibility is checked separately.
const mainNav = () =>
  within(screen.getByRole("navigation", { name: "Main", hidden: true }));

const currentLinks = () =>
  mainNav()
    .getAllByRole("link", { hidden: true })
    .filter((link) => link.getAttribute("aria-current") === "page")
    .map((link) => link.textContent);

/** Shown to sighted visitors, ignoring breakpoints. */
function isShown(element: Element) {
  return getComputedStyle(element).visibility !== "hidden";
}

beforeEach(() => {
  vi.mocked(usePathname).mockReset();
});

describe("Navbar", () => {
  it("links to every page, in order", () => {
    renderAt("/");
    const links = mainNav().getAllByRole("link", { hidden: true });
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      PAGES.map((page) => page.href),
    );
  });

  describe("current page", () => {
    it.each([
      ["/", "Home"],
      ["/about", "About"],
      ["/experience", "Experience"],
      ["/projects", "Personal Projects"],
      ["/contact", "Contact"],
    ])("marks only %s as the current page", (pathname, name) => {
      renderAt(pathname);
      expect(currentLinks()).toEqual([name]);
    });

    it("marks Home only on the home page itself, though every address starts with /", () => {
      renderAt("/about");
      expect(currentLinks()).not.toContain("Home");
    });

    it("marks a section for addresses inside it", () => {
      renderAt("/about/team");
      expect(currentLinks()).toEqual(["About"]);
    });

    it("marks a section when its address ends with a slash", () => {
      renderAt("/about/");
      expect(currentLinks()).toEqual(["About"]);
    });

    it("doesn't mark a section for an address that only starts with the same letters", () => {
      renderAt("/aboutme");
      expect(currentLinks()).toEqual([]);
    });

    it("marks nothing on an unknown address", () => {
      renderAt("/no-such-page");
      expect(currentLinks()).toEqual([]);
    });
  });

  describe("availability chip", () => {
    async function renderWith(availability: Availability) {
      setProfile({ availability });
      const { Navbar: Bar } = await import("./Navbar");
      renderAt("/", Bar);
    }

    const shownTexts = (pattern: RegExp) =>
      screen
        .queryAllByText(pattern)
        .filter(isShown)
        .map((element) => element.textContent);

    it("says open for opportunities when available right away", async () => {
      await renderWith("immediate");
      expect(shownTexts(/opportunities/)).toEqual(["Open for opportunities"]);
    });

    it("says open to opportunities when open without a start date", async () => {
      await renderWith("open");
      expect(shownTexts(/opportunities/)).toEqual(["Open to opportunities"]);
    });

    it("shows a short label on small screens that still reads in full to screen readers", async () => {
      await renderWith("open");
      const shortChip = screen.getByLabelText("Open to opportunities");
      expect(shortChip).toHaveTextContent(/^Open$/);
    });

    it("shows no availability at all when not looking", async () => {
      await renderWith("not-looking");
      expect(shownTexts(/opportunit|^Open$/)).toEqual([]);
      expect(screen.queryByLabelText(/opportunit/)).not.toBeInTheDocument();
    });

    it("hides the unused labels from screen readers too", async () => {
      await renderWith("immediate");
      const hidden = screen
        .queryAllByText(/opportunities/)
        .filter((element) => !isShown(element));
      for (const element of hidden) {
        expect(element.closest("[aria-hidden='true']")).not.toBeNull();
      }
    });
  });
});
