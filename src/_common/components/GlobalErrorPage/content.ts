import { NAME } from "@/_common/constants";

// The only copy outside the message files. This page shows when the root
// layout fails, and the layout is what provides the language and messages
// (next-intl's provider), so it can't count on them. It stays in English, the
// default language, and needs nothing that loads with the layout.

export const LABEL = "Error";
export const TITLE = "The site failed to load.";
export const TEXT =
  "An unexpected error stopped the whole site from loading. Try again, or let me start you over from Home.";
export const RETRY_LABEL = "Try again";
export const HOME_LABEL = "Go to Home";

/** The browser tab title; this page replaces the root layout and its metadata. */
export const TAB_TITLE = `Something went wrong | ${NAME}`;
