import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, test } from "node:test";
import { ESLint } from "eslint";

const ROOT = join(import.meta.dirname, "..");
const FILE = "src/components/_common/Sample/Sample.tsx";
const eslint = new ESLint({ cwd: ROOT });

/** The rules a component breaks, given the JSX it returns. */
async function brokenRules(jsx) {
  const code = [
    'import Button from "@mui/material/Button";',
    'import Link from "@mui/material/Link";',
    "export function Sample({ url }: { url: string }) {",
    `  return ${jsx};`,
    "}",
    "",
  ].join("\n");
  const [result] = await eslint.lintText(code, { filePath: FILE });
  return result.messages.map((message) => message.ruleId);
}

describe("link rules", () => {
  const unsafe = [
    ["a link with no rel", '<a href={url} target="_blank">x</a>'],
    ["a link with only noopener", '<a href={url} target="_blank" rel="noopener">x</a>'],
    ["a Material UI Link", '<Link href={url} target="_blank">x</Link>'],
    [
      "a Material UI Button with a conditional rel",
      '<Button href={url} target="_blank" rel={url ? "noopener" : undefined}>x</Button>',
    ],
  ];

  for (const [name, jsx] of unsafe) {
    test(`rejects a new tab without noreferrer: ${name}`, async () => {
      assert.ok((await brokenRules(jsx)).includes("react/jsx-no-target-blank"));
    });
  }

  test("accepts a new tab with noopener noreferrer", async () => {
    const jsx = '<Link href={url} target="_blank" rel="noopener noreferrer">x</Link>';
    assert.ok(!(await brokenRules(jsx)).includes("react/jsx-no-target-blank"));
  });

  test("rejects a javascript: link", async () => {
    const rules = await brokenRules('<a href="javascript:void(0)">x</a>');
    assert.ok(rules.includes("react/jsx-no-script-url"));
  });
});
