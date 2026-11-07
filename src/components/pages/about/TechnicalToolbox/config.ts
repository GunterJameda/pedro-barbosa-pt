import type { ToolboxGroup } from "./types";

export const TOOLBOX_GROUPS: ToolboxGroup[] = [
  {
    title: "Core & State",
    roleBadge: "Primary Stack",
    description:
      "React, Next.js, and TypeScript daily drivers paired with resilient state management architectures.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "JavaScript (ES6+)",
      "HTML5 / CSS3",
      "Redux & Context API",
      "NgRx & Recoil",
      "Angular / AngularJS",
    ],
    footerLeft: "Production Proficiency",
    footerRight: "Senior · Since 2017",
  },
  {
    title: "UI & Design Systems",
    roleBadge: "Architecture",
    description:
      "Reusable component libraries, design token pipelines, and dynamic JSON-driven UI rendering.",
    skills: [
      "Design System Architecture",
      "JSON-driven Components",
      "Material UI (MUI)",
      "Chakra UI",
      "Tailwind CSS",
      "Accessibility (a11y)",
      "Frontend Modernisation",
    ],
    footerLeft: "Specialisation",
    footerRight: "Scalable UI Systems",
  },
  {
    title: "Testing & CI/CD",
    roleBadge: "Delivery",
    description:
      "End-to-end and unit testing automation with multi-platform continuous integration pipelines.",
    skills: [
      "Jest & Vitest",
      "Playwright",
      "Jasmine & Karma",
      "Unit & E2E Testing",
      "GitHub Actions",
      "GitLab CI/CD",
      "Bitbucket Pipelines",
      "Jenkins",
    ],
    footerLeft: "Pipeline Automation",
    footerRight: "Rigorous CI/CD",
  },
];
