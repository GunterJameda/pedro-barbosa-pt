import type { Metadata } from "next";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Analytics } from "@vercel/analytics/next";
import { NAME, ROLE, SITE_NAME, SITE_URL } from "@/constants";
import { fontVariables, theme } from "@/theme";
import { Footer } from "@/components/_common/Footer";
import { Navbar } from "@/components/_common/Navbar";
import { ScrollToTop } from "@/components/_common/ScrollToTop";
import { SkipLink } from "@/components/_common/SkipLink";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} | ${ROLE}`,
    template: `%s | ${NAME}`,
  },
  description:
    "Senior Frontend Engineer specialising in React, Next.js and TypeScript, with a strong foundation in Angular.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={fontVariables}
      // Keeps page-to-page navigation instant despite smooth scrolling.
      data-scroll-behavior="smooth"
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SkipLink />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh",
              }}
            >
              <Navbar />
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</Box>
              <Footer />
            </Box>
            <ScrollToTop />
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
