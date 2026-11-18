// @vitest-environment node
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { describe, expect, it } from "vitest";
import type { Locale } from "@/_common/i18n";
import { DEFAULT_LOCALE, LOCALES } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";
import { languageAlternates } from "./languageAlternates";

/** The real addresses for a set of languages, built the way the site's routing builds them. */
function siteWith(locales: readonly string[], prefixes: Record<string, `/${string}`> = {}) {
  const navigation = createNavigation(
    defineRouting({
      locales,
      defaultLocale: "en",
      localePrefix: { mode: "as-needed", prefixes },
    }),
  );
  return {
    locales,
    defaultLocale: "en",
    // next-intl types a locale as one the site has enabled, which these may not be yet.
    pathFor: (locale: string, href: string) =>
      navigation.getPathname({ locale: locale as Locale, href }),
  };
}

describe("languageAlternates", () => {
  it("lists English, and English as the default, while it's the site's only language", () => {
    const pathFor = (locale: Locale, href: string) => getPathname({ locale, href });
    expect(
      languageAlternates("/about", { locales: LOCALES, defaultLocale: DEFAULT_LOCALE, pathFor }),
    ).toEqual({ en: "/about", "x-default": "/about" });
  });

  it("adds a language as soon as it's enabled, under its own prefix", () => {
    expect(languageAlternates("/about", siteWith(["en", "pt-PT"], { "pt-PT": "/pt" }))).toEqual({
      en: "/about",
      "pt-PT": "/pt/about",
      "x-default": "/about",
    });
  });

  it("gives the home page each language's root address", () => {
    expect(languageAlternates("/", siteWith(["en", "pt-PT"], { "pt-PT": "/pt" }))).toEqual({
      en: "/",
      "pt-PT": "/pt",
      "x-default": "/",
    });
  });

  it("uses the locale as the prefix when no other prefix is set", () => {
    expect(languageAlternates("/contact", siteWith(["en", "de"]))["de"]).toBe("/de/contact");
  });

  it("always points x-default to the default language, whatever the order", () => {
    const site = siteWith(["pt-PT", "en"], { "pt-PT": "/pt" });
    expect(languageAlternates("/projects", site)["x-default"]).toBe("/projects");
  });
});
