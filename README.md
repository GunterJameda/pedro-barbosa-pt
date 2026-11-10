# pedrobarbosa.pt

[![CI](https://github.com/GunterJameda/pedro-barbosa-pt/actions/workflows/ci.yml/badge.svg)](https://github.com/GunterJameda/pedro-barbosa-pt/actions/workflows/ci.yml)

[![Pedro Barbosa, Senior Frontend Engineer](https://pedrobarbosa.pt/opengraph-image)](https://pedrobarbosa.pt)

This is my personal website, live at **[pedrobarbosa.pt](https://pedrobarbosa.pt)**. I'm a Senior Frontend Engineer based in Porto, Portugal, and this is where I share who I am, how I work and what I've built.

## What's inside

- **Home:** a short introduction, with links to the rest of the site.
- **About:** the engineering principles I follow, how I work with teams, and the tools I use.
- **Experience:** my career since 2017, role by role.
- **Personal Projects:** products I build outside work, and how I choose what to build.
- **Contact:** how to reach me.

## Built with

- Next.js and React
- TypeScript
- Material UI
- Hosted on Vercel

## How it's built

It's a small site, but I built it the way I'd build a production project:

- **Reusable pieces.** Components shared across pages live in one place, and the ones a single page needs stay with that page.
- **Structure the code checks itself.** Folder and import rules are enforced automatically by linting and tests, so the structure stays tidy as the site grows.
- **Consistent history.** Every commit message follows the same format, checked before the commit is accepted.
- **Tested and checked on every push.** Tests cover the interactive parts and their edge cases, and every push runs linting, type checks, the tests and a production build. A change only goes live once all of them pass.
- **Ready to be found and shared.** A sitemap, structured data for search engines, and link preview images generated from code.

## Running it locally

You'll need Node.js 24 and Yarn (available through Corepack).

```bash
yarn install
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other commands:

- `yarn build`: production build
- `yarn lint`: lint the code
- `yarn typecheck`: check the types
- `yarn test`: run the tests
