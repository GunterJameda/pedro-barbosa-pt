import type { PageLink } from "./types";

/** Every page of the site, in navigation order. The "pages" messages name each one by key. */
export const PAGES: PageLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "experience", href: "/experience" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
];
