import type { CopyStatus } from "./types";

/** Every state the button can show, each labelled in the messages. */
export const COPY_STATUSES: CopyStatus[] = ["idle", "copied", "failed"];

/** How long the result stays on the button, in milliseconds. */
export const RESET_AFTER_MS = 2000;
