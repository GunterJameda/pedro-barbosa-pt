// @vitest-environment node
import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

describe("redirects", () => {
  it("sends the English pages' internal /en addresses to their public ones, permanently", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual(
      expect.objectContaining({ source: "/en", destination: "/", permanent: true }),
    );
    expect(redirects).toContainEqual(
      expect.objectContaining({ source: "/en/:path*", destination: "/:path*", permanent: true }),
    );
  });

  it("sends the old /home address to the home page, permanently", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual(
      expect.objectContaining({ source: "/home", destination: "/", permanent: true }),
    );
  });
});
