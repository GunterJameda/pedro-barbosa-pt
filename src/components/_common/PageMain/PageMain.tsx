import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

import { CONTENT_MAX_WIDTH, MAIN_ID } from "@/constants";

interface PageMainProps {
  children: ReactNode;
  /** Space between the page's sections, in 8px units. */
  spacing: number;
}

export function PageMain({ children, spacing }: PageMainProps) {
  return (
    <Stack
      component="main"
      id={MAIN_ID}
      // Lets the skip link move focus here.
      tabIndex={-1}
      spacing={spacing}
      sx={{
        // Focus lands here from the skip link; the page itself needs no ring.
        "&:focus": { outline: "none" },
        flex: 1,
        width: "100%",
        maxWidth: CONTENT_MAX_WIDTH,
        mx: "auto",
        px: 3,
        py: { xs: 6, sm: 8 },
      }}
    >
      {children}
    </Stack>
  );
}
