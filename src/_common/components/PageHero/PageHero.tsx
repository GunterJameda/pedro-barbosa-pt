import type { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DotLabel } from "@/_common/components/DotLabel";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <Stack component="section" spacing={3}>
      <DotLabel wide>{eyebrow}</DotLabel>
      <Typography variant="pageTitle">{title}</Typography>
      <Typography variant="lead">{description}</Typography>
      {children}
    </Stack>
  );
}
