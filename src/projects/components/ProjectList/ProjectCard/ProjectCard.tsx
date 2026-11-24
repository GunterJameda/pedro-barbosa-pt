import GitHubIcon from "@mui/icons-material/GitHub";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import { SCROLL_OFFSET } from "@/_common/constants";
import { formatMonth } from "@/_common/utils/formatMonth";
import { ActionButton } from "@/_common/components/ActionButton";
import { CardGrid } from "@/_common/components/CardGrid";
import { CheckList } from "@/_common/components/CheckList";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { FeatureCard } from "@/_common/components/FeatureCard";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { TagList } from "@/_common/components/TagList";
import { privateCodeLabel } from "./styles";
import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("projects.ProjectCard");
  const locale = useLocale();
  const period = t("period", {
    start: formatMonth(project.started, locale),
    end: project.ended ? formatMonth(project.ended, locale) : t("present"),
  });

  return (
    <SurfaceCard
      component="section"
      id={project.id}
      spacing={4}
      sx={{
        p: { xs: 4, sm: 5 },
        // Keeps the card clear of the sticky Navbar when jumped to.
        scrollMarginTop: SCROLL_OFFSET,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          pb: 3,
          borderBottom: 1,
          borderColor: "surface.hairline",
        }}
      >
        <Typography
          variant="mono"
          component="div"
          sx={{
            alignSelf: "flex-start",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            color: "primary.light",
            backgroundColor: "surface.teal10",
            border: 1,
            borderColor: "surface.teal20",
          }}
        >
          {project.kind} · {period}
        </Typography>
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
          <Typography variant="featureHeading">{project.name}</Typography>
          <Typography variant="tagline">{project.tagline}</Typography>
        </Stack>
        {project.repoUrl ? (
          <ActionButton href={project.repoUrl} newTab startIcon={<GitHubIcon />}>
            {t("repo")}
          </ActionButton>
        ) : (
          <Box sx={privateCodeLabel}>
            <LockOutlinedIcon sx={{ fontSize: 16 }} />
            {t("privateCode")}
          </Box>
        )}
      </Stack>

      <Box sx={{ pt: 1 }}>
        <CardGrid columns={{ xs: 1, lg: 12 }} gap={4}>
          <Stack spacing={2} sx={{ gridColumn: { lg: "span 7" } }}>
            <Eyebrow color="text.secondary">{t("overview")}</Eyebrow>
            <Typography variant="bodyLarge">{project.summary}</Typography>
            <Typography variant="body" sx={{ color: "text.secondary" }}>
              {project.details}
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ gridColumn: { lg: "span 5" } }}>
            <Eyebrow color="text.secondary">{t("takeaways")}</Eyebrow>
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
            sx={{ backgroundColor: "surface.white2" }}
            footer={<TagList tags={card.tags} />}
          />
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
