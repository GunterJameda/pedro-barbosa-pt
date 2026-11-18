/** The short form shown for a language: "en" is EN, and "pt-PT" is PT. */
export function languageCode(locale: string) {
  return (locale.split("-")[0] ?? locale).toUpperCase();
}
