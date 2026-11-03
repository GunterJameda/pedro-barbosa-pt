import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { DotLabel } from "@/components/_common/DotLabel";
import { slate } from "@/theme";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <Stack component="section" spacing={3}>
      <DotLabel wide>{eyebrow}</DotLabel>
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
        {title}
      </Typography>
      <Typography
        sx={{
          color: slate[300],
          fontSize: { xs: 16, sm: 18 },
          lineHeight: 1.625,
        }}
      >
        {description}
      </Typography>
      {children}
    </Stack>
  );
}
