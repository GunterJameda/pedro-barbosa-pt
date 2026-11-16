import type { Metadata } from "next";
import { describe, expect, it, vi } from "vitest";
import type { Availability, WorkMode } from "@/constants";
import { PAGE_ROUTES, routeModule } from "./pages";
import { setProfile } from "./profile";

// next/font only works inside a Next.js build.
vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "" }),
  JetBrains_Mono: () => ({ variable: "" }),
}));

const pageModule = (route: string) => routeModule<{ metadata: Metadata }>(route, "page.tsx");

async function allMetadata() {
  const { metadata: site } = await import("../src/app/layout");
  return Promise.all(
    PAGE_ROUTES.map(async (route) => {
      const { metadata } = await pageModule(route);
      const siteTitle = site.title as { default: string };
      return {
        route,
        canonical: metadata.alternates?.canonical,
        title: (metadata.title as string | undefined) ?? siteTitle.default,
        description: metadata.description ?? site.description ?? "",
      };
    }),
  );
}

describe("page metadata", () => {
  it("gives every page its own address as the canonical one", async () => {
    for (const page of await allMetadata()) {
      expect(page.canonical, page.route).toBe(page.route);
    }
  });

  it("gives every page a different title", async () => {
    const titles = (await allMetadata()).map((page) => page.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives every page a different description", async () => {
    const descriptions = (await allMetadata()).map((page) => page.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("keeps descriptions short enough that search results show them whole", async () => {
    // Google cuts descriptions at about 155 to 160 characters.
    for (const page of await allMetadata()) {
      expect(page.description.length, page.route).toBeLessThanOrEqual(155);
    }
  });
});

describe("contact page description", () => {
  async function descriptionWith(availability: Availability, workMode: WorkMode) {
    setProfile({ availability, workMode });
    const { metadata } = await pageModule("/contact");
    return metadata.description ?? "";
  }

  const combinations: [Availability, WorkMode][] = [
    ["immediate", "remote-and-hybrid"],
    ["immediate", "remote-only"],
    ["open", "remote-and-hybrid"],
    ["open", "remote-only"],
    ["not-looking", "remote-and-hybrid"],
    ["not-looking", "remote-only"],
  ];

  it.each(combinations)("reads as a finished sentence (%s, %s)", async (availability, workMode) => {
    const description = await descriptionWith(availability, workMode);
    expect(description).toMatch(/[^ ,.]\.$/);
    expect(description).not.toMatch(/undefined|null|\s{2}|,\s*\./);
    expect(description.length).toBeLessThanOrEqual(155);
  });

  it("says which roles are welcome when looking", async () => {
    expect(await descriptionWith("open", "remote-and-hybrid")).toMatch(
      /open to remote and hybrid roles/i,
    );
  });

  it("doesn't claim to be open to roles when not looking", async () => {
    expect(await descriptionWith("not-looking", "remote-and-hybrid")).not.toMatch(/open to/i);
  });

  it("doesn't mention hybrid work for remote-only roles", async () => {
    expect(await descriptionWith("immediate", "remote-only")).not.toMatch(/hybrid/i);
  });
});
