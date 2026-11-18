"use client";

import { useEffect, useRef, useState } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import { EMAIL } from "@/_common/constants";
import { ActionButton } from "@/_common/components/ActionButton";
import { COPY_STATUSES, RESET_AFTER_MS } from "./constants";
import type { CopyStatus } from "./types";

export function CopyEmailButton() {
  const t = useTranslations("contact.CopyEmailButton");
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    resetTimer.current = setTimeout(() => setStatus("idle"), RESET_AFTER_MS);
  };

  return (
    <ActionButton onClick={handleCopy} primary startIcon={<ContentCopyOutlinedIcon />}>
      {/* All labels share one cell, so the button fits the longest and never resizes. */}
      <Box component="span" aria-live="polite" sx={{ display: "inline-grid" }}>
        {COPY_STATUSES.map((key) => (
          <Box
            component="span"
            key={key}
            sx={{
              gridArea: "1 / 1",
              justifySelf: "start",
              visibility: key === status ? "visible" : "hidden",
            }}
          >
            {t(key)}
          </Box>
        ))}
      </Box>
    </ActionButton>
  );
}
