import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { CAREER_START_YEAR } from "@/_common/constants";
import { fontMono } from "@/_common/theme";
import { CardFooter } from "@/_common/components/CardFooter";
import { SectionHeading } from "@/_common/components/SectionHeading";
import { StatusDot } from "@/_common/components/StatusDot";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { TagList } from "@/_common/components/TagList";
import { TOOLBOX_GROUPS } from "./content";

export function TechnicalToolbox() {
  const t = useTranslations("about.TechnicalToolbox");
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Stack spacing={2}>
        {TOOLBOX_GROUPS.map((group) => (
          <SurfaceCard key={group} spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{
                alignItems: { sm: "center" },
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <StatusDot size={8} />
                <Typography variant="cardTitle">{t(`groups.${group}.title`)}</Typography>
              </Stack>
              <Typography variant="mono">{t(`groups.${group}.roleBadge`)}</Typography>
            </Stack>

            <Typography variant="body">{t(`groups.${group}.description`)}</Typography>

            <TagList tags={t.raw(`groups.${group}.skills`) as string[]} />

            <CardFooter
              useFlexGap
              sx={{
                justifyContent: "space-between",
                // On narrow cards the right label moves below, whole.
                flexWrap: "wrap",
                rowGap: 0.5,
                "& > *": { whiteSpace: "nowrap" },
                color: "text.secondary",
                fontFamily: fontMono,
                fontSize: 12,
              }}
            >
              <span>{t(`groups.${group}.footerLeft`)}</span>
              <Typography component="span" sx={{ color: "slate.300", font: "inherit" }}>
                {t(`groups.${group}.footerRight`, { careerStartYear: CAREER_START_YEAR })}
              </Typography>
            </CardFooter>
          </SurfaceCard>
        ))}
      </Stack>
    </Stack>
  );
}
