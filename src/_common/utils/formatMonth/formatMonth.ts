import { TIME_ZONE } from "@/_common/i18n";

/** "2021-05" becomes "May 2021" in English: the short month name and the year, in a language. */
export function formatMonth(month: string, locale: string) {
  return new Date(`${month}-01T00:00:00Z`).toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  });
}
