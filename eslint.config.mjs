import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

// Each folder in src/components/pages belongs to one page.
const PAGE_SCOPES = readdirSync(join(import.meta.dirname, "src/components/pages"), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const INDEX_ONLY = "Import from the module's index, not a file inside it.";

const MODULE_RULES = [
  { regex: "^@/components/_common/[^/]+/.+", message: INDEX_ONLY },
  { regex: "^@/components/pages/[^/]+/[^/]+/.+", message: INDEX_ONLY },
  { regex: "^@/(theme|constants)/.+", message: INDEX_ONLY },
  { regex: "^\\./[^/]+/.+", message: INDEX_ONLY },
  {
    regex: "^@/components/(?!_common/|pages/[^/]+/)",
    message: "Components live in _common or in pages/<page>.",
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
          regex: `^@/components/pages/${page}(/|$)`,
          message: `These components are private to the ${page} page.`,
        })),
      ],
    },
  ],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Imports are one block with no blank lines, ordered by layer and A to Z
  // within each one: side-effect imports, node: built-ins, react and next,
  // @mui, other packages, @/constants and @/theme, @/components/_common,
  // @/components/pages, any other @/ code, @tests/ helpers, then the
  // module's own files (constants, content, config, styles, utils, types)
  // and its child modules. Type imports end in \u0000, so each pattern
  // allows it.
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
              "^@/(constants|theme)(/|\\u0000|$)",
              "^@/components/_common(/|\\u0000|$)",
              "^@/components/pages(/|\\u0000|$)",
              "^@/",
              "^@tests/",
              "^\\./constants\\u0000?$",
              "^\\./content\\u0000?$",
              "^\\./config\\u0000?$",
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
  ...PAGE_SCOPES.map((page) => ({
    files: [
      // Home is the root route, so its page file sits directly in src/app.
      page === "home" ? "src/app/page.tsx" : `src/app/${page}/**/*.{ts,tsx}`,
      `src/components/pages/${page}/**/*.{ts,tsx}`,
    ],
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
