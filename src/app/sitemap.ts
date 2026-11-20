import type { MetadataRoute } from "next";
import { PAGES } from "@/_common/constants";
import { DEFAULT_LOCALE, LOCALES } from "@/_common/i18n";
import { languageAlternates } from "@/_common/utils/languageAlternates";
import { pageUrl } from "@/_common/utils/pageUrl";

// Every page in every language, each listing its versions in the other languages.
export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PAGES.map(({ href }) => ({
      url: pageUrl(locale, href),
      alternates: {
        languages: languageAlternates(href, {
          locales: LOCALES,
          defaultLocale: DEFAULT_LOCALE,
          pathFor: pageUrl,
        }),
      },
    })),
  );
}
