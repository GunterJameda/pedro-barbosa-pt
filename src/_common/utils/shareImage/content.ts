import { SITE_URL } from "@/_common/constants";

/** The site's address as the image shows it, before the page's path. */
export const DOMAIN = new URL(SITE_URL).host;
