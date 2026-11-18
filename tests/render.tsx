import type { ReactElement } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { theme } from "@/_common/theme";
import { INTL } from "./intl";

/**
 * Gives components the default language and its messages, as the site's
 * layout does, so they render their real copy. A missing message fails the test.
 */
export function withIntl(ui: ReactElement) {
  return <NextIntlClientProvider {...INTL}>{ui}</NextIntlClientProvider>;
}

/** Renders with the site's theme, so text styles map to the same HTML elements as on the site. */
export function renderWithTheme(ui: ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => withIntl(<ThemeProvider theme={theme}>{children}</ThemeProvider>),
  });
}
