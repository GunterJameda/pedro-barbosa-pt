import { TIME_ZONE } from "@/_common/i18n";

/**
 * "2021-05" becomes "May 2021" in English and "mai. 2021" in Portuguese: the
 * short month name and the year, in a language. Some languages (Portugal's
 * Portuguese) write a short date with the month as a number ("05/2021"), so
 * when that happens the month's own short name is used instead.
 */
export function formatMonth(month: string, locale: string) {
  const date = new Date(`${month}-01T00:00:00Z`);
  const options = { timeZone: TIME_ZONE } as const;
  const parts = new Intl.DateTimeFormat(locale, {
    ...options,
    month: "short",
    year: "numeric",
  }).formatToParts(date);

  const monthPart = parts.find(({ type }) => type === "month")?.value ?? "";
  if (!/^\d+$/.test(monthPart)) {
    return parts.map(({ value }) => value).join("");
  }

  const name = new Intl.DateTimeFormat(locale, { ...options, month: "short" }).format(date);
  const year = new Intl.DateTimeFormat(locale, { ...options, year: "numeric" }).format(date);
  return `${name} ${year}`;
}
