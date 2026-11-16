import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/_common/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ href }) => ({ url: `${SITE_URL}${href}` }));
}
