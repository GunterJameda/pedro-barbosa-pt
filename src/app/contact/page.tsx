import Stack from "@mui/material/Stack";
import { CITY, IS_LOOKING, ROLE, WORK_MODE_ROLES } from "@/_common/constants";
import { pageMetadata } from "@/_common/utils/pageMetadata";
import { CardGrid } from "@/_common/components/CardGrid";
import { PageMain } from "@/_common/components/PageMain";
import { ContactHero } from "@/contact/components/ContactHero";
import { EmailCard } from "@/contact/components/EmailCard";
import { LinkedInCard } from "@/contact/components/LinkedInCard";
import { LocationBanner } from "@/contact/components/LocationBanner";
import { RoleAlignment } from "@/contact/components/RoleAlignment";

export const metadata = pageMetadata(
  "/contact",
  `Scaling a product team or modernising your frontend? Let's talk. I'm a ${ROLE} in ${CITY}${IS_LOOKING ? `, open to ${WORK_MODE_ROLES}` : ""}.`,
);

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
