// @vitest-environment node
import { describe, expect, it } from "vitest";
import { SITE_NAME } from "@/_common/constants";
import { socialMetadata } from "./socialMetadata";

describe("socialMetadata", () => {
  it("describes the site and names the preview's language", async () => {
    expect((await socialMetadata()).openGraph).toMatchObject({
      type: "website",
      siteName: SITE_NAME,
      locale: "en_GB",
    });
  });

  it("shows the page's own image in both previews", async () => {
    const { openGraph, twitter } = await socialMetadata("/contact");
    const image = expect.objectContaining({ url: "/contact/opengraph-image" });
    expect(openGraph?.images).toEqual([image]);
    expect(twitter?.images).toEqual([image]);
  });

  it("asks X for the large image card", async () => {
    expect((await socialMetadata()).twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("shows the site-wide image without a page", async () => {
    const { openGraph } = await socialMetadata();
    expect(openGraph?.images).toEqual([expect.objectContaining({ url: "/opengraph-image" })]);
  });
});
