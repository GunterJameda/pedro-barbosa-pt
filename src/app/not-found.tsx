import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { ActionButton } from "@/components/_common/ActionButton";
import { CenteredMain } from "@/components/_common/CenteredMain";
import { DotLabel } from "@/components/_common/DotLabel";

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
        <Typography variant="displayTitle">
          Nothing to render here.
        </Typography>

        <Typography variant="lead" sx={{ maxWidth: 672, mx: "auto" }}>
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
