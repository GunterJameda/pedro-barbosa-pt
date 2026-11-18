import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { BUILD_YEAR } from "@/_common/constants";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { CareerChart } from "./CareerChart";

export function EvolutionBlueprint() {
  const t = useTranslations("experience.EvolutionBlueprint");
  return (
    <SurfaceCard spacing={3} sx={{ gridColumn: { lg: "span 5" } }}>
      <Stack spacing={2} sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <TrendingUpIcon sx={{ fontSize: 16, color: "primary.main" }} />
          <Eyebrow>{t("eyebrow")}</Eyebrow>
        </Stack>
        <Typography variant="body">{t("text")}</Typography>
      </Stack>

      <Stack spacing={2} sx={{ pt: 2, borderTop: 1, borderColor: "surface.hairline" }}>
        <Typography variant="mono">
          {t("focusLabel")}{" "}
          <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
            {t("focus")}
          </Box>
        </Typography>

        <Box sx={{ pt: 1 }}>
          <CareerChart buildYear={BUILD_YEAR} />
        </Box>
      </Stack>
    </SurfaceCard>
  );
}
