import { screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";
import { PAGE_ROUTES, routeModule } from "./pages";
import { renderWithTheme } from "./render";

const PAGES = [
  ...PAGE_ROUTES.map((route) => ({ name: route, route, file: "page.tsx" })),
  { name: "404", route: "/", file: "not-found.tsx" },
];

async function renderPage(route: string, file: string) {
  const { default: Page } = await routeModule<{ default: ComponentType }>(route, file);
  return renderWithTheme(<Page />).container;
}

describe.each(PAGES)("$name page", ({ route, file }) => {
  it("has exactly one main heading", async () => {
    await renderPage(route, file);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("doesn't skip heading levels", async () => {
    const page = await renderPage(route, file);
    const levels = [...page.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((heading) =>
      Number(heading.tagName[1]),
    );
    levels.forEach((level, index) => {
      const previous = levels[index - 1] ?? 0;
      expect(level, `h${previous} followed by h${level}`).toBeLessThanOrEqual(previous + 1);
    });
  });

  it("uses each id only once, so in-page links land in the right place", async () => {
    const page = await renderPage(route, file);
    const ids = [...page.querySelectorAll("[id]")].map((element) => element.id);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  it("only links to pages and sections that exist", async () => {
    const page = await renderPage(route, file);
    for (const link of page.querySelectorAll("a[href]")) {
      const href = link.getAttribute("href")!;
      if (href.startsWith("#")) {
        expect(page.querySelector(href), `missing section ${href}`).not.toBeNull();
      } else if (href.startsWith("/")) {
        const { pathname } = new URL(href, "https://example.com");
        expect(PAGE_ROUTES, `missing page ${href}`).toContain(pathname);
      } else {
        expect(href, "unexpected link").toMatch(/^(https:\/\/|mailto:)/);
      }
    }
  });
});
