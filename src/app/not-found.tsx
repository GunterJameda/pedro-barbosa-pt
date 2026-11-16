import type { Metadata } from "next";
import { ActionButton } from "@/components/_common/ActionButton";
import { CenteredHero } from "@/components/_common/CenteredHero";
import { CenteredMain } from "@/components/_common/CenteredMain";

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
