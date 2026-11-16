import { LOCATION } from "@/_common/constants";
import { pageMetadata } from "@/_common/utils/pageMetadata";
import { CenteredHero } from "@/_common/components/CenteredHero";
import { CenteredMain } from "@/_common/components/CenteredMain";
import { Highlight } from "@/home/components/Highlight";
import { PersonSchema } from "@/home/components/PersonSchema";
import { QuickLinks } from "@/home/components/QuickLinks";
import { WebsiteSchema } from "@/home/components/WebsiteSchema";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <CenteredMain>
      <PersonSchema />
      <WebsiteSchema />
      <CenteredHero label={LOCATION} title={"Hello, I'm Pedro Barbosa."} actions={<QuickLinks />}>
        Senior Frontend Engineer specialising in <Highlight>React</Highlight>,{" "}
        <Highlight>Next.js</Highlight> and <Highlight>TypeScript</Highlight>, with a strong
        foundation in <Highlight>Angular</Highlight>. Building resilient multi-tenant apps, design
        systems, and modern frontend architectures.
      </CenteredHero>
    </CenteredMain>
  );
}
