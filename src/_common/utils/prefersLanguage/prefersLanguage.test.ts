import { describe, expect, it } from "vitest";
import { prefersLanguage } from "./prefersLanguage";

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
