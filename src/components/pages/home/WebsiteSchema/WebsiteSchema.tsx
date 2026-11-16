import { JsonLd } from "@/components/_common/JsonLd";
import { WEBSITE } from "./content";

/** Tells search engines the site's name, shown above its results (JSON-LD). */
export function WebsiteSchema() {
  return <JsonLd data={WEBSITE} />;
}
