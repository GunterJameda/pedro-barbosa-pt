import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

// From the project root, where both Vitest and Playwright run.
const APP = join(process.cwd(), "src/app");

/** Every page route in src/app, as an address ("/", "/about", ...). */
export const PAGE_ROUTES: string[] = readdirSync(APP, {
  recursive: true,
  withFileTypes: true,
})
  .filter((entry) => entry.isFile() && entry.name === "page.tsx")
  .map((entry) => `/${relative(APP, entry.parentPath)}`)
  .sort();

/** Loads a route file, e.g. routeModule("/about", "page.tsx"). */
export function routeModule<T>(route: string, file: string): Promise<T> {
  return import(/* @vite-ignore */ join(APP, route, file));
}
