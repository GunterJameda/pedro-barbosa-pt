import type { PageLink } from "./types";

/** Every page of the site, in navigation order. */
export const PAGES: PageLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Personal Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];
