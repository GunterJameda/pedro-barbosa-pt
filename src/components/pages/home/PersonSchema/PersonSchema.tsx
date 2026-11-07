import { PROFILE_PAGE } from "./config";

/** Tells search engines this page is the profile of the person the site is about (JSON-LD). */
export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      // Escapes "<" so the JSON can't close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(PROFILE_PAGE).replace(/</g, "\\u003c"),
      }}
    />
  );
}
