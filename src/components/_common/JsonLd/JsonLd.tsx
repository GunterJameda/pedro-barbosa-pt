import { serializeJsonLd } from "./utils";

export interface JsonLdProps {
  /** The schema.org data to describe the page with. */
  data: object;
}

/** Gives search engines structured data about the page (JSON-LD). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
