import { prefersLanguage } from "@/_common/utils/prefersLanguage";
import { readLanguageChoice } from "@/_common/utils/readLanguageChoice";

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
