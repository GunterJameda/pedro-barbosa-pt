import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DotLabel } from "@/components/_common/DotLabel";

interface CenteredHeroProps {
  label: string;
  title: string;
  /** The buttons in the row under the description, such as ActionButtons. */
  actions: ReactNode;
  /** The description; can mix in inline highlights. */
  children: ReactNode;
}

/** A short centred message with a row of buttons, meant to sit inside CenteredMain. */
export function CenteredHero({ label, title, actions, children }: CenteredHeroProps) {
  return (
    <>
      <Box sx={{ mb: { xs: 6, sm: 8 } }}>
        <DotLabel wide>{label}</DotLabel>
      </Box>

      <Stack spacing={3} sx={{ maxWidth: 768, textAlign: "center" }}>
        <Typography variant="displayTitle">{title}</Typography>

        <Typography variant="lead" sx={{ maxWidth: 672, mx: "auto" }}>
          {children}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", alignItems: "center", justifyContent: "center", pt: 2 }}
        >
          {actions}
        </Stack>
      </Stack>
    </>
  );
}
