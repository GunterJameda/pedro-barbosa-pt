import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/_common/constants";
import { RESET_AFTER_MS } from "./constants";
import type { CopyStatus } from "./types";

/** Copies the email address and reports the result, which fades back to "idle" after a moment. */
export function useCopyEmail() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = async () => {
    clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    resetTimer.current = setTimeout(() => setStatus("idle"), RESET_AFTER_MS);
  };

  return { status, copy };
}
