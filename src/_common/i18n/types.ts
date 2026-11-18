import type messages from "./en.json";
import type { LOCALES } from "./locales";

/** A language the site is shown in, like "en". */
export type Locale = (typeof LOCALES)[number];

/** Every message, as English has them; the other languages have the same keys. */
export type Messages = typeof messages;

// Types next-intl's functions, so a message key that doesn't exist fails the type check.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
  }
}
