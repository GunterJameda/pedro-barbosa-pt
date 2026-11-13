import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Eyebrow } from "@/components/_common/Eyebrow";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  eyebrowSize?: 11 | 12;
}

export function SectionHeading({ eyebrow, title, description, eyebrowSize }: SectionHeadingProps) {
  return (
    <Stack spacing={1}>
      <Eyebrow size={eyebrowSize}>{eyebrow}</Eyebrow>
      <Typography variant="sectionTitle">{title}</Typography>
      {description && (
        <Typography variant="body" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
