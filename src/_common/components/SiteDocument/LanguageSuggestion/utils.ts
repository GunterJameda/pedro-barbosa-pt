import { LANGUAGE_COOKIE } from "@/_common/i18n";

/**
 * Whether to offer the suggested language: only on a page in the default
 * language, to a browser that prefers the suggested one, and only until the
 * visitor has made any choice (the cookie holds a language or a dismissal).
 */
export function shouldSuggest({
  locale,
  defaultLocale,
  suggested,
  languages,
  cookies,
}: {
  locale: string;
  defaultLocale: string;
  suggested: string;
  /** The browser's languages, navigator.languages. */
  languages: readonly string[];
  /** The browser's cookies, document.cookie. */
  cookies: string;
}) {
  return (
    locale === defaultLocale &&
    locale !== suggested &&
    prefersLanguage(languages, suggested) &&
    readLanguageChoice(cookies) === undefined
  );
}

/**
 * Whether any of the browser's languages (navigator.languages, like
 * ["en-GB", "pt-BR"]) is in the given language's family: "pt-BR" counts for
 * "pt-PT", since they share the language, while "ptolemaic" or "en" don't.
 */
export function prefersLanguage(languages: readonly string[], locale: string): boolean {
  const family = (tag: string) => (tag.split("-")[0] ?? "").toLowerCase();
  return languages.some((language) => family(language) === family(locale));
}

/**
 * The value in the language cookie (a locale, or the dismissed marker), from a
 * cookie string like document.cookie's, or undefined when there is none.
 */
export function readLanguageChoice(cookies: string): string | undefined {
  for (const cookie of cookies.split(";")) {
    const separator = cookie.indexOf("=");
    if (separator === -1) continue;
    if (cookie.slice(0, separator).trim() !== LANGUAGE_COOKIE) continue;
    const value = cookie.slice(separator + 1).trim();
    try {
      return decodeURIComponent(value) || undefined;
    } catch {
      return undefined;
    }
  }
  return undefined;
}
