// @vitest-environment node
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, LOCALE_PREFIXES, LOCALES } from "@/_common/i18n";
import type { RedirectRule, RouteRule } from "./types";
import { localeRoutes } from "./localeRoutes";

/** Where Next.js sends an address through the first rule that matches it, as next.config.ts runs them. */
function follow(rules: RouteRule[], address: string) {
  for (const { source, destination } of rules) {
    const params = getPathMatch(source)(address);
    if (params) {
      return destination.replace(/:(\w+)\*?/g, (_, name: string) =>
        [params[name] ?? ""].flat().join("/"),
      );
    }
  }
  return address;
}

/** Like follow, for redirects: a rule with a cookie condition only applies to requests that carry it. */
function followWithCookies(
  rules: RedirectRule[],
  address: string,
  cookies: Record<string, string> = {},
) {
  return follow(
    rules.filter(({ has }) => !has || has.every(({ key, value }) => cookies[key] === value)),
    address,
  );
}

const site = localeRoutes({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  prefixes: LOCALE_PREFIXES,
});
const withPortuguese = localeRoutes({
  locales: ["en", "pt-PT"],
  defaultLocale: "en",
  prefixes: { "pt-PT": "/pt" },
});

describe("localeRoutes", () => {
  it.each([
    ["/", "/en"],
    ["/about", "/en/about"],
    ["/about/opengraph-image", "/en/about/opengraph-image"],
    ["/no-such-page", "/en/no-such-page"],
    ["/missing.php", "/en/missing.php"],
  ])("shows %s from the English pages, at the same address", (address, page) => {
    expect(follow(site.rewrites, address)).toBe(page);
  });

  it.each(["/sitemap.xml", "/robots.txt", "/icon.svg", "/favicon.ico", "/_next/static/a.js"])(
    "leaves %s alone, since it's the same in every language",
    (address) => {
      expect(follow(site.rewrites, address)).toBe(address);
    },
  );

  it.each([
    ["/en", "/"],
    ["/en/about", "/about"],
  ])("redirects the English page's internal address %s to its public one", (address, target) => {
    expect(follow(site.redirects, address)).toBe(target);
  });

  it("only redirects addresses inside the English prefix, not ones that start with it", () => {
    expect(follow(site.redirects, "/english")).toBe("/english");
    expect(follow(site.rewrites, "/english")).toBe("/en/english");
  });

  it("makes every redirect permanent", () => {
    expect(withPortuguese.redirects.every(({ permanent }) => permanent)).toBe(true);
  });

  describe("with a second language enabled", () => {
    it.each([
      ["/pt", "/pt-PT"],
      ["/pt/about", "/pt-PT/about"],
    ])("shows %s from that language's pages", (address, page) => {
      expect(follow(withPortuguese.rewrites, address)).toBe(page);
    });

    it("keeps English at addresses without a prefix", () => {
      expect(follow(withPortuguese.rewrites, "/about")).toBe("/en/about");
      expect(follow(withPortuguese.rewrites, "/ptolemy")).toBe("/en/ptolemy");
    });

    it("redirects the language's internal address to its prefix", () => {
      expect(follow(withPortuguese.redirects, "/pt-PT/about")).toBe("/pt/about");
      expect(follow(withPortuguese.redirects, "/pt-PT")).toBe("/pt");
    });

    it("needs no rule for a language whose prefix is its locale", () => {
      const withGerman = localeRoutes({ locales: ["en", "de"], defaultLocale: "en", prefixes: {} });
      expect(follow(withGerman.rewrites, "/de/about")).toBe("/de/about");
      expect(follow(withGerman.redirects, "/de/about")).toBe("/de/about");
    });
  });

  describe("with a cookie holding the visitor's choice", () => {
    const remembered = localeRoutes({
      locales: ["en", "pt-PT"],
      defaultLocale: "en",
      prefixes: { "pt-PT": "/pt" },
      cookie: "NEXT_LOCALE",
    });
    const send = (address: string, cookie?: string) =>
      followWithCookies(remembered.redirects, address, cookie ? { NEXT_LOCALE: cookie } : {});

    it.each([
      ["/", "/pt"],
      ["/about", "/pt/about"],
      ["/projects/opengraph-image", "/pt/projects/opengraph-image"],
    ])("sends a visitor who chose Portuguese from %s to %s", (address, target) => {
      expect(send(address, "pt-PT")).toBe(target);
    });

    it.each([
      ["/pt", "/"],
      ["/pt/about", "/about"],
    ])("sends a visitor who chose English from %s to %s", (address, target) => {
      expect(send(address, "en")).toBe(target);
    });

    it.each([undefined, "dismissed", "de", ""])(
      "changes nothing for a visitor whose cookie is %j",
      (cookie) => {
        expect(send("/about", cookie)).toBe("/about");
        expect(send("/pt/about", cookie)).toBe("/pt/about");
        expect(send("/", cookie)).toBe("/");
      },
    );

    it("keeps a visitor where they are when the page is already in their language", () => {
      expect(send("/pt/about", "pt-PT")).toBe("/pt/about");
      expect(send("/about", "en")).toBe("/about");
    });

    it("never redirects Next's files or the root files, whatever the choice", () => {
      for (const address of ["/_next/static/a.js", "/sitemap.xml", "/robots.txt", "/icon.svg"]) {
        expect(send(address, "pt-PT")).toBe(address);
      }
    });

    it("makes the redirects for a saved choice temporary, so a changed choice takes effect", () => {
      const saved = remembered.redirects.filter(({ has }) => has);
      expect(saved.length).toBeGreaterThan(0);
      expect(saved.every(({ permanent }) => !permanent)).toBe(true);
    });

    it("adds no redirect for a saved choice without a cookie name", () => {
      expect(withPortuguese.redirects.some(({ has }) => has)).toBe(false);
    });
  });
});
