"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import { PAGES } from "@/_common/constants";
import { usePathname } from "@/_common/navigation";
import { StatusDot } from "@/_common/components/StatusDot";
import { activeLink, variantStyles } from "./styles";
import { isActivePath } from "./utils";
import type { NavLinksVariant } from "./types";

/** Links to every page, with the current one highlighted. */
export function NavLinks({ variant }: { variant: NavLinksVariant }) {
  const t = useTranslations("common.NavLinks");
  const tPages = useTranslations("pages");
  // The address without its language prefix, so links match in every language.
  const pathname = usePathname();
  const { nav, link, inactiveLink } = variantStyles[variant];

  return (
    <Stack
      component="nav"
      aria-label={t("label")}
      direction={variant === "desktop" ? "row" : "column"}
      spacing={1}
      sx={nav}
    >
      {PAGES.map((page) => {
        const isActive = isActivePath(pathname, page.href);
        return (
          <Button
            key={page.href}
            href={page.href}
            aria-current={isActive ? "page" : undefined}
            disableElevation
            sx={{
              ...link,
              borderRadius: 2,
              // Always reserve the border so the active state doesn't shift layout.
              border: "1px solid",
              borderColor: "transparent",
              fontWeight: 500,
              ...(isActive ? activeLink : inactiveLink),
            }}
          >
            {variant === "mobile" ? (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {isActive && <StatusDot />}
                <span>{tPages(page.key)}</span>
              </Stack>
            ) : (
              tPages(page.key)
            )}
          </Button>
        );
      })}
    </Stack>
  );
}
