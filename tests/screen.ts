import { act } from "@testing-library/react";
import { vi } from "vitest";

/**
 * Pretends the screen is desktop-wide or not, for code that asks through
 * matchMedia (jsdom has none). Returns a way to resize it afterwards.
 */
export function mockScreen({ isDesktop }: { isDesktop: boolean }) {
  let matches = isDesktop;
  const listeners = new Set<(event: { matches: boolean }) => void>();

  vi.stubGlobal("matchMedia", (media: string) => ({
    media,
    get matches() {
      return matches;
    },
    addEventListener: (_: string, listener: (event: { matches: boolean }) => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: (event: { matches: boolean }) => void) =>
      listeners.delete(listener),
  }));

  return {
    resize({ isDesktop }: { isDesktop: boolean }) {
      matches = isDesktop;
      act(() => listeners.forEach((listener) => listener({ matches })));
    },
  };
}
