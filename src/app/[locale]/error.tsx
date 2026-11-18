"use client";

import { ErrorPage } from "@/_common/components/ErrorPage";

// Next requires error boundaries to be client components. Shown when a page
// throws while rendering; the root layout (navbar and footer) stays.
export default function RouteError({ retry }: { retry: () => void }) {
  return <ErrorPage retry={retry} />;
}
