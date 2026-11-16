import { JsonLd } from "@/_common/components/JsonLd";
import { WEBSITE } from "./content";

/** Tells search engines the site's name, shown above its results (JSON-LD). */
export function WebsiteSchema() {
  return <JsonLd data={WEBSITE} />;
}
