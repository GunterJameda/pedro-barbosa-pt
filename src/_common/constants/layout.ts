/** Id of each page's main content, which the skip link jumps to. */
export const MAIN_ID = "main";

/** Id of the skip link, so focus can return to the top of the page. */
export const SKIP_LINK_ID = "skip-link";

/** Widest the Navbar, page content and Footer get, in px. */
export const CONTENT_MAX_WIDTH = 1280;

/** The sticky Navbar's height in px: shorter on phones and tablets. */
export const NAVBAR_HEIGHT = { xs: 64, lg: 80 } as const;

/**
 * Space kept above a section jumped to (e.g. from Fast Navigation), so it lands
 * clear of the sticky Navbar. Uses the tallest Navbar, at every screen size.
 */
export const SCROLL_OFFSET = NAVBAR_HEIGHT.lg + 16;
