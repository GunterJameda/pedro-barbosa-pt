import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, describe, test } from "node:test";

const HOOK = join(import.meta.dirname, "../.githooks/commit-msg");
const directory = mkdtempSync(join(tmpdir(), "commit-message-"));

after(() => rmSync(directory, { recursive: true, force: true }));

function isAccepted(message) {
  const file = join(directory, "COMMIT_EDITMSG");
  writeFileSync(file, message);
  return spawnSync(HOOK, [file]).status === 0;
}

describe("commit messages", () => {
  const accepted = [
    ["a type and a description", "fix: keep links on one row\n"],
    ["a scope", "feat(navbar): add mobile menu\n"],
    ["a breaking change marker", "refactor(theme)!: rename tokens\n"],
    ["exactly 64 characters", `fix: ${"a".repeat(59)}\n`],
    ["comments added by git", "fix: keep links\n\n# Please enter the message\n"],
    ["the diff added by commit -v", "fix: keep links\n# ------------------------ >8 ------------------------\n# Do not modify\ndiff --git a/a b/a\n"],
    ["merge commits made by git", "Merge branch 'main' into fix\n"],
  ];

  for (const [name, message] of accepted) {
    test(`accepts ${name}`, () => assert.equal(isAccepted(message), true));
  }

  const rejected = [
    ["an empty message", "\n"],
    ["no type", "keep links on one row\n"],
    ["an unknown type", "update: keep links on one row\n"],
    ["an uppercase type", "Fix: keep links on one row\n"],
    ["no description", "fix: \n"],
    ["no space after the colon", "fix:keep links\n"],
    ["65 characters", `fix: ${"a".repeat(60)}\n`],
    ["a body", "fix: keep links\n\nLonger explanation.\n"],
    ["a trailer", "fix: keep links\n\nReviewed-by: Someone <someone@example.com>\n"],
  ];

  for (const [name, message] of rejected) {
    test(`rejects ${name}`, () => assert.equal(isAccepted(message), false));
  }
});
