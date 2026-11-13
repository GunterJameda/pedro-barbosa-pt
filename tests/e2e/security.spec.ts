import type { APIResponse } from "@playwright/test";

import { PAGE_ROUTES } from "@tests/pages";

import { expect, test } from "./fixtures";

const PATHS = [...PAGE_ROUTES, "/this-page-does-not-exist"];

/** The enforced Content Security Policy, as directive name to sources. */
function contentSecurityPolicy(response: APIResponse) {
  const policy = response.headers()["content-security-policy"] ?? "";
  return new Map(
    policy
      .split(";")
      .map((directive) => directive.trim().split(/\s+/))
      .filter(([name]) => name)
      .map(([name, ...sources]) => [name, sources]),
  );
}

for (const path of PATHS) {
  test.describe(`${path} security headers`, () => {
    test("only let the page load this site's own files", async ({ request }) => {
      const policy = contentSecurityPolicy(await request.get(path));
      expect(policy.get("default-src")).toEqual(["'self'"]);
      // Nothing from another site, in any directive.
      for (const [name, sources] of policy) {
        for (const source of sources) {
          expect(source, `${name} allows ${source}`).toMatch(/^('[a-z-]+'|data:|blob:)$/);
        }
      }
      expect(policy.get("object-src")).toEqual(["'none'"]);
      expect(policy.get("base-uri")).toEqual(["'self'"]);
      expect(policy.get("form-action")).toEqual(["'self'"]);
    });

    test("stop other sites from framing the page", async ({ request }) => {
      const response = await request.get(path);
      expect(contentSecurityPolicy(response).get("frame-ancestors")).toEqual(["'none'"]);
      expect(response.headers()["x-frame-options"]).toBe("DENY");
    });

    test("send the other security headers", async ({ request }) => {
      const headers = (await request.get(path)).headers();
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
      expect(headers["permissions-policy"]).toContain("camera=()");
    });
  });
}
