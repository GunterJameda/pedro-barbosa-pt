import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import { fontMono } from "@/_common/theme";
import { CardFooter } from "@/_common/components/CardFooter";
import { CardGrid } from "@/_common/components/CardGrid";
import { FeatureCard } from "@/_common/components/FeatureCard";
import { IconBadge } from "@/_common/components/IconBadge";
import { SectionHeading } from "@/_common/components/SectionHeading";
import { APPROACH_STEPS } from "./content";

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
                <ArrowForwardIcon sx={{ fontSize: 14, color: "slate.500" }} />
                <span>{step.note}</span>
              </CardFooter>
            }
          />
        ))}
      </CardGrid>
    </Stack>
  );
}
