import { SITE_ALTERNATE_NAME, SITE_NAME, SITE_URL } from "@/_common/constants";
import type { WebsiteFacts } from "./types";

export const WEBSITE: WebsiteFacts = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  url: SITE_URL,
};
