import { WEBSITE } from "./config";

/** Tells search engines the site's name, shown above its results (JSON-LD). */
export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      // Escapes "<" so the JSON can't close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(WEBSITE).replace(/</g, "\\u003c"),
      }}
    />
  );
}
