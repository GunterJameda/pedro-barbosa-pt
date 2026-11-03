import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { IconBadge } from "@/components/_common/IconBadge";
import { slate, surfaces } from "@/theme";
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
          <SurfaceCard key={principle.title} spacing={2}>
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <IconBadge icon={principle.icon} />
                <Eyebrow color="text.secondary" size={10}>
                  {principle.badge}
                </Eyebrow>
              </Stack>
              <Typography
                variant="h3"
                sx={{
                  color: "common.white",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                {principle.title}
              </Typography>
              <Typography
                sx={{
                  color: slate[300],
                  fontSize: { xs: 12, sm: 14 },
                  lineHeight: 1.625,
                }}
              >
                {principle.description}
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
                fontSize: 12,
              }}
            >
              <CheckCircleOutlinedIcon
                sx={{ flexShrink: 0, color: "primary.main", fontSize: 14 }}
              />
              <span>{principle.highlight}</span>
            </Stack>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Stack>
  );
}
