"use client";

import { GlobalErrorPage } from "@/components/_common/GlobalErrorPage";

// Next requires error boundaries to be client components. Shown when the root
// layout itself fails; it replaces the whole document.
export default function GlobalError({ retry }: { retry: () => void }) {
  return <GlobalErrorPage retry={retry} />;
}
