import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import { SCROLL_OFFSET } from "@/_common/constants";
import { formatMonth } from "@/_common/utils/formatMonth";
import { CardGrid } from "@/_common/components/CardGrid";
import { CheckList } from "@/_common/components/CheckList";
import { DotLabel } from "@/_common/components/DotLabel";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { TagList } from "@/_common/components/TagList";
import { CAREER_ROLES } from "./content";

export function CareerMilestones() {
  const t = useTranslations("experience");
  const locale = useLocale();
  return (
    <Stack component="section" spacing={3}>
      {CAREER_ROLES.map(({ id, started, ended }) => (
        <SurfaceCard
          component="article"
          key={id}
          id={id}
          spacing={3}
          sx={{
            p: { xs: 4, sm: 5 },
            // Keeps the card clear of the sticky Navbar when jumped to.
            scrollMarginTop: SCROLL_OFFSET,
          }}
        >
          <Box sx={{ pb: 3, borderBottom: 1, borderColor: "surface.hairline" }}>
            <CardGrid columns={{ xs: 1, lg: 12 }} gap={3}>
              <Stack spacing={1} sx={{ gridColumn: { lg: "span 4" } }}>
                <DotLabel>{t(`CareerMilestones.roles.${id}.industry`)}</DotLabel>
                <Typography variant="cardHeading">
                  {t(`CareerMilestones.roles.${id}.company`)}
                </Typography>
                <Typography sx={{ color: "slate.200", fontSize: 14, fontWeight: 500 }}>
                  {t(`CareerMilestones.roles.${id}.roleTitle`)}
                </Typography>
                <Typography variant="mono">
                  {t("period", {
                    start: formatMonth(started, locale),
                    end: formatMonth(ended, locale),
                  })}
                </Typography>
              </Stack>

              <Stack spacing={2} sx={{ gridColumn: { lg: "span 8" } }}>
                <Eyebrow color="text.secondary">{t("CareerMilestones.contributions")}</Eyebrow>
                <CheckList
                  items={(t.raw(`CareerMilestones.roles.${id}.bulletPoints`) as string[]).map(
                    (text) => ({ text }),
                  )}
                />
              </Stack>
            </CardGrid>
          </Box>

          <TagList tags={t.raw(`CareerMilestones.roles.${id}.tags`) as string[]} />
        </SurfaceCard>
      ))}
    </Stack>
  );
}
