import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DotLabel } from "@/components/_common/DotLabel";
import { slate } from "@/theme";
import { FocusPillars } from "./FocusPillars";

export function AboutHero() {
  return (
    <Stack component="section" spacing={3} sx={{ maxWidth: 896 }}>
      <DotLabel wide>Profile & Architecture Philosophy</DotLabel>
      <Typography
        variant="h1"
        sx={{
          color: "common.white",
          fontSize: { xs: 36, sm: 48, lg: 60 },
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.12,
        }}
      >
        Engineering with care, pragmatism, and attention to detail.
      </Typography>
      <Typography
        sx={{
          maxWidth: 768,
          color: slate[300],
          fontSize: { xs: 16, sm: 18 },
          lineHeight: 1.625,
        }}
      >
        Senior Frontend Engineer · Since 2017. Specialising in frontend
        modernisation and scalable design systems. My practice unites clean
        architectural boundaries, accessible component systems, and empathetic,
        high-velocity collaboration across product, design, and engineering
        squads.
      </Typography>
      <FocusPillars />
    </Stack>
  );
}
