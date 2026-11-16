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

describe("file names", () => {
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
