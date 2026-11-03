import Stack from "@mui/material/Stack";
import type { Metadata } from "next";
import { CardGrid } from "@/components/_common/CardGrid";
import { PageHero } from "@/components/_common/PageHero";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { SectionLabel } from "@/components/_common/SectionLabel";
import { ExplorationCard } from "@/components/projects/ExplorationCard";
import { FlagshipProject } from "@/components/projects/FlagshipProject";

const HERO_DESCRIPTION =
  "End-to-end applications built to explore new technologies, sharpen full-stack craft, and translate complex UI requirements into working software outside work hours.";

export const metadata: Metadata = {
  title: "Personal Projects",
  description: HERO_DESCRIPTION,
};

const EXPLORATIONS = [
  {
    title: "Full-Stack & Component Architecture",
    category: "Design Systems & Modern Tooling",
    description:
      "Ongoing explorations into modern frontend tooling, design system foundations, microfrontends, and component decoupling patterns.",
    focusAreas: [
      "Vite & Next.js App Router",
      "Design Token Pipelines",
      "Headless UI & Accessibility",
      "State Machine Boundaries",
    ],
  },
  {
    title: "API & Backend Systems",
    category: "Runtimes & Data Modeling",
    description:
      "Building lightweight services to evaluate emerging backend runtimes, database ORMs, contract-first API design, and asynchronous queues.",
    focusAreas: [
      "Fastify & Node.js Runtimes",
      "Prisma ORM & PostgreSQL",
      "OpenAPI / tRPC Contracts",
      "Dockerized Dev Environments",
    ],
  },
];

export default function Projects() {
  return (
    <>
      <PageMain spacing={8}>
        <PageHero
          eyebrow="Independent Work & Craft"
          title="Personal Projects"
          description={HERO_DESCRIPTION}
        />

        <Stack component="section" spacing={2}>
          <SectionLabel
            label="Featured Flagship Project"
            note="Completed Jan 2026 · Independent Exploration"
          />
          <FlagshipProject />
        </Stack>

        <Stack component="section" spacing={3}>
          <SectionHeading
            eyebrow="Technical Focus & Prototyping"
            eyebrowSize={12}
            title="Continuous Learning & Explorations"
            description="Areas of hands-on investigation and prototyping to evaluate current industry patterns and broaden architectural capabilities."
          />
          <CardGrid columns={{ xs: 1, md: 2 }}>
            {EXPLORATIONS.map((track) => (
              <ExplorationCard key={track.title} track={track} />
            ))}
          </CardGrid>
        </Stack>
      </PageMain>

      <PreFooterCTA
        title="Want to collaborate or discuss an opportunity?"
        description="Whether you are planning a modern frontend migration or scaling an engineering squad, let’s talk architecture, execution, and technical fit."
      />
    </>
  );
}
