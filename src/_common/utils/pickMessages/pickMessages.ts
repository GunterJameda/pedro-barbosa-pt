/**
 * Keeps only the messages under the given namespaces ("common.NavLinks"),
 * with the same nesting. A namespace the messages don't have is skipped.
 */
export function pickMessages(messages: object, namespaces: readonly string[]): object {
  const picked: Record<string, unknown> = {};
  for (const namespace of namespaces) {
    const path = namespace.split(".");
    let source: unknown = messages;
    for (const key of path) {
      source =
        typeof source === "object" && source !== null
          ? (source as Record<string, unknown>)[key]
          : undefined;
    }
    if (source === undefined) continue;

    let target = picked;
    for (const key of path.slice(0, -1)) {
      target = (target[key] ??= {}) as Record<string, unknown>;
    }
    target[path.at(-1) as string] = source;
  }
  return picked;
}
