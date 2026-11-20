import { SITE_URL } from "@/_common/constants";
import type { Locale } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";

/**
 * A page's full address in a language: the site's address plus the page's
 * public path. Home has no trailing slash ("https://pedrobarbosa.pt", or
 * "https://pedrobarbosa.pt/pt"), the same form the sitemap, the structured
 * data and the share images use.
 */
export function pageUrl(locale: Locale, href: string) {
  const pathname = getPathname({ locale, href });
  return `${SITE_URL}${pathname === "/" ? "" : pathname}`;
}
