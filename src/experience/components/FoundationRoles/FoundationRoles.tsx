import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import { SCROLL_OFFSET } from "@/_common/constants";
import { formatMonth } from "@/_common/utils/formatMonth";
import { CardFooter } from "@/_common/components/CardFooter";
import { CardGrid } from "@/_common/components/CardGrid";
import { DotLabel } from "@/_common/components/DotLabel";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { TagList } from "@/_common/components/TagList";
import { FOUNDATION_ROLES } from "./content";

export function FoundationRoles() {
  const t = useTranslations("experience");
  const locale = useLocale();
  return (
    <Box component="section">
      <CardGrid columns={{ xs: 1, md: 3 }} gap={3}>
        {FOUNDATION_ROLES.map(({ id, started, ended }) => (
          <SurfaceCard
            component="article"
            key={id}
            id={id}
            spacing={2}
            sx={{ scrollMarginTop: SCROLL_OFFSET }}
          >
            <Stack spacing={1} sx={{ flex: 1 }}>
              <DotLabel>{t(`FoundationRoles.roles.${id}.industry`)}</DotLabel>
              <Typography variant="cardTitle" component="h2">
                {t(`FoundationRoles.roles.${id}.company`)}
              </Typography>
              <Typography sx={{ color: "slate.300", fontSize: 12, fontWeight: 500 }}>
                {t(`FoundationRoles.roles.${id}.roleTitle`)}
              </Typography>
              <Typography variant="mono">
                {t("period", {
                  start: formatMonth(started, locale),
                  end: formatMonth(ended, locale),
                })}
              </Typography>
              <Typography variant="small" sx={{ color: "slate.300", pt: 1 }}>
                {t(`FoundationRoles.roles.${id}.description`)}
              </Typography>
            </Stack>
            <CardFooter>
              <TagList tags={t.raw(`FoundationRoles.roles.${id}.tags`) as string[]} dense />
            </CardFooter>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
