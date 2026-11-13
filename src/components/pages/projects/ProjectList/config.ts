import { GITHUB_URL } from "@/constants";
import type { Project } from "./ProjectCard";

/** Newest first. */
export const PROJECTS: Project[] = [
  {
    id: "pedrobarbosa-pt",
    name: "pedrobarbosa.pt",
    tagline: "The website you're on, built and run like a product",
    kind: "Frontend Product",
    category: "Personal website",
    started: "2026-11",
    status: "Open source · Live",
    repoUrl: `${GITHUB_URL}/pedro-barbosa-pt`,
    summary:
      "My personal website, where I show my experience and projects. I treat it like a product at work: a prioritised backlog, small focused commits, and checks that must pass before anything goes live.",
    details:
      "Every push runs linting, type checks, tests and a production build, and a failing check blocks the deploy. The code is public, so you can see how I work, not just read about it.",
    takeaways: [
      {
        title: "Quality gates",
        text:
          "Lint, type checks, tests and a build run on every push, and nothing deploys unless they pass.",
      },
      {
        title: "Tests that survive refactors",
        text:
          "Tests check behaviour and edge cases through what visitors see, so they only change when the behaviour does.",
      },
      {
        title: "Structure with rules",
        text:
          "Folder and import rules are enforced by lint, so each file's scope is clear from its path.",
      },
    ],
    detailCards: [
      {
        title: "Frontend Implementation",
        description:
          "Responsive pages rendered on the server, one theme for every colour and text style, and share images and structured data for search and social links.",
        tags: ["Next.js", "React", "TypeScript", "Material UI"],
      },
      {
        title: "Quality & Delivery",
        description:
          "Component and page tests on every push, with deployments that wait for them to pass, plus browser and accessibility tests in Chromium, Firefox and WebKit, run locally and against the live site.",
        tags: ["Vitest", "Testing Library", "Playwright", "GitHub Actions", "Vercel"],
      },
    ],
  },
  {
    id: "growth-tracker",
    name: "Growth Tracker",
    tagline: "An investment tracker that shows your real average price",
    kind: "Full-Stack Product",
    category: "Investment tracker",
    started: "2021-05",
    ended: "2026-01",
    status: "Independent product · Launched, retired Jan 2026",
    summary:
      "A product I took from idea to launch. Users logged their assets, buys and sells, and Growth Tracker calculated the average price they could actually trust when deciding to sell.",
    details:
      "Buy 3 units at 500 and sell 1 at 700, and a typical broker app shows an average of 400, even though the remaining units still cost 500. Growth Tracker kept that number accurate, so users could aim for a profit on every unit they sold.",
    takeaways: [
      {
        title: "Product ownership",
        text:
          "Defined the business rules and requirements myself, starting from a problem I had.",
      },
      {
        title: "End-to-end delivery",
        text:
          "Built every layer, from the database to the interface, and took it to launch.",
      },
      {
        title: "Making value obvious",
        text:
          "Learned that a strong feature isn't enough if users can't see its value. I had plans to address it, but the money ran out first.",
      },
    ],
    detailCards: [
      {
        title: "Frontend Implementation",
        description:
          "Implemented a designer's visual design, including asset management, the transactions table, and a chart tracking how the real average price evolved with each transaction.",
        tags: ["React", "TypeScript", "Material UI", "Chart.js"],
      },
      {
        title: "Backend & Core Logic",
        description:
          "Built the backend and data model, plus the complex algorithm behind the real average price, covering scenarios like sales made below it.",
        tags: ["Node.js", "Fastify", "Prisma", "PostgreSQL"],
      },
    ],
  },
];
