import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { ActionButton } from "@/components/_common/ActionButton";
import { CenteredMain } from "@/components/_common/CenteredMain";
import { DotLabel } from "@/components/_common/DotLabel";
import { slate } from "@/theme";

export const metadata: Metadata = {
  title: "Page not found",
};

// Shown for every address without its own route, with a 404 status.
export default function NotFound() {
  return (
    <CenteredMain>
      <Box sx={{ mb: { xs: 6, sm: 8 } }}>
        <DotLabel wide>Error 404</DotLabel>
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
          Nothing to render here.
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
          {"This route isn't part of the site. Let me point you somewhere useful."}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", justifyContent: "center", pt: 2 }}
        >
          <ActionButton href="/" primary pill>
            Go to Home
          </ActionButton>
          <ActionButton href="/contact" pill>
            Contact me
          </ActionButton>
        </Stack>
      </Stack>
    </CenteredMain>
  );
}
