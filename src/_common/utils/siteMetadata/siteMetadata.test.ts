// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NAME, SITE_URL } from "@/_common/constants";
import { messages } from "@tests/intl";
import { siteMetadata } from "./siteMetadata";

describe("siteMetadata", () => {
  it("resolves every relative address against the site's own", async () => {
    expect(String((await siteMetadata()).metadataBase)).toBe(`${SITE_URL}/`);
  });

  it("titles pages with my name, and the home page with my name and role", async () => {
    expect((await siteMetadata()).title).toEqual({
      default: `${NAME} | ${messages.profile.role}`,
      template: `%s | ${NAME}`,
    });
  });

  it("gives a page without a layout above it its whole title, in the site's pattern", async () => {
    expect((await siteMetadata("Page not found")).title).toEqual({
      absolute: `Page not found | ${NAME}`,
    });
  });

  it("describes the site", async () => {
    expect((await siteMetadata()).description).toBe(messages.site.description);
  });

  it("shows the site-wide image in link previews", async () => {
    expect((await siteMetadata()).openGraph?.images).toEqual([
      expect.objectContaining({ url: "/opengraph-image" }),
    ]);
  });
});
