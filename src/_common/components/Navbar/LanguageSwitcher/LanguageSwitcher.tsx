"use client";

import TranslateIcon from "@mui/icons-material/Translate";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import { LOCALES } from "@/_common/i18n";
import { getPathname, usePathname } from "@/_common/navigation";
import { saveLanguageChoice } from "@/_common/utils/saveLanguageChoice";
import { VISUALLY_HIDDEN } from "./constants";
import { languageOption } from "./styles";
import { languageCode } from "./utils";

interface LanguageSwitcherProps {
  /** Also shows the word "Language" before the options, for the phone menu. */
  showLabel?: boolean;
}

/**
 * EN · PT: the current language in bold, the others as links to the same page
 * in that language. Choosing one saves it, so the site opens in it next time.
 */
export function LanguageSwitcher({ showLabel = false }: LanguageSwitcherProps) {
  const t = useTranslations("common.LanguageSwitcher");
  const current = useLocale();
  // The address without its language prefix, so each link keeps the page.
  const pathname = usePathname();

  return (
    <Stack
      role="group"
      aria-label={t("label")}
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", flexShrink: 0 }}
    >
      <TranslateIcon aria-hidden="true" sx={{ fontSize: 14, color: "text.secondary" }} />
      {showLabel && (
        <Typography variant="mono" aria-hidden="true" sx={{ color: "text.secondary" }}>
          {t("label")}
        </Typography>
      )}
      {LOCALES.flatMap((locale, index) => {
        const name = t(`languages.${locale}`);
        // The short code is what's seen; the full name is what's read out.
        const content = (
          <>
            <span aria-hidden="true">{languageCode(locale)}</span>
            <span style={VISUALLY_HIDDEN}>{name}</span>
          </>
        );
        const separator = index > 0 && (
          <Typography
            key={`${locale}-separator`}
            component="span"
            aria-hidden="true"
            sx={{ ...languageOption, minWidth: 0, color: "slate.500" }}
          >
            ·
          </Typography>
        );
        const option =
          locale === current ? (
            <Typography
              key={locale}
              component="span"
              lang={locale}
              aria-current="true"
              sx={{ ...languageOption, color: "primary.light", fontWeight: 700 }}
            >
              {content}
            </Typography>
          ) : (
            <Link
              key={locale}
              // A plain link, so the page loads whole in the new language.
              href={getPathname({ locale, href: pathname })}
              lang={locale}
              hrefLang={locale}
              underline="hover"
              // Saved before the visitor is taken there, so the saved choice
              // agrees with the page they land on.
              onClick={() => saveLanguageChoice(locale)}
              sx={{
                ...languageOption,
                color: "text.secondary",
                fontWeight: 400,
                transition: "color 150ms",
                "&:hover": { color: "primary.light" },
              }}
            >
              {content}
            </Link>
          );
        return [separator, option];
      })}
    </Stack>
  );
}
