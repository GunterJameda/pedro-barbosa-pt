import { JsonLd } from "@/_common/components/JsonLd";
import { PROFILE_PAGE } from "./content";

/** Tells search engines this page is the profile of the person the site is about (JSON-LD). */
export function PersonSchema() {
  return <JsonLd data={PROFILE_PAGE} />;
}
