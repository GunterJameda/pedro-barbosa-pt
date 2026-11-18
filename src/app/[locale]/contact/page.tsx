import Stack from "@mui/material/Stack";
import { getTranslations } from "next-intl/server";
import { CITY, IS_LOOKING, WORK_MODE } from "@/_common/constants";
import { pageMetadata } from "@/_common/utils/pageMetadata";
import { CardGrid } from "@/_common/components/CardGrid";
import { PageMain } from "@/_common/components/PageMain";
import { ContactHero } from "@/contact/components/ContactHero";
import { EmailCard } from "@/contact/components/EmailCard";
import { LinkedInCard } from "@/contact/components/LinkedInCard";
import { LocationBanner } from "@/contact/components/LocationBanner";
import { RoleAlignment } from "@/contact/components/RoleAlignment";

export async function generateMetadata() {
  const t = await getTranslations();
  const values = {
    role: t("profile.role"),
    city: CITY,
    workModeRoles: t(`profile.workModeRoles.${WORK_MODE}`),
  };
  return pageMetadata(
    "/contact",
    t(IS_LOOKING ? "contact.page.descriptionLooking" : "contact.page.description", values),
  );
}

export default function Contact() {
  return (
    <PageMain spacing={6}>
      <ContactHero />

      <CardGrid columns={{ xs: 1, lg: 12 }} gap={4}>
        <Stack spacing={3} sx={{ gridColumn: { lg: "span 6" } }}>
          <EmailCard />
          <LinkedInCard />
        </Stack>
        <RoleAlignment />
      </CardGrid>

      <LocationBanner />
    </PageMain>
  );
}
