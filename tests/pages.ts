import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

// From the project root, where both Vitest and Playwright run. Every page sits
// under the [locale] route, and its address in the default language has no prefix.
const APP = join(process.cwd(), "src/app/[locale]");

/** Every page route, as its address in the default language ("/", "/about", ...). */
export const PAGE_ROUTES: string[] = readdirSync(APP, {
  recursive: true,
  withFileTypes: true,
})
  .filter((entry) => entry.isFile() && entry.name === "page.tsx")
  .map((entry) => `/${relative(APP, entry.parentPath)}`)
  // The catch-all route ([...rest]) only shows the 404 page.
  .filter((route) => !route.includes("["))
  .sort();

/** Loads a route file, e.g. routeModule("/about", "page.tsx"). */
export function routeModule<T>(route: string, file: string): Promise<T> {
  return import(/* @vite-ignore */ join(APP, route, file));
}
