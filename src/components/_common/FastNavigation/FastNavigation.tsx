import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { surfaces } from "@/theme";
import type { FastNavigationLink } from "./types";

interface FastNavigationProps {
  /** Names the navigation for screen readers, e.g. "Companies". */
  label: string;
  title: string;
  links: FastNavigationLink[];
  sx?: SxProps<Theme>;
}

/** A card of links that jump to sections further down the page. */
export function FastNavigation({ label, title, links, sx }: FastNavigationProps) {
  return (
    <SurfaceCard component="nav" aria-label={label} spacing={2} sx={sx}>
      <Box sx={{ pb: 1, borderBottom: `1px solid ${surfaces.hairline}` }}>
        <Eyebrow>Fast Navigation</Eyebrow>
      </Box>

      <Typography variant="itemTitle">{title}</Typography>

      <CardGrid columns={{ xs: 2, sm: 4 }} gap={1}>
        {links.map((link) => (
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
              sx={{
                color: "inherit",
                fontSize: 12,
                fontWeight: 600,
                transition: "color 150ms",
              }}
            >
              {link.name}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 11 }}>
              {link.detail}
            </Typography>
          </Box>
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
