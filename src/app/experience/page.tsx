import Stack from "@mui/material/Stack";
import type { Metadata } from "next";
import { MetricCards } from "@/components/_common/MetricCards";
import { PageHero } from "@/components/_common/PageHero";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { SectionLabel } from "@/components/_common/SectionLabel";
import { AcademicBackground } from "@/components/experience/AcademicBackground";
import { CompanyNavigation } from "@/components/experience/CompanyNavigation";
import { RoleCard } from "@/components/experience/RoleCard";

const HERO_DESCRIPTION =
  "A chronological track record of shipping production web applications, migrating legacy architectures to modern microfrontends, and building scalable design systems since 2017.";

export const metadata: Metadata = {
  title: "Experience",
  description: HERO_DESCRIPTION,
};

const METRICS = [
  {
    label: "Tenure",
    value: "Since 2017",
    detail: "Continuous production web engineering & distributed delivery",
  },
  {
    label: "Track Record",
    value: "7 Roles Shipped",
    detail: "Enterprise monoliths, multi-tenant apps & scale-ups",
  },
  {
    label: "Primary Stack",
    value: "React & Next.js",
    detail: "TypeScript, design systems & microfrontend migration",
  },
  {
    label: "Availability",
    value: "Immediate",
    detail: "Porto, Portugal · Remote & Hybrid Senior Engineer roles",
  },
];

const ROLES = [
  {
    id: "teya",
    category: "Financial Operations SaaS",
    company: "Teya",
    title: "Senior Frontend Engineer",
    period: "Oct 2025 – Jul 2026",
    contributions: [
      "Proactively identified and implemented codebase improvements in an existing financial operations application, balancing structural refactoring alongside ongoing fintech feature delivery.",
      "Contributed to deep state-management migrations from legacy Redux and Recoil architectures directly to idiomatic Context API patterns, minimizing mental overhead and bundle weight.",
      "Spearheaded component migrations from Chakra UI to an internal Material UI-based unified design system, including a dynamic component engine that rendered complex workflows straight from JSON configurations and data schemas.",
    ],
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Context API",
      "Material UI",
      "Recoil",
      "Redux",
    ],
  },
  {
    id: "tillster",
    category: "Enterprise Quick-Service Ordering",
    company: "Tillster",
    title: "Senior Frontend Engineer",
    period: "May 2023 – Feb 2025",
    contributions: [
      "Maintained and extended an expansive multi-tenant platform supporting production web and hybrid mobile applications, precisely adapting interfaces and localized business logic for high-volume international restaurant brands.",
      "Implemented a unified Stripe payment integration, dynamically configuring the payment form’s appearance, verification flow, and client branding via tenant schema rules.",
      "Owned feature implementation, comprehensive integration tests, and structured handoff to QA teams, resolving regression defects and orchestrating zero-downtime production rollouts.",
    ],
    techStack: [
      "AngularJS",
      "Ionic v1",
      "JavaScript",
      "Stripe API",
      "Multi-Tenant UI",
    ],
  },
  {
    id: "pricehubble",
    category: "Real Estate AI & PropTech",
    company: "PriceHubble",
    title: "Frontend Engineer",
    period: "May 2022 – May 2023",
    contributions: [
      "Partnered directly with another engineer to plan, architect, and deliver the initial phase of decomposing a massive Angular monolith into microfrontends, segregating business domains cleanly.",
      "Established isolated repositories and CI/CD deployment pipelines using single-spa orchestration for route coordination, unlocking autonomous deployment pipelines for independent product squads.",
      "Engineered a redesigned user onboarding wizard in React and Next.js, collaborating directly with product designers to refine UX heuristics and optimize step-completion metrics.",
    ],
    techStack: ["single-spa", "React", "Next.js", "Angular", "CI/CD Workflows"],
  },
  {
    id: "luxclusif",
    category: "Luxury E-Commerce Tech",
    company: "Luxclusif",
    title: "Frontend Engineer",
    period: "Oct 2020 – May 2022",
    contributions: [
      "Joined as the company’s first frontend developer, single-handedly setting engineering conventions and building the flagship application to streamline second-hand luxury handbag acquisition and authentication.",
      "Architected and published version 1.0 of the company’s internal component library, standardizing interaction design, visual tokens, and reusable primitives across distributed business tools.",
    ],
    techStack: [
      "React",
      "Material UI",
      "Component Systems",
      "Workflow Automation",
    ],
  },
  {
    id: "labsforge",
    category: "Consulting & Cloud",
    company: "LabsForge Consulting",
    title: "Frontend Engineer",
    period: "Jan 2019 – Jun 2020",
    contributions: [
      "Sole developer of AlbumTeller, an application combining photography album production tools into a single seamless workflow.",
      "Built dynamic layout tooling and connected to serverless cloud backends for render queues.",
    ],
    techStack: ["Angular", "Node.js", "AWS Serverless"],
  },
  {
    id: "huub",
    category: "Supply Chain Tech",
    company: "HUUB",
    title: "Junior Frontend Engineer",
    period: "Jun 2018 – Jan 2019",
    contributions: [
      "Developed a specialized warehouse quality control application supporting real-time inspection workflows for incoming clothing garments and manufacturing defect auditing.",
    ],
    techStack: ["Angular", "TypeScript", "Logistics UX"],
  },
  {
    id: "glintt",
    category: "Healthcare Informatics",
    company: "Glintt",
    title: "Junior Frontend Engineer",
    period: "Jul 2017 – Mar 2018",
    contributions: [
      "Developed an enterprise healthcare application supporting rigorous clinical trial data collection, participant management, and protocol tracking workflows.",
    ],
    techStack: ["Angular", "JavaScript", "Clinical Systems"],
  },
];

export default function Experience() {
  return (
    <PageMain spacing={8}>
      <PageHero
        eyebrow="Career Timeline & Architectural Impact"
        title="Professional Experience"
        description={HERO_DESCRIPTION}
      />

      <MetricCards metrics={METRICS} />

      <CompanyNavigation roles={ROLES} />

      <Stack component="section" spacing={3}>
        <SectionLabel
          component="h2"
          label="Detailed Work History"
          note="Ordered Chronologically (Most Recent First)"
        />

        {ROLES.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}

        <AcademicBackground />
      </Stack>

      <PreFooterCTA
        title="Interested in discussing a role or viewing code?"
        description="Whether you are planning a modern frontend migration or scaling an engineering squad, let’s talk architecture, execution, and technical fit."
        secondaryButtonText="Explore Personal Projects"
        secondaryButtonHref="/projects"
      />
    </PageMain>
  );
}
