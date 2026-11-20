import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import { CardGrid } from "@/_common/components/CardGrid";
import { CheckList } from "@/_common/components/CheckList";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { TagList } from "@/_common/components/TagList";
import { RoleCard } from "@/experience/components/RoleCard";
import { RoleHeader } from "@/experience/components/RoleHeader";
import { CAREER_ROLES } from "./content";

export function CareerMilestones() {
  const t = useTranslations("experience");
  return (
    <Stack component="section" spacing={3}>
      {CAREER_ROLES.map(({ id, started, ended }) => (
        <RoleCard key={id} id={id} spacing={3} sx={{ p: { xs: 4, sm: 5 } }}>
          <Box sx={{ pb: 3, borderBottom: 1, borderColor: "surface.hairline" }}>
            <CardGrid columns={{ xs: 1, lg: 12 }} gap={3}>
              <RoleHeader
                industry={t(`CareerMilestones.roles.${id}.industry`)}
                company={t(`CareerMilestones.roles.${id}.company`)}
                roleTitle={t(`CareerMilestones.roles.${id}.roleTitle`)}
                started={started}
                ended={ended}
                sx={{ gridColumn: { lg: "span 4" } }}
              />

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
        </RoleCard>
      ))}
    </Stack>
  );
}
