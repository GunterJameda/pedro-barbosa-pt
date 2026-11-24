import { fontMono, linkHover } from "@/_common/theme";

export const socialLinkStyles = {
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    color: "text.secondary",
    fontSize: "inherit",
    ...linkHover,
  },
  menu: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.5,
    color: "text.secondary",
    fontFamily: fontMono,
    fontSize: 12,
    ...linkHover,
  },
};
