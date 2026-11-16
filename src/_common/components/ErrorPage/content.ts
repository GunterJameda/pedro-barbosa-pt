import { NAME } from "@/_common/constants";

export const LABEL = "Something broke";
export const TITLE = "Something failed to render.";
export const TEXT =
  "An unexpected error stopped this page from loading. Try again, or let me take you back home.";
export const RETRY_LABEL = "Try again";
export const HOME_LABEL = "Go to Home";

/**
 * The browser tab title. Error pages are client components, which can't export
 * metadata, so the page renders its own title, following the site's pattern.
 */
export const TAB_TITLE = `Something went wrong | ${NAME}`;
