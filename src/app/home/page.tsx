import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { QuickLinks } from "@/components/home/QuickLinks";
import { Highlight } from "@/components/home/Highlight";
import { slate } from "@/theme";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        // Sits the centered content slightly above the middle of the page.
        pb: 5,
      }}
    >
      <Box sx={{ mb: { xs: 6, sm: 8 } }}>
        <Eyebrow color="text.secondary" wide>
          Porto, Portugal
        </Eyebrow>
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
    </Box>
  );
}
