import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { CAREER_START_YEAR, DEGREE_START_YEAR, SCROLL_OFFSET } from "@/_common/constants";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { IconBadge } from "@/_common/components/IconBadge";
import { SurfaceCard } from "@/_common/components/SurfaceCard";

export function AcademicBackground() {
  const t = useTranslations("experience.AcademicBackground");
  return (
    <SurfaceCard
      component="section"
      id="education"
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        alignItems: { sm: "center" },
        justifyContent: "space-between",
        p: { xs: 3, sm: 4 },
        scrollMarginTop: SCROLL_OFFSET,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <IconBadge icon={SchoolOutlinedIcon} size={40} iconSize={20} accent />
        <Stack spacing={0.5}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Typography variant="cardTitle" component="h2">
            {t("school")}
          </Typography>
          <Typography variant="mono">
            {t("degree", { start: DEGREE_START_YEAR, end: CAREER_START_YEAR })}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="mono" sx={{ flexShrink: 0 }}>
        {t("location")}
      </Typography>
    </SurfaceCard>
  );
}
