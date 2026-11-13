import type { CSSProperties } from "react";

import type { slate, surfaces } from "./tokens";

/** Card, border and tint colours, added to the palette as "surface.<name>". */
export type SurfaceColors = Omit<typeof surfaces, "background">;

/** Slate shades, added to the palette as "slate.<shade>". */
export type SlateColors = typeof slate;

/** The site's text styles, added to MUI's Typography as custom variants. */
export type TextVariant =
  | "pageTitle"
  | "displayTitle"
  | "sectionTitle"
  | "cardHeading"
  | "cardTitle"
  | "itemTitle"
  | "lead"
  | "body"
  | "small"
  | "mono";

declare module "@mui/material/styles" {
  interface Palette {
    surface: SurfaceColors;
    slate: SlateColors;
  }
  interface PaletteOptions {
    surface?: SurfaceColors;
    slate?: SlateColors;
  }
  // The theme turns CSS variables on, so theme.vars is always there.
  interface CssThemeVariables {
    enabled: true;
  }
  interface TypographyVariants {
    pageTitle: CSSProperties;
    displayTitle: CSSProperties;
    sectionTitle: CSSProperties;
    cardHeading: CSSProperties;
    cardTitle: CSSProperties;
    itemTitle: CSSProperties;
    lead: CSSProperties;
    body: CSSProperties;
    small: CSSProperties;
    mono: CSSProperties;
  }
  interface TypographyVariantsOptions {
    pageTitle?: CSSProperties;
    displayTitle?: CSSProperties;
    sectionTitle?: CSSProperties;
    cardHeading?: CSSProperties;
    cardTitle?: CSSProperties;
    itemTitle?: CSSProperties;
    lead?: CSSProperties;
    body?: CSSProperties;
    small?: CSSProperties;
    mono?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    displayTitle: true;
    sectionTitle: true;
    cardHeading: true;
    cardTitle: true;
    itemTitle: true;
    lead: true;
    body: true;
    small: true;
    mono: true;
  }
}
