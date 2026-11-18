import { describe, expect, it } from "vitest";
import { shouldSuggest } from "./utils";

const visitor = {
  locale: "en",
  defaultLocale: "en",
  suggested: "pt-PT",
  languages: ["pt-PT", "en"],
  cookies: "",
};

describe("shouldSuggest", () => {
  it("suggests to a Portuguese browser on an English page with no saved choice", () => {
    expect(shouldSuggest(visitor)).toBe(true);
  });

  it("counts any Portuguese, like pt-BR, even when it isn't the first language", () => {
    expect(shouldSuggest({ ...visitor, languages: ["en-GB", "pt-BR"] })).toBe(true);
  });

  it.each([[["en-GB", "en"]], [["es", "fr"]], [[]]])(
    "doesn't suggest to a browser with languages %j",
    (languages) => {
      expect(shouldSuggest({ ...visitor, languages })).toBe(false);
    },
  );

  it.each(["pt-PT", "en", "dismissed"])("doesn't suggest after the choice %j", (choice) => {
    expect(shouldSuggest({ ...visitor, cookies: `a=1; NEXT_LOCALE=${choice}` })).toBe(false);
  });

  it("isn't put off by unrelated cookies", () => {
    expect(shouldSuggest({ ...visitor, cookies: "a=1; b=2" })).toBe(true);
  });

  it("doesn't suggest on a page that is already in the suggested language", () => {
    expect(shouldSuggest({ ...visitor, locale: "pt-PT" })).toBe(false);
  });
});
