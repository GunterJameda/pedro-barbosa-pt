// @vitest-environment node
import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/_common/constants";
import { LOCALES } from "@/_common/i18n";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { PAGE_ROUTES } from "./pages";

const entries = sitemap();
const urls = entries.map((entry) => entry.url);
const portuguese = (route: string) => (route === "/" ? "/pt" : `/pt${route}`);

describe("sitemap", () => {
  it("lists every page of the site in every language, and nothing else", () => {
    const paths = urls.map((url) => new URL(url).pathname).sort();
    expect(LOCALES).toEqual(["en", "pt-PT"]);
    expect(paths).toEqual([...PAGE_ROUTES, ...PAGE_ROUTES.map(portuguese)].sort());
  });

  it("lists each page's versions in both languages, with English as the default", () => {
    for (const route of PAGE_ROUTES) {
      const english = `${SITE_URL}${route}`;
      const expected = {
        en: english,
        "pt-PT": `${SITE_URL}${portuguese(route)}`,
        "x-default": english,
      };
      // The English and the Portuguese entry both list both.
      for (const url of [expected.en, expected["pt-PT"]]) {
        const entry = entries.find((candidate) => candidate.url === url);
        expect(entry?.alternates?.languages, url).toEqual(expected);
      }
    }
  });

  it("lists each page once", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("uses full addresses on the site's own domain", () => {
    for (const url of urls) {
      expect(new URL(url).origin).toBe(new URL(SITE_URL).origin);
    }
  });
});

describe("robots.txt", () => {
  const rules = [robots().rules].flat();

  it("doesn't block any page from search engines", () => {
    for (const rule of rules) {
      expect([rule.disallow ?? []].flat().filter(Boolean)).toEqual([]);
    }
  });

  it("points search engines to the sitemap", () => {
    expect(robots().sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
