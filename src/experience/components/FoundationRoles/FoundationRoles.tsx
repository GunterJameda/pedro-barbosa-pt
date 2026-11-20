import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { CardFooter } from "@/_common/components/CardFooter";
import { CardGrid } from "@/_common/components/CardGrid";
import { TagList } from "@/_common/components/TagList";
import { RoleCard } from "@/experience/components/RoleCard";
import { RoleHeader } from "@/experience/components/RoleHeader";
import { FOUNDATION_ROLES } from "./content";

export function FoundationRoles() {
  const t = useTranslations("experience");
  return (
    <Box component="section">
      <CardGrid columns={{ xs: 1, md: 3 }} gap={3}>
        {FOUNDATION_ROLES.map(({ id, started, ended }) => (
          <RoleCard key={id} id={id} spacing={2}>
            <Stack spacing={1} sx={{ flex: 1 }}>
              <RoleHeader
                industry={t(`FoundationRoles.roles.${id}.industry`)}
                company={t(`FoundationRoles.roles.${id}.company`)}
                roleTitle={t(`FoundationRoles.roles.${id}.roleTitle`)}
                started={started}
                ended={ended}
                size="compact"
              />
              <Typography variant="small" sx={{ color: "slate.300", pt: 1 }}>
                {t(`FoundationRoles.roles.${id}.description`)}
              </Typography>
            </Stack>
            <CardFooter>
              <TagList tags={t.raw(`FoundationRoles.roles.${id}.tags`) as string[]} dense />
            </CardFooter>
          </RoleCard>
        ))}
      </CardGrid>
    </Box>
  );
}
