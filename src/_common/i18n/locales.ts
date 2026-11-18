import type { Locale } from "./types";

/**
 * The languages the site is shown in, the first one being the default. To add
 * one, add its message file next to en.json (named after the locale, like
 * pt-PT.json), then list it here and in OPEN_GRAPH_LOCALES, and in
 * LOCALE_PREFIXES if its address prefix differs from the locale.
 */
export const LOCALES = ["en"] as const;

/** Shown at the site's addresses without a prefix: /about, not /en/about. */
export const DEFAULT_LOCALE: Locale = "en";

/** The address prefix of a language whose prefix isn't its locale, e.g. { "pt-PT": "/pt" }. */
export const LOCALE_PREFIXES: Partial<Record<Locale, `/${string}`>> = {};

/** How link previews name each language (og:locale), in the language_TERRITORY form. */
export const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  en: "en_GB",
};

/**
 * Dates are calendar months with no time of day, so they're read in UTC on the
 * server and in the browser alike.
 */
export const TIME_ZONE = "UTC";
