// @vitest-environment node
import { describe, expect, it } from "vitest";

import { NAME, PAGES, ROLE } from "@/constants";

import { shareImageAlt } from "./ShareImage";

describe("shareImageAlt", () => {
  it("names the person and their role for the site-wide image", () => {
    expect(shareImageAlt()).toContain(NAME);
    expect(shareImageAlt()).toContain(ROLE);
  });

  it.each(PAGES.map((page) => [page.href, page.name]))(
    "starts with the page name for %s",
    (href, name) => {
      expect(shareImageAlt(href)).toBe(`${name} · ${shareImageAlt()}`);
    },
  );

  it.each(["/no-such-page", ""])(
    "falls back to the site-wide text for an address that isn't a page (%j)",
    (href) => {
      expect(shareImageAlt(href)).toBe(shareImageAlt());
    },
  );
});
