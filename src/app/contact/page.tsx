import Stack from "@mui/material/Stack";
import { CITY, IS_LOOKING, ROLE, WORK_MODE_ROLES } from "@/constants";
import { CardGrid } from "@/components/_common/CardGrid";
import { PageMain } from "@/components/_common/PageMain";
import { pageMetadata } from "@/components/_common/PageMetadata";
import { ContactHero } from "@/components/pages/contact/ContactHero";
import { EmailCard } from "@/components/pages/contact/EmailCard";
import { LinkedInCard } from "@/components/pages/contact/LinkedInCard";
import { LocationBanner } from "@/components/pages/contact/LocationBanner";
import { RoleAlignment } from "@/components/pages/contact/RoleAlignment";

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
