import type { CSSProperties } from "react";

// Plain inline styles, so the page needs nothing that loads with the layout.

/**
 * The site's colours, repeated from src/_common/theme/tokens.ts on purpose: this page
 * shows when the root layout fails, so it can't count on the theme loading.
 */
const COLORS = {
  background: "#0c1421",
  title: "#f1f5f9",
  text: "#cbd5e1",
  accent: "#2dd4bf",
  secondaryBackground: "rgba(255, 255, 255, 0.04)",
  secondaryBorder: "rgba(255, 255, 255, 0.1)",
};

/** System fonts, since the site's own fonts load with the layout. */
const FONTS = {
  sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
};

export const htmlStyles: CSSProperties = {
  backgroundColor: COLORS.background,
  colorScheme: "dark",
};

export const bodyStyles: CSSProperties = {
  margin: 0,
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 24px",
  boxSizing: "border-box",
  fontFamily: FONTS.sans,
  textAlign: "center",
};

export const mainStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const labelStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: "0 0 48px",
  color: COLORS.accent,
  fontFamily: FONTS.mono,
  fontSize: 12,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

export const dotStyles: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: COLORS.accent,
};

export const titleStyles: CSSProperties = {
  maxWidth: 768,
  margin: 0,
  color: COLORS.title,
  fontSize: "clamp(36px, 7vw, 60px)",
  fontWeight: 700,
  lineHeight: 1.25,
  letterSpacing: "-0.025em",
};

export const textStyles: CSSProperties = {
  maxWidth: 672,
  margin: "24px 0 0",
  color: COLORS.text,
  fontSize: 18,
  lineHeight: 1.625,
};

export const actionsStyles: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 8,
  marginTop: 40,
};

const buttonStyles: CSSProperties = {
  padding: "8px 24px",
  border: "1px solid",
  borderRadius: 999,
  fontFamily: "inherit",
  fontSize: 12,
  lineHeight: "16px",
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
};

export const primaryButtonStyles: CSSProperties = {
  ...buttonStyles,
  color: COLORS.background,
  backgroundColor: COLORS.accent,
  borderColor: "transparent",
  fontWeight: 600,
};

export const secondaryButtonStyles: CSSProperties = {
  ...buttonStyles,
  color: COLORS.text,
  backgroundColor: COLORS.secondaryBackground,
  borderColor: COLORS.secondaryBorder,
  fontWeight: 500,
};
