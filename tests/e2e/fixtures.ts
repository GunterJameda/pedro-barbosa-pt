import { test as base, expect } from "@playwright/test";

/** Annotation for tests that visit a missing page on purpose. */
export const EXPECTS_404 = "expects-404";

export interface E2EOptions {
  /** Set on the projects that run against `next dev`. */
  devServer: boolean;
}

// Next's own notices in development, about the dev server rather than the site.
const NEXT_DEV_NOTICES = [/nextjs\.org\/docs\/messages\/cache-bypass-in-dev/];

// Browsers warn when a preloaded file isn't used "within a few seconds". It's
// timed, so it only fires when the machine running the tests is too busy for
// the page to use the font in time. Calm loads don't show it in any browser.
const TIMING_WARNINGS = [/preload.*not used within a few seconds/i];

/**
 * Every e2e test fails if the browser reports a problem while it runs: a
 * console error or warning, an uncaught exception (hydration failures land
 * here), or a request that fails or returns an error status.
 */
export const test = base.extend<E2EOptions & { browserProblems: void }>({
  devServer: [false, { option: true }],
  browserProblems: [
    async ({ page, devServer }, provide, testInfo) => {
      const problems: { text: string; url?: string }[] = [];
      // Missing pages this test visited on purpose, which answer 404.
      const expected404s = new Set<string>();
      const expects404 = () => testInfo.annotations.some((note) => note.type === EXPECTS_404);

      // Vercel Analytics loads its script from Vercel: /_vercel/ in production,
      // which only exists on Vercel, and Vercel's own servers in development.
      // Stand in an empty one, so the tests never depend on an outside service.
      // Anything else must still load.
      for (const analytics of ["**/_vercel/**", "https://va.vercel-scripts.com/**"]) {
        await page.route(analytics, (route) =>
          route.fulfill({ contentType: "text/javascript", body: "" }),
        );
      }

      page.on("console", (message) => {
        if (message.type() !== "error" && message.type() !== "warning") return;
        if (devServer && NEXT_DEV_NOTICES.some((notice) => notice.test(message.text()))) return;
        if (TIMING_WARNINGS.some((warning) => warning.test(message.text()))) return;
        problems.push({
          text: `console ${message.type()}: ${message.text()}`,
          url: message.location().url,
        });
      });
      page.on("pageerror", (error) => problems.push({ text: `exception: ${error.message}` }));
      page.on("requestfailed", (request) => {
        // Leaving a page cancels its pending requests; that's not a failure.
        if (request.failure()?.errorText.match(/abort|cancel/i)) return;
        problems.push({
          text: `request failed: ${request.url()} (${request.failure()?.errorText})`,
        });
      });
      page.on("response", (response) => {
        if (response.status() < 400) return;
        if (response.status() === 404 && response.request().isNavigationRequest() && expects404()) {
          expected404s.add(response.url());
          return;
        }
        problems.push({ text: `HTTP ${response.status()}: ${response.url()}` });
      });

      await provide();

      // The browser also logs an expected 404 as an error; drop only that one.
      const unexpected = problems
        .filter(({ text, url }) => !(url && expected404s.has(url) && text.includes("404")))
        .map(({ text }) => text);

      expect(unexpected, "the browser reported problems").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** True in the phone-sized projects. */
export const isPhone = (viewportWidth: number | undefined) => (viewportWidth ?? 0) < 600;
