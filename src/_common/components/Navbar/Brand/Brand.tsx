"use client";

// Client, because it hands the site's Link to MUI's Link as a component.
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { NAME } from "@/_common/constants";
import { Link as LocaleLink } from "@/_common/navigation";

export function Brand() {
  const t = useTranslations("profile");
  return (
    <Link
      component={LocaleLink}
      href="/"
      underline="none"
      color="inherit"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        minWidth: 0,
        "&:hover .brand-avatar": { borderColor: "primary.main" },
      }}
    >
      <Avatar
        className="brand-avatar"
        aria-hidden
        sx={{
          flexShrink: 0,
          width: 36,
          height: 36,
          color: "primary.main",
          backgroundColor: "surface.teal10",
          border: 1,
          borderColor: "surface.teal30",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.05em",
          transition: "border-color 150ms",
        }}
      >
        PB
      </Avatar>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 0, lg: 1 }}
        sx={{ alignItems: { lg: "baseline" }, minWidth: 0 }}
      >
        <Typography
          component="span"
          noWrap
          sx={{
            color: "common.white",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.025em",
          }}
        >
          {NAME}
        </Typography>
        <Typography component="span" noWrap sx={{ color: "text.secondary", fontSize: 12 }}>
          {t("role")}
        </Typography>
      </Stack>
    </Link>
  );
}
