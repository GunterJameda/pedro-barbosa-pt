# Architecture

How the code is organised, the rules it follows, and how those rules are checked. The site is a
Next.js App Router project with React, TypeScript and Material UI (MUI).

## Structure

```text
src/
  app/                  Routes only: pages, layout, metadata routes, share images
  components/
    _common/            Components used by more than one page (or by the layout)
    pages/
      <page>/           Components used by one page only (about, contact, experience, home, projects)
  constants/            Site-wide values: pages, links, profile, layout sizes
  theme/                Colour tokens, the MUI theme, text styles and fonts
tests/                  Route-level tests, structure tests and helpers
  e2e/                  Playwright end-to-end tests
assets/fonts/           Font files for the share images
```

- `src/app` holds Next.js route files and nothing else: `page.tsx`, `layout.tsx`, `not-found.tsx`,
  `error.tsx`, `global-error.tsx`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, the favicon and
  the icon.
- The error routes only render a shared component. `error.tsx` shows `_common/ErrorPage` when a page
  throws, inside the normal layout. `global-error.tsx` shows `_common/GlobalErrorPage` when the root
  layout itself fails, so that page brings its own `<html>` and `<body>` and uses only inline styles
  and system fonts: no MUI, theme or web fonts, since any of them could be what broke.
- `src/components/pages/<page>` is named after its route. Home is the root route, so its page file
  is `src/app/page.tsx` and its components are in `src/components/pages/home`.
- `src/constants` and `src/theme` are the project's base layer. Everything else may import them.

### Where a new component goes

1. Used by one page: `src/components/pages/<page>/<Component>`.
2. Used only inside one component: in that component's folder, for example
   `pages/contact/EmailCard/CopyEmailButton`.
3. Used by two or more pages, or by the root layout: `src/components/_common/<Component>`.

When a component gains a second user, it moves up to the nearest level both can import from. The
whole folder moves as one unit, with every nested child module inside it, however deep, and the same
inner structure: nothing is flattened or reshuffled, only the imports that point at it change. For
example, if a second page needed `EmailCard`, `pages/contact/EmailCard/` would move to
`_common/EmailCard/` with `CopyEmailButton/` still inside it.

There is no generic `common` or `utils` folder outside these.

## Module rules

Every folder under `src/components`, plus `src/constants` and `src/theme`, is a module.

- **`index.ts` is the module's public face.** It re-exports what others may use, for example
  `export { EmailCard } from "./EmailCard";`. Every other file in the folder is private.
- **Imports from outside a module go through its index:** `@/components/_common/Footer`, never
  `@/components/_common/Footer/Footer`; `@/constants`, never `@/constants/links`.
- **Imports use `@/`** (which maps to `src/`). A relative `./` import only reaches files of the same
  module or its direct child modules (`./CopyEmailButton`). `../` is never used in `src`.
- **A page's components are private to that page.** `src/app/about/page.tsx` and
  `src/components/pages/about/**` can import `@/components/pages/about/...`, but not
  `@/components/pages/contact/...`. Shared components in `_common` can't import page components.
- **Nothing imports from `src/app`.** Routes sit at the top and only consume other code.

## One responsibility per file

A module splits its pieces by kind, one file per kind:

| File              | Holds                                                                      | Example                                            |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| `<Component>.tsx` | The component and its props type, nothing else                             | `Footer.tsx`                                       |
| `constants.ts`    | Fixed values the code relies on: sizes, ids, timings, media queries        | `ScrollToTop/constants.ts`: `SHOW_AFTER_PX = 400`  |
| `content.ts`      | The copy and data the component shows: lists, labels, structured data      | `CopyEmailButton/content.ts`: one label per status |
| `styles.ts`       | Style objects that are shared or used as a base; one-off `sx` stays in JSX | `ActionButton/styles.ts`: `primaryStyles`          |
| `utils.ts`        | Helper functions, each with a test in `utils.test.ts`                      | `ProjectCard/utils.ts`: `formatMonth("2021-05")`   |
| `types.ts`        | Types other than the props type                                            | `CopyEmailButton/types.ts`: `CopyStatus`           |
| `index.ts`        | The module's exports                                                       | `export { Footer } from "./Footer";`               |

- A component file's top-level statements may only be imports, re-exports, its one component and
  its `<Component>Props` type. Anything else (a helper, a constant, a second component, another
  type) moves to its own file or module.
- A module only has the files it needs. Many are just a component and an `index.ts`.
- Short copy passed straight to a component as JSX props or children stays in the component, for
  example the title and description in `ContactHero.tsx`. Lists and records of copy go in
  `content.ts`.
- Related values stay grouped by topic. `src/constants` has one file per topic (`links.ts`,
  `profile.ts`, `routes.ts`, `layout.ts`, `site.ts`, `status.ts`), all re-exported by
  `src/constants/index.ts`.
- Route files keep only what Next.js needs together: a `page.tsx` holds the page and its `metadata`;
  an `opengraph-image.tsx` only re-exports what `shareImageRoute` builds.

## Naming

- Component files are PascalCase: `Footer.tsx`, `CopyEmailButton.tsx`. A component's folder has the
  same name.
- Every other file is camelCase: `styles.ts`, `pageMetadata.ts`, `scaffold.test.mjs`.
- A test file is named after the file it tests: `Footer.test.tsx`, `utils.test.ts`.
- Files in `src/app` keep the names Next.js gives them (`page.tsx`, `opengraph-image.tsx`).
- Tool config files at the root keep their tools' names (`eslint.config.mjs`, `next.config.ts`).

## Import order

Imports are one block with no blank lines, ordered by layer from the outside in, and A to Z within
each layer. Type imports sit with their layer.

1. Side-effect imports (`import "./global.css"`)
2. Node.js built-ins (`node:fs`)
3. React and Next.js (`react`, `react-dom`, `next`)
4. MUI (`@mui/...`)
5. Other packages (`@vercel/analytics`, `vitest`)
6. The project's base: `@/constants`, `@/theme`
7. Shared components: `@/components/_common/...`
8. Page components: `@/components/pages/...`
9. Any other `@/` code
10. Test helpers: `@tests/...`
11. The module's own files, in this order: `./constants`, `./content`, `./styles`, `./utils`,
    `./types`, then child modules (`./CopyEmailButton`)

For example, from `CopyEmailButton.tsx`:

```ts
import { useEffect, useRef, useState } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Box from "@mui/material/Box";
import { EMAIL } from "@/constants";
import { ActionButton } from "@/components/_common/ActionButton";
import { RESET_AFTER_MS } from "./constants";
import { LABELS } from "./content";
import type { CopyStatus } from "./types";
```

## How the rules are enforced

The rules above are checked by tools, not left to memory.

- **ESLint** (`eslint.config.mjs`, run with `yarn lint`):
  - `no-restricted-imports` enforces the module boundaries: index-only imports, no `../`, nothing
    from `src/app`, components only in `_common` or `pages/<page>`. The list of pages is read from
    the folders in `src/components/pages`, and each page gets its own rule set that blocks every
    other page's components.
  - `simple-import-sort` enforces the import order and fixes it automatically (VS Code runs the fix
    on save, through `.vscode/settings.json`).
  - `react/jsx-no-target-blank` requires `rel="noopener noreferrer"` on every link that opens a new
    tab, including MUI's `Link` and `Button`, and `react/jsx-no-script-url` rejects `javascript:`
    links. `tests/linkSafety.test.mjs` checks both rules still reject unsafe links.
- **`tests/scaffold.test.mjs`** checks the structure:
  - imports that must be blocked or allowed, run through the real ESLint config, and no violations
    in `src`;
  - `src/app` holds only route files; `src/components` holds only `_common` and `pages`; every
    folder in `pages` matches a route; every module has an `index.ts`;
  - file names: it parses each file with the TypeScript compiler, and a file that exports a
    PascalCase component must be PascalCase, while every other file must be camelCase;
  - one responsibility per file: a component file declares nothing at the top level besides
    imports, re-exports, one component and its `<Component>Props` type, and the failure message
    says where the extra piece should go.
- **`tests/importOrder.test.mjs`** shuffles one import from every layer, runs ESLint's fix, and
  checks the result comes back in the expected order as one block.
- **Prettier** formats every file (`yarn format`, checked with `yarn format:check`), with a print
  width of 100. `.editorconfig` sets the same basics for any editor.
- **Commit messages** are checked by `.githooks/commit-msg`: one line, at most 64 characters,
  Conventional Commits format (`fix(navbar): keep links on one row`). `yarn install` points Git at
  the hook, and `tests/commitMessage.test.mjs` tests it.
- **Types** are checked with `yarn typecheck`. On top of `strict`, `tsconfig.json` turns on
  `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`,
  `noFallthroughCasesInSwitch` and `noImplicitReturns`, and targets ES2022.
- **CI** (`.github/workflows/ci.yml`) runs on every push to `main` and every pull request:
  `yarn lint`, `yarn format:check`, `yarn typecheck`, `yarn test` and `yarn build`. Vercel waits for
  this check before putting a deploy live.

## Theming

The theme is built in layers in `src/theme`:

1. **`tokens.ts`** defines every colour once: `white`, the `slate` and `teal` scales, and `surfaces`
   (the background, card colours and translucent tints). It isn't a client module, so server code
   can import it.
2. **`theme.ts`** builds the MUI theme from the tokens: a dark palette (`primary`, `background`,
   `text`) plus two custom entries, `surface` and `slate`. `cssVariables: true` makes MUI emit the
   palette as CSS variables. It also sets defaults, such as `Button href` rendering through
   `next/link`, and smooth scrolling unless the visitor prefers reduced motion.
3. **`types.ts`** adds the custom palette entries and text styles to MUI's types through module
   augmentation, so `"surface.card"` and `variant="sectionTitle"` are type-checked.
4. **`typography.ts`** defines the site's text styles as custom Typography variants (`pageTitle`,
   `sectionTitle`, `cardTitle`, `body`, `mono` and others), with responsive sizes and the HTML
   element each one renders by default (`pageTitle` is an `h1`, `sectionTitle` an `h2`).
5. **`fonts.ts`** loads Plus Jakarta Sans and JetBrains Mono through `next/font/google` and exposes
   them as the CSS variables `--font-sans` and `--font-mono`, set on `<html>` in the root layout.

How components pick a colour:

- **By palette key**, in `sx`: `color: "text.secondary"`, `borderColor: "surface.hairline"`,
  `color: "slate.300"`. A colour inside a longer value, like a shadow, comes from
  `theme.vars.palette`.
- **With the tokens directly**, only where there is no theme: the share image
  (`ShareImage.tsx`) and SVG attributes (`CareerChart`'s line colour).
- Two places repeat a few colour values on purpose, as the comment in `tokens.ts` notes:
  `src/app/icon.svg`, a static file, and `GlobalErrorPage/styles.ts`, which can't count on the theme
  loading.

## Metadata and SEO

`PAGES` in `src/constants/routes.ts` lists every page with its name and address, in navigation
order. Several things are built from it, so a new page needs its entry there and its route files,
and nothing else:

- **Navigation:** the navbar and mobile menu links.
- **Page metadata:** each `page.tsx` exports `metadata = pageMetadata("/about", "...")`. The helper
  looks the address up in `PAGES`, sets the title to the page name and the canonical URL to its
  address, and adds the description when there is one. An address missing from `PAGES` throws, so
  the build fails. The root layout sets `metadataBase`, the title template and the site-wide
  description.
- **Share images:** each route's `opengraph-image.tsx` is three lines around
  `shareImageRoute("/about")`, which returns the image's alt text, size, content type and the image
  itself. The image is rendered from JSX with `next/og`, using the font files in `assets/fonts`.
- **Sitemap:** `src/app/sitemap.ts` maps `PAGES` to full URLs on `SITE_URL`.

Also:

- **`robots.ts`** allows every page and points to the sitemap.
- **Structured data:** the home page renders two JSON-LD scripts, `PersonSchema` (a `ProfilePage`
  about a `Person`, built from the constants) and `WebsiteSchema` (the site's name, for search
  results). Both pass their data to `_common/JsonLd`, which serializes it with `serializeJsonLd`
  (in its `utils.ts`). That escapes `<`, so a value can't close the script tag or open an HTML
  comment, and the U+2028 and U+2029 separators, which older JavaScript parsers reject in strings.
  Data with no JSON form (a function, or a `toJSON` that returns nothing) throws, so the build fails
  instead of shipping an empty script.
- **Old addresses:** `/home` redirects permanently to `/` (in `next.config.ts`).

## Security headers

`next.config.ts` sends these headers on every route, including the 404 page, the share images,
the sitemap and `robots.txt`:

- **Content Security Policy:** `default-src 'self'`, so only the site's own files load. Images also
  allow `data:` and `blob:`. `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` and
  `frame-ancestors 'none'` close the other common gaps. `script-src-attr 'none'` blocks inline event
  handlers (`onerror=`, `onclick=`), the usual way injected HTML runs a script; React attaches its
  events in code, so the site has none.
- **`X-Frame-Options: DENY`** blocks framing in older browsers.
- **`Strict-Transport-Security: max-age=63072000`**: browsers only reach the site over HTTPS for
  two years after a visit. Vercel sends the same by default; setting it here keeps it from
  depending on the host. Browsers ignore it over plain HTTP, so local runs are unaffected.
- **`Referrer-Policy: strict-origin-when-cross-origin`**: other sites only learn the domain a visitor
  came from.
- **`X-Content-Type-Options: nosniff`**.
- **`Permissions-Policy`** turns off device features the site never uses (camera, microphone,
  geolocation, payment, USB, browsing topics).
- **`Cross-Origin-Opener-Policy: same-origin`**: pages opened from the site can't reach back into
  it.

Why `script-src` and `style-src` include `'unsafe-inline'`: Next.js and React put small inline
scripts in every page, and MUI injects its styles inline. The strict alternative, a nonce per
request, would make every page render on each request and lose static pages and Partial
Prerendering. The site takes no input from visitors, so there is nothing to inject an inline script
through. In development only, `script-src` also allows `'unsafe-eval'` (React's debugging tools)
and Vercel Analytics' debug script.

Why there is no Trusted Types (`require-trusted-types-for 'script'`): Next's chunk loader, React
and Vercel Analytics set script addresses and HTML directly, so every browser that supports it
would block the site's own code.

Links are checked too. ESLint requires `rel="noopener noreferrer"` on every link that opens a new
tab and rejects `javascript:` links (see How the rules are enforced), and the end-to-end tests try
the attacks these protections stop (see Testing).

## Testing

`yarn test` runs two test runners:

- **Node's test runner** runs the `tests/*.test.mjs` files: the structure, import order, link
  safety and commit message checks described above.
- **Vitest** with Testing Library, in jsdom, runs everything else.

Component and helper tests sit next to the code they test, for example
`Navbar/MobileMenu/MobileMenu.test.tsx` and `ProjectCard/utils.test.ts`. They test behaviour and
edge cases through what a visitor sees: roles, labels, text. `tests/render.tsx` renders with the
site's theme, and `tests/setup.ts` stubs `next/font`, which only works inside a Next.js build.

Route-level tests in `tests/` find every `page.tsx` in `src/app` and check all pages at once:

- `metadata.test.ts`: every page has its own canonical URL, a unique title and description, and a
  description short enough for search results, including the contact page's description for every
  availability setting;
- `pageStructure.test.tsx`: each page, and the 404 page, has one `h1`, no skipped heading levels, no
  duplicate ids, and only links to pages and sections that exist;
- `shareImages.test.ts`: every page has its own share image, with alt text for that page;
- `sitemap.test.ts`: the sitemap lists every page once, and `robots.txt` blocks nothing;
- `redirects.test.ts`: `/home` redirects to `/`.

**End-to-end tests** (Playwright, in `tests/e2e`) run against a production build in Chromium,
Firefox and WebKit, each at desktop and phone sizes. A shared fixture fails any test if the browser
logs an error or warning, throws, or gets a failed request.

- `pages.spec.ts`: every page loads with a 200 status and has no accessibility violations (axe);
  missing pages return 404; the clean-load test also runs against the dev server, where some
  hydration errors only show up.
- `navigation.spec.ts`: the navbar, the phone menu and the skip link.
- `scrolling.spec.ts`: in-page navigation lands each section below the sticky navbar; the go-to-top
  button.
- `security.spec.ts`: the security headers on every page, a missing page, the share images, the
  sitemap, `robots.txt` and the icons.
- `attacks.spec.ts`: tries the attacks the headers and code guard against. Script payloads in query
  strings, hashes and paths (encoded once and twice, on real and missing pages) are never reflected
  as markup, never add an element and never run; the structured data never contains `<` and parses
  as JSON; `/home` and slash tricks like `//evil.example` only redirect within the site; another
  site can't show a page in a frame; every link that opens a new tab has
  `rel="noopener noreferrer"` (including the phone menu), the new tab gets no handle on the site
  and no referrer, and every link starts with `/`, `#`, `https://` or `mailto:`.

They take several minutes, so they don't run in CI. They run locally with `yarn test:e2e` and
against the live site with `yarn test:e2e:prod`.
