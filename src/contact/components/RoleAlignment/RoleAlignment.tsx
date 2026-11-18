import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { IconBadge } from "@/_common/components/IconBadge";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { ALIGNMENT_POINTS } from "./content";

export function RoleAlignment() {
  const t = useTranslations("contact.RoleAlignment");
  return (
    <SurfaceCard
      spacing={3}
      sx={{
        gridColumn: { lg: "span 6" },
        p: { xs: 4, sm: 5 },
      }}
    >
      <Stack spacing={1} sx={{ pb: 1 }}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <Typography variant="cardHeading">{t("title")}</Typography>
        <Typography variant="body" sx={{ color: "text.secondary" }}>
          {t("text")}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {ALIGNMENT_POINTS.map(({ key, icon }) => (
          <Stack key={key} direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
            <Box sx={{ mt: "2px" }}>
              <IconBadge icon={icon} size={28} iconSize={14} />
            </Box>
            <Stack spacing={0.5}>
              <Typography variant="itemTitle" component="h3">
                {t(`points.${key}.title`)}
              </Typography>
              <Typography variant="body">{t(`points.${key}.description`)}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SurfaceCard>
  );
}
