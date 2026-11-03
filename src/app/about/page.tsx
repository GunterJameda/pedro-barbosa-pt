import type { Metadata } from "next";
import { PageMain } from "@/components/_common/PageMain";
import { AboutHero } from "@/components/about/AboutHero";
import { EngineeringPrinciples } from "@/components/about/EngineeringPrinciples";
import { PracticeCallout } from "@/components/about/PracticeCallout";
import { TeamPractices } from "@/components/about/TeamPractices";
import { TechnicalToolbox } from "@/components/about/TechnicalToolbox";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Frontend Engineer since 2017, specialising in frontend modernisation and scalable design systems.",
};

export default function About() {
  return (
    <PageMain spacing={10}>
      <AboutHero />
      <EngineeringPrinciples />
      <TeamPractices />
      <TechnicalToolbox />
      <PracticeCallout />
    </PageMain>
  );
}
