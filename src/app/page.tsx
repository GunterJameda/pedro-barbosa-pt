import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CenteredMain } from "@/components/_common/CenteredMain";
import { DotLabel } from "@/components/_common/DotLabel";
import { QuickLinks } from "@/components/pages/home/QuickLinks";
import { Highlight } from "@/components/pages/home/Highlight";
import { PersonSchema } from "@/components/pages/home/PersonSchema";
import { slate } from "@/theme";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <CenteredMain>
      <PersonSchema />
      <Box sx={{ mb: { xs: 6, sm: 8 } }}>
        <DotLabel wide>Porto, Portugal</DotLabel>
      </Box>

      <Stack spacing={3} sx={{ maxWidth: 768, textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            color: "common.white",
            fontSize: { xs: 36, sm: 60 },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.25,
          }}
        >
          {"Hello, I'm Pedro Barbosa."}
        </Typography>

        <Typography
          sx={{
            maxWidth: 672,
            mx: "auto",
            color: slate[300],
            fontSize: { xs: 16, sm: 18 },
            lineHeight: 1.625,
          }}
        >
          Senior Frontend Engineer specialising in <Highlight>React</Highlight>,{" "}
          <Highlight>Next.js</Highlight> and <Highlight>TypeScript</Highlight>,
          with a strong foundation in <Highlight>Angular</Highlight>. Building
          resilient multi-tenant apps, design systems, and modern frontend
          architectures.
        </Typography>

        <QuickLinks />
      </Stack>
    </CenteredMain>
  );
}
