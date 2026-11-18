# Architecture

How the code is organised, the rules it follows, and how those rules are checked. The site is a
Next.js App Router project with React, TypeScript and Material UI (MUI).

## Structure

```text
src/
  app/                  Routes only: sitemap, robots, icons, the error and 404 pages
    [locale]/           Every page, its share image, the layout: one copy per language
  _common/              Code used by more than one page (or by the layout)
    components/         Shared components
    constants/          Site-wide values: pages, links, profile, layout sizes
    i18n/               Languages, routing, and one message file per language (en.json, pt-PT.json)
    navigation/         Locale-aware Link, usePathname and getPathname
    theme/              Colour tokens, the MUI theme, text styles and fonts
    utils/              Shared helpers (pageMetadata, localeRoutes, formatMonth...)
  <page>/               Code used by one page only (about, contact, experience, home, projects)
    components/         That page's components
tests/                  Route-level tests, structure tests and helpers
  e2e/                  Playwright end-to-end tests
assets/fonts/           Font files for the share images
```

- `src/app` holds Next.js route files and nothing else: `page.tsx`, `layout.tsx`, `not-found.tsx`,
  `global-not-found.tsx`, `error.tsx`, `global-error.tsx`, `opengraph-image.tsx`, `sitemap.ts`,
  `robots.ts`, the favicon and the icon.
- Every page sits under `src/app/[locale]`, whose layout is the root layout. The language comes from
  that part of the address (see Languages and copy). The sitemap, `robots.txt`, the icons,
  `global-error.tsx` and `global-not-found.tsx` sit directly in `src/app`: they're the same in every
  language.
- `global-not-found.tsx` is the 404 page for every address without a page. It sits outside
  `[locale]`, so it brings the whole document through `_common/components/SiteDocument` (the same
  one the root layout uses) and is in the default language. `[locale]/not-found.tsx` shows the same
  `NotFoundPage` inside the layout when a page calls `notFound()`.
- The error routes only render a shared component. `error.tsx` shows `_common/components/ErrorPage`
  when a page throws, inside the normal layout. `global-error.tsx` shows
  `_common/components/GlobalErrorPage` when the root layout itself fails, so that page brings its
  own `<html>` and `<body>` and uses only inline styles and system fonts: no MUI, theme or web
  fonts, since any of them could be what broke.
- `src/<page>` is named after its route. Home is the root route, so its route files are
  `src/app/[locale]/page.tsx` and `src/app/[locale]/opengraph-image.tsx`, and its code is in
  `src/home`. A page folder
  is never called `src/pages`, which Next.js would read as the Pages Router.
- Inside `_common` and each page folder, code is grouped by kind, one folder per kind:
  `components/`, `constants/`, `hooks/`, `types/`, `utils/` (and `i18n/`, `navigation/` and
  `theme/`, only in `_common`). A
  folder only exists when it has something in it; today the page folders have `components/`, and `experience` also has `hooks/`.
  Helper functions always go in `utils/`, never `helpers/` or `functions/`.
- In `components/`, `hooks/` and `utils/`, every child folder is a module
  (`_common/components/Footer`, `_common/utils/pageMetadata`). `constants/`, `i18n/`,
  `navigation/`, `theme/` and `types/` are one module each.
- `src/_common/constants`, `i18n`, `navigation` and `theme` are the project's base layer. Everything
  else may import them.

### Where a new component goes

1. Used by one page: `src/<page>/components/<Component>`.
2. Used only inside one component: in that component's folder, for example
   `contact/components/EmailCard/CopyEmailButton`.
3. Used by two or more pages, or by the root layout: `src/_common/components/<Component>`.

A helper, hook, constant or type follows the same rule, in the matching kind folder.

When a component gains a second user, it moves up to the nearest level both can import from. The
whole folder moves as one unit, with every nested child module inside it, however deep, and the same
inner structure: nothing is flattened or reshuffled, only the imports that point at it change. For
example, if a second page needed `EmailCard`, `contact/components/EmailCard/` would move to
`_common/components/EmailCard/` with `CopyEmailButton/` still inside it.

There is no generic `common`, `components` or `utils` folder outside these.

## Module rules

Every folder inside a `components/`, `hooks/` or `utils/` kind folder is a module, and so are
`constants/`, `theme/` and `types/` themselves.

- **`index.ts` is the module's public face.** It re-exports what others may use, for example
  `export { EmailCard } from "./EmailCard";`. Every other file in the folder is private.
- **Imports from outside a module go through its index:** `@/_common/components/Footer`, never
  `@/_common/components/Footer/Footer`; `@/_common/constants`, never `@/_common/constants/links`.
- **Imports use `@/`** (which maps to `src/`). A relative `./` import only reaches files of the same
  module or its direct child modules (`./CopyEmailButton`). `../` is never used in `src`.
- **A page's code is private to that page.** `src/app/[locale]/about/**` and `src/about/**` can import
  `@/about/...` and `@/_common/...`, but not `@/contact/...`. Code in `_common`, and route files
  shared by every page (`layout.tsx`, `error.tsx`, `not-found.tsx`), can't import any page's code.
- **Nothing imports from `src/app`.** Routes sit at the top and only consume other code.

## One responsibility per file

A module splits its pieces by kind, one file per kind:

| File              | Holds                                                                      | Example                                            |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| `<Component>.tsx` | The component and its props type, nothing else                             | `Footer.tsx`                                       |
| `constants.ts`    | Fixed values the code relies on: sizes, ids, timings, media queries        | `ScrollToTop/constants.ts`: `SHOW_AFTER_PX = 400`  |
| `content.ts`      | The data the component shows: lists, their order, ids, icons, dates        | `RoleAlignment/content.ts`: each point's key, icon |
| `styles.ts`       | Style objects that are shared or used as a base; one-off `sx` stays in JSX | `ActionButton/styles.ts`: `primaryStyles`          |
| `utils.ts`        | Helper functions, each with a test in `utils.test.ts`                      | `ShareImage/utils.ts`: `shareImageRoute("/about")` |
| `types.ts`        | Types other than the props type                                            | `CopyEmailButton/types.ts`: `CopyStatus`           |
| `index.ts`        | The module's exports                                                       | `export { Footer } from "./Footer";`               |

- A component file's top-level statements may only be imports, re-exports, its one component and
  its `<Component>Props` type. Anything else (a helper, a constant, a second component, another
  type) moves to its own file or module.
- A module only has the files it needs. Many are just a component and an `index.ts`.
- Copy never sits in a component or a `content.ts`: it's in the message files (see Languages and
  copy). A list in `content.ts` names each item's messages by key, typed from the messages, so a
  key that doesn't exist fails the type check.
- Related values stay grouped by topic. `src/_common/constants` has one file per topic (`links.ts`,
  `profile.ts`, `routes.ts`, `layout.ts`, `site.ts`, `status.ts`), all re-exported by
  `src/_common/constants/index.ts`.
- Route files keep only what Next.js needs together: a `page.tsx` holds the page and its
  `generateMetadata`;
  an `opengraph-image.tsx` only re-exports what `shareImageRoute` builds.

## Naming

- Component files are PascalCase: `Footer.tsx`, `CopyEmailButton.tsx`. A component's folder has the
  same name.
- Every other file is camelCase: `styles.ts`, `pageMetadata.ts`, `scaffold.test.mjs`.
- Every other folder is camelCase too: kind folders (`components`, `utils`) and modules without a
  component (`utils/pageMetadata`). `_common` and the page folders, named after their routes, are
  the exceptions.
- A test file is named after the file it tests: `Footer.test.tsx`, `utils.test.ts`.
- Files and folders in `src/app` keep the names Next.js gives them (`page.tsx`,
  `opengraph-image.tsx`).
- Tool config files at the root keep their tools' names (`eslint.config.mjs`, `next.config.ts`).

## Import order

Imports are one block with no blank lines, ordered by layer from the outside in, and A to Z within
each layer. Type imports sit with their layer.

1. Side-effect imports (`import "./global.css"`)
2. Node.js built-ins (`node:fs`)
3. React and Next.js (`react`, `react-dom`, `next`)
4. MUI (`@mui/...`)
5. Other packages (`@vercel/analytics`, `vitest`)
6. The project's base: `@/_common/constants`, `@/_common/i18n`, `@/_common/navigation`,
   `@/_common/theme`
7. Shared helpers: `@/_common/utils/...`
8. Shared components: `@/_common/components/...`
9. The page's own code (`@/contact/...`) and any other `@/` code
10. Test helpers: `@tests/...`
11. The module's own files, in this order: `./constants`, `./content`, `./styles`, `./utils`,
    `./types`, then child modules (`./CopyEmailButton`)

For example, from `CopyEmailButton.tsx`:

```ts
import { useEffect, useRef, useState } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Box from "@mui/material/Box";
import { EMAIL } from "@/_common/constants";
import { ActionButton } from "@/_common/components/ActionButton";
import { RESET_AFTER_MS } from "./constants";
import { LABELS } from "./content";
import type { CopyStatus } from "./types";
```

## How the rules are enforced

The rules above are checked by tools, not left to memory.

- **ESLint** (`eslint.config.mjs`, run with `yarn lint`):
  - `no-restricted-imports` enforces the module boundaries: index-only imports, no `../`, nothing
    from `src/app`, code only in `_common` or a page folder, and only through a module inside a
    kind folder. The list of pages is read from the folders in `src` besides `app` and `_common`,
    and each page (its folder and its route files) gets its own rule set that blocks every other
    page's code. Everything else in `src`, including `_common`, blocks every page's code.
  - `simple-import-sort` enforces the import order and fixes it automatically (VS Code runs the fix
    on save, through `.vscode/settings.json`).
  - `react/jsx-no-target-blank` requires `rel="noopener noreferrer"` on every link that opens a new
    tab, including MUI's `Link` and `Button`, and `react/jsx-no-script-url` rejects `javascript:`
    links. `tests/linkSafety.test.mjs` checks both rules still reject unsafe links.
- **`tests/scaffold.test.mjs`** checks the structure:
  - imports that must be blocked or allowed, run through the real ESLint config, and no violations
    in `src`;
  - `src/app` holds only route files; `src` holds only `app`, `_common` and folders that match a
    page; a page folder and `_common` hold only kind folders; every module has an `index.ts`;
  - file names: it parses each file with the TypeScript compiler, and a file that exports a
    PascalCase component must be PascalCase, while every other file must be camelCase; a folder
    that holds a component file must be PascalCase, and every other folder outside `src/app`
    camelCase;
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

The theme is built in layers in `src/_common/theme`:

1. **`tokens.ts`** defines every colour once: `white`, the `slate` and `teal` scales, and `surfaces`
   (the background, card colours and translucent tints). It isn't a client module, so server code
   can import it.
2. **`theme.ts`** builds the MUI theme from the tokens: a dark palette (`primary`, `background`,
   `text`) plus two custom entries, `surface` and `slate`. `cssVariables: true` makes MUI emit the
   palette as CSS variables. It also sets defaults, such as `Button href` rendering through the
   site's locale-aware `Link` (built on `next/link`), and smooth scrolling unless the visitor
   prefers reduced motion.
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

`PAGES` in `src/_common/constants/routes.ts` lists every page with its key and address, in
navigation order. Several things are built from it, so a new page needs its entry there and its
route files, and nothing else:

- **Navigation:** the navbar and mobile menu links.
- **Page metadata:** each `page.tsx` exports `generateMetadata`, which calls
  `pageMetadata("/about", description)` with its description from the messages. The helper looks
  the address up in `PAGES`, sets the title to the page name, the canonical URL to its address in
  the current language, the language alternates and the link preview, and adds the description
  when there is one. An address missing from `PAGES` throws, so the build fails. The root layout's
  `siteMetadata()` sets `metadataBase`, the title template, the site-wide description and preview.
- **Language alternates:** every page lists its address in every enabled language
  (`<link rel="alternate" hreflang>`), plus `x-default`, the default language's address, built by
  `languageAlternates` from `LOCALES`: `en`, `pt-PT` and `x-default`; a new language shows up there,
  in the sitemap and in the routes as soon as it's enabled.
- **Link previews:** `socialMetadata` sets `og:type`, `og:site_name`, `og:locale` (from
  `OPEN_GRAPH_LOCALES`), `og:locale:alternate` (the other languages') and the share image, for Open Graph and X's large image card. The image is
  set explicitly rather than left to Next.js, which would give it the `[locale]` route's address
  (`/en/about/opengraph-image`) instead of the page's own (`/about/opengraph-image`).
- **Share images:** each route's `opengraph-image.tsx` is three lines around
  `shareImageRoute("/about")`, which returns the image's size, content type, one copy per language
  (`generateStaticParams`) and the image itself, in the language of its address. The image is
  rendered from JSX with `next/og`, using the font files in `assets/fonts`.
- **Sitemap:** `src/app/sitemap.ts` lists every page in every language, as full URLs on `SITE_URL`,
  each with its language alternates.

Also:

- **`robots.ts`** allows every page and points to the sitemap.
- **Structured data:** the home page renders two JSON-LD scripts, `PersonSchema` (a `ProfilePage`
  about a `Person`, built from the constants and messages) and `WebsiteSchema` (the site's name, for
  search results), each with the page's language (`inLanguage`). Both pass their data to `_common/components/JsonLd`, which serializes it with
  `serializeJsonLd` (in its `utils.ts`). That escapes `<`, so a value can't close the script tag or
  open an HTML comment, and the U+2028 and U+2029 separators, which older JavaScript parsers reject
  in strings. Data with no JSON form (a function, or a `toJSON` that returns nothing) throws, so the
  build fails instead of shipping an empty script.
- **Old addresses:** `/home` redirects permanently to `/` (in `next.config.ts`). The English pages'
  internal addresses (`/en`, `/en/about`) redirect permanently to their public ones.

## Languages and copy

The site uses [next-intl](https://next-intl.dev). It is shown in English (`en`, the default) and
European Portuguese (`pt-PT`, at `/pt`).

- **Addresses:** the default language has no prefix (`/about`); any other language gets one
  (`/pt/about`). Every page lives under `src/app/[locale]`; `localeRoutes` (in `_common/utils`)
  builds the rewrites and redirects in `next.config.ts` that map the public addresses onto it, so
  `/about` shows `/en/about` at the same address and `/pt/about` shows `/pt-PT/about`. There is no
  proxy: nothing runs on each request, every page stays static, and the headers are the ones
  `next.config.ts` sets. Nothing on the server detects the browser's language.
- **The visitor's choice:** one cookie, `NEXT_LOCALE` (a first-party, functional preference,
  `SameSite=Lax`, `Path=/`, a year; the names and values are in `_common/i18n/locales.ts`), holds
  `en`, `pt-PT` or `dismissed`. It is written in the browser by `saveLanguageChoice`, before
  navigating, when the visitor picks a language in the switcher or in the suggestion bar, or closes
  the bar. `localeRoutes` turns it into temporary (307) redirects in `next.config.ts` that apply
  only to requests carrying the cookie: with `pt-PT`, an English address redirects to the same page
  under `/pt`; with `en`, a `/pt` address redirects to the English one; any other value, or no
  cookie, redirects nothing. These are rules matched before the pages, so they cost nothing
  per request on the pages themselves and keep them static. Search engines and visitors with no
  cookie always get the page they asked for.
- **The switcher:** `Navbar/LanguageSwitcher` shows a decorative translate icon and `EN · PT`, in the navbar next to the status chip
  and, with the label "Language" / "Idioma", in the phone menu's footer. The current language is
  bold (not only coloured) and has `aria-current`; the other is a plain link to the same page in
  that language, with `lang` and `hreflang`, named by its full language name for screen readers.
  It is a plain link (not next-intl's `Link`, which would point at the internal `/en/...`), so the
  page loads whole in the new language.
- **The suggestion bar:** `SiteDocument/LanguageSuggestion` is a thin bar above the navbar, shown
  only on an English page, to a browser whose `navigator.languages` includes any `pt*`, with no
  saved choice or dismissal: "Este site está disponível em português.", a link to the same page
  in Portuguese and a close button. It reads the browser while hydrating (`useSyncExternalStore`
  with a server snapshot of "hidden"), so it is not in the static HTML and appears after the page
  loads, pushing the page down once, for those visitors only. Its copy is `common.LanguageSuggestion`:
  in `en.json` it is in Portuguese (the bar speaks the suggested language, whatever the page's),
  and `pt-PT.json` holds the English version, unused until a mirror bar for Portuguese pages is
  wanted. There is no such bar for English-speaking visitors on Portuguese pages.
- **The language in code:** pages and layouts read it from the address with `next/root-params`
  (in `_common/i18n/request.ts`), so they stay static; share images get it from their route's
  `params`. Links go through `_common/navigation`'s `Link` (also MUI's link component, through the
  theme), which keeps the visitor's language, and `usePathname` gives the address without the
  prefix. next-intl's own locale cookie is turned off (`localeCookie: false` in `routing.ts`), so
  it doesn't write a second one.
- **Messages:** every piece of copy is in `src/_common/i18n/en.json` and `pt-PT.json`, with the same
  keys (a test checks it): text, labels, aria-labels, alt text, page titles and descriptions, share
  image text and structured data text. Namespaces follow the code: `pages` and `profile` for shared
  names, `common.<Component>` for shared components, `<page>.<Component>` for a page's own, and
  `<page>.page` for a page's route copy. Only values that come from data stay out: my name, email,
  city and links (constants), years and dates (`CAREER_START_YEAR`, `formatMonth`), passed in as
  message arguments (`{careerStartYear}`). Lists of items are keyed objects; lists of tags or bullet
  points are arrays, read with `t.raw`. The Portuguese is European, in the first person, avoiding
  "você"; the city and work-mode values are written so they read right without an article
  ("Sou ... ({city})").
- **Dates:** `formatMonth` writes a month as its short name and the year: "May 2021" in English,
  "mai. 2021" in Portuguese (Portugal's default short date would be "05/2021", so the month's own
  short name is used when the default is numeric).
- **Keys are typed:** `_common/i18n/types.ts` gives next-intl the English messages' shape, so a
  key that doesn't exist fails `yarn typecheck`.
- **The exceptions:** `GlobalErrorPage` keeps its copy in its `content.ts`, in English. It shows
  when the root layout fails, and the layout is what provides the language and messages, so it
  can't count on them. The 404 page for addresses without a page, and the share images' pictures
  (their text is translated; the design is the same), stay as they were.
- **Rich text:** the home page's intro marks its highlights with tags (`<highlight>React</highlight>`).
  Its empty `<gap></gap>` renders nothing: it keeps the comma and the space after it as separate
  text, as the page always had, so the browser lays the line out exactly the same.

To add another language (for example `de` at `/de`):

1. Add `src/_common/i18n/de.json` with the same keys as `en.json`.
2. In `src/_common/i18n/locales.ts`, add it to `LOCALES` and `OPEN_GRAPH_LOCALES`, and to
   `LOCALE_PREFIXES` if its prefix isn't its locale.
3. Add its name to `common.LanguageSwitcher.languages` in every message file, and check
   `formatMonth` and the page descriptions' length (a test) in it.

Its pages, share images, routes, alternates, switcher option, saved-choice redirects and sitemap
entries follow from those.

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
site's theme and the English messages (`withIntl` wraps an element in them), and `tests/setup.ts`
stubs `next/font` and next-intl's server functions, which only work inside a Next.js build. A
missing message fails the test.

Route-level tests in `tests/` find every `page.tsx` in `src/app/[locale]` and check all pages at once:

- `metadata.test.ts`: every page has its own canonical URL, a unique title and description, and a
  description short enough for search results, including the contact page's description for every
  availability setting; the language alternates, `og:locale` and share image addresses, and the 404
  page's title;
- `messages.test.tsx`: every language has exactly English's keys, and every page, the 404 page, the
  layout and the error page only use messages that exist;
- `pageStructure.test.tsx`: each page, and the 404 page, has one `h1`, no skipped heading levels, no
  duplicate ids, and only links to pages and sections that exist;
- `shareImages.test.ts`: every page has its own share image, with alt text for that page, built for
  every language;
- `sitemap.test.ts`: the sitemap lists every page once, and `robots.txt` blocks nothing;
- `redirects.test.ts`: `/home` redirects to `/`, and `/en` addresses to their public ones.

**End-to-end tests** (Playwright, in `tests/e2e`) run against a production build in Chromium,
Firefox and WebKit, each at desktop and phone sizes. A shared fixture fails any test if the browser
logs an error or warning, throws, or gets a failed request.

- `pages.spec.ts`: every page, in both languages, loads with a 200 status and has no accessibility
  violations (axe); missing pages return 404; every English page and the 404 page declare English
  (`lang`, `og:locale`, `hreflang` alternates); `/en` addresses redirect to their public ones; the clean-load test also
  runs against the dev server, where some hydration errors only show up.
- `languages.spec.ts`: the Portuguese pages declare their language and alternates and use
  Portuguese dates; the sitemap lists both languages; the switcher goes both ways, keeps the page and
  saves the choice; the saved choice redirects (and only with the cookie); the suggestion bar shows
  for a Portuguese browser with no saved choice, not in the HTML, not for an English browser, and
  never again after choosing or closing.
- `navigation.spec.ts`: the navbar, the phone menu and the skip link.
- `scrolling.spec.ts`: in-page navigation lands each section below the sticky navbar; the go-to-top
  button.
- `security.spec.ts`: the security headers on every page, a missing page, the share images, the
  sitemap, `robots.txt` and the icons.
- `attacks.spec.ts`: tries the attacks the headers and code guard against. Script payloads in query
  strings, hashes and paths (encoded once and twice, on real and missing pages) are never reflected
  as markup, never add an element and never run; the structured data never contains `<` and parses
  as JSON; `/home`, `/en` and slash tricks like `//evil.example` only redirect within the site; another
  site can't show a page in a frame; every link that opens a new tab has
  `rel="noopener noreferrer"` (including the phone menu), the new tab gets no handle on the site
  and no referrer, and every link starts with `/`, `#`, `https://` or `mailto:`.

They take several minutes, so they don't run in CI. They run locally with `yarn test:e2e` and
against the live site with `yarn test:e2e:prod`.
