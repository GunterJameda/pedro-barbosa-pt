"use client";

// Client only, and not in the page's HTML: it depends on the visitor's browser
// (its languages and cookies), which a static page can't know. It appears after
// the page has loaded, and only for the visitors it's for.

import { useState, useSyncExternalStore } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import { CONTENT_MAX_WIDTH } from "@/_common/constants";
import { DEFAULT_LOCALE, LANGUAGE_DISMISSED } from "@/_common/i18n";
import { getPathname, usePathname } from "@/_common/navigation";
import { saveLanguageChoice } from "@/_common/utils/saveLanguageChoice";
import { SUGGESTED_LOCALE } from "./constants";
import { shouldSuggest } from "./utils";

/**
 * A thin bar above the Navbar, offering the page in Portuguese to visitors on
 * an English page whose browser prefers Portuguese. Choosing the other
 * language or closing the bar is remembered, so it never shows again.
 */
export function LanguageSuggestion() {
  const t = useTranslations("common.LanguageSuggestion");
  const locale = useLocale();
  // The address without its language prefix, so the link keeps the page.
  const pathname = usePathname();
  const [isClosed, setIsClosed] = useState(false);
  // False on the server and while the page hydrates, then what the browser says.
  const isSuggested = useSyncExternalStore(
    // Nothing to listen to: the browser's languages and cookie are read as the page renders.
    () => () => {},
    () =>
      shouldSuggest({
        locale,
        defaultLocale: DEFAULT_LOCALE,
        suggested: SUGGESTED_LOCALE,
        languages: navigator.languages,
        cookies: document.cookie,
      }),
    () => false,
  );

  if (!isSuggested || isClosed) return null;

  return (
    <Stack
      component="aside"
      lang={SUGGESTED_LOCALE}
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 1,
        backgroundColor: "surface.card",
        borderBottom: 1,
        borderColor: "surface.hairline",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: CONTENT_MAX_WIDTH,
          mx: "auto",
        }}
      >
        <Typography variant="mono" sx={{ color: "text.secondary" }}>
          {t("text")}
        </Typography>
        <Link
          // A plain link, so the page loads whole in the new language.
          href={getPathname({ locale: SUGGESTED_LOCALE, href: pathname })}
          hrefLang={SUGGESTED_LOCALE}
          underline="always"
          onClick={() => saveLanguageChoice(SUGGESTED_LOCALE)}
          sx={{ fontSize: 12, fontWeight: 600, color: "primary.light" }}
        >
          {t("link")}
        </Link>
      </Stack>
      <IconButton
        aria-label={t("close")}
        size="small"
        onClick={() => {
          saveLanguageChoice(LANGUAGE_DISMISSED);
          setIsClosed(true);
        }}
        sx={{ color: "text.secondary", flexShrink: 0 }}
      >
        <CloseIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Stack>
  );
}
