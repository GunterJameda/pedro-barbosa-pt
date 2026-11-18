import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@/": fileURLToPath(new URL("./src/", import.meta.url)),
      "@tests/": fileURLToPath(new URL("./tests/", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
    restoreMocks: true,
    unstubGlobals: true,
    server: {
      deps: {
        // next-intl imports next/navigation without the .js ending, which Node
        // can't resolve on its own, so Vite resolves it. Its React context
        // lives in use-intl, which stays external, so it's shared between tests
        // that reload modules.
        inline: ["next-intl"],
      },
    },
  },
});
