import { fontMono } from "@/_common/theme";

/** The shared look of EN and PT: a small mono label with room to click. */
export const languageOption = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // Big enough to hit easily, wherever it is.
  minWidth: 24,
  minHeight: 24,
  fontFamily: fontMono,
  fontSize: 12,
  lineHeight: "16px",
};
