import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

// next/font only works inside a Next.js build. The theme loads the site's
// fonts, so every test that uses it needs this.
vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "" }),
  JetBrains_Mono: () => ({ variable: "" }),
}));

// next-intl's server functions only work inside a Next.js render, where they
// read the request's language. Tests get the default language's messages,
// and a missing message fails the test.
vi.mock("next-intl/server", async () => {
  const { createTranslator } = await import("next-intl");
  const { INTL } = await import("./intl");
  return {
    getLocale: async () => INTL.locale,
    getTranslations: async (options?: string | { namespace?: string }) =>
      createTranslator({
        ...INTL,
        namespace: typeof options === "string" ? options : options?.namespace,
      } as Parameters<typeof createTranslator>[0]),
  };
});
