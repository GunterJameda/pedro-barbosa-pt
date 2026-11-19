import { SITE_URL } from "@/_common/constants";
import type { Locale } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";

/** The full address of the home page in a language: the site root, or the root plus the language's prefix. */
export function homePageUrl(locale: Locale): string {
  const path = getPathname({ locale, href: "/" });
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
