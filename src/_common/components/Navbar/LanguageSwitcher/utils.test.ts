import { describe, expect, it } from "vitest";
import { languageCode } from "./utils";

describe("languageCode", () => {
  it.each([
    ["en", "EN"],
    ["pt-PT", "PT"],
    ["zh-Hant-TW", "ZH"],
  ])("shortens %s to %s", (locale, code) => {
    expect(languageCode(locale)).toBe(code);
  });
});
