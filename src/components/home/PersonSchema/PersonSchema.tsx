import { PERSON } from "./config";

/** Tells search engines who the site is about (JSON-LD). */
export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      // Escapes "<" so the JSON can't close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(PERSON).replace(/</g, "\\u003c"),
      }}
    />
  );
}
