import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { monoNote, surfaces } from "@/theme";
import { COMPANY_LINKS } from "./config";

export function CompanyNavigation() {
  return (
    <SurfaceCard
      component="nav"
      aria-label="Companies"
      spacing={2}
      sx={{ gridColumn: { lg: "span 7" } }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          borderBottom: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Eyebrow>Fast Navigation</Eyebrow>
        <Typography sx={monoNote}>7 Engagements</Typography>
      </Stack>

      <Typography
        sx={{
          color: "common.white",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.025em",
        }}
      >
        Companies & Engagements
      </Typography>

      <CardGrid columns={{ xs: 2, sm: 4 }} gap={1}>
        {COMPANY_LINKS.map((link) => (
          <Box
            component="a"
            key={link.targetId}
            href={`#${link.targetId}`}
            sx={{
              display: "block",
              p: 2,
              borderRadius: 2,
              color: "common.white",
              textDecoration: "none",
              backgroundColor: surfaces.white2,
              border: `1px solid ${surfaces.hairline}`,
              transition: "background-color 150ms, border-color 150ms",
              "&:hover": {
                color: "primary.light",
                backgroundColor: surfaces.white4,
                borderColor: surfaces.teal30,
              },
            }}
          >
            <Typography
              noWrap
              sx={{
                color: "inherit",
                fontSize: 12,
                fontWeight: 600,
                transition: "color 150ms",
              }}
            >
              {link.name}
            </Typography>
            <Typography noWrap sx={{ color: "text.secondary", fontSize: 11 }}>
              {link.role}
            </Typography>
          </Box>
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
