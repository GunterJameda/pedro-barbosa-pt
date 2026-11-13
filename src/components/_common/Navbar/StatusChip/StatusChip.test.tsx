import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Availability } from "@/constants";
import { setProfile } from "@tests/profile";
import { renderWithTheme } from "@tests/render";

async function renderWith(availability: Availability, compact = false) {
  setProfile({ availability });
  const { StatusChip } = await import("./StatusChip");
  renderWithTheme(<StatusChip compact={compact} />);
}

/** Shown to sighted visitors, ignoring breakpoints (jsdom can't evaluate them). */
const isShown = (element: Element) => getComputedStyle(element).visibility !== "hidden";

const shownTexts = (pattern: RegExp) =>
  screen
    .queryAllByText(pattern)
    .filter(isShown)
    .map((element) => element.textContent);

describe("StatusChip", () => {
  it("says open for opportunities when available right away", async () => {
    await renderWith("immediate");
    expect(shownTexts(/opportunities/)).toEqual(["Open for opportunities"]);
  });

  it("says open to opportunities when open without a start date", async () => {
    await renderWith("open");
    expect(shownTexts(/opportunities/)).toEqual(["Open to opportunities"]);
  });

  it("shows nothing when not looking", async () => {
    await renderWith("not-looking");
    expect(shownTexts(/opportunit/)).toEqual([]);
  });

  it("hides the unused labels from screen readers too", async () => {
    await renderWith("immediate");
    const hidden = screen.queryAllByText(/opportunities/).filter((element) => !isShown(element));
    for (const element of hidden) {
      expect(element.closest("[aria-hidden='true']")).not.toBeNull();
    }
  });

  describe("compact", () => {
    it("shows a short label that still reads in full to screen readers", async () => {
      await renderWith("open", true);
      expect(screen.getByLabelText("Open to opportunities")).toHaveTextContent(/^Open$/);
    });

    it("shows nothing when not looking", async () => {
      await renderWith("not-looking", true);
      expect(screen.queryByText("Open")).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/opportunit/)).not.toBeInTheDocument();
    });
  });
});
