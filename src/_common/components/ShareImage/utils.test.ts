// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NAME, PAGES, ROLE } from "@/_common/constants";
import { shareImageAlt, shareImageRoute } from "./utils";

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

describe("shareImageRoute", () => {
  it.each([undefined, ...PAGES.map((page) => page.href)])(
    "describes the image with the same alt text as shareImageAlt (%s)",
    (href) => {
      expect(shareImageRoute(href).alt).toBe(shareImageAlt(href));
    },
  );

  it("makes a PNG in the size link previews expect", () => {
    const route = shareImageRoute("/about");
    expect(route.contentType).toBe("image/png");
    expect(route.size).toEqual({ width: 1200, height: 630 });
  });

  it("renders the image as a response", () => {
    expect(shareImageRoute("/about").Image()).toBeInstanceOf(Response);
  });
});
