import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { surfaces } from "@/theme";
import { ActionButton } from "@/components/_common/ActionButton";

interface PreFooterCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function PreFooterCTA({
  title = "Interested in discussing a project or role?",
  description = "Open to Senior Frontend Engineer opportunities where strong engineering standards, design systems, and thoughtful collaboration matter.",
  primaryButtonText = "Contact Pedro",
  primaryButtonHref = "/contact",
  secondaryButtonText = "View Experience →",
  secondaryButtonHref = "/experience",
}: PreFooterCTAProps) {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
        px: 3,
        pt: 8,
        pb: 10,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{
          alignItems: { md: "center" },
          justifyContent: "space-between",
          p: { xs: 4, sm: 5 },
          borderRadius: 2,
          backgroundColor: surfaces.card,
          border: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Stack spacing={1} sx={{ maxWidth: 672 }}>
          <Typography
            variant="h2"
            sx={{
              color: "common.white",
              fontSize: { xs: 20, sm: 24 },
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.33,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: 14, lineHeight: 1.625 }}
          >
            {description}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", flexShrink: 0 }}
        >
          {secondaryButtonText && secondaryButtonHref && (
            <ActionButton href={secondaryButtonHref}>
              {secondaryButtonText}
            </ActionButton>
          )}
          <ActionButton href={primaryButtonHref} primary>
            {primaryButtonText}
          </ActionButton>
        </Stack>
      </Stack>
    </Box>
  );
}
