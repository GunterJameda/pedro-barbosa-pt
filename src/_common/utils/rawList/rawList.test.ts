import { describe, expect, it } from "vitest";
import { rawList } from "./rawList";

describe("rawList", () => {
  it("returns the list as it is", () => {
    const list = ["a", "b"];
    expect(rawList(list)).toBe(list);
    expect(rawList([])).toEqual([]);
  });

  it.each([["text"], [undefined], [null], [{ 0: "a" }], [3]])(
    "fails loudly for %j, which isn't a list",
    (message) => {
      expect(() => rawList(message)).toThrow("Expected a list message");
    },
  );
});
