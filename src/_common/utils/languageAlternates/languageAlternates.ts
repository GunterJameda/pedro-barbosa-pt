/**
 * Where a page lives in each language, keyed by language code, plus
 * "x-default": the address for visitors whose language isn't listed, which is
 * the default language's. Search engines read it to show each visitor their
 * language. A language appears here as soon as it's enabled.
 */
export function languageAlternates<Locale extends string>(
  href: string,
  {
    locales,
    defaultLocale,
    pathFor,
  }: {
    locales: readonly Locale[];
    defaultLocale: Locale;
    /** The page's address in a language. */
    pathFor: (locale: Locale, href: string) => string;
  },
): Record<Locale | "x-default", string> {
  const languages = Object.fromEntries(locales.map((locale) => [locale, pathFor(locale, href)]));
  return { ...languages, "x-default": pathFor(defaultLocale, href) } as Record<
    Locale | "x-default",
    string
  >;
}
