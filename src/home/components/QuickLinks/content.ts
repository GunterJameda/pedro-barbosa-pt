import type { QuickLink } from "./types";

/** Each link is named after its page. */
export const LINKS: QuickLink[] = [
  { page: "about", href: "/about", primary: false },
  { page: "experience", href: "/experience", primary: false },
  { page: "projects", href: "/projects", primary: false },
  { page: "contact", href: "/contact", primary: true },
];
