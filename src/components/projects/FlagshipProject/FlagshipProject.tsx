import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { GROWTH_TRACKER_REPO_URL } from "@/constants";
import { fontMono, slate, surfaces } from "@/theme";

const PILLARS = [
  {
    title: "Design Spec Fidelity",
    description:
      "Collaborated with a UI designer, translating Figma layouts, custom token systems, and interaction specs into high-fidelity React components.",
  },
  {
    title: "Data Visualization",
    description:
      "Engineered dynamic financial charts, asset distribution breakdowns, and performance analytics tables using Chart.js with fluid resize behavior.",
  },
  {
    title: "Full-Stack Delivery",
    description:
      "Implemented the Fastify backend runtime, Prisma ORM database models, and PostgreSQL schemas with automated type inference from server to UI.",
  },
];

const TECH_STACK = [
  "React",
  "TypeScript",
  "Material UI",
  "Chart.js",
  "Node.js",
  "Fastify",
  "Prisma",
  "PostgreSQL",
];

export function FlagshipProject() {
  return (
    <SurfaceCard component="article" spacing={4} sx={{ p: { xs: 4, sm: 5 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          pb: 3,
          borderBottom: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Stack spacing={1} sx={{ maxWidth: 672 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignSelf: "flex-start",
              px: 2,
              py: 0.5,
              borderRadius: "999px",
              color: "primary.main",
              backgroundColor: surfaces.teal10,
              border: `1px solid ${surfaces.teal20}`,
              fontFamily: fontMono,
              fontSize: 12,
            }}
          >
            <span>Full-Stack Application</span>
            <span aria-hidden>•</span>
            <span>May 2021 – Jan 2026</span>
          </Stack>
          <Typography
            variant="h2"
            sx={{
              color: "common.white",
              fontSize: { xs: 24, sm: 30 },
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
            }}
          >
            GrowthTracker
          </Typography>
          <Typography
            sx={{ color: "primary.light", fontSize: 14, fontWeight: 500 }}
          >
            Investment Portfolio Analytics & Tracking Platform
          </Typography>
        </Stack>

        <Button
          href={GROWTH_TRACKER_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          sx={{
            alignSelf: "flex-start",
            flexShrink: 0,
            px: 2,
            py: 1,
            borderRadius: 2,
            color: slate[300],
            backgroundColor: surfaces.white4,
            border: `1px solid ${surfaces.white10}`,
            fontSize: 12,
            fontWeight: 500,
            lineHeight: "16px",
            whiteSpace: "nowrap",
            "& .MuiButton-startIcon": { ml: 0, mr: 1 },
            "& .MuiButton-startIcon svg": { fontSize: 14 },
            "&:hover": {
              color: "common.white",
              backgroundColor: surfaces.white8,
              borderColor: surfaces.teal30,
            },
          }}
        >
          View GitHub Repository
        </Button>
      </Stack>

      <Stack spacing={3}>
        <Typography
          sx={{
            color: slate[300],
            fontSize: { xs: 14, sm: 16 },
            lineHeight: 1.625,
          }}
        >
          An investment portfolio tracking application independently built
          end-to-end from designer-provided specifications. Focused on
          responsive data visualizations, clean state management, and strict
          design spec fidelity.
        </Typography>

        <CardGrid columns={{ xs: 1, md: 3 }}>
          {PILLARS.map((pillar) => (
            <SurfaceCard
              key={pillar.title}
              sx={{ p: 2, backgroundColor: surfaces.white2 }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "common.white",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                }}
              >
                {pillar.title}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  lineHeight: 1.625,
                }}
              >
                {pillar.description}
              </Typography>
            </SurfaceCard>
          ))}
        </CardGrid>
      </Stack>

      <Stack
        spacing={1}
        sx={{ pt: 3, borderTop: `1px solid ${surfaces.hairline}` }}
      >
        <Eyebrow color="text.secondary">Technology Stack</Eyebrow>
        <TagList tags={TECH_STACK} />
      </Stack>
    </SurfaceCard>
  );
}
