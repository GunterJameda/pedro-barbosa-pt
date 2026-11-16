import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import { describe, test } from "node:test";
import { ESLint } from "eslint";
import ts from "typescript";

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

// Kind folders whose every child folder is a module (components/Footer).
const MODULE_KINDS = new Set(["components", "hooks", "utils"]);
// Every kind folder a page may hold; constants and types are one module themselves.
const PAGE_KINDS = new Set([...MODULE_KINDS, "constants", "types"]);
// _common also holds the theme.
const COMMON_KINDS = new Set([...PAGE_KINDS, "theme"]);

// Every folder in src besides app and _common belongs to one page.
const pageFolders = directories("src").filter((folder) => !["app", "_common"].includes(folder));

const filesDirectlyIn = (path) =>
  readdirSync(join(ROOT, path), { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

// Every folder inside path, at any depth, relative to the root.
const foldersIn = (path) =>
  readdirSync(join(ROOT, path), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => relative(ROOT, join(entry.parentPath, entry.name)));

describe("import rules", () => {
  const ABOUT = "src/app/about/page.tsx";
  const CONTACT = "src/app/contact/page.tsx";
  const HOME = "src/app/page.tsx";
  const HOME_SHARE_IMAGE = "src/app/opengraph-image.tsx";
  const LAYOUT = "src/app/layout.tsx";
  const ABOUT_MODULE = "src/about/components/AboutHero/AboutHero.tsx";
  const CONTACT_MODULE = "src/contact/components/EmailCard/EmailCard.tsx";
  const COMMON_MODULE = "src/_common/components/Footer/Footer.tsx";
  const COMMON_UTIL = "src/_common/utils/pageMetadata/pageMetadata.ts";

  const blocked = [
    ["a private file of a common module", "@/_common/components/Footer/Footer", ABOUT],
    [
      "a private file of a common module from a page's code",
      "@/_common/components/Footer/Footer",
      ABOUT_MODULE,
    ],
    ["a private file of a common helper", "@/_common/utils/pageMetadata/pageMetadata", ABOUT],
    ["a private file of a page module", "@/contact/components/EmailCard/EmailCard", CONTACT],
    [
      "a child nested inside a page module",
      "@/contact/components/EmailCard/CopyEmailButton",
      CONTACT,
    ],
    ["a private theme file", "@/_common/theme/tokens", ABOUT],
    ["a private constants file", "@/_common/constants/links", ABOUT],
    ["anything from src/app", "@/app/about/page", COMMON_MODULE],
    ["a folder that is neither _common nor a page", "@/components/_common/Footer", ABOUT],
    ["_common itself", "@/_common", ABOUT],
    ["a kind folder itself", "@/_common/components", ABOUT],
    ["a module outside a kind folder", "@/_common/Footer", ABOUT],
    ["a module directly inside a page folder", "@/contact/EmailCard", CONTACT],
    ["a page folder itself", "@/contact", CONTACT],
    ["another page's code", "@/contact/components/EmailCard", ABOUT],
    [
      "another page's code from a page's components",
      "@/contact/components/EmailCard",
      ABOUT_MODULE,
    ],
    ["home's code from another page", "@/home/components/QuickLinks", ABOUT],
    [
      "another page's code from home's share image",
      "@/about/components/AboutHero",
      HOME_SHARE_IMAGE,
    ],
    ["page code from a _common component", "@/contact/components/EmailCard", COMMON_MODULE],
    ["page code from a _common helper", "@/contact/components/EmailCard", COMMON_UTIL],
    ["page code from a shared route file", "@/home/components/QuickLinks", LAYOUT],
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
    ["a common module", "@/_common/components/Footer", ABOUT],
    ["a common module from a page's code", "@/_common/components/Footer", ABOUT_MODULE],
    ["a common module from another common module", "@/_common/components/Eyebrow", COMMON_MODULE],
    ["a common helper", "@/_common/utils/pageMetadata", ABOUT],
    ["a page's own components", "@/contact/components/EmailCard", CONTACT],
    ["a page's own constants", "@/contact/constants", CONTACT_MODULE],
    ["home's code from the root page", "@/home/components/QuickLinks", HOME],
    ["home's code from the root share image", "@/home/components/QuickLinks", HOME_SHARE_IMAGE],
    [
      "sibling components in the same page folder",
      "@/contact/components/LinkedInCard",
      CONTACT_MODULE,
    ],
    ["the theme module", "@/_common/theme", ABOUT],
    ["the constants module", "@/_common/constants", ABOUT],
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

  test("src only holds app, _common and folders named after a page", () => {
    for (const folder of pageFolders) {
      // Home is the root route, so its page file sits directly in src/app.
      const pageFile =
        folder === "home" ? join("src/app", "page.tsx") : join("src/app", folder, "page.tsx");
      assert.ok(existsSync(join(ROOT, pageFile)), `src/${folder} doesn't match a page`);
    }
    assert.deepEqual(filesDirectlyIn("src"), []);
  });

  test("a page folder only holds kind folders", () => {
    for (const page of pageFolders) {
      const others = directories(join("src", page)).filter((folder) => !PAGE_KINDS.has(folder));
      assert.deepEqual(others, [], `src/${page} holds folders that aren't a kind`);
      assert.deepEqual(filesDirectlyIn(join("src", page)), [], `src/${page} holds files`);
    }
  });

  test("_common only holds kind folders", () => {
    const others = directories("src/_common").filter((folder) => !COMMON_KINDS.has(folder));
    assert.deepEqual(others, []);
    assert.deepEqual(filesDirectlyIn("src/_common"), []);
  });

  test("every module has an index file", () => {
    const checkModules = (path) => {
      for (const folder of directories(path)) {
        const modulePath = join(path, folder);
        assert.ok(existsSync(join(ROOT, modulePath, "index.ts")), `${modulePath} has no index.ts`);
        checkModules(modulePath);
      }
    };

    for (const scope of ["_common", ...pageFolders]) {
      for (const kind of directories(join("src", scope))) {
        const kindPath = join("src", scope, kind);
        if (!MODULE_KINDS.has(kind)) {
          assert.ok(existsSync(join(ROOT, kindPath, "index.ts")), `${kindPath} has no index.ts`);
        }
        checkModules(kindPath);
      }
    }
  });
});

const PASCAL_CASE = /^[A-Z][a-zA-Z0-9]*$/;
// Wrappers that turn a function into a component.
const COMPONENT_WRAPPERS = new Set(["memo", "forwardRef", "lazy", "styled"]);
const CODE = new Set([".ts", ".tsx", ".mjs", ".js"]);
// Next.js names these files itself and requires what sits in them, so the file checks skip them.
const EXEMPT_FOLDERS = ["src/app/"];

const parse = (file) =>
  ts.createSourceFile(file, readFileSync(join(ROOT, file), "utf8"), ts.ScriptTarget.Latest, true);

const isExported = (node) =>
  ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);

const wrapperName = (expression) => {
  while (ts.isCallExpression(expression)) expression = expression.expression;
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  return ts.isIdentifier(expression) ? expression.text : undefined;
};

const isComponentValue = (value) =>
  value !== undefined &&
  (ts.isArrowFunction(value) ||
    ts.isFunctionExpression(value) ||
    (ts.isCallExpression(value) && COMPONENT_WRAPPERS.has(wrapperName(value))));

const isComponentDeclaration = (declaration) =>
  ts.isIdentifier(declaration.name) &&
  PASCAL_CASE.test(declaration.name.text) &&
  isComponentValue(declaration.initializer);

/** A component file exports a PascalCase function, or a PascalCase const holding one. */
const isComponentFile = (file) =>
  parse(file).statements.some((statement) => {
    if (!isExported(statement)) return false;
    if (ts.isFunctionDeclaration(statement)) {
      return PASCAL_CASE.test(statement.name?.text ?? "");
    }
    if (ts.isVariableStatement(statement)) {
      return statement.declarationList.declarations.some(isComponentDeclaration);
    }
    return false;
  });

// Read from disk, not from git, so a case-only rename on a case-insensitive disk shows up.
const codeFiles = ["src", "tests"]
  .flatMap(filesIn)
  .map((file) => relative(ROOT, file))
  .filter((file) => CODE.has(extname(file)))
  .filter((file) => !EXEMPT_FOLDERS.some((folder) => file.startsWith(folder)));

const isTestFile = (file) => /\.(test|spec)\.[^.]+$/.test(file);

describe("names", () => {
  const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;

  // The part before the first dot, so Footer.test.tsx and navigation.spec.ts are named by their base.
  const baseName = (file) => basename(file).split(".")[0];

  test("component files use PascalCase and every other file uses camelCase", () => {
    const sources = codeFiles.filter((file) => !isTestFile(file));
    const components = new Set(
      sources.filter(isComponentFile).map((file) => join(dirname(file), baseName(file))),
    );

    const misnamed = codeFiles.flatMap((file) => {
      const name = baseName(file);
      // A test is named after the file it tests when one sits next to it, and camelCase otherwise.
      const isComponent = components.has(join(dirname(file), name));
      if (isComponent) {
        return PASCAL_CASE.test(name) ? [] : [`${file} is a component, so it needs PascalCase`];
      }
      return CAMEL_CASE.test(name) ? [] : [`${file} isn't a component, so it needs camelCase`];
    });

    assert.deepEqual(misnamed, []);
  });

  test("component folders use PascalCase and every other folder uses camelCase", () => {
    const sources = new Set(codeFiles.filter((file) => !isTestFile(file)));
    // A module holds a component when a file directly inside it is a component file.
    const holdsComponent = (folder) =>
      filesDirectlyIn(folder).some(
        (name) => sources.has(join(folder, name)) && isComponentFile(join(folder, name)),
      );

    // src/app follows Next.js routes, and _common and the page folders are checked by the
    // folder structure tests, so the names start at the kind folders.
    const folders = directories("src")
      .filter((scope) => scope !== "app")
      .flatMap((scope) => foldersIn(join("src", scope)));

    const misnamed = folders.flatMap((folder) => {
      const name = basename(folder);
      if (holdsComponent(folder)) {
        return PASCAL_CASE.test(name)
          ? []
          : [`${folder} holds a component, so it needs PascalCase`];
      }
      return CAMEL_CASE.test(name)
        ? []
        : [`${folder} doesn't hold a component, so it needs camelCase`];
    });

    assert.deepEqual(misnamed, []);
  });
});

describe("one responsibility per file", () => {
  const MOVE_HINT = "move it to styles.ts, utils.ts, constants.ts, content.ts or types.ts";

  // Statements that only wire the file up, like "use client", imports and re-exports.
  const isWiring = (statement) =>
    (ts.isExpressionStatement(statement) && ts.isStringLiteral(statement.expression)) ||
    ts.isImportDeclaration(statement) ||
    ts.isImportEqualsDeclaration(statement) ||
    ts.isExportDeclaration(statement) ||
    (ts.isExportAssignment(statement) && ts.isIdentifier(statement.expression));

  const isTypeDeclaration = (statement) =>
    ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement);

  // What a statement declares, or its first line when it declares nothing by name.
  const declaredName = (statement) =>
    statement.name?.getText() ?? statement.getText().split("\n")[0];

  /** A component file holds one component, its props type, and nothing else at the top level. */
  const responsibilityProblems = (file) => {
    const components = [];
    const types = [];
    const others = [];
    for (const statement of parse(file).statements) {
      if (isWiring(statement)) continue;
      if (ts.isFunctionDeclaration(statement) && PASCAL_CASE.test(statement.name?.text ?? "")) {
        components.push(statement.name.text);
      } else if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          const target = isComponentDeclaration(declaration) ? components : others;
          target.push(declaration.name.getText());
        }
      } else if (isTypeDeclaration(statement)) {
        types.push(statement.name.text);
      } else {
        others.push(declaredName(statement));
      }
    }

    const [component, ...extraComponents] = components;
    const propsName = `${component}Props`;
    const otherTypes = types.filter((name) => name !== propsName);
    const extraProps = types.filter((name) => name === propsName).slice(1);
    return [
      ...others.map((name) => `${file} declares ${name}; ${MOVE_HINT}`),
      ...extraComponents.map(
        (name) => `${file} declares a second component ${name}; give it its own module`,
      ),
      ...otherTypes.map(
        (name) => `${file} declares ${name}, which isn't ${propsName}; move it to types.ts`,
      ),
      ...extraProps.map((name) => `${file} declares ${name} more than once; keep one`),
    ];
  };

  test("component files hold only their component and its props type", () => {
    const problems = codeFiles
      .filter((file) => !isTestFile(file))
      .filter(isComponentFile)
      .flatMap(responsibilityProblems);
    assert.deepEqual(problems, []);
  });
});
