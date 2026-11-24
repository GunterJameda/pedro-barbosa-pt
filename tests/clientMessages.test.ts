// @vitest-environment node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { CLIENT_NAMESPACES } from "@/_common/i18n";

const SRC = join(process.cwd(), "src");

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sourceFiles(join(dir, entry.name))
      : /\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)
        ? [join(dir, entry.name)]
        : [],
  );

/** The file an import points at, for the project's own imports only. */
function resolve(from: string, source: string): string | undefined {
  const base = source.startsWith("@/") ? join(SRC, source.slice(2)) : join(dirname(from), source);
  if (!source.startsWith("@/") && !source.startsWith(".")) return undefined;
  for (const candidate of [`${base}.tsx`, `${base}.ts`, join(base, "index.ts")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return undefined;
}

/** Every file a client file pulls into the browser: itself and what it imports, however deep. */
function bundled(entry: string, seen = new Set<string>()): Set<string> {
  if (seen.has(entry)) return seen;
  seen.add(entry);
  const text = readFileSync(entry, "utf8");
  for (const [, source = ""] of text.matchAll(/(?:from|import)\s+"([^"]+)"/g)) {
    const file = resolve(entry, source);
    if (file) bundled(file, seen);
  }
  return seen;
}

const clientEntries = sourceFiles(SRC).filter((file) =>
  /^\s*"use client"/.test(readFileSync(file, "utf8")),
);
const clientFiles = [...new Set(clientEntries.flatMap((entry) => [...bundled(entry)]))];

describe("client messages", () => {
  it("finds the client components", () => {
    expect(clientFiles.length).toBeGreaterThan(10);
  });

  it.each(clientFiles.map((file) => file.slice(SRC.length + 1)))(
    "%s only reads namespaces sent to the browser",
    (name) => {
      const text = readFileSync(join(SRC, name), "utf8");
      const used = [...text.matchAll(/useTranslations\(\s*(?:"([^"]*)")?\s*\)/g)].map(
        (match) => match[1],
      );
      for (const namespace of used) {
        expect(namespace, "useTranslations() without a namespace").toBeTruthy();
        const covered = CLIENT_NAMESPACES.some(
          (sent) => namespace === sent || namespace?.startsWith(`${sent}.`),
        );
        expect(covered, `${namespace} is not in CLIENT_NAMESPACES`).toBe(true);
      }
    },
  );

  it("only lists namespaces that a client component reads", () => {
    const used = clientFiles.flatMap((file) =>
      [...readFileSync(file, "utf8").matchAll(/useTranslations\(\s*"([^"]*)"\s*\)/g)].map(
        (match) => match[1],
      ),
    );
    for (const sent of CLIENT_NAMESPACES) {
      expect(
        used.some((ns = "") => ns === sent || ns.startsWith(`${sent}.`)),
        sent,
      ).toBe(true);
    }
  });
});
