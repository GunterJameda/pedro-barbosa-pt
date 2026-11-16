import type { Metadata } from "next";
import { ActionButton } from "@/_common/components/ActionButton";
import { CenteredHero } from "@/_common/components/CenteredHero";
import { CenteredMain } from "@/_common/components/CenteredMain";

export const metadata: Metadata = {
  title: "Page not found",
};

// Shown for every address without its own route, with a 404 status.
export default function NotFound() {
  return (
    <CenteredMain>
      <CenteredHero
        label="Error 404"
        title="Nothing to render here."
        actions={
          <>
            <ActionButton href="/" primary pill>
              Go to Home
            </ActionButton>
            <ActionButton href="/contact" pill>
              Contact me
            </ActionButton>
          </>
        }
      >
        {"This route isn't part of the site. Let me point you somewhere useful."}
      </CenteredHero>
    </CenteredMain>
  );
}
