import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALE_PREFIXES, LOCALES } from "./locales";

/**
 * How addresses map to languages, for next-intl's links and pathnames. The
 * default language has no prefix (/about) and the others do (/pt/about). The
 * address alone decides the language: next.config.ts maps each address to its
 * page, and nothing detects the browser's language or sets a cookie, so every
 * page is the same for every visitor and stays static.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: { mode: "as-needed", prefixes: LOCALE_PREFIXES },
});
