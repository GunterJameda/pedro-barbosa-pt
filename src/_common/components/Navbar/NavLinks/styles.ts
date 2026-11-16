import type { NavLinksVariant } from "./types";

export const activeLink = {
  color: "primary.light",
  backgroundColor: "surface.teal10",
  borderColor: "surface.teal20",
  "&:hover": { backgroundColor: "surface.teal10" },
};

export const variantStyles = {
  desktop: {
    // The desktop links only show from the lg breakpoint; below it, the menu has them.
    nav: { display: { xs: "none", lg: "flex" }, alignItems: "center" },
    link: {
      minWidth: 0,
      px: 2,
      py: 1,
      fontSize: 12,
      lineHeight: "16px",
      whiteSpace: "nowrap",
    },
    inactiveLink: {
      color: "text.secondary",
      "&:hover": { color: "slate.200", backgroundColor: "surface.hairline" },
    },
  },
  mobile: {
    nav: {},
    link: { justifyContent: "flex-start", minHeight: 48, px: 2, fontSize: 16 },
    inactiveLink: {
      color: "slate.200",
      "&:hover": { backgroundColor: "surface.hairline" },
    },
  },
} satisfies Record<NavLinksVariant, object>;
