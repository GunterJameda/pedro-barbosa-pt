import Box from "@mui/material/Box";
import type { ElementType } from "react";
import { surfaces } from "@/theme";

interface IconBadgeProps {
  icon: ElementType;
  size?: number;
  iconSize?: number;
  /** Teal background and border instead of the neutral ones. */
  accent?: boolean;
}

export function IconBadge({
  icon: Icon,
  size = 32,
  iconSize = 16,
  accent = false,
}: IconBadgeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: 2,
        color: "primary.main",
        backgroundColor: accent ? surfaces.teal10 : surfaces.white4,
        border: `1px solid ${accent ? surfaces.teal20 : surfaces.hairline}`,
      }}
    >
      <Icon sx={{ fontSize: iconSize }} />
    </Box>
  );
}
