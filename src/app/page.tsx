import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LOCATION } from "@/constants";
import { CenteredMain } from "@/components/_common/CenteredMain";
import { DotLabel } from "@/components/_common/DotLabel";
import { QuickLinks } from "@/components/pages/home/QuickLinks";
import { Highlight } from "@/components/pages/home/Highlight";
import { PersonSchema } from "@/components/pages/home/PersonSchema";
import { WebsiteSchema } from "@/components/pages/home/WebsiteSchema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <CenteredMain>
      <PersonSchema />
      <WebsiteSchema />
      <Box sx={{ mb: { xs: 6, sm: 8 } }}>
        <DotLabel wide>{LOCATION}</DotLabel>
      </Box>

      <Stack spacing={3} sx={{ maxWidth: 768, textAlign: "center" }}>
        <Typography variant="displayTitle">{"Hello, I'm Pedro Barbosa."}</Typography>

        <Typography variant="lead" sx={{ maxWidth: 672, mx: "auto" }}>
          Senior Frontend Engineer specialising in <Highlight>React</Highlight>,{" "}
          <Highlight>Next.js</Highlight> and <Highlight>TypeScript</Highlight>, with a strong
          foundation in <Highlight>Angular</Highlight>. Building resilient multi-tenant apps, design
          systems, and modern frontend architectures.
        </Typography>

        <QuickLinks />
      </Stack>
    </CenteredMain>
  );
}
