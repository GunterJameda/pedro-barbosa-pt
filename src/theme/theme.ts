"use client";

import { createTheme } from "@mui/material/styles";
import NextLink from "next/link";

import { slate, surfaces, teal } from "./tokens";
import { createTextVariants, sans, TEXT_VARIANT_ELEMENTS } from "./typography";

// The page background has its own palette entry; the other surfaces are custom.
const { background, ...surface } = surfaces;

// Built in two steps, because the text styles need the theme's breakpoints.
const baseTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      light: teal[300],
      main: teal[400],
      dark: teal[500],
    },
    background: {
      default: background,
      paper: background,
    },
    text: {
      primary: slate[100],
      secondary: slate[400],
    },
    // Custom entries (typed in types.ts), so components pick every colour by key.
    surface,
    slate,
  },
  // Set here, so MUI's built-in styles (and the page's base font) use it.
  typography: {
    fontFamily: sans,
    button: { textTransform: "none" },
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

const theme = createTheme(baseTheme, {
  typography: createTextVariants(baseTheme.breakpoints),
  components: {
    MuiTypography: {
      defaultProps: { variantMapping: TEXT_VARIANT_ELEMENTS },
    },
  },
});

export default theme;
