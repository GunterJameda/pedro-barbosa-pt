import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { CITY, IS_LOOKING, WORK_MODE } from "@/_common/constants";
import { fontMono } from "@/_common/theme";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { StatusDot } from "@/_common/components/StatusDot";
import { SurfaceCard } from "@/_common/components/SurfaceCard";

export function LocationBanner() {
  const t = useTranslations();
  return (
    <SurfaceCard component="section" spacing={2} sx={{ p: { xs: 4, sm: 5 } }}>
      <Stack spacing={1}>
        <Eyebrow>{t("contact.LocationBanner.eyebrow")}</Eyebrow>
        <Typography variant="cardHeading">
          {t("contact.LocationBanner.title", { city: CITY })}
        </Typography>
        <Typography variant="body" sx={{ maxWidth: 768 }}>
          {t("contact.LocationBanner.text")}
        </Typography>
      </Stack>
      {IS_LOOKING && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            pt: 1,
            color: "primary.main",
            fontFamily: fontMono,
            fontSize: 12,
          }}
        >
          <StatusDot />
          <span>
            {t("contact.LocationBanner.openTo", {
              workModeRoles: t(`profile.workModeRoles.${WORK_MODE}`),
            })}
          </span>
        </Stack>
      )}
    </SurfaceCard>
  );
}
