import { NotFoundPage } from "@/_common/components/NotFoundPage";

// Shown inside the layout when a page calls notFound(), in the page's language.
// Addresses without a page show app/global-not-found.tsx instead.
export default function NotFound() {
  return <NotFoundPage />;
}
