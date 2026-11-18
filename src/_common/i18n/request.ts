import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, TIME_ZONE } from "./locales";
import { routing } from "./routing";

/**
 * The language and messages for a render, which next-intl reads through the
 * plugin in next.config.ts. Pages and layouts take the language from the
 * address ([locale]), so they stay static; share images pass it themselves.
 * The 404 page for unknown addresses has neither, so it's in the default language.
 */
export default getRequestConfig(async ({ locale }) => {
  const requested = locale ?? (await rootParams.locale()) ?? DEFAULT_LOCALE;
  if (!hasLocale(routing.locales, requested)) notFound();

  return {
    locale: requested,
    timeZone: TIME_ZONE,
    messages: (await import(`./${requested}.json`)).default,
  };
});
