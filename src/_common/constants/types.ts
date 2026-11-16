import type SvgIcon from "@mui/material/SvgIcon";

export interface PageLink {
  name: string;
  href: string;
}

export type Availability = "immediate" | "open" | "not-looking";

export type WorkMode = "remote-and-hybrid" | "remote-only";

export interface SocialLink {
  name: string;
  href: string;
  Icon: typeof SvgIcon;
}
