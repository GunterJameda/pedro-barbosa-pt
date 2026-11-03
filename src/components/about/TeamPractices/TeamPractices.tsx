import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { IconBadge } from "@/components/about/IconBadge";
import { fontMono, slate, surfaces } from "@/theme";
import { TEAM_PRACTICES } from "./config";

export function TeamPractices() {
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading
        eyebrow="Methodology & Culture"
        title="How I Work in Teams"
        description="Software is built by people, not just pull requests. Here is how I collaborate day-to-day to keep teams moving smoothly."
      />
      <CardGrid columns={{ xs: 1, md: 3 }}>
        {TEAM_PRACTICES.map((practice) => (
          <SurfaceCard key={practice.title} spacing={2}>
            <Stack spacing={2} sx={{ flex: 1 }}>
              <IconBadge icon={practice.icon} />
              <Typography
                variant="h3"
                sx={{
                  color: "common.white",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                {practice.title}
              </Typography>
              <Typography
                sx={{
                  color: slate[300],
                  fontSize: { xs: 12, sm: 14 },
                  lineHeight: 1.625,
                }}
              >
                {practice.description}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                pt: 2,
                color: "text.secondary",
                borderTop: `1px solid ${surfaces.hairline}`,
                fontFamily: fontMono,
                fontSize: 11,
              }}
            >
              <span>{practice.tagLeft}</span>
              <Typography
                component="span"
                sx={{ color: "primary.main", font: "inherit" }}
              >
                {practice.tagRight}
              </Typography>
            </Stack>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Stack>
  );
}
