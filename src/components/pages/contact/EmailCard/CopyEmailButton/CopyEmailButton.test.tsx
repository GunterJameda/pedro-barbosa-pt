import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EMAIL } from "@/constants";
import { renderWithTheme } from "@tests/render";
import { CopyEmailButton } from "./CopyEmailButton";

const IDLE = "Copy email address";
const COPIED = "Copied to clipboard!";
const FAILED = "Couldn't copy the email";

/** Moves the clock forward and lets React apply what the timers did. */
const passTime = (ms: number) => act(() => vi.advanceTimersByTime(ms));

function setup() {
  const user = userEvent.setup({ delay: null });
  const view = renderWithTheme(<CopyEmailButton />);
  return { user, view, button: screen.getByRole("button") };
}

// Time still flows, so Testing Library's own short waits finish; the tests jump ahead on top.
beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
afterEach(() => vi.useRealTimers());

describe("CopyEmailButton", () => {
  it("offers to copy the email address", () => {
    const { button } = setup();
    expect(button).toHaveAccessibleName(IDLE);
  });

  it("puts the email address on the clipboard", async () => {
    const { user, button } = setup();
    await user.click(button);
    expect(await navigator.clipboard.readText()).toBe(EMAIL);
  });

  it("confirms the copy", async () => {
    const { user, button } = setup();
    await user.click(button);
    expect(button).toHaveAccessibleName(COPIED);
  });

  it("says so when the browser refuses to copy", async () => {
    const { user, button } = setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new DOMException("Denied", "NotAllowedError"),
    );
    await user.click(button);
    expect(button).toHaveAccessibleName(FAILED);
  });

  it("says so when the browser has no clipboard access at all", async () => {
    // Happens on pages served over plain HTTP, where navigator.clipboard is missing.
    const { user, button } = setup();
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue(undefined as unknown as Clipboard);
    await user.click(button);
    expect(button).toHaveAccessibleName(FAILED);
  });

  it("keeps the confirmation up for a moment, then goes back to its label", async () => {
    const { user, button } = setup();
    await user.click(button);
    passTime(1000);
    expect(button).toHaveAccessibleName(COPIED);
    passTime(5000);
    expect(button).toHaveAccessibleName(IDLE);
  });

  it("goes back to its label after a failure too", async () => {
    const { user, button } = setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error());
    await user.click(button);
    passTime(6000);
    expect(button).toHaveAccessibleName(IDLE);
  });

  it("restarts the wait when clicked again, so the confirmation doesn't vanish early", async () => {
    const { user, button } = setup();
    await user.click(button);
    passTime(1500);
    await user.click(button);
    passTime(1500);
    expect(button).toHaveAccessibleName(COPIED);
  });

  it("shows the latest result when a failed copy is followed by a working one", async () => {
    const { user, button } = setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error());
    await user.click(button);
    await user.click(button);
    expect(button).toHaveAccessibleName(COPIED);
  });

  it("announces the result to screen readers", async () => {
    const { user, button } = setup();
    await user.click(button);
    expect(screen.getByText(COPIED).closest("[aria-live]")).toHaveAttribute("aria-live", "polite");
  });

  it("leaves no timer running after it's removed from the page", async () => {
    const { user, button, view } = setup();
    await user.click(button);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
