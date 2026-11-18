import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SOCIAL_LINKS } from "@/_common/constants";
import { renderWithTheme } from "@tests/render";
import { MenuFooter } from "./MenuFooter";

describe("MenuFooter", () => {
  it("links to every social profile, in a new tab", () => {
    renderWithTheme(<MenuFooter languageSwitcher={<div>Switcher</div>} />);
    for (const { name, href } of SOCIAL_LINKS) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("shows the language switcher it is given", () => {
    renderWithTheme(<MenuFooter languageSwitcher={<div>Switcher</div>} />);
    expect(screen.getByText("Switcher")).toBeInTheDocument();
  });
});
