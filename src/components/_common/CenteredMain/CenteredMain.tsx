import Box from "@mui/material/Box";
import type { ReactNode } from "react";

/** Page body that centres a single short message on the screen, like Home. */
export function CenteredMain({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        // Sits the centered content slightly above the middle of the page.
        pb: 5,
      }}
    >
      {children}
    </Box>
  );
}
