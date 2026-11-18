import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/_common/constants";
import type { Locale } from "@/_common/i18n";
import { DEFAULT_LOCALE, LOCALES } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";
import { languageAlternates } from "@/_common/utils/languageAlternates";

// Every page in every language, each listing its versions in the other languages.
export default function sitemap(): MetadataRoute.Sitemap {
  const urlFor = (locale: Locale, href: string) => `${SITE_URL}${getPathname({ locale, href })}`;
  return LOCALES.flatMap((locale) =>
    PAGES.map(({ href }) => ({
      url: urlFor(locale, href),
      alternates: {
        languages: languageAlternates(href, {
          locales: LOCALES,
          defaultLocale: DEFAULT_LOCALE,
          pathFor: urlFor,
        }),
      },
    })),
  );
}
