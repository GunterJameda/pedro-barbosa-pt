import type SvgIcon from "@mui/material/SvgIcon";

/** A page's key, which names it in the "pages" messages. */
export type PageKey = "home" | "about" | "experience" | "projects" | "contact";

export interface PageLink {
  key: PageKey;
  /** The page's address in the default language. */
  href: string;
}

export type Availability = "immediate" | "open" | "not-looking";

export type WorkMode = "remote-and-hybrid" | "remote-only";

export interface SocialLink {
  name: string;
  href: string;
  Icon: typeof SvgIcon;
}
