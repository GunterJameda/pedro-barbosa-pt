import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Stack from "@mui/material/Stack";
import { CardFooter } from "@/_common/components/CardFooter";
import { CardGrid } from "@/_common/components/CardGrid";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { FeatureCard } from "@/_common/components/FeatureCard";
import { IconBadge } from "@/_common/components/IconBadge";
import { SectionHeading } from "@/_common/components/SectionHeading";
import { PRINCIPLES } from "./content";

export function EngineeringPrinciples() {
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading
        eyebrow="Engineering Principles"
        title="What I Value Most in Code"
        description="A disciplined, grounded perspective cultivated over thousands of pull requests and production releases."
      />
      <CardGrid columns={{ xs: 1, md: 2 }}>
        {PRINCIPLES.map((principle) => (
          <FeatureCard
            key={principle.title}
            title={principle.title}
            description={principle.description}
            header={
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <IconBadge icon={principle.icon} />
                <Eyebrow color="text.secondary">{principle.badge}</Eyebrow>
              </Stack>
            }
            footer={
              <CardFooter sx={{ color: "primary.light", fontSize: 12 }}>
                <CheckCircleOutlinedIcon
                  sx={{ flexShrink: 0, color: "primary.main", fontSize: 14 }}
                />
                <span>{principle.highlight}</span>
              </CardFooter>
            }
          />
        ))}
      </CardGrid>
    </Stack>
  );
}
