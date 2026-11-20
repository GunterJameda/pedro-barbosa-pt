import type { ReactNode } from "react";
import { Main } from "@/_common/components/Main";

/** Page body that centres a single short message on the screen, like Home. */
export function CenteredMain({ children }: { children: ReactNode }) {
  return (
    <Main
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        // Sits the centered content slightly above the middle of the page.
        pb: 5,
      }}
    >
      {children}
    </Main>
  );
}
