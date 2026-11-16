import { UNSAFE_JSON_LD_CHARS } from "./constants";

/**
 * Turns data into JSON that is safe to place inside a script tag. Throws when
 * the data has no JSON form (a function, or a toJSON that returns undefined),
 * so the build fails instead of the page shipping an empty script.
 */
export function serializeJsonLd(data: object): string {
  // JSON.stringify's types promise a string, but it returns undefined for these.
  const json = JSON.stringify(data) as string | undefined;
  if (json === undefined) {
    throw new TypeError("JSON-LD data has no JSON form.");
  }
  return json.replace(
    UNSAFE_JSON_LD_CHARS,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}
