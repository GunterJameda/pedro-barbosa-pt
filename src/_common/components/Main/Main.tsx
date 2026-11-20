import Stack, { type StackProps } from "@mui/material/Stack";
import { MAIN_ID } from "@/_common/constants";

/** The page's `<main>` landmark, which the skip link jumps to. */
export function Main({ sx, ...props }: Omit<StackProps, "component" | "id" | "tabIndex">) {
  return (
    <Stack
      component="main"
      id={MAIN_ID}
      // Lets the skip link move focus here.
      tabIndex={-1}
      sx={[
        // Focus lands here from the skip link; the page itself needs no ring.
        { "&:focus": { outline: "none" } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
