import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { fontMono, surfaces } from "@/theme";
import { CareerChart } from "./CareerChart";

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
        <Typography variant="body">
          From monolith enterprise systems at Glintt and HUUB to microfrontends
          at PriceHubble and schema-driven component engines at Teya, my career
          is shaped by progressive technical ownership.
        </Typography>
      </Stack>

      <Stack
        spacing={2}
        sx={{ pt: 2, borderTop: `1px solid ${surfaces.hairline}` }}
      >
        <Typography variant="mono">
          Primary Focus Transition{" "}
          <Box
            component="span"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            Angular → React / Next
          </Box>
        </Typography>

        <Box sx={{ pt: 1 }}>
          <CareerChart />
        </Box>
      </Stack>
    </SurfaceCard>
  );
}
