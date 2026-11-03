import Box from "@mui/material/Box";
import type { ElementType } from "react";
import { surfaces } from "@/theme";

export function IconBadge({ icon: Icon }: { icon: ElementType }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: 2,
        color: "primary.main",
        backgroundColor: surfaces.white4,
        border: `1px solid ${surfaces.hairline}`,
      }}
    >
      <Icon sx={{ fontSize: 16 }} />
    </Box>
  );
}
