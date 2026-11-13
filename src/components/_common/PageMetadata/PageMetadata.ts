import type { Metadata } from "next";

import { PAGES } from "@/constants";

/**
 * A page's title and canonical address, taken from its entry in PAGES. Without
 * a description, the page keeps the site-wide one.
 */
export function pageMetadata(path: string, description?: string): Metadata {
  const page = PAGES.find(({ href }) => href === path);
  // Fails the build, so a page can't ship with another page's address.
  if (!page) throw new Error(`No page at "${path}" in PAGES.`);

  return {
    alternates: { canonical: page.href },
    // Home keeps the site-wide title, which already names me and my role.
    ...(page.href !== "/" && { title: page.name }),
    ...(description && { description }),
  };
}
