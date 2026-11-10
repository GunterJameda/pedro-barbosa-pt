import type { CareerRole } from "./types";

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "teya",
    industry: "Financial Operations SaaS",
    company: "Teya",
    roleTitle: "Senior Frontend Engineer",
    period: "Oct 2025 – Jul 2026",
    tags: ["React", "Next.js", "TypeScript", "Context API", "Material UI", "Recoil", "Redux"],
    bulletPoints: [
      "Proactively identified and implemented codebase improvements in an existing financial operations application, balancing structural refactoring alongside accelerated feature delivery.",
      "Contributed to deep state-management migrations from legacy Redux and Recoil architectures directly to idiomatic Context API patterns, minimizing mental overhead and bundle weight.",
      "Spearheaded component migrations from Chakra UI to an internal Material UI-based unified design system, including a dynamic component engine that rendered complex workflows straight from JSON configurations and data schemas.",
    ],
  },
  {
    id: "tillster",
    industry: "Enterprise Quick-Service Ordering",
    company: "Tillster",
    roleTitle: "Senior Frontend Engineer",
    period: "May 2023 – Feb 2025",
    tags: ["AngularJS", "Ionic v1", "JavaScript", "Stripe API", "Multi-Tenant UI"],
    bulletPoints: [
      "Maintained and extended an expansive multi-tenant platform supporting production web and hybrid mobile applications, precisely adapting interfaces and localized business logic for high-volume international restaurant brands.",
      "Implemented a unified Stripe payment integration, dynamically configuring the payment form's appearance, verification flow, and client branding via tenant schema rules.",
      "Owned feature implementation, comprehensive integration tests, and structured handoff to QA teams, resolving regression defects and orchestrating zero-downtime production rollouts.",
    ],
  },
  {
    id: "pricehubble",
    industry: "Real Estate AI & PropTech",
    company: "PriceHubble",
    roleTitle: "Frontend Engineer",
    period: "May 2022 – May 2023",
    tags: ["single-spa", "React", "Next.js", "TypeScript", "Angular", "CI/CD Workflows"],
    bulletPoints: [
      "Partnered directly with another engineer to plan, architect, and deliver the initial phase of decomposing a massive Angular monolith into microfrontends, segregating business domains cleanly.",
      "Established isolated repositories and CI/CD deployment pipelines using single-spa orchestration for route coordination, unlocking autonomous deployment pipelines for independent product squads.",
      "Engineered a redesigned user onboarding wizard in React and Next.js, iterating in close synchronization with product designers to refine UX heuristics and optimize step-completion metrics.",
    ],
  },
  {
    id: "luxclusif",
    industry: "Luxury E-Commerce Tech",
    company: "Luxclusif",
    roleTitle: "Frontend Engineer",
    period: "Oct 2020 – May 2022",
    tags: ["React", "TypeScript", "Material UI", "Component Systems", "Workflow Automation"],
    bulletPoints: [
      "Joined as the company's first frontend developer, single-handedly setting engineering conventions and building the flagship application to streamline second-hand luxury handbag acquisition and authentication.",
      "Architected and published version 1.0 of the company's internal component library, standardizing interaction design, visual tokens, and reusable primitives across distributed business tools.",
    ],
  },
];
