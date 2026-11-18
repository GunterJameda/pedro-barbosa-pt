import { useLocale } from "next-intl";
import { JsonLd } from "@/_common/components/JsonLd";
import { WEBSITE } from "./content";
import type { WebsiteData } from "./types";

/** Tells search engines the site's name, shown above its results (JSON-LD). */
export function WebsiteSchema() {
  const website: WebsiteData = { ...WEBSITE, inLanguage: useLocale() };
  return <JsonLd data={website} />;
}
