import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

// Every folder in src besides app and _common belongs to one page.
const PAGE_SCOPES = readdirSync(join(import.meta.dirname, "src"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !["app", "_common"].includes(entry.name))
  .map((entry) => entry.name);

// Kind folders whose every child folder is a module (components/Footer).
const MODULE_KINDS = "components|hooks|utils";
// Kind folders that are a module themselves (constants).
const SINGLE_MODULE_KINDS = "constants|theme|types";

const INDEX_ONLY = "Import from the module's index, not a file inside it.";

const MODULE_RULES = [
  { regex: `^@/[^/]+/(${MODULE_KINDS})/[^/]+/.+`, message: INDEX_ONLY },
  { regex: `^@/[^/]+/(${SINGLE_MODULE_KINDS})/.+`, message: INDEX_ONLY },
  { regex: "^\\./[^/]+/.+", message: INDEX_ONLY },
  {
    regex: `^@/(?!(app|_common|${PAGE_SCOPES.join("|")})(/|$))`,
    message: "src only holds app, _common and one folder per page.",
  },
  {
    regex: `^@/(?!app(/|$))[^/]+(/(?!(${MODULE_KINDS})/[^/]+$|(${SINGLE_MODULE_KINDS})$)|$)`,
    message: "Import a module: <page or _common>/<kind>/<Module>, or <kind> for constants.",
  },
  {
    regex: "^@/app(/|$)",
    message: "src/app only holds routes. Nothing should import from it.",
  },
  {
    regex: "^\\.\\.(/|$)",
    message: "Use an @/ import. Relative paths only stay inside a module.",
  },
];

const boundaries = (currentPage) => ({
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        ...MODULE_RULES,
        ...PAGE_SCOPES.filter((page) => page !== currentPage).map((page) => ({
          regex: `^@/${page}(/|$)`,
          message: `This code is private to the ${page} page.`,
        })),
      ],
    },
  ],
});

// Home is the root route, so its route files sit directly in src/app.
const routeFiles = (page) =>
  page === "home"
    ? ["src/app/page.tsx", "src/app/opengraph-image.tsx"]
    : [`src/app/${page}/**/*.{ts,tsx}`];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Imports are one block with no blank lines, ordered by layer and A to Z
  // within each one: side-effect imports, node: built-ins, react and next,
  // @mui, other packages, @/_common/constants and @/_common/theme,
  // @/_common/utils, @/_common/components, the page's own code (any other
  // @/ import), @tests/ helpers, then the module's own files (constants,
  // content, styles, utils, types) and its child modules. Type imports end
  // in \u0000, so each pattern allows it.
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^\\u0000",
              "^node:",
              "^(react|react-dom|next)(/|\\u0000|$)",
              "^@mui/",
              "^@?\\w",
              "^@/_common/(constants|theme)(/|\\u0000|$)",
              "^@/_common/utils(/|\\u0000|$)",
              "^@/_common/components(/|\\u0000|$)",
              "^@/",
              "^@tests/",
              "^\\./constants\\u0000?$",
              "^\\./content\\u0000?$",
              "^\\./styles\\u0000?$",
              "^\\./utils\\u0000?$",
              "^\\./types\\u0000?$",
              "^\\.",
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: boundaries(null),
  },
  // A link that opens a new tab must not let that tab reach back into the
  // site (rel="noopener noreferrer"), and no link may run code (javascript:).
  {
    files: ["src/**/*.tsx"],
    // Material UI's Link and Button render a link when given an href.
    settings: { linkComponents: ["Link", "Button"] },
    rules: {
      "react/jsx-no-target-blank": [
        "error",
        { allowReferrer: false, enforceDynamicLinks: "always" },
      ],
      "react/jsx-no-script-url": "error",
    },
  },
  ...PAGE_SCOPES.map((page) => ({
    files: [...routeFiles(page), `src/${page}/**/*.{ts,tsx}`],
    rules: boundaries(page),
  })),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
