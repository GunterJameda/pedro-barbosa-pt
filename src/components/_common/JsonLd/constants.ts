/**
 * Characters escaped in JSON-LD output:
 * "<" so a value can't close the script tag ("</script>") or open an HTML comment ("<!--"),
 * and the line and paragraph separators, which older JavaScript parsers reject in strings.
 */
export const UNSAFE_JSON_LD_CHARS = /[<\u2028\u2029]/g;
