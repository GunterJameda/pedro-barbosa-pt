import type { CopyStatus } from "./types";

/** How long the result stays on the button, in milliseconds. */
export const RESET_AFTER_MS = 2000;

export const LABELS: Record<CopyStatus, string> = {
  idle: "Copy email address",
  copied: "Copied to clipboard!",
  failed: "Couldn't copy the email",
};
