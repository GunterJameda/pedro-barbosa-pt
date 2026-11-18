import type { Locale } from "./types";

/**
 * The languages the site is shown in, the first one being the default. To add
 * one, add its message file next to en.json (named after the locale, like
 * pt-PT.json), then list it here and in OPEN_GRAPH_LOCALES, and in
 * LOCALE_PREFIXES if its address prefix differs from the locale.
 */
export const LOCALES = ["en", "pt-PT"] as const;

/** Shown at the site's addresses without a prefix: /about, not /en/about. */
export const DEFAULT_LOCALE: Locale = "en";

/** The address prefix of a language whose prefix isn't its locale, e.g. { "pt-PT": "/pt" }. */
export const LOCALE_PREFIXES: Partial<Record<Locale, `/${string}`>> = {
  "pt-PT": "/pt",
};

/** How link previews name each language (og:locale), in the language_TERRITORY form. */
export const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  "pt-PT": "pt_PT",
};

/**
 * Dates are calendar months with no time of day, so they're read in UTC on the
 * server and in the browser alike.
 */
export const TIME_ZONE = "UTC";

/**
 * The cookie that remembers a visitor's language choice: a first-party,
 * functional preference, sent back to the site so next.config.ts can redirect
 * (see localeRoutes). Its value is a locale, or LANGUAGE_DISMISSED after the
 * visitor closed the suggestion without choosing.
 */
export const LANGUAGE_COOKIE = "NEXT_LOCALE";

/** The cookie's value once the visitor closed the language suggestion. */
export const LANGUAGE_DISMISSED = "dismissed";

/** How long the choice is remembered: a year, in seconds. */
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
