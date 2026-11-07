import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { fontMono, monoNote, slate, surfaces } from "@/theme";

const TEAL = "var(--mui-palette-primary-dark)";

const POINTS = [
  { x: 10, y: 32, labelY: 42, year: "2017" },
  { x: 110, y: 26, labelY: 38, year: "2020" },
  { x: 210, y: 18, labelY: 30, year: "2023" },
];

export function EvolutionBlueprint() {
  return (
    <SurfaceCard spacing={3} sx={{ gridColumn: { lg: "span 5" } }}>
      <Stack spacing={2} sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            component="span"
            aria-hidden
            sx={{ color: "primary.main", fontFamily: fontMono, fontSize: 12 }}
          >
            ▲
          </Box>
          <Eyebrow>Evolution Blueprint</Eyebrow>
        </Stack>
        <Typography
          sx={{
            color: slate[300],
            fontSize: { xs: 12, sm: 14 },
            lineHeight: 1.625,
          }}
        >
          From monolith enterprise systems at Glintt and HUUB to microfrontends
          at PriceHubble and schema-driven component engines at Teya, my career
          is shaped by progressive technical ownership.
        </Typography>
      </Stack>

      <Stack
        spacing={2}
        sx={{ pt: 2, borderTop: `1px solid ${surfaces.hairline}` }}
      >
        <Typography sx={monoNote}>
          Primary Focus Transition{" "}
          <Box
            component="span"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            Angular → React / Next
          </Box>
        </Typography>

        <Box sx={{ pt: 1 }}>
          <Box
            component="svg"
            viewBox="0 0 320 40"
            role="img"
            aria-label="Career progression from 2017 to 2026"
            sx={{
              display: "block",
              width: "100%",
              height: 40,
              overflow: "visible",
              fontFamily: fontMono,
              fontSize: 8,
            }}
          >
            <path
              d="M 10 32 Q 90 28 160 22 T 310 8"
              fill="none"
              stroke={TEAL}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.7}
            />
            {POINTS.map((point) => (
              <g key={point.year}>
                <circle cx={point.x} cy={point.y} r="3" fill={TEAL} />
                <text
                  x={point.x}
                  y={point.labelY}
                  fill={slate[500]}
                  textAnchor="middle"
                >
                  {point.year}
                </text>
              </g>
            ))}
            <circle
              cx="310"
              cy="8"
              r="3.5"
              fill="var(--mui-palette-primary-light)"
            />
            <text
              x="310"
              y="20"
              fill="var(--mui-palette-primary-main)"
              textAnchor="middle"
            >
              2026
            </text>
          </Box>
        </Box>
      </Stack>
    </SurfaceCard>
  );
}
