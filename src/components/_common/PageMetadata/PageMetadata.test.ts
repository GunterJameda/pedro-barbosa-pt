// @vitest-environment node
import { describe, expect, it } from "vitest";

import { PAGES } from "@/constants";

import { pageMetadata } from "./PageMetadata";

const otherPages = PAGES.filter(({ href }) => href !== "/");

describe("pageMetadata", () => {
  it.each(PAGES.map(({ href }) => href))("makes %s its own canonical address", (href) => {
    expect(pageMetadata(href, "Text.").alternates?.canonical).toBe(href);
  });

  it.each(otherPages.map(({ href, name }) => [href, name]))(
    "titles %s with its page name",
    (href, name) => {
      expect(pageMetadata(href, "Text.").title).toBe(name);
    },
  );

  it("leaves Home without a title, so it keeps the site-wide one", () => {
    expect(pageMetadata("/")).not.toHaveProperty("title");
  });

  it("uses the given description", () => {
    expect(pageMetadata("/about", "About me.").description).toBe("About me.");
  });

  it.each([undefined, ""])(
    "leaves the description out when there isn't one (%j), so the site-wide one is kept",
    (description) => {
      expect(pageMetadata("/about", description)).not.toHaveProperty("description");
    },
  );

  it.each(["/no-such-page", "", "/about/"])("refuses an address that isn't a page (%j)", (href) => {
    expect(() => pageMetadata(href)).toThrow();
  });
});
