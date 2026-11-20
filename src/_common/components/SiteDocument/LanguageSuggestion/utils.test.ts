import { describe, expect, it } from "vitest";
import { prefersLanguage, readLanguageChoice, shouldSuggest } from "./utils";

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

describe("prefersLanguage", () => {
  it.each([["pt"], ["pt-PT"], ["pt-BR"], ["PT-pt"]])("counts %s as Portuguese", (language) => {
    expect(prefersLanguage([language], "pt-PT")).toBe(true);
  });

  it("finds Portuguese anywhere in the list, not only first", () => {
    expect(prefersLanguage(["en-GB", "en", "pt-BR"], "pt-PT")).toBe(true);
  });

  it.each([[[]], [["en"]], [["es-ES", "fr"]], [["ptolemaic"]], [[""]]])(
    "doesn't count %j",
    (languages) => {
      expect(prefersLanguage(languages, "pt-PT")).toBe(false);
    },
  );
});

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
