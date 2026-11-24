import { describe, expect, it } from "vitest";
import { LOCALES } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";
import { languageHref } from "./languageHref";

describe("languageHref", () => {
  it.each(LOCALES)("keeps the page, in %s", (locale) => {
    expect(languageHref(locale, "/about")).toBe(getPathname({ locale, href: "/about" }));
  });

  it.each(LOCALES)("sends an address that isn't a page to the home page, in %s", (locale) => {
    expect(languageHref(locale, "/nope")).toBe(getPathname({ locale, href: "/" }));
  });
});
