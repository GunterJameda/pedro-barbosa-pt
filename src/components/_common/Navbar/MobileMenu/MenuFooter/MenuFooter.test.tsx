import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SOCIAL_LINKS } from "@/constants";
import { renderWithTheme } from "@tests/render";
import { MenuFooter } from "./MenuFooter";

describe("MenuFooter", () => {
  it("links to every social profile, in a new tab", () => {
    renderWithTheme(<MenuFooter />);
    for (const { name, href } of SOCIAL_LINKS) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });
});
