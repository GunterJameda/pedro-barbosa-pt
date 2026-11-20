import { fontMono, linkHover } from "@/_common/theme";

export const socialLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  color: "text.secondary",
  fontFamily: fontMono,
  fontSize: 12,
  ...linkHover,
};
