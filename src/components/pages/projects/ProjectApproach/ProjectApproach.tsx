import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { CardFooter } from "@/components/_common/CardFooter";
import { CardGrid } from "@/components/_common/CardGrid";
import { FeatureCard } from "@/components/_common/FeatureCard";
import { IconBadge } from "@/components/_common/IconBadge";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { fontMono, slate } from "@/theme";
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
          <FeatureCard
            key={step.title}
            title={step.title}
            description={step.description}
            spacing={3}
            sx={{ p: { xs: 3, sm: 4 } }}
            header={<IconBadge icon={step.icon} size={36} iconSize={20} accent />}
            footer={
              <CardFooter
                sx={{
                  color: "primary.light",
                  fontFamily: fontMono,
                  fontSize: 12,
                }}
              >
                <Box component="span" aria-hidden sx={{ color: slate[500] }}>
                  →
                </Box>
                <span>{step.note}</span>
              </CardFooter>
            }
          />
        ))}
      </CardGrid>
    </Stack>
  );
}
