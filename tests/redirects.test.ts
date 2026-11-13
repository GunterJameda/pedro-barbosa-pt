// @vitest-environment node
import { describe, expect, it } from "vitest";

import nextConfig from "../next.config";

describe("redirects", () => {
  it("sends the old /home address to the home page, permanently", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual(
      expect.objectContaining({ source: "/home", destination: "/", permanent: true }),
    );
  });
});
