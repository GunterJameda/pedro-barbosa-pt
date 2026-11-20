import { PAGES } from "@/_common/constants";

/** The short form shown for a language: "en" is EN, and "pt-PT" is PT. */
export function languageCode(locale: string) {
  return (locale.split("-")[0] ?? locale).toUpperCase();
}

/**
 * The address a language link goes to: the same page, or the home page when
 * the current address isn't one of the site's pages (a 404), so a link never
 * leads from one 404 to another.
 */
export function switchPathname(pathname: string) {
  return PAGES.some(({ href }) => href === pathname) ? pathname : "/";
}
