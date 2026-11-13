import GitHubIcon from "@mui/icons-material/GitHub";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ActionButton } from "@/components/_common/ActionButton";
import { CardGrid } from "@/components/_common/CardGrid";
import { CheckList } from "@/components/_common/CheckList";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { FeatureCard } from "@/components/_common/FeatureCard";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { fontMono, slate, surfaces } from "@/theme";

import type { Project } from "./types";

// Takes the GitHub button's place and size, so every card has the same layout.
const privateCodeLabel = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  px: 3,
  py: 1,
  border: `1px solid ${surfaces.white8}`,
  borderRadius: 2,
  color: "text.secondary",
  fontSize: 12,
  fontWeight: 500,
  lineHeight: "16px",
  whiteSpace: "nowrap",
};

interface ProjectCardProps {
  project: Project;
}

/** "2021-05" becomes "May 2021". */
function formatMonth(month: string) {
  return new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ProjectCard({ project }: ProjectCardProps) {
  const period = `${formatMonth(project.started)} - ${
    project.ended ? formatMonth(project.ended) : "Present"
  }`;

  return (
    <SurfaceCard
      component="section"
      id={project.id}
      spacing={4}
      sx={{
        p: { xs: 4, sm: 5 },
        // Keeps the card clear of the sticky Navbar when jumped to.
        scrollMarginTop: 96,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          pb: 3,
          borderBottom: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            color: "primary.light",
            backgroundColor: surfaces.teal10,
            border: `1px solid ${surfaces.teal20}`,
            fontFamily: fontMono,
            fontSize: 12,
          }}
        >
          {project.kind} · {period}
        </Box>
        <Typography variant="mono">{project.status}</Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h2"
            sx={{
              color: "common.white",
              fontSize: { xs: 30, sm: 36 },
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </Typography>
          <Typography
            sx={{
              color: "primary.main",
              fontSize: { xs: 16, sm: 18 },
              fontWeight: 500,
            }}
          >
            {project.tagline}
          </Typography>
        </Stack>
        {project.repoUrl ? (
          <ActionButton href={project.repoUrl} newTab startIcon={<GitHubIcon />}>
            View on GitHub
          </ActionButton>
        ) : (
          <Box sx={privateCodeLabel}>
            <LockOutlinedIcon sx={{ fontSize: 16 }} />
            Private code
          </Box>
        )}
      </Stack>

      <Box sx={{ pt: 1 }}>
        <CardGrid columns={{ xs: 1, lg: 12 }} gap={4}>
          <Stack spacing={2} sx={{ gridColumn: { lg: "span 7" } }}>
            <Eyebrow color="text.secondary" size={12}>
              Project Overview
            </Eyebrow>
            <Typography
              sx={{
                color: slate[300],
                fontSize: { xs: 14, sm: 16 },
                lineHeight: 1.625,
              }}
            >
              {project.summary}
            </Typography>
            <Typography variant="body" sx={{ color: "text.secondary" }}>
              {project.details}
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ gridColumn: { lg: "span 5" } }}>
            <Eyebrow color="text.secondary" size={12}>
              Key Takeaways
            </Eyebrow>
            <CheckList items={project.takeaways} />
          </Stack>
        </CardGrid>
      </Box>

      <CardGrid columns={{ xs: 1, md: 2 }}>
        {project.detailCards.map((card) => (
          <FeatureCard
            key={card.title}
            title={card.title}
            description={card.description}
            sx={{ backgroundColor: surfaces.white2 }}
            footer={<TagList tags={card.tags} />}
          />
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
