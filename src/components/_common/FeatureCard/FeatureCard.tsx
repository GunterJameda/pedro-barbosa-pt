import type { StackProps } from "@mui/material/Stack";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { SurfaceCard } from "@/components/_common/SurfaceCard";

interface FeatureCardProps extends Omit<StackProps, "title"> {
  title: string;
  description: string;
  /** Shown above the title, usually an icon badge. */
  header?: ReactNode;
  /** Pinned to the bottom of the card, usually a CardFooter or tags. */
  footer?: ReactNode;
}

/** Card with an optional header, a title, a description and an optional footer. */
export function FeatureCard({
  title,
  description,
  header,
  footer,
  spacing = 2,
  ...props
}: FeatureCardProps) {
  return (
    <SurfaceCard spacing={spacing} {...props}>
      <Stack spacing={2} sx={{ flex: 1 }}>
        {header}
        <Typography variant="cardTitle">{title}</Typography>
        <Typography variant="body">{description}</Typography>
      </Stack>
      {footer}
    </SurfaceCard>
  );
}
