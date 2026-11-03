import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Sits under the title. */
  description?: string;
  /** Sits to the right of the title. */
  aside?: string;
  eyebrowSize?: 11 | 12;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  eyebrowSize,
}: SectionHeadingProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ alignItems: { sm: "flex-end" }, justifyContent: "space-between" }}
    >
      <Stack spacing={1}>
        <Eyebrow size={eyebrowSize}>{eyebrow}</Eyebrow>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            {description}
          </Typography>
        )}
      </Stack>
      {aside && (
        <Typography
          sx={{
            maxWidth: 448,
            color: "text.secondary",
            fontSize: { xs: 12, sm: 14 },
          }}
        >
          {aside}
        </Typography>
      )}
    </Stack>
  );
}
