// @vitest-environment node
import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/constants";

import { PAGE_ROUTES } from "./pages";

const urls = sitemap().map((entry) => entry.url);

describe("sitemap", () => {
  it("lists every page of the site, and nothing else", () => {
    const paths = urls.map((url) => new URL(url).pathname).sort();
    expect(paths).toEqual(PAGE_ROUTES);
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
