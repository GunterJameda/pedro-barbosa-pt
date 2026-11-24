/**
 * The messages the browser needs: every namespace a client component (a
 * "use client" file or anything it imports) reads. SiteDocument sends only
 * these, so a page doesn't carry text only the server uses. A client component
 * that reads a namespace missing here fails tests/clientMessages.test.ts.
 */
export const CLIENT_NAMESPACES = [
  "pages",
  "profile",
  "common.AvailabilityCard",
  "common.ErrorPage",
  "common.LanguageSuggestion",
  "common.LanguageSwitcher",
  "common.MobileMenu",
  "common.NavLinks",
  "common.ScrollToTop",
  "common.SkipLink",
  "common.StatusChip",
  "contact.CopyEmailButton",
  "contact.CopyStatusMessage",
  "contact.EmailCard",
  "experience.CareerChart",
] as const;
