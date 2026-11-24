import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SOCIAL_LINKS } from "@/_common/constants";
import { renderWithTheme } from "@tests/render";
import { SocialLinks } from "./SocialLinks";

describe("SocialLinks", () => {
  it.each(["footer", "menu"] as const)(
    "links to every social profile in a new tab, safely (%s)",
    (variant) => {
      renderWithTheme(<SocialLinks variant={variant} />);
      for (const { name, href } of SOCIAL_LINKS) {
        const link = screen.getByRole("link", { name });
        expect(link).toHaveAttribute("href", href);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    },
  );
});
