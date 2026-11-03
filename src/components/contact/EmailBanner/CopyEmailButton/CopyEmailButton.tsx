"use client";

import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/constants";
import { fontMono, slate, surfaces } from "@/theme";

const RESET_AFTER_MS = 2000;

const LABELS = {
  idle: "Copy Email Address",
  copied: "✓ Copied to clipboard",
  failed: "Couldn't copy the email",
};

export function CopyEmailButton() {
  const [status, setStatus] = useState<keyof typeof LABELS>("idle");
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
    <Button
      onClick={handleCopy}
      sx={{
        // Fits the longest label, so the button doesn't resize when it changes.
        minWidth: "calc(23ch + 50px)",
        px: 3,
        py: 1,
        borderRadius: 2,
        color: slate[300],
        backgroundColor: surfaces.white4,
        border: `1px solid ${surfaces.white10}`,
        fontFamily: fontMono,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: "16px",
        whiteSpace: "nowrap",
        "&:hover": {
          backgroundColor: surfaces.white8,
          borderColor: surfaces.white20,
        },
      }}
    >
      <span aria-live="polite">{LABELS[status]}</span>
    </Button>
  );
}
