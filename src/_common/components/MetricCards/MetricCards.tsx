import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/_common/components/CardGrid";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import type { Metric } from "./types";

export function MetricCards({ metrics }: { metrics: Metric[] }) {
  return (
    <Box sx={{ pt: 2 }}>
      <CardGrid columns={{ xs: 1, sm: 2, lg: 4 }}>
        {metrics.map((metric) => (
          <SurfaceCard key={metric.tag}>
            <Eyebrow color="text.secondary">{metric.tag}</Eyebrow>
            <Typography variant="itemTitle">{metric.title}</Typography>
            <Typography variant="small">{metric.description}</Typography>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
