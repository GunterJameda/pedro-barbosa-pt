/**
 * Design colors that the MUI palette doesn't cover.
 * Kept out of theme.ts (a client module) so server components can import them too.
 */
export const surfaces = {
  navbar: "rgba(12, 20, 33, 0.8)",
  card: "#141c29",
  hairline: "rgba(255, 255, 255, 0.05)",
  white2: "rgba(255, 255, 255, 0.02)",
  white3: "rgba(255, 255, 255, 0.03)",
  white4: "rgba(255, 255, 255, 0.04)",
  white6: "rgba(255, 255, 255, 0.06)",
  white8: "rgba(255, 255, 255, 0.08)",
  white10: "rgba(255, 255, 255, 0.1)",
  white20: "rgba(255, 255, 255, 0.2)",
  teal10: "rgba(20, 184, 166, 0.1)",
  teal20: "rgba(20, 184, 166, 0.2)",
  teal30: "rgba(20, 184, 166, 0.3)",
  teal400Muted: "rgba(45, 212, 191, 0.8)",
};

export const slate = {
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  600: "#475569",
};

export const teal = {
  200: "#99f6e4",
};

export const fontMono = "var(--font-geist-mono), monospace";

export const monoNote = {
  color: "text.secondary",
  fontFamily: fontMono,
  fontSize: 12,
};
