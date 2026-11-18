import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import { CardFooter } from "@/_common/components/CardFooter";
import { CardGrid } from "@/_common/components/CardGrid";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { FeatureCard } from "@/_common/components/FeatureCard";
import { IconBadge } from "@/_common/components/IconBadge";
import { SectionHeading } from "@/_common/components/SectionHeading";
import { PRINCIPLES } from "./content";

export function EngineeringPrinciples() {
  const t = useTranslations("about.EngineeringPrinciples");
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <CardGrid columns={{ xs: 1, md: 2 }}>
        {PRINCIPLES.map(({ key, icon }) => (
          <FeatureCard
            key={key}
            title={t(`principles.${key}.title`)}
            description={t(`principles.${key}.description`)}
            header={
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <IconBadge icon={icon} />
                <Eyebrow color="text.secondary">{t(`principles.${key}.badge`)}</Eyebrow>
              </Stack>
            }
            footer={
              <CardFooter sx={{ color: "primary.light", fontSize: 12 }}>
                <CheckCircleOutlinedIcon
                  sx={{ flexShrink: 0, color: "primary.main", fontSize: 14 }}
                />
                <span>{t(`principles.${key}.highlight`)}</span>
              </CardFooter>
            }
          />
        ))}
      </CardGrid>
    </Stack>
  );
}
