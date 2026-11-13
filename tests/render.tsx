import { ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { theme } from "@/theme";

/** Renders with the site's theme, so text styles map to the same HTML elements as on the site. */
export function renderWithTheme(ui: ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
  });
}
