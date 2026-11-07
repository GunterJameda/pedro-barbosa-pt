import Box from "@mui/material/Box";
import type { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <Box component="span" sx={{ color: "common.white", fontWeight: 500 }}>
      {children}
    </Box>
  );
}
