import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardFooter } from "@/components/_common/CardFooter";
import { CardGrid } from "@/components/_common/CardGrid";
import { FeatureCard } from "@/components/_common/FeatureCard";
import { IconBadge } from "@/components/_common/IconBadge";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { fontMono } from "@/theme";

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
          <FeatureCard
            key={practice.title}
            title={practice.title}
            description={practice.description}
            header={<IconBadge icon={practice.icon} />}
            footer={
              <CardFooter
                useFlexGap
                sx={{
                  justifyContent: "space-between",
                  // On narrow cards the right label moves below, whole.
                  flexWrap: "wrap",
                  rowGap: 0.5,
                  "& > *": { whiteSpace: "nowrap" },
                  color: "text.secondary",
                  fontFamily: fontMono,
                  fontSize: 12,
                }}
              >
                <span>{practice.tagLeft}</span>
                <Typography component="span" sx={{ color: "primary.main", font: "inherit" }}>
                  {practice.tagRight}
                </Typography>
              </CardFooter>
            }
          />
        ))}
      </CardGrid>
    </Stack>
  );
}
