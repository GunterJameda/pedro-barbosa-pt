"use client";

import { createTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { slate, surfaces, teal } from "./tokens";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      light: "#5eead4",
      main: "#2dd4bf",
      dark: "#14b8a6",
    },
    background: {
      default: "#0c1421",
      paper: "#0c1421",
    },
    text: {
      primary: slate[100],
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily:
      'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    button: {
      textTransform: "none",
    },
  },
  components: {
    // Lets <Button href="..."> use next/link, including from server components.
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: NextLink,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Animates jumps to in-page sections (like the Experience page's
        // company links), unless the visitor prefers reduced motion.
        html: {
          "@media (prefers-reduced-motion: no-preference)": {
            scrollBehavior: "smooth",
          },
        },
        "::selection": {
          backgroundColor: surfaces.teal20,
          color: teal[200],
        },
      },
    },
  },
});

export default theme;
