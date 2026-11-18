import { getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/_common/i18n";
import { siteMetadata } from "@/_common/utils/siteMetadata";
import { NotFoundPage } from "@/_common/components/NotFoundPage";
import { SiteDocument } from "@/_common/components/SiteDocument";

export async function generateMetadata() {
  const t = await getTranslations({ locale: DEFAULT_LOCALE, namespace: "notFound" });
  return siteMetadata(t("title"));
}

// Shown, with a 404 status, for every address without a page. It sits outside
// the [locale] route, so it brings the whole document and is in the default
// language.
export default function GlobalNotFound() {
  return (
    <SiteDocument locale={DEFAULT_LOCALE}>
      <NotFoundPage />
    </SiteDocument>
  );
}
