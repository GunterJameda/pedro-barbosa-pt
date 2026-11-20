import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { CardFooter } from "@/_common/components/CardFooter";
import { CardGrid } from "@/_common/components/CardGrid";
import { FeatureCard } from "@/_common/components/FeatureCard";
import { IconBadge } from "@/_common/components/IconBadge";
import { SectionHeading } from "@/_common/components/SectionHeading";
import { TEAM_PRACTICES } from "./content";

export function TeamPractices() {
  const t = useTranslations("about.TeamPractices");
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <CardGrid columns={{ xs: 1, md: 3 }}>
        {TEAM_PRACTICES.map(({ key, icon }) => (
          <FeatureCard
            key={key}
            title={t(`practices.${key}.title`)}
            description={t(`practices.${key}.description`)}
            header={<IconBadge icon={icon} />}
            footer={
              <CardFooter variant="split">
                <span>{t(`practices.${key}.tagLeft`)}</span>
                <Typography component="span" sx={{ color: "primary.main", font: "inherit" }}>
                  {t(`practices.${key}.tagRight`)}
                </Typography>
              </CardFooter>
            }
          />
        ))}
      </CardGrid>
    </Stack>
  );
}
