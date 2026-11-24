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

/** Every list message's path ("about.TechnicalToolbox.groups.frontend.skills"). */
function listKeysOf(messages: object, prefix = ""): string[] {
  return Object.entries(messages).flatMap(([key, value]) =>
    Array.isArray(value)
      ? [`${prefix}${key}`]
      : typeof value === "object" && value !== null
        ? listKeysOf(value, `${prefix}${key}.`)
        : [],
  );
}

/** The message at a path, or undefined. */
function messageAt(messages: object, path: string) {
  return path.split(".").reduce<unknown>((value, key) => (value as never)?.[key], messages);
}

// The test helpers fail on any message problem, like a key missing from the messages.
describe("messages", () => {
  it.each(LOCALES)("%s has exactly the messages English has", async (locale) => {
    const { default: messages } = await import(`@/_common/i18n/${locale}.json`);
    expect(keysOf(messages).sort()).toEqual(keysOf(english).sort());
  });

  // The code reads these with rawList, which fails on anything but a list.
  it.each(LOCALES)("%s has a list wherever English has one", async (locale) => {
    const { default: messages } = await import(`@/_common/i18n/${locale}.json`);
    const paths = listKeysOf(english);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(Array.isArray(messageAt(messages, path)), `${locale}: ${path}`).toBe(true);
    }
    expect(listKeysOf(messages).sort()).toEqual(paths.sort());
  });

  // Search engines cut descriptions at about 155 characters, in every language.
  it.each(LOCALES)("%s's page descriptions are short enough for search results", async (locale) => {
    const { default: messages } = await import(`@/_common/i18n/${locale}.json`);
    const fill = (text: string) =>
      text
        .replace("{careerStartYear}", "2019")
        .replace("{role}", messages.profile.role)
        .replace("{city}", "Porto")
        .replace("{workModeRoles}", messages.profile.workModeRoles["remote-and-hybrid"]);
    const descriptions = [
      messages.site.description,
      messages.about.page.description,
      messages.experience.page.description,
      messages.projects.page.description,
      messages.contact.page.description,
      messages.contact.page.descriptionLooking,
    ];
    for (const description of descriptions) {
      expect(fill(description).length, description).toBeLessThanOrEqual(155);
    }
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
