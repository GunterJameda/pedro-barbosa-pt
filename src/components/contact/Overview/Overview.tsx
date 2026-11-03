import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";

const OVERVIEW = [
  {
    label: "Location",
    value: "Porto, Portugal",
    detail: "Timezone: UTC+0 / WET",
  },
  {
    label: "Role Fit",
    value: "Senior Frontend Engineer",
    detail: "React · Next.js · TypeScript · Angular",
  },
  {
    label: "Work Modes",
    value: "Remote & Hybrid",
    detail: "Immediate availability",
  },
];

export function Overview() {
  return (
    <SurfaceCard component="section" sx={{ p: { xs: 3, sm: 4 } }}>
      <CardGrid columns={{ xs: 1, sm: 3 }} gap={3}>
        {OVERVIEW.map((item) => (
          <Stack key={item.label} spacing={0.5}>
            <Eyebrow>{item.label}</Eyebrow>
            <Typography
              sx={{ color: "common.white", fontSize: 14, fontWeight: 500 }}
            >
              {item.value}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              {item.detail}
            </Typography>
          </Stack>
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
