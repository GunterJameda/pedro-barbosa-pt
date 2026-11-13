import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { describe, test } from "node:test";

import { ESLint } from "eslint";

const ROOT = join(import.meta.dirname, "..");
const RULE = "no-restricted-imports";
const eslint = new ESLint({ cwd: ROOT });

async function isBlocked(source, filePath) {
  const [result] = await eslint.lintText(`import "${source}";\n`, { filePath });
  return result.messages.some((message) => message.ruleId === RULE);
}

const directories = (path) =>
  readdirSync(join(ROOT, path), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

const filesIn = (path) =>
  readdirSync(join(ROOT, path), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name));

describe("import rules", () => {
  const ABOUT = "src/app/about/page.tsx";
  const CONTACT = "src/app/contact/page.tsx";
  const CONTACT_MODULE = "src/components/pages/contact/EmailCard/EmailCard.tsx";
  const COMMON_MODULE = "src/components/_common/Footer/Footer.tsx";

  const blocked = [
    ["a private file of a common module", "@/components/_common/Footer/Footer", ABOUT],
    ["a private file of a page module", "@/components/pages/contact/EmailCard/EmailCard", CONTACT],
    [
      "a child nested inside a page module",
      "@/components/pages/contact/EmailCard/CopyEmailButton",
      CONTACT,
    ],
    ["a private theme file", "@/theme/tokens", ABOUT],
    ["a private constants file", "@/constants/links", ABOUT],
    ["anything from src/app", "@/app/about/page", COMMON_MODULE],
    ["a component outside _common or pages", "@/components/Footer", ABOUT],
    ["a component directly inside pages", "@/components/pages/Footer", ABOUT],
    ["a page folder itself", "@/components/pages/contact", CONTACT],
    ["another page's components", "@/components/pages/contact/EmailCard", ABOUT],
    ["home's components from another page", "@/components/pages/home/QuickLinks", ABOUT],
    ["page components from _common", "@/components/pages/contact/EmailCard", COMMON_MODULE],
    ["a relative path out of the module", "../Footer", COMMON_MODULE],
    ["a relative path to the parent", "..", COMMON_MODULE],
    ["a file inside a nested module", "./CopyEmailButton/CopyEmailButton", CONTACT_MODULE],
  ];

  for (const [name, source, file] of blocked) {
    test(`blocks ${name}`, async () => {
      assert.equal(await isBlocked(source, file), true, `${source} in ${file}`);
    });
  }

  const allowed = [
    ["a common module", "@/components/_common/Footer", ABOUT],
    ["a page's own components", "@/components/pages/contact/EmailCard", CONTACT],
    [
      "home's components from the root page",
      "@/components/pages/home/QuickLinks",
      "src/app/page.tsx",
    ],
    [
      "sibling components in the same page folder",
      "@/components/pages/contact/LinkedInCard",
      CONTACT_MODULE,
    ],
    ["the theme module", "@/theme", ABOUT],
    ["the constants module", "@/constants", ABOUT],
    ["a private file from inside its module", "./info", COMMON_MODULE],
    ["a nested child from its parent", "./CopyEmailButton", CONTACT_MODULE],
    ["packages", "@mui/material/Box", ABOUT],
  ];

  for (const [name, source, file] of allowed) {
    test(`allows ${name}`, async () => {
      assert.equal(await isBlocked(source, file), false, `${source} in ${file}`);
    });
  }

  test("the source code follows the rules", async () => {
    const results = await eslint.lintFiles(["src/**/*.{ts,tsx}"]);
    const violations = results.flatMap((result) =>
      result.messages
        .filter((message) => message.ruleId === RULE)
        .map((message) => `${result.filePath}: ${message.message}`),
    );
    assert.deepEqual(violations, []);
  });
});

describe("folder structure", () => {
  test("src/app only holds Next.js route files", () => {
    const ROUTE_FILES = new Set([
      "page.tsx",
      "layout.tsx",
      "loading.tsx",
      "error.tsx",
      "not-found.tsx",
      "global-error.tsx",
      "template.tsx",
      "default.tsx",
      "route.ts",
      "favicon.ico",
      "icon.png",
      "icon.svg",
      "opengraph-image.png",
      "opengraph-image.tsx",
      "robots.ts",
      "sitemap.ts",
    ]);
    const others = filesIn("src/app").filter((file) => !ROUTE_FILES.has(basename(file)));
    assert.deepEqual(others, []);
  });

  const filesDirectlyIn = (path) =>
    readdirSync(join(ROOT, path), { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);

  test("src/components only holds _common and pages", () => {
    assert.deepEqual(directories("src/components").sort(), ["_common", "pages"]);
    assert.deepEqual(filesDirectlyIn("src/components"), []);
  });

  test("src/components/pages only holds folders named after a page", () => {
    for (const folder of directories("src/components/pages")) {
      // Home is the root route, so its page file sits directly in src/app.
      const pageFile =
        folder === "home" ? join("src/app", "page.tsx") : join("src/app", folder, "page.tsx");
      assert.ok(
        existsSync(join(ROOT, pageFile)),
        `src/components/pages/${folder} doesn't match a page`,
      );
    }
    assert.deepEqual(filesDirectlyIn("src/components/pages"), []);
  });

  test("every module has an index file", () => {
    const checkModules = (path) => {
      for (const folder of directories(path)) {
        const modulePath = join(path, folder);
        assert.ok(existsSync(join(ROOT, modulePath, "index.ts")), `${modulePath} has no index.ts`);
        checkModules(modulePath);
      }
    };

    checkModules("src/components/_common");
    for (const page of directories("src/components/pages")) {
      checkModules(join("src/components/pages", page));
    }
    assert.ok(existsSync(join(ROOT, "src/theme/index.ts")));
    assert.ok(existsSync(join(ROOT, "src/constants/index.ts")));
  });
});
