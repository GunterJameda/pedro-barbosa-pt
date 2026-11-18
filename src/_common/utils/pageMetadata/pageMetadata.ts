import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PAGES } from "@/_common/constants";
import { DEFAULT_LOCALE, LOCALES } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";
import { languageAlternates } from "@/_common/utils/languageAlternates";
import { socialMetadata } from "@/_common/utils/socialMetadata";

/**
 * A page's title, canonical address, addresses in the other languages and link
 * preview, taken from its entry in PAGES, in the current language. Without a
 * description, the page keeps the site-wide one.
 */
export async function pageMetadata(path: string, description?: string): Promise<Metadata> {
  const page = PAGES.find(({ href }) => href === path);
  // Fails the build, so a page can't ship with another page's address.
  if (!page) throw new Error(`No page at "${path}" in PAGES.`);

  const locale = await getLocale();
  const t = await getTranslations("pages");
  const isHome = page.href === "/";

  return {
    alternates: {
      canonical: getPathname({ locale, href: page.href }),
      languages: languageAlternates(page.href, {
        locales: LOCALES,
        defaultLocale: DEFAULT_LOCALE,
        pathFor: (language, href) => getPathname({ locale: language, href }),
      }),
    },
    // Home keeps the site-wide title, which already names me and my role.
    ...(!isHome && { title: t(page.key) }),
    ...(description && { description }),
    // Home shows the site-wide preview image.
    ...(await socialMetadata(isHome ? undefined : page.href)),
  };
}
