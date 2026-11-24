"use client";

// Client, because MUI's Chip only draws an icon it can inspect. From a server
// component, the client-only StatusDot arrives as a reference still loading on
// a cold page load, so the browser drew the chip without its dot and the page
// failed to hydrate.

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { useTranslations } from "next-intl";
import { AVAILABILITY } from "@/_common/constants";
import { StatusDot } from "@/_common/components/StatusDot";
import { CHIP_STATUSES } from "./constants";
import { chip } from "./styles";

/**
 * Availability chip. The full one shows on desktop; the compact one, on
 * smaller screens, reads "Open" but keeps the full text as hidden text for screen readers.
 */
export function StatusChip({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("common.StatusChip");
  const availability = AVAILABILITY;
  const label = availability === "not-looking" ? null : t(`status.${availability}`);
  // Every chip text, to reserve the width of the widest.
  const labels = CHIP_STATUSES.map((status) => t(`status.${status}`));

  if (compact) {
    return label ? (
      <Chip
        label={
          <>
            <span aria-hidden>{t("short")}</span>
            <Box component="span" sx={visuallyHidden}>
              {label}
            </Box>
          </>
        }
        icon={<StatusDot pulse />}
        sx={{
          ...chip,
          px: 1,
          // Not enough room for it next to the name on the smallest phones.
          "@media (max-width:359px)": { display: "none" },
        }}
      />
    ) : null;
  }

  // Every label sits in the same cell, so the slot always fits the widest one
  // and the links never move when the chip changes or hides.
  return (
    <Box sx={{ display: { xs: "none", lg: "grid" }, justifyItems: "end" }}>
      {labels.map((text) => {
        const isShown = text === label;
        return (
          <Chip
            key={text}
            label={text}
            aria-hidden={isShown ? undefined : true}
            icon={<StatusDot pulse />}
            sx={{
              ...chip,
              gridArea: "1 / 1",
              px: 2,
              visibility: isShown ? "visible" : "hidden",
            }}
          />
        );
      })}
    </Box>
  );
}
