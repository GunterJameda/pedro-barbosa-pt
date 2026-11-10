import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Availability, WorkMode } from "@/constants";
import { LOCATION } from "@/constants";
import { setProfile } from "@tests/profile";
import { renderWithTheme } from "@tests/render";

async function renderWith(availability: Availability, workMode: WorkMode = "remote-and-hybrid") {
  setProfile({ availability, workMode });
  const { ExperienceHero } = await import("./ExperienceHero");
  renderWithTheme(<ExperienceHero />);
}

describe("ExperienceHero availability card", () => {
  it("says the start is immediate", async () => {
    await renderWith("immediate");
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByText("Immediate")).toBeInTheDocument();
  });

  it("says open to offers, without a start date", async () => {
    await renderWith("open");
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByText("Open to offers")).toBeInTheDocument();
    expect(screen.queryByText("Immediate")).not.toBeInTheDocument();
  });

  it("shows the location instead when not looking", async () => {
    await renderWith("not-looking");
    expect(screen.queryByText("Availability")).not.toBeInTheDocument();
    expect(screen.queryByText(/immediate|open to/i)).not.toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText(LOCATION)).toBeInTheDocument();
  });

  it.each<Availability>(["immediate", "open", "not-looking"])(
    "doesn't mention hybrid work for remote-only roles (%s)",
    async (availability) => {
      await renderWith(availability, "remote-only");
      expect(screen.queryByText(/hybrid/i)).not.toBeInTheDocument();
      expect(screen.getAllByText(/remote/i).length).toBeGreaterThan(0);
    },
  );

});
