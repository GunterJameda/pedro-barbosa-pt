import { useTranslations } from "next-intl";
import { ActionButton } from "@/_common/components/ActionButton";
import { CenteredHero } from "@/_common/components/CenteredHero";
import { CenteredMain } from "@/_common/components/CenteredMain";

/** The 404 page's content: shown for every address without its own page. */
export function NotFoundPage() {
  const t = useTranslations("notFound");
  return (
    <CenteredMain>
      <CenteredHero
        label={t("label")}
        title={t("heading")}
        actions={
          <>
            <ActionButton href="/" primary pill>
              {t("home")}
            </ActionButton>
            <ActionButton href="/contact" pill>
              {t("contact")}
            </ActionButton>
          </>
        }
      >
        {t("text")}
      </CenteredHero>
    </CenteredMain>
  );
}
