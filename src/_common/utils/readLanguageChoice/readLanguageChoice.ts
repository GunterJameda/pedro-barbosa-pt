import { LANGUAGE_COOKIE } from "@/_common/i18n";

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
