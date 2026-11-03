import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { surfaces } from "@/theme";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";

interface Metric {
  label: string;
  value: string;
  detail: string;
}

export function MetricCards({ metrics }: { metrics: Metric[] }) {
  return (
    <Box component="section">
      <CardGrid columns={{ xs: 1, sm: 2, lg: 4 }}>
        {metrics.map((metric) => (
          <SurfaceCard key={metric.label}>
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Eyebrow color="text.secondary">{metric.label}</Eyebrow>
              <Typography
                sx={{
                  color: "common.white",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                }}
              >
                {metric.value}
              </Typography>
            </Stack>
            <Typography
              sx={{
                pt: 1,
                color: "text.secondary",
                borderTop: `1px solid ${surfaces.hairline}`,
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              {metric.detail}
            </Typography>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
