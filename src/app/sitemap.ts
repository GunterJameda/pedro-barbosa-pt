import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ href }) => ({ url: `${SITE_URL}${href}` }));
}
