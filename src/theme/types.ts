import type { CSSProperties } from "react";

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
  | "mono"
  | "monoSmall";

declare module "@mui/material/styles" {
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
    monoSmall: CSSProperties;
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
    monoSmall?: CSSProperties;
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
    monoSmall: true;
  }
}
