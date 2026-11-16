import type { CopyStatus } from "./types";

export const LABELS: Record<CopyStatus, string> = {
  idle: "Copy email address",
  copied: "Copied to clipboard!",
  failed: "Couldn't copy the email",
};
