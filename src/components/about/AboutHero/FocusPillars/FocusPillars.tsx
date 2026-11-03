import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { FOCUS_PILLARS } from "./config";

export function FocusPillars() {
  return (
    <Box sx={{ pt: 2 }}>
      <CardGrid columns={{ xs: 1, sm: 2, lg: 4 }}>
        {FOCUS_PILLARS.map((pillar) => (
          <SurfaceCard key={pillar.title}>
            <Eyebrow color="text.secondary" size={10}>
              {pillar.tag}
            </Eyebrow>
            <Typography
              sx={{
                color: "common.white",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.025em",
              }}
            >
              {pillar.title}
            </Typography>
            <Typography
              sx={{ color: "text.secondary", fontSize: 12, lineHeight: 1.625 }}
            >
              {pillar.description}
            </Typography>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
