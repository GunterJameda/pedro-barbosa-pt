import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Availability, WorkMode } from "@/constants";
import { setProfile } from "@tests/profile";
import { renderWithTheme } from "@tests/render";

async function renderWith(availability: Availability, workMode: WorkMode) {
  setProfile({ availability, workMode });
  const { LocationBanner } = await import("./LocationBanner");
  renderWithTheme(<LocationBanner />);
}

// The banner's heading also says "open to remote work", so match the status line only.
const statusLine = () => screen.queryByText(/^Open to /);

describe("LocationBanner", () => {
  it("says open to remote and hybrid roles", async () => {
    await renderWith("immediate", "remote-and-hybrid");
    expect(statusLine()).toHaveTextContent("Open to remote and hybrid roles");
  });

  it("says open to remote roles only, with no mention of hybrid", async () => {
    await renderWith("open", "remote-only");
    expect(statusLine()).toHaveTextContent("Open to remote roles");
    expect(screen.queryByText(/hybrid/i)).not.toBeInTheDocument();
  });

  it("drops the status line when not looking", async () => {
    await renderWith("not-looking", "remote-and-hybrid");
    expect(statusLine()).not.toBeInTheDocument();
  });

  it("keeps the location itself when not looking", async () => {
    await renderWith("not-looking", "remote-and-hybrid");
    expect(screen.getByRole("heading", { name: /Based in Porto/ })).toBeInTheDocument();
  });
});
