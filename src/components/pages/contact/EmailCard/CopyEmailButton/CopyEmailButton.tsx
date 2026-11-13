"use client";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";

import { ActionButton } from "@/components/_common/ActionButton";
import { EMAIL } from "@/constants";

import { LABELS, RESET_AFTER_MS } from "./config";
import type { CopyStatus } from "./types";

export function CopyEmailButton() {
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
        {(Object.keys(LABELS) as CopyStatus[]).map((key) => (
          <Box
            component="span"
            key={key}
            sx={{
              gridArea: "1 / 1",
              justifySelf: "start",
              visibility: key === status ? "visible" : "hidden",
            }}
          >
            {LABELS[key]}
          </Box>
        ))}
      </Box>
    </ActionButton>
  );
}
