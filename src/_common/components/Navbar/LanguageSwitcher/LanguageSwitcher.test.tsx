import { usePathname } from "next/navigation";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readLanguageChoice } from "@/_common/utils/readLanguageChoice";
import { PORTUGUESE_INTL } from "@tests/intl";
import { renderWithTheme } from "@tests/render";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Only the address is faked; the site's locale-aware navigation needs the rest.
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  usePathname: vi.fn(() => "/about"),
}));

afterEach(() => {
  document.cookie = "NEXT_LOCALE=; Path=/; Max-Age=0";
});

describe("LanguageSwitcher", () => {
  it("marks the current language, and links to the same page in the other", () => {
    renderWithTheme(<LanguageSwitcher />);
    const group = screen.getByRole("group", { name: "Language" });
    expect(within(group).getByText("English").closest("[aria-current]")).toHaveAttribute(
      "aria-current",
      "true",
    );
    const other = within(group).getByRole("link", { name: "Português" });
    expect(other).toHaveAttribute("href", "/pt/about");
    expect(other).toHaveAttribute("lang", "pt-PT");
    expect(other).toHaveAttribute("hreflang", "pt-PT");
    expect(within(group).getAllByRole("link")).toHaveLength(1);
  });

  it("shows EN and PT, the current one bold", () => {
    renderWithTheme(<LanguageSwitcher />);
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
    const current = screen.getByText("English").closest("[aria-current]")!;
    expect(getComputedStyle(current).fontWeight).toBe("700");
  });

  it("links home to the other language's home", () => {
    vi.mocked(usePathname).mockReturnValueOnce("/");
    renderWithTheme(<LanguageSwitcher />);
    expect(screen.getByRole("link", { name: "Português" })).toHaveAttribute("href", "/pt");
  });

  it("links to the other language's home page from an address that isn't a page", () => {
    vi.mocked(usePathname).mockReturnValueOnce("/_not-found");
    renderWithTheme(<LanguageSwitcher />);
    expect(screen.getByRole("link", { name: "Português" })).toHaveAttribute("href", "/pt");
  });

  it("saves the choice when a language is picked", async () => {
    renderWithTheme(<LanguageSwitcher />);
    const link = screen.getByRole("link", { name: "Português" });
    // Stops the navigation, which jsdom can't do, after the click handlers ran.
    link.addEventListener("click", (event) => event.preventDefault());
    await userEvent.click(link);
    expect(readLanguageChoice(document.cookie)).toBe("pt-PT");
  });

  it("has a decorative icon that doesn't change the group's name", () => {
    const { container } = renderWithTheme(<LanguageSwitcher />);
    expect(container.querySelector('svg[data-testid="TranslateIcon"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  });

  it("shows the word Language only when asked to", () => {
    renderWithTheme(<LanguageSwitcher showLabel />);
    expect(screen.getByText("Language")).toBeInTheDocument();
  });

  it("works from a Portuguese page: English is the link, in Portuguese", () => {
    renderWithTheme(<LanguageSwitcher />, PORTUGUESE_INTL);
    const group = screen.getByRole("group", { name: "Idioma" });
    expect(within(group).getByRole("link", { name: "English" })).toHaveAttribute("href", "/about");
    expect(within(group).getByText("Português").closest("[aria-current]")).toBeInTheDocument();
  });
});
