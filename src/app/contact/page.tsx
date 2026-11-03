import Stack from "@mui/material/Stack";
import type { Metadata } from "next";
import { CardGrid } from "@/components/_common/CardGrid";
import { PageHero } from "@/components/_common/PageHero";
import { PageMain } from "@/components/_common/PageMain";
import { SectionLabel } from "@/components/_common/SectionLabel";
import { ContactCard } from "@/components/contact/ContactCard";
import { EmailBanner } from "@/components/contact/EmailBanner";
import { Overview } from "@/components/contact/Overview";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, MAILTO_URL } from "@/constants";

const HERO_DESCRIPTION =
  "Interested in discussing a Senior Frontend Engineer role, consulting, or technical collaboration? Reach out through any of the channels below.";

export const metadata: Metadata = {
  title: "Contact",
  description: HERO_DESCRIPTION,
};

const withoutProtocol = (url: string) => url.replace("https://", "");

const CONTACT_METHODS = [
  {
    category: "Primary Channel",
    title: "Direct Email",
    detail:
      "The fastest way to reach me for job opportunities, consulting inquiries, or technical conversations.",
    actionText: EMAIL,
    actionHref: MAILTO_URL,
    isExternal: false,
  },
  {
    category: "Professional Network",
    title: "LinkedIn",
    detail:
      "Connect or message for career inquiries, mutual connections, or background verification.",
    actionText: withoutProtocol(LINKEDIN_URL),
    actionHref: LINKEDIN_URL,
    isExternal: true,
  },
  {
    category: "Code & Repositories",
    title: "GitHub",
    detail:
      "Browse open-source contributions, prototype repositories, and full-stack side projects.",
    actionText: withoutProtocol(GITHUB_URL),
    actionHref: GITHUB_URL,
    isExternal: true,
  },
];

export default function Contact() {
  return (
    <PageMain spacing={8}>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Pedro Barbosa"
        description={HERO_DESCRIPTION}
      />

      <EmailBanner />

      <Stack component="section" spacing={3}>
        <SectionLabel
          component="h2"
          label="Communication Channels"
          note="Direct & Verified"
        />
        <CardGrid columns={{ xs: 1, md: 3 }} gap={3}>
          {CONTACT_METHODS.map((method) => (
            <ContactCard key={method.title} method={method} />
          ))}
        </CardGrid>
      </Stack>

      <Overview />
    </PageMain>
  );
}
