import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/_common/constants";
import { homePageUrl } from "./utils";

describe("homePageUrl", () => {
  it("is the site root for the default language, with no trailing slash", () => {
    expect(homePageUrl("en")).toBe(SITE_URL);
  });

  it("adds the language's prefix for the other language", () => {
    expect(homePageUrl("pt-PT")).toBe(`${SITE_URL}/pt`);
  });
});
