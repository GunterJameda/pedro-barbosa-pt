"use client";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";

import { SKIP_LINK_ID } from "@/constants";
import { surfaces } from "@/theme";

import { SHOW_AFTER_PX } from "./config";

/** Floating button that appears after some scrolling and returns to the top. */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => setIsVisible(window.scrollY > SHOW_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <Fade in={isVisible}>
      <IconButton
        aria-label="Go to top"
        onClick={() => {
          // Uses the page's smooth scrolling, which respects reduced motion.
          window.scrollTo({ top: 0 });
          // The button fades out, so focus moves to the top of the page
          // instead of dropping back to the start of the document.
          document.getElementById(SKIP_LINK_ID)?.focus({ preventScroll: true });
        }}
        sx={{
          position: "fixed",
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
          zIndex: "speedDial",
          width: 40,
          height: 40,
          color: "common.white",
          backgroundColor: surfaces.card,
          border: `1px solid ${surfaces.white10}`,
          "&:hover": {
            color: "primary.main",
            backgroundColor: surfaces.teal10,
            borderColor: surfaces.teal20,
          },
        }}
      >
        <ArrowUpwardIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Fade>
  );
}
