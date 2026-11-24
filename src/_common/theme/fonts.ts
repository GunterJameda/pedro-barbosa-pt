import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

// Loaded once here, and set on the page as the CSS variables the font stacks in
// typography.ts use.
const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

/** Class names that define the font variables, for the root element. */
export const fontVariables = `${sansFont.variable} ${monoFont.variable}`;
