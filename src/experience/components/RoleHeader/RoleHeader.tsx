import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import { formatMonth } from "@/_common/utils/formatMonth";
import { DotLabel } from "@/_common/components/DotLabel";

interface RoleHeaderProps {
  industry: string;
  company: string;
  roleTitle: string;
  /** Year and month, as "2025-10". */
  started: string;
  /** Year and month, as "2026-07". */
  ended: string;
  /** "large" for the featured roles, "compact" for the smaller cards. */
  size?: "large" | "compact";
  sx?: SxProps<Theme>;
}

/** The industry, company, role title and period at the top of a role's card. */
export function RoleHeader({
  industry,
  company,
  roleTitle,
  started,
  ended,
  size = "large",
  sx,
}: RoleHeaderProps) {
  const t = useTranslations("experience");
  const locale = useLocale();
  const large = size === "large";
  return (
    <Stack spacing={1} sx={sx}>
      <DotLabel>{industry}</DotLabel>
      {large ? (
        <Typography variant="cardHeading">{company}</Typography>
      ) : (
        <Typography variant="cardTitle" component="h2">
          {company}
        </Typography>
      )}
      <Typography
        sx={{
          color: large ? "slate.200" : "slate.300",
          fontSize: large ? 14 : 12,
          fontWeight: 500,
        }}
      >
        {roleTitle}
      </Typography>
      <Typography variant="mono">
        {t("period", { start: formatMonth(started, locale), end: formatMonth(ended, locale) })}
      </Typography>
    </Stack>
  );
}
