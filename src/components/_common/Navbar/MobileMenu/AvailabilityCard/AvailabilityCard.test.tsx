import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Availability } from "@/constants";
import { setProfile } from "@tests/profile";
import { renderWithTheme } from "@tests/render";

async function renderWith(availability: Availability) {
  setProfile({ availability });
  const { AvailabilityCard } = await import("./AvailabilityCard");
  renderWithTheme(<AvailabilityCard />);
}

describe("AvailabilityCard", () => {
  it("says the start is immediate", async () => {
    await renderWith("immediate");
    expect(screen.getByText("Availability")).toBeVisible();
    expect(screen.getByText("Immediate")).toBeVisible();
  });

  it("says open to opportunities, without a start date", async () => {
    await renderWith("open");
    expect(screen.getByText("Open to opportunities")).toBeVisible();
    expect(screen.queryByText("Immediate")).not.toBeInTheDocument();
  });

  it("says nothing about availability when not looking", async () => {
    await renderWith("not-looking");
    expect(screen.queryByText("Availability")).not.toBeInTheDocument();
    expect(screen.queryByText(/immediate|opportunit/i)).not.toBeInTheDocument();
  });
});
