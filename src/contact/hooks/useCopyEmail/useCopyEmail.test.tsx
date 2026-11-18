import { act, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EMAIL } from "@/_common/constants";
import { useCopyEmail } from "./useCopyEmail";

/** Moves the clock forward and lets React apply what the timers did. */
const passTime = (ms: number) => act(() => vi.advanceTimersByTime(ms));

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  // Installs the clipboard stub the tests read from and spy on.
  userEvent.setup({ delay: null });
});
afterEach(() => vi.useRealTimers());

describe("useCopyEmail", () => {
  it("starts idle", () => {
    const { result } = renderHook(() => useCopyEmail());
    expect(result.current.status).toBe("idle");
  });

  it("puts the email address on the clipboard and reports it", async () => {
    const { result } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    expect(await navigator.clipboard.readText()).toBe(EMAIL);
    expect(result.current.status).toBe("copied");
  });

  it("reports a failure when the browser refuses to copy", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new DOMException("Denied", "NotAllowedError"),
    );
    const { result } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    expect(result.current.status).toBe("failed");
  });

  it("reports a failure when the browser has no clipboard access at all", async () => {
    // Happens on pages served over plain HTTP, where navigator.clipboard is missing.
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue(undefined as unknown as Clipboard);
    const { result } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    expect(result.current.status).toBe("failed");
  });

  it("keeps the result for a moment, then goes back to idle", async () => {
    const { result } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    passTime(1000);
    expect(result.current.status).toBe("copied");
    passTime(5000);
    expect(result.current.status).toBe("idle");
  });

  it("goes back to idle after a failure too", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error());
    const { result } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    passTime(6000);
    expect(result.current.status).toBe("idle");
  });

  it("restarts the wait when copied again, so the result doesn't vanish early", async () => {
    const { result } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    passTime(1500);
    await act(() => result.current.copy());
    passTime(1500);
    expect(result.current.status).toBe("copied");
  });

  it("shows the latest result when a failed copy is followed by a working one", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error());
    const { result } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    await act(() => result.current.copy());
    expect(result.current.status).toBe("copied");
  });

  it("leaves no timer running after it's removed from the page", async () => {
    const { result, unmount } = renderHook(() => useCopyEmail());
    await act(() => result.current.copy());
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
