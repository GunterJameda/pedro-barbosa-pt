import { describe, expect, it } from "vitest";
import { languageCode, switchPathname } from "./utils";

describe("languageCode", () => {
  it.each([
    ["en", "EN"],
    ["pt-PT", "PT"],
    ["zh-Hant-TW", "ZH"],
  ])("shortens %s to %s", (locale, code) => {
    expect(languageCode(locale)).toBe(code);
  });
});

describe("switchPathname", () => {
  it.each(["/", "/about", "/experience", "/projects", "/contact"])(
    "keeps the page %s",
    (pathname) => {
      expect(switchPathname(pathname)).toBe(pathname);
    },
  );

  it.each(["/_not-found", "/nope", "/experience/nope", "/About", "/about/"])(
    "sends %s, which isn't a page, to the home page",
    (pathname) => {
      expect(switchPathname(pathname)).toBe("/");
    },
  );
});
