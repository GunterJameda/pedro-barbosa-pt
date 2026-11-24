/**
 * A list message (the result of `t.raw(...)`), typed. A message that isn't a
 * list fails loudly here, instead of breaking a page somewhere further on.
 */
export function rawList<T = string>(message: unknown) {
  if (!Array.isArray(message)) {
    throw new TypeError(`Expected a list message, got ${JSON.stringify(message)}`);
  }
  return message as T[];
}
