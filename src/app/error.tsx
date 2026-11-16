"use client";

import { ErrorPage } from "@/components/_common/ErrorPage";

// Next requires error boundaries to be client components. Shown when a page
// throws while rendering; the root layout (navbar and footer) stays.
export default function RouteError({ retry }: { retry: () => void }) {
  return <ErrorPage retry={retry} />;
}
