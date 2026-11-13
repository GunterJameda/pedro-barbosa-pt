"use client";

import Box from "@mui/material/Box";
import type { MouseEvent } from "react";

import { MAIN_ID, SKIP_LINK_ID } from "@/constants";
import { surfaces } from "@/theme";

/** Hidden until reached by keyboard, then lets visitors jump past the Navbar. */
export function SkipLink() {
  // Moves focus without scrolling or adding #main to the address. Without
  // JavaScript, the link still jumps there on its own.
  const skipToMain = (event: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById(MAIN_ID);
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: true });
  };

  return (
    <Box
      component="a"
      id={SKIP_LINK_ID}
      href={`#${MAIN_ID}`}
      // Safari's Tab skips plain links by default; this keeps it reachable.
      tabIndex={0}
      onClick={skipToMain}
      sx={{
        // Hidden but still reachable by keyboard and screen readers.
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        // When a keyboard user reaches it, a slim bar opens above the Navbar,
        // pushing the page down rather than covering anything.
        "&:focus-visible": {
          position: "static",
          display: "block",
          width: "100%",
          height: "auto",
          clipPath: "none",
          py: 1,
          color: "primary.main",
          backgroundColor: surfaces.teal10,
          borderBottom: `1px solid ${surfaces.teal20}`,
          fontSize: 14,
          fontWeight: 500,
          textAlign: "center",
          textDecoration: "none",
          outline: "none",
        },
      }}
    >
      Skip to content
    </Box>
  );
}
