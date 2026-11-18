import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/_common/i18n";
import { fontVariables, theme } from "@/_common/theme";
import { Footer } from "@/_common/components/Footer";
import { Navbar } from "@/_common/components/Navbar";
import { ScrollToTop } from "@/_common/components/ScrollToTop";
import { SkipLink } from "@/_common/components/SkipLink";
import { LanguageSuggestion } from "./LanguageSuggestion";

interface SiteDocumentProps {
  /** The page's language, set on <html> and given to every component. */
  locale: Locale;
  /** The page's main content. */
  children: ReactNode;
}

/**
 * The whole document around a page: <html> in the page's language, the theme,
 * the navbar and the footer. The root layout and the 404 page for unknown
 * addresses both use it, so every page looks the same around its content.
 */
export function SiteDocument({ locale, children }: SiteDocumentProps) {
  return (
    <html
      lang={locale}
      className={fontVariables}
      // Keeps page-to-page navigation instant despite smooth scrolling.
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider locale={locale}>
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
                <LanguageSuggestion />
                <Navbar />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</Box>
                <Footer />
              </Box>
              <ScrollToTop />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
