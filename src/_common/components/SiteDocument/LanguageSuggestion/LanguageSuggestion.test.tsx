import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readLanguageChoice } from "@/_common/utils/readLanguageChoice";
import { renderWithTheme } from "@tests/render";
import { LanguageSuggestion } from "./LanguageSuggestion";

// Only the address is faked; the site's locale-aware navigation needs the rest.
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  usePathname: () => "/contact",
}));

function browserLanguages(languages: string[]) {
  vi.spyOn(navigator, "languages", "get").mockReturnValue(languages);
}

afterEach(() => {
  document.cookie = "NEXT_LOCALE=; Path=/; Max-Age=0";
  vi.restoreAllMocks();
});

describe("LanguageSuggestion", () => {
  it("offers the same page in Portuguese to a browser that prefers it", () => {
    browserLanguages(["pt-PT", "en"]);
    renderWithTheme(<LanguageSuggestion />);
    expect(screen.getByText("Este site está disponível em português.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver em português" })).toHaveAttribute(
      "href",
      "/pt/contact",
    );
  });

  it("shows nothing to a browser that doesn't prefer Portuguese", () => {
    browserLanguages(["en-GB"]);
    renderWithTheme(<LanguageSuggestion />);
    expect(screen.queryByRole("link", { name: "Ver em português" })).not.toBeInTheDocument();
  });

  it.each(["en", "pt-PT", "dismissed"])("shows nothing after the choice %j", (choice) => {
    browserLanguages(["pt-PT"]);
    document.cookie = `NEXT_LOCALE=${choice}; Path=/`;
    renderWithTheme(<LanguageSuggestion />);
    expect(screen.queryByRole("link", { name: "Ver em português" })).not.toBeInTheDocument();
  });

  it("closes and remembers it was dismissed", async () => {
    browserLanguages(["pt-BR"]);
    renderWithTheme(<LanguageSuggestion />);
    await userEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(screen.queryByText("Este site está disponível em português.")).not.toBeInTheDocument();
    expect(readLanguageChoice(document.cookie)).toBe("dismissed");
  });

  it("remembers the choice of Portuguese when its link is followed", async () => {
    browserLanguages(["pt-PT"]);
    renderWithTheme(<LanguageSuggestion />);
    const link = screen.getByRole("link", { name: "Ver em português" });
    // Stops the navigation, which jsdom can't do, after the click handlers ran.
    link.addEventListener("click", (event) => event.preventDefault());
    await userEvent.click(link);
    expect(readLanguageChoice(document.cookie)).toBe("pt-PT");
  });
});
