import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { slate } from "@/theme";
import { Eyebrow } from "@/components/_common/Eyebrow";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <Stack component="section" spacing={2} sx={{ maxWidth: 768 }}>
      <Eyebrow wide>{eyebrow}</Eyebrow>
      <Typography
        variant="h1"
        sx={{
          color: "common.white",
          fontSize: { xs: 36, sm: 48 },
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.25,
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
    </Stack>
  );
}
