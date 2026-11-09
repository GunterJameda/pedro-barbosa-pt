import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { IconBadge } from "@/components/_common/IconBadge";
import { fontMono, surfaces } from "@/theme";
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
              <Typography variant="cardTitle">
                {practice.title}
              </Typography>
              <Typography variant="body">
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
