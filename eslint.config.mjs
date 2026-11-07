import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Each folder in src/components/pages belongs to one page.
const PAGE_SCOPES = readdirSync(
  join(import.meta.dirname, "src/components/pages"),
  { withFileTypes: true },
)
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
