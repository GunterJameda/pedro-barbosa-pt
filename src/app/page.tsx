import { CenteredHero } from "@/components/_common/CenteredHero";
import { CenteredMain } from "@/components/_common/CenteredMain";
import { pageMetadata } from "@/components/_common/PageMetadata";
import { Highlight } from "@/components/pages/home/Highlight";
import { PersonSchema } from "@/components/pages/home/PersonSchema";
import { QuickLinks } from "@/components/pages/home/QuickLinks";
import { WebsiteSchema } from "@/components/pages/home/WebsiteSchema";
import { LOCATION } from "@/constants";

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
