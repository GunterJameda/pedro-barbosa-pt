import { HOME_LABEL, LABEL, RETRY_LABEL, TAB_TITLE, TEXT, TITLE } from "./content";
import {
  actionsStyles,
  bodyStyles,
  dotStyles,
  htmlStyles,
  labelStyles,
  mainStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
  textStyles,
  titleStyles,
} from "./styles";

interface GlobalErrorPageProps {
  /** Loads and renders the whole site again. */
  retry: () => void;
}

/**
 * The last-resort page, shown when the root layout itself fails. It replaces
 * the whole document, so it brings its own html and body and only uses inline
 * styles and system fonts: no theme, MUI or web fonts that could be what broke.
 */
export function GlobalErrorPage({ retry }: GlobalErrorPageProps) {
  return (
    <html lang="en" style={htmlStyles}>
      <body style={bodyStyles}>
        <title>{TAB_TITLE}</title>
        <main style={mainStyles}>
          <p style={labelStyles}>
            <span aria-hidden style={dotStyles} />
            {LABEL}
          </p>
          <h1 style={titleStyles}>{TITLE}</h1>
          <p style={textStyles}>{TEXT}</p>
          <div style={actionsStyles}>
            <button type="button" onClick={retry} style={primaryButtonStyles}>
              {RETRY_LABEL}
            </button>
            {/* A full page load, not client navigation, so the site starts over clean. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={secondaryButtonStyles}>
              {HOME_LABEL}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
