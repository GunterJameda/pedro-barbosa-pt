import { alpha } from "@mui/material/styles";

/**
 * Every colour of the site is defined here, once. The MUI palette, the text
 * styles and the share image are all built from these values.
 *
 * Kept out of theme.ts (a client module) so server code can import them too.
 *
 * How components pick a colour:
 * 1. A palette key ("primary.main", "text.secondary", "background.default",
 *    "common.white") when the colour is in the palette and the value goes
 *    straight into sx.
 * 2. These tokens for everything else: colours the palette doesn't have,
 *    values inside strings (`1px solid ${surfaces.hairline}`), SVG
 *    attributes and the share image.
 *
 * Exception: src/app/icon.svg is a static file and repeats a few values.
 */

export const white = "#fff";

export const slate = {
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
};

export const teal = {
  200: "#99f6e4",
  300: "#5eead4",
  400: "#2dd4bf",
  500: "#14b8a6",
};

const background = "#0c1421";

export const surfaces = {
  background,
  navbar: alpha(background, 0.8),
  card: "#141c29",
  hairline: alpha(white, 0.05),
  white2: alpha(white, 0.02),
  white4: alpha(white, 0.04),
  white8: alpha(white, 0.08),
  white10: alpha(white, 0.1),
  teal10: alpha(teal[500], 0.1),
  teal20: alpha(teal[500], 0.2),
  teal30: alpha(teal[500], 0.3),
  teal400Muted: alpha(teal[400], 0.8),
};

export const fontMono = 'var(--font-mono), "Fira Code", monospace';
