import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

const APP = join(import.meta.dirname, "../src/app");

/** Every page route in src/app, as an address ("/", "/about", ...). */
export const PAGE_ROUTES: string[] = readdirSync(APP, {
  recursive: true,
  withFileTypes: true,
})
  .filter((entry) => entry.isFile() && entry.name === "page.tsx")
  .map((entry) => `/${relative(APP, entry.parentPath)}`)
  .sort();
