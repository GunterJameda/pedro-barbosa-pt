import { SITE_ALTERNATE_NAME, SITE_NAME, SITE_URL } from "@/constants";
import type { WebsiteData } from "./types";

export const WEBSITE: WebsiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  url: SITE_URL,
};
