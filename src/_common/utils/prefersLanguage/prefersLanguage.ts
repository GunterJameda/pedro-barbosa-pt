/**
 * Whether any of the browser's languages (navigator.languages, like
 * ["en-GB", "pt-BR"]) is in the given language's family: "pt-BR" counts for
 * "pt-PT", since they share the language, while "ptolemaic" or "en" don't.
 */
export function prefersLanguage(languages: readonly string[], locale: string): boolean {
  const family = (tag: string) => (tag.split("-")[0] ?? "").toLowerCase();
  return languages.some((language) => family(language) === family(locale));
}
