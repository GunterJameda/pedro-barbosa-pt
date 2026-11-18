import type { Metadata } from "next";
import type { ComponentType } from "react";
import { describe, expect, it, vi } from "vitest";
import { LOCALES } from "@/_common/i18n";
import english from "@/_common/i18n/en.json";
import { ErrorPage } from "@/_common/components/ErrorPage";
import { Footer } from "@/_common/components/Footer";
import { Navbar } from "@/_common/components/Navbar";
import { ScrollToTop } from "@/_common/components/ScrollToTop";
import { SkipLink } from "@/_common/components/SkipLink";
import { PAGE_ROUTES, routeModule } from "./pages";
import { renderWithTheme } from "./render";

// Only the address is faked; the site's locale-aware navigation needs the rest.
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  usePathname: () => "/",
}));

/** Every message's path ("about.AboutHero.title"), with lists counted as one message. */
function keysOf(messages: object, prefix = ""): string[] {
  return Object.entries(messages).flatMap(([key, value]) =>
    typeof value === "object" && value !== null && !Array.isArray(value)
      ? keysOf(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

// The test helpers fail on any message problem, like a key missing from the messages.
describe("messages", () => {
  it.each(LOCALES)("%s has exactly the messages English has", async (locale) => {
    const { default: messages } = await import(`@/_common/i18n/${locale}.json`);
    expect(keysOf(messages).sort()).toEqual(keysOf(english).sort());
  });

  it.each(PAGE_ROUTES)("%s only uses messages that exist", async (route) => {
    const page = await routeModule<{
      default: ComponentType;
      generateMetadata: () => Promise<Metadata>;
    }>(route, "page.tsx");
    await page.generateMetadata();
    expect(() => renderWithTheme(<page.default />)).not.toThrow();
  });

  it("the 404 page only uses messages that exist", async () => {
    const { default: NotFound } = await routeModule<{ default: ComponentType }>(
      "/",
      "not-found.tsx",
    );
    const { generateMetadata } = await import("../src/app/global-not-found");
    await generateMetadata();
    expect(() => renderWithTheme(<NotFound />)).not.toThrow();
  });

  it("the layout and error page only use messages that exist", async () => {
    const layout = await routeModule<{ generateMetadata: () => Promise<Metadata> }>(
      "/",
      "layout.tsx",
    );
    await layout.generateMetadata();
    expect(() =>
      renderWithTheme(
        <>
          <SkipLink />
          <Navbar />
          <ErrorPage retry={() => {}} />
          <Footer />
          <ScrollToTop />
        </>,
      ),
    ).not.toThrow();
  });
});
