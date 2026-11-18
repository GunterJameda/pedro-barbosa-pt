import type { IntlError } from "next-intl";
import { DEFAULT_LOCALE, TIME_ZONE } from "@/_common/i18n";
import english from "@/_common/i18n/en.json";

/** The default language's messages, for tests that compare against the copy. */
export const messages = english;

/** Fails the test on any message problem, like a key missing from the messages. */
export function failOnMessageError(error: IntlError): never {
  throw error;
}

/** The language, messages and settings components get in tests: the default language's. */
export const INTL = {
  locale: DEFAULT_LOCALE,
  messages,
  timeZone: TIME_ZONE,
  onError: failOnMessageError,
};
