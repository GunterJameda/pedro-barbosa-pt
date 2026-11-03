import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { fontMono, monoNote, slate, surfaces } from "@/theme";
import { TECHNICAL_HIGHLIGHTS, TECH_STACK } from "./config";

export function FlagshipProject() {
  return (
    <SurfaceCard component="section" spacing={4} sx={{ p: { xs: 4, sm: 5 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          pb: 3,
          borderBottom: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            color: "primary.light",
            backgroundColor: surfaces.teal10,
            border: `1px solid ${surfaces.teal20}`,
            fontFamily: fontMono,
            fontSize: 12,
          }}
        >
          Full-Stack Project · 2021 – 2026
        </Box>
        <Typography sx={monoNote}>
          Independent exploration · Completed Jan 2026
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: { xs: 30, sm: 36 },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}
        >
          GrowthTracker
        </Typography>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: { xs: 16, sm: 18 },
            fontWeight: 500,
          }}
        >
          Investment Portfolio Analytics & Tracking Platform
        </Typography>
      </Stack>

      <Box sx={{ pt: 1 }}>
        <CardGrid columns={{ xs: 1, lg: 12 }} gap={4}>
          <Stack spacing={2} sx={{ gridColumn: { lg: "span 8" } }}>
            <Eyebrow color="text.secondary" size={12}>
              Project Overview & Architecture
            </Eyebrow>
            <Typography
              sx={{
                color: slate[300],
                fontSize: { xs: 14, sm: 16 },
                lineHeight: 1.625,
              }}
            >
              Independently built and launched the frontend and backend of a
              responsive application with portfolio charts, tables, and
              investment metrics, working directly from a designer-provided
              visual design.
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: 12, sm: 14 },
                lineHeight: 1.625,
              }}
            >
              Engineered to handle historical portfolio valuations,
              time-weighted returns, and automated dividend schedules with
              low-latency client rendering and contract-first API boundaries.
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ gridColumn: { lg: "span 4" } }}>
            <Eyebrow color="text.secondary" size={12}>
              Key Technical Highlights
            </Eyebrow>
            <Stack
              component="ul"
              spacing={1}
              sx={{
                m: 0,
                p: 0,
                color: slate[300],
                fontSize: { xs: 12, sm: 14 },
                lineHeight: 1.5,
                listStyle: "none",
              }}
            >
              {TECHNICAL_HIGHLIGHTS.map((highlight) => (
                <Stack
                  component="li"
                  key={highlight}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Box
                    component="span"
                    aria-hidden
                    sx={{ color: "primary.main" }}
                  >
                    ✓
                  </Box>
                  <span>{highlight}</span>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardGrid>
      </Box>

      <Stack
        spacing={2}
        sx={{ pt: 3, borderTop: `1px solid ${surfaces.hairline}` }}
      >
        <Eyebrow color="text.secondary" size={12}>
          Technology Stack
        </Eyebrow>
        <TagList tags={TECH_STACK} />
      </Stack>
    </SurfaceCard>
  );
}
