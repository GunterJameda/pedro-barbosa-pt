import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Stack from "@mui/material/Stack";
import { CardFooter } from "@/components/_common/CardFooter";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { FeatureCard } from "@/components/_common/FeatureCard";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { IconBadge } from "@/components/_common/IconBadge";
import { PRINCIPLES } from "./config";

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
                <Eyebrow color="text.secondary" size={10}>
                  {principle.badge}
                </Eyebrow>
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
