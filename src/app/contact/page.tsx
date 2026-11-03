import Stack from "@mui/material/Stack";
import type { Metadata } from "next";
import { CardGrid } from "@/components/_common/CardGrid";
import { PageHero } from "@/components/_common/PageHero";
import { PageMain } from "@/components/_common/PageMain";
import { EmailCard } from "@/components/contact/EmailCard";
import { GitHubCard } from "@/components/contact/GitHubCard";
import { LocationBanner } from "@/components/contact/LocationBanner";
import { RoleAlignment } from "@/components/contact/RoleAlignment";

const HERO_DESCRIPTION =
  "Whether you’re scaling a product team, modernising frontend foundations, or looking for a Senior Frontend Engineer who delivers with craft and pragmatic ownership.";

export const metadata: Metadata = {
  title: "Contact",
  description: HERO_DESCRIPTION,
};

export default function Contact() {
  return (
    <PageMain spacing={6}>
      <PageHero
        eyebrow="Contact & Work Inquiries"
        title="Let’s talk architecture, teams, or new opportunities."
        description={HERO_DESCRIPTION}
      />

      <CardGrid columns={{ xs: 1, lg: 12 }} gap={4}>
        <Stack spacing={3} sx={{ gridColumn: { lg: "span 6" } }}>
          <EmailCard />
          <GitHubCard />
        </Stack>
        <RoleAlignment />
      </CardGrid>

      <LocationBanner />
    </PageMain>
  );
}
