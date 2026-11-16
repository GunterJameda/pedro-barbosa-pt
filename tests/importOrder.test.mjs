import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, test } from "node:test";
import { ESLint } from "eslint";

const ROOT = join(import.meta.dirname, "..");
const RULE = "simple-import-sort/imports";
const FILE = "tests/sample.tsx";

// Every level once, in the expected order, with type imports at their level.
const SORTED = [
  'import "./global.css";',
  'import { readFileSync } from "node:fs";',
  'import { join } from "node:path";',
  'import type { Metadata } from "next";',
  'import Link from "next/link";',
  'import { useState } from "react";',
  'import { renderToString } from "react-dom/server";',
  'import Box from "@mui/material/Box";',
  'import type { Theme } from "@mui/material/styles";',
  'import { Analytics } from "@vercel/analytics/next";',
  'import { describe } from "vitest";',
  'import { SITE_URL } from "@/_common/constants";',
  'import { theme } from "@/_common/theme";',
  'import { pageMetadata } from "@/_common/utils/pageMetadata";',
  'import { Footer } from "@/_common/components/Footer";',
  'import { EmailCard } from "@/contact/components/EmailCard";',
  'import { renderWithTheme } from "@tests/render";',
  'import { SIZE } from "./constants";',
  'import { TITLE } from "./content";',
  'import { cardSx } from "./styles";',
  'import { format } from "./utils";',
  'import type { CardProps } from "./types";',
  'import { Child } from "./Child";',
];

const SHUFFLED = [
  SORTED[19],
  SORTED[6],
  "",
  SORTED[17],
  SORTED[13],
  "",
  "",
  SORTED[22],
  SORTED[2],
  SORTED[9],
  "",
  SORTED[0],
  SORTED[21],
  SORTED[15],
  SORTED[4],
  "",
  SORTED[11],
  SORTED[8],
  SORTED[1],
  "",
  SORTED[16],
  SORTED[5],
  SORTED[20],
  SORTED[10],
  SORTED[3],
  "",
  SORTED[18],
  SORTED[12],
  SORTED[7],
  SORTED[14],
];

const BODY = "\nexport const used = 1;\n";
const source = (lines) => `${lines.join("\n")}\n${BODY}`;

async function lint(code, fix) {
  const eslint = new ESLint({ cwd: ROOT, fix });
  const [result] = await eslint.lintText(code, { filePath: join(ROOT, FILE) });
  return result;
}

describe("import order", () => {
  test("the sample is shuffled across every level", () => {
    assert.deepEqual([...SHUFFLED].filter(Boolean).sort(), [...SORTED].sort());
  });

  test("sorts shuffled imports into one block, by layer", async () => {
    const result = await lint(source(SHUFFLED), true);
    assert.equal(result.output, source(SORTED));
  });

  test("accepts imports already in order", async () => {
    const result = await lint(source(SORTED), false);
    assert.deepEqual(
      result.messages.filter((message) => message.ruleId === RULE),
      [],
    );
  });

  test("rejects a blank line between imports", async () => {
    const lines = [...SORTED.slice(0, 5), "", ...SORTED.slice(5)];
    const result = await lint(source(lines), false);
    assert.ok(result.messages.some((message) => message.ruleId === RULE));
  });
});
