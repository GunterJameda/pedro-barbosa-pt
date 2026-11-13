import Box from "@mui/material/Box";
import type { ReactNode } from "react";

import { MAIN_ID } from "@/constants";

/** Page body that centres a single short message on the screen, like Home. */
export function CenteredMain({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      id={MAIN_ID}
      // Lets the skip link move focus here.
      tabIndex={-1}
      sx={{
        // Focus lands here from the skip link; the page itself needs no ring.
        "&:focus": { outline: "none" },
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
