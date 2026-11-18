import { useTranslations } from "next-intl";
import { NAME } from "@/_common/constants";
import { ActionButton } from "@/_common/components/ActionButton";
import { CenteredHero } from "@/_common/components/CenteredHero";
import { CenteredMain } from "@/_common/components/CenteredMain";

interface ErrorPageProps {
  /** Loads and renders the page that failed again. */
  retry: () => void;
}

/** Shown in place of a page that threw while rendering, inside the site's layout. */
export function ErrorPage({ retry }: ErrorPageProps) {
  const t = useTranslations("common.ErrorPage");
  return (
    <CenteredMain>
      {/* Error pages are client components, which can't export metadata, so
          the page renders its own tab title, following the site's pattern. */}
      <title>{t("tabTitle", { name: NAME })}</title>
      <CenteredHero
        label={t("label")}
        title={t("title")}
        actions={
          <>
            <ActionButton onClick={retry} primary pill>
              {t("retry")}
            </ActionButton>
            <ActionButton href="/" pill>
              {t("home")}
            </ActionButton>
          </>
        }
      >
        {t("text")}
      </CenteredHero>
    </CenteredMain>
  );
}
