import { getLocale } from "next-intl/server";
import { LOCALES } from "@/_common/i18n";
import { siteMetadata } from "@/_common/utils/siteMetadata";
import { SiteDocument } from "@/_common/components/SiteDocument";

export const generateMetadata = () => siteMetadata();

// Every language's pages are built ahead of time.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  return <SiteDocument locale={await getLocale()}>{children}</SiteDocument>;
}
