import type { Locale } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";
import { switchPathname } from "@/_common/utils/switchPathname";

/**
 * Where a language link goes: the current page in that language, or the home
 * page in it when the current address isn't one of the site's pages (a 404).
 */
export function languageHref(locale: Locale, pathname: string) {
  return getPathname({ locale, href: switchPathname(pathname) });
}
