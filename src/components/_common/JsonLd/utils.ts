import { UNSAFE_JSON_LD_CHARS } from "./constants";

/** Turns data into JSON that is safe to place inside a script tag. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(
    UNSAFE_JSON_LD_CHARS,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}
