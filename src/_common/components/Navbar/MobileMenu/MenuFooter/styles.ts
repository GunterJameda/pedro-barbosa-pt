import { fontMono } from "@/_common/theme";

export const socialLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  color: "text.secondary",
  fontFamily: fontMono,
  fontSize: 12,
  transition: "color 150ms",
  "&:hover": { color: "primary.light" },
};
