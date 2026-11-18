import { LANGUAGE_COOKIE, LANGUAGE_COOKIE_MAX_AGE } from "@/_common/i18n";

/**
 * Remembers the visitor's language choice (a locale, or the dismissed marker)
 * for a year, in a first-party cookie for the whole site. Call it before
 * navigating, so the saved choice never fights the click.
 */
export function saveLanguageChoice(value: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${LANGUAGE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}
