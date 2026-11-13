import Stack from "@mui/material/Stack";
import type { Metadata } from "next";

import { CardGrid } from "@/components/_common/CardGrid";
import { PageHero } from "@/components/_common/PageHero";
import { PageMain } from "@/components/_common/PageMain";
import { EmailCard } from "@/components/pages/contact/EmailCard";
import { LinkedInCard } from "@/components/pages/contact/LinkedInCard";
import { LocationBanner } from "@/components/pages/contact/LocationBanner";
import { RoleAlignment } from "@/components/pages/contact/RoleAlignment";
import { CITY, IS_LOOKING, ROLE, WORK_MODE_ROLES } from "@/constants";

const HERO_DESCRIPTION =
  "Whether you're scaling a product team, modernising frontend foundations, or looking for a Senior Frontend Engineer who delivers with craft and pragmatic ownership.";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: `Scaling a product team or modernising your frontend? Let's talk. I'm a ${ROLE} in ${CITY}${IS_LOOKING ? `, open to ${WORK_MODE_ROLES}` : ""}.`,
};

export default function Contact() {
  return (
    <PageMain spacing={6}>
      <PageHero
        eyebrow="Contact & Work Inquiries"
        title="Let's talk architecture, teams, or new opportunities."
        description={HERO_DESCRIPTION}
      />

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
