import type { Theme } from "@mui/material/styles";

export const secondaryStyles = {
  color: "slate.300",
  backgroundColor: "surface.white4",
  borderColor: "surface.white10",
  "&:hover": {
    color: "common.white",
    backgroundColor: "surface.white8",
  },
};

export const primaryStyles = {
  color: "background.default",
  backgroundColor: "primary.main",
  fontWeight: 600,
  // Transparent, so it stays the same height as the bordered buttons beside it.
  borderColor: "transparent",
  boxShadow: ({ vars }: Theme) => `0 1px 2px 0 ${vars.palette.surface.teal20}`,
  "&:hover": { backgroundColor: "primary.light" },
};

export const pillPrimaryStyles = {
  boxShadow: ({ vars }: Theme) => {
    const shadow = vars.palette.surface.teal20;
    return `0 4px 6px -1px ${shadow}, 0 2px 4px -2px ${shadow}`;
  },
};
