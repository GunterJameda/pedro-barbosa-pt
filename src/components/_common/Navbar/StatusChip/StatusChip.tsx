"use client";

// Client, because MUI's Chip only draws an icon it can inspect. From a server
// component, the client-only StatusDot arrives as a reference still loading on
// a cold page load, so the browser drew the chip without its dot and the page
// failed to hydrate.

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { StatusDot } from "@/components/_common/StatusDot";
import { AVAILABILITY } from "@/constants";
import { surfaces } from "@/theme";
import { STATUS_LABEL, STATUS_LABELS, STATUS_SHORT_LABEL } from "./config";

const chip = {
  gap: 1,
  height: 24,
  color: "primary.main",
  backgroundColor: surfaces.teal10,
  border: `1px solid ${surfaces.teal20}`,
  fontSize: 12,
  fontWeight: 500,
  "& .MuiChip-icon": { m: 0 },
  "& .MuiChip-label": { p: 0 },
};

/**
 * Availability chip. The full one shows on desktop; the compact one, on
 * smaller screens, reads "Open" but keeps the full text for screen readers.
 */
export function StatusChip({ compact = false }: { compact?: boolean }) {
  const label = STATUS_LABEL[AVAILABILITY];

  if (compact) {
    return label ? (
      <Chip
        label={STATUS_SHORT_LABEL}
        aria-label={label}
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
      {STATUS_LABELS.map((text) => {
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
