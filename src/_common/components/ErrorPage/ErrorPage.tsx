import { ActionButton } from "@/_common/components/ActionButton";
import { CenteredHero } from "@/_common/components/CenteredHero";
import { CenteredMain } from "@/_common/components/CenteredMain";
import { HOME_LABEL, LABEL, RETRY_LABEL, TAB_TITLE, TEXT, TITLE } from "./content";

interface ErrorPageProps {
  /** Loads and renders the page that failed again. */
  retry: () => void;
}

/** Shown in place of a page that threw while rendering, inside the site's layout. */
export function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <CenteredMain>
      <title>{TAB_TITLE}</title>
      <CenteredHero
        label={LABEL}
        title={TITLE}
        actions={
          <>
            <ActionButton onClick={retry} primary pill>
              {RETRY_LABEL}
            </ActionButton>
            <ActionButton href="/" pill>
              {HOME_LABEL}
            </ActionButton>
          </>
        }
      >
        {TEXT}
      </CenteredHero>
    </CenteredMain>
  );
}
