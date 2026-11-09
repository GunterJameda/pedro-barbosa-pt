import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { IconBadge } from "@/components/_common/IconBadge";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { fontMono, slate, surfaces } from "@/theme";
import { APPROACH_STEPS } from "./config";

export function ProjectApproach() {
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading
        eyebrow="My Approach"
        title="How I Choose What to Build"
        description="I build things because they could be useful, not just to try a new technology."
      />
      <CardGrid columns={{ xs: 1, md: 2 }} gap={3}>
        {APPROACH_STEPS.map((step) => (
          <SurfaceCard
            key={step.title}
            spacing={3}
            sx={{ p: { xs: 3, sm: 4 } }}
          >
            <Stack spacing={2} sx={{ flex: 1 }}>
              <IconBadge icon={step.icon} size={36} iconSize={20} accent />
              <Typography variant="cardTitle">
                {step.title}
              </Typography>
              <Typography variant="body">
                {step.description}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                pt: 2,
                color: "primary.light",
                borderTop: `1px solid ${surfaces.hairline}`,
                fontFamily: fontMono,
                fontSize: 12,
              }}
            >
              <Box component="span" aria-hidden sx={{ color: slate[500] }}>
                →
              </Box>
              <span>{step.note}</span>
            </Stack>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Stack>
  );
}
