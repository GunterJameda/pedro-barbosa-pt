import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Footer } from "@/components/_common/Footer";
import { Navbar } from "@/components/_common/Navbar";
import { theme } from "@/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pedro Barbosa | Senior Frontend Engineer",
    template: "%s | Pedro Barbosa",
  },
  description:
    "Senior Frontend Engineer specialising in React, Next.js and TypeScript, with a strong foundation in Angular.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh",
              }}
            >
              <Navbar />
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
