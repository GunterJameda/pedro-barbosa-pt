import Box from "@mui/material/Box";
import type { ElementType } from "react";

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
        backgroundColor: accent ? "surface.teal10" : "surface.white4",
        border: 1,
        borderColor: accent ? "surface.teal20" : "surface.hairline",
      }}
    >
      <Icon sx={{ fontSize: iconSize }} />
    </Box>
  );
}
