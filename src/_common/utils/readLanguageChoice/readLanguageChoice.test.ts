import { describe, expect, it } from "vitest";
import { readLanguageChoice } from "./readLanguageChoice";

describe("readLanguageChoice", () => {
  it("reads the saved language", () => {
    expect(readLanguageChoice("NEXT_LOCALE=pt-PT")).toBe("pt-PT");
  });

  it("finds it among other cookies, however they're spaced", () => {
    expect(readLanguageChoice("a=1; NEXT_LOCALE=en;b=2")).toBe("en");
  });

  it.each(["", "a=1; b=2", "NEXT_LOCALE", "NEXT_LOCALE=", "OTHER_NEXT_LOCALE=en"])(
    "finds nothing in %j",
    (cookies) => {
      expect(readLanguageChoice(cookies)).toBeUndefined();
    },
  );

  it("ignores a value that can't be decoded", () => {
    expect(readLanguageChoice("NEXT_LOCALE=%E0%A4%A")).toBeUndefined();
  });
});
