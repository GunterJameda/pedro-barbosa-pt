import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/_common/constants";
import { pageUrl } from "./pageUrl";

describe("pageUrl", () => {
  it("is the site's address for the home page in the default language, with no trailing slash", () => {
    expect(pageUrl("en", "/")).toBe(SITE_URL);
  });

  it("adds only the language's prefix for home in the other language", () => {
    expect(pageUrl("pt-PT", "/")).toBe(`${SITE_URL}/pt`);
  });

  it("adds the page's path in the default language", () => {
    expect(pageUrl("en", "/about")).toBe(`${SITE_URL}/about`);
  });

  it("adds the language's prefix before the page's path in the other language", () => {
    expect(pageUrl("pt-PT", "/about")).toBe(`${SITE_URL}/pt/about`);
  });
});
