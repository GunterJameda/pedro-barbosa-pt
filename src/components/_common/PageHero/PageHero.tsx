import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { DotLabel } from "@/components/_common/DotLabel";

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
