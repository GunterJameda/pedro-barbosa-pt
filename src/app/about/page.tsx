import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { fontMono, slate, surfaces } from "@/theme";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { MetricCards } from "@/components/_common/MetricCards";
import { PageHero } from "@/components/_common/PageHero";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";

const HERO_DESCRIPTION =
  "Senior Frontend Engineer based in Porto, Portugal. Focused on building resilient web applications, establishing scalable design systems, and modernising enterprise codebases with clean, maintainable TypeScript.";

export const metadata: Metadata = {
  title: "About",
  description: HERO_DESCRIPTION,
};

const METRICS = [
  {
    label: "Specialisation",
    value: "Frontend Modernisation",
    detail: "Microfrontends, framework upgrades & migrations",
  },
  {
    label: "UI Architecture",
    value: "Design Systems",
    detail: "Atomic design, token systems & JSON schema UI",
  },
  {
    label: "Collaboration",
    value: "Direct & RFC-Driven",
    detail: "Clear specs, code reviews & cross-functional bridge",
  },
  {
    label: "Seniority Focus",
    value: "Senior IC",
    detail: "Individual contributor with end-to-end ownership",
  },
];

const PRINCIPLES = [
  {
    title: "Solve the root need, not just the spec",
    description:
      "Software exists to resolve business and user friction. I probe beyond the surface ticket to understand the underlying requirements, challenging assumptions early before lines of code are written.",
  },
  {
    title: "Pragmatic, high-leverage architecture",
    description:
      "Avoid over-engineering. Pick proven tools that fit the team’s delivery cadence. Clean modular separation, strong TypeScript types, and maintainable state boundaries over trendy complexity.",
  },
  {
    title: "Sustainable extensibility",
    description:
      "Write code that teammates can read, refactor, and extend with confidence. High automated test coverage at integration boundaries and strict design system token reuse.",
  },
  {
    title: "Frictionless UX & perceived performance",
    description:
      "Fast UI transitions, minimal layout shifts, resilient fallback states, and accessible semantics. A polished user interface directly builds trust and product credibility.",
  },
];

const COLLABORATION_METHODS = [
  {
    title: "Collaborative code reviews",
    detail:
      "Reviews are opportunities for shared learning and architectural alignment, not gatekeeping. Constructive feedback focused on maintainability and clarity.",
  },
  {
    title: "Clear written specs & RFCs",
    detail:
      "Drafting lightweight architectural proposals before major refactors ensures team buy-in, surfaces edge cases early, and prevents wasted effort.",
  },
  {
    title: "Cross-functional bridge",
    detail:
      "Working closely with product managers and designers to clarify edge cases, evaluate implementation trade-offs, and turn designs into high-fidelity web experiences.",
  },
];

const SKILL_CATEGORIES = [
  {
    category: "Core Frontend",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Angular",
      "HTML5",
      "CSS3 / Tailwind",
    ],
  },
  {
    category: "State & Data Flow",
    skills: ["React Context API", "Redux", "Recoil", "NgRx", "TanStack Query"],
  },
  {
    category: "UI & Design Systems",
    skills: [
      "Material UI (MUI)",
      "Chakra UI",
      "Design Token Pipelines",
      "JSON-driven UI Rendering",
    ],
  },
  {
    category: "Testing & Quality",
    skills: ["Playwright", "Jest", "Jasmine", "Karma", "Unit & Integration Suites"],
  },
  {
    category: "CI/CD & Toolchains",
    skills: [
      "GitHub Actions",
      "GitLab CI/CD",
      "Bitbucket Pipelines",
      "Jenkins",
      "Vite / Webpack",
    ],
  },
];

const cardTitle = {
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: "-0.025em",
};

const cardBody = {
  fontSize: { xs: 12, sm: 14 },
  lineHeight: 1.625,
};

export default function About() {
  return (
    <>
      <PageMain spacing={10}>
        <PageHero
          eyebrow="Engineering Profile"
          title="About Pedro Barbosa"
          description={HERO_DESCRIPTION}
        />

        <MetricCards metrics={METRICS} />

        <Stack component="section" spacing={4}>
          <SectionHeading
            eyebrow="Core Mindset"
            title="Engineering Principles"
          />
          <CardGrid columns={{ xs: 1, md: 2 }}>
            {PRINCIPLES.map((principle) => (
              <SurfaceCard key={principle.title}>
                <Typography
                  variant="h3"
                  sx={{ ...cardTitle, color: "primary.light" }}
                >
                  {principle.title}
                </Typography>
                <Typography sx={{ ...cardBody, color: slate[300] }}>
                  {principle.description}
                </Typography>
              </SurfaceCard>
            ))}
          </CardGrid>
        </Stack>

        <Stack component="section" spacing={4}>
          <SectionHeading
            eyebrow="Ways of Working"
            title="How I Work in Teams"
          />
          <CardGrid columns={{ xs: 1, md: 3 }}>
            {COLLABORATION_METHODS.map((method) => (
              <SurfaceCard key={method.title}>
                <Typography
                  variant="h3"
                  sx={{ ...cardTitle, color: "common.white" }}
                >
                  {method.title}
                </Typography>
                <Typography sx={{ ...cardBody, color: "text.secondary" }}>
                  {method.detail}
                </Typography>
              </SurfaceCard>
            ))}
          </CardGrid>
        </Stack>

        <Stack component="section" spacing={4}>
          <SectionHeading eyebrow="Technical Stack" title="Skills & Toolbox" />
          <CardGrid columns={{ xs: 1, sm: 2, lg: 3 }}>
            {SKILL_CATEGORIES.map((group) => (
              <SurfaceCard key={group.category} spacing={2}>
                <Eyebrow component="h3" size={12}>
                  {group.category}
                </Eyebrow>
                <TagList tags={group.skills} />
              </SurfaceCard>
            ))}

            <SurfaceCard spacing={2}>
              <Eyebrow component="h3" size={12}>
                  Education & Languages
                </Eyebrow>
              <Box>
                <Typography
                  sx={{ color: "common.white", fontSize: 12, fontWeight: 500 }}
                >
                  BSc in Informatics Engineering
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                  Instituto Superior de Engenharia do Porto (ISEP) · 2014 – 2017
                </Typography>
              </Box>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  pt: 1,
                  color: slate[300],
                  borderTop: `1px solid ${surfaces.hairline}`,
                  fontFamily: fontMono,
                  fontSize: 12,
                }}
              >
                <span>Portuguese (Native)</span>
                <span aria-hidden>•</span>
                <span>English (Fluent)</span>
              </Stack>
            </SurfaceCard>
          </CardGrid>
        </Stack>
      </PageMain>

      <PreFooterCTA
        title="See the engineering work in practice"
        description="Explore 7 years of full-time engineering across fintech, multi-tenant SaaS, and microfrontends."
      />
    </>
  );
}
