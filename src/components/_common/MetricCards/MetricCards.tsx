import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import type { Metric } from "./types";

export function MetricCards({ metrics }: { metrics: Metric[] }) {
  return (
    <Box sx={{ pt: 2 }}>
      <CardGrid columns={{ xs: 1, sm: 2, lg: 4 }}>
        {metrics.map((metric) => (
          <SurfaceCard key={metric.tag}>
            <Eyebrow color="text.secondary" size={10}>
              {metric.tag}
            </Eyebrow>
            <Typography
              sx={{
                color: "common.white",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.025em",
              }}
            >
              {metric.title}
            </Typography>
            <Typography
              sx={{ color: "text.secondary", fontSize: 12, lineHeight: 1.625 }}
            >
              {metric.description}
            </Typography>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
