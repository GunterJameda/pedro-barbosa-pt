import { defineConfig, devices, type Project } from "@playwright/test";

import type { E2EOptions } from "./tests/e2e/fixtures";

// Ports of their own, so they never clash with a dev server on 3000.
const PRODUCTION_PORT = 3100;
const DEV_PORT = 3101;

const PHONE = { width: 390, height: 844 };

// Set to test a deployed site instead of local servers, e.g. the live one
// (yarn test:e2e:prod). The dev-server runs only make sense locally.
const REMOTE_URL = process.env.E2E_BASE_URL;

const BROWSERS: Project[] = [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
  { name: "chromium-phone", use: { ...devices["Pixel 7"], viewport: PHONE } },
  // Firefox can't emulate a phone, so it gets a phone-sized window instead.
  { name: "firefox-phone", use: { ...devices["Desktop Firefox"], viewport: PHONE } },
  { name: "webkit-phone", use: { ...devices["iPhone 15"], viewport: PHONE } },
];

export default defineConfig<E2EOptions>({
  testDir: "tests/e2e",
  testMatch: "*.spec.ts",
  fullyParallel: true,
  reporter: "list",
  use: { trace: "retain-on-failure" },
  webServer: REMOTE_URL
    ? undefined
    : [
        // The production build, which `yarn build` makes first.
        {
          command: `yarn start -p ${PRODUCTION_PORT}`,
          url: `http://localhost:${PRODUCTION_PORT}`,
          // Fails fast if the port is taken, instead of testing something else.
          reuseExistingServer: false,
          timeout: 60_000,
        },
        // A dev server, because some errors only happen there (a page that fails
        // to hydrate while its code is still loading, for example).
        {
          command: `yarn next dev -p ${DEV_PORT}`,
          url: `http://localhost:${DEV_PORT}`,
          reuseExistingServer: false,
          timeout: 120_000,
        },
      ],
  projects: [
    // Everything, against the production build (or the remote site).
    ...BROWSERS.map((browser) => ({
      ...browser,
      use: { ...browser.use, baseURL: REMOTE_URL ?? `http://localhost:${PRODUCTION_PORT}` },
    })),
    // Only the clean page load test, against the dev server.
    ...(REMOTE_URL ? [] : BROWSERS).map((browser) => ({
      ...browser,
      name: `${browser.name}-dev`,
      testMatch: "pages.spec.ts",
      grep: /loads cleanly/,
      // The dev server compiles each page on its first visit.
      timeout: 90_000,
      use: { ...browser.use, baseURL: `http://localhost:${DEV_PORT}`, devServer: true },
    })),
  ],
});
