import type { Breakpoints } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { fontMono, slate } from "./tokens";
import type { TextVariant } from "./types";

export const sans =
  'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const white = "#fff";
const secondary = "#94a3b8";

// Matches MUI's body1 defaults, which the hand-written styles used to inherit.
const base: CSSProperties = {
  fontFamily: sans,
  fontWeight: 400,
  lineHeight: 1.5,
};

const tight = { letterSpacing: "-0.025em", color: white };

/** Builds the site's text styles. Responsive sizes need the theme's breakpoints. */
export function createTextVariants(
  breakpoints: Breakpoints,
): Record<TextVariant, CSSProperties> {
  const sm = breakpoints.up("sm");
  const lg = breakpoints.up("lg");

  return {
    // Hero title on content pages.
    pageTitle: {
      ...base,
      ...tight,
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.12,
      [sm]: { fontSize: 48 },
      [lg]: { fontSize: 60 },
    },
    // Bolder centred title on Home and the 404 page.
    displayTitle: {
      ...base,
      ...tight,
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.25,
      [sm]: { fontSize: 60 },
    },
    // Section headings and the bottom banner.
    sectionTitle: {
      ...base,
      ...tight,
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.2,
      [sm]: { fontSize: 30 },
    },
    // Large heading inside a card, such as a company name.
    cardHeading: {
      ...base,
      ...tight,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.33,
    },
    // Card titles.
    cardTitle: {
      ...base,
      ...tight,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    // Small titles in metric cards and lists.
    itemTitle: { ...base, ...tight, fontSize: 14, fontWeight: 600 },
    // Intro paragraph under a hero title.
    lead: {
      ...base,
      color: slate[300],
      fontSize: 16,
      lineHeight: 1.625,
      [sm]: { fontSize: 18 },
    },
    // Card and section text.
    body: {
      ...base,
      color: slate[300],
      fontSize: 12,
      lineHeight: 1.625,
      [sm]: { fontSize: 14 },
    },
    // Fine print in cards.
    small: { ...base, color: secondary, fontSize: 12, lineHeight: 1.625 },
    // Notes, dates and badges.
    mono: { ...base, color: secondary, fontFamily: fontMono, fontSize: 12 },
    // Card footer labels.
    monoSmall: {
      ...base,
      color: secondary,
      fontFamily: fontMono,
      fontSize: 11,
    },
  };
}

/** Default HTML element for each text style. Components override it with `component` when needed. */
export const TEXT_VARIANT_ELEMENTS: Record<TextVariant, string> = {
  pageTitle: "h1",
  displayTitle: "h1",
  sectionTitle: "h2",
  cardHeading: "h2",
  cardTitle: "h3",
  itemTitle: "p",
  lead: "p",
  body: "p",
  small: "p",
  mono: "p",
  monoSmall: "p",
};
