import { useTranslations } from "next-intl";
import { LOCATION, NAME } from "@/_common/constants";
import { pageMetadata } from "@/_common/utils/pageMetadata";
import { CenteredHero } from "@/_common/components/CenteredHero";
import { CenteredMain } from "@/_common/components/CenteredMain";
import { Highlight } from "@/home/components/Highlight";
import { PersonSchema } from "@/home/components/PersonSchema";
import { QuickLinks } from "@/home/components/QuickLinks";
import { WebsiteSchema } from "@/home/components/WebsiteSchema";

export const generateMetadata = () => pageMetadata("/");

export default function Home() {
  const t = useTranslations("home.Hero");
  return (
    <CenteredMain>
      <PersonSchema />
      <WebsiteSchema />
      <CenteredHero label={LOCATION} title={t("title", { name: NAME })} actions={<QuickLinks />}>
        {t.rich("text", {
          highlight: (chunks) => <Highlight>{chunks}</Highlight>,
          // Renders nothing. It keeps "," and the space after it as separate
          // text, as the page always had, so the browser lays the line out the same.
          gap: () => null,
        })}
      </CenteredHero>
    </CenteredMain>
  );
}
