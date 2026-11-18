import { afterEach, describe, expect, it, vi } from "vitest";
import { readLanguageChoice } from "@/_common/utils/readLanguageChoice";
import { saveLanguageChoice } from "./saveLanguageChoice";

afterEach(() => {
  document.cookie = "NEXT_LOCALE=; Path=/; Max-Age=0";
  vi.restoreAllMocks();
});

describe("saveLanguageChoice", () => {
  it("saves the choice where it can be read back", () => {
    saveLanguageChoice("pt-PT");
    expect(readLanguageChoice(document.cookie)).toBe("pt-PT");
  });

  it("replaces an earlier choice", () => {
    saveLanguageChoice("pt-PT");
    saveLanguageChoice("en");
    expect(readLanguageChoice(document.cookie)).toBe("en");
  });

  it("sets a year-long, site-wide, same-site cookie", () => {
    const set = vi.spyOn(document, "cookie", "set");
    saveLanguageChoice("dismissed");
    expect(set).toHaveBeenCalledWith(
      "NEXT_LOCALE=dismissed; Path=/; Max-Age=31536000; SameSite=Lax",
    );
  });
});
