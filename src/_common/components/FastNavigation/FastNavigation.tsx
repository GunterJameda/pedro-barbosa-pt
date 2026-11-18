import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { CardGrid } from "@/_common/components/CardGrid";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
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
  const t = useTranslations("common.FastNavigation");
  return (
    <SurfaceCard component="nav" aria-label={label} spacing={2} sx={sx}>
      <Box sx={{ pb: 1, borderBottom: 1, borderColor: "surface.hairline" }}>
        <Eyebrow>{t("label")}</Eyebrow>
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
              backgroundColor: "surface.white2",
              border: 1,
              borderColor: "surface.hairline",
              transition: "background-color 150ms, border-color 150ms",
              "&:hover": {
                color: "primary.light",
                backgroundColor: "surface.white4",
                borderColor: "surface.teal30",
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
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>{link.detail}</Typography>
          </Box>
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
