import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@tests/render";

import { ScrollToTop } from "./ScrollToTop";

function scrollPageTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  fireEvent.scroll(window);
}

const button = () => screen.queryByRole("button", { name: "Go to top" });

afterEach(() => {
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
});

describe("ScrollToTop", () => {
  it("stays hidden at the top of the page", () => {
    renderWithTheme(<ScrollToTop />);
    expect(button()).not.toBeInTheDocument();
  });

  it("stays hidden after a small scroll", () => {
    renderWithTheme(<ScrollToTop />);
    scrollPageTo(100);
    expect(button()).not.toBeInTheDocument();
  });

  it("appears once the visitor has scrolled well down the page", () => {
    renderWithTheme(<ScrollToTop />);
    scrollPageTo(2000);
    expect(button()).toBeVisible();
  });

  it("is already there when the page opens scrolled down, as after a reload", () => {
    Object.defineProperty(window, "scrollY", { value: 2000, configurable: true });
    renderWithTheme(<ScrollToTop />);
    expect(button()).toBeVisible();
  });

  it("goes away again after scrolling back to the top", async () => {
    renderWithTheme(<ScrollToTop />);
    scrollPageTo(2000);
    scrollPageTo(0);
    await waitFor(() => expect(button()).not.toBeInTheDocument());
  });

  it("takes the visitor back to the top", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderWithTheme(<ScrollToTop />);
    scrollPageTo(2000);
    await userEvent.click(button()!);

    expect(scrollTo).toHaveBeenCalledTimes(1);
    const [first, second] = scrollTo.mock.calls[0] as unknown[];
    const top = typeof first === "number" ? second : (first as ScrollToOptions).top;
    expect(top).toBe(0);
  });

  it("leaves the scroll animation to the page, so reduced-motion settings are respected", async () => {
    // The page's CSS only animates scrolling when the visitor allows motion.
    // Asking for "smooth" here would animate for everyone.
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderWithTheme(<ScrollToTop />);
    scrollPageTo(2000);
    await userEvent.click(button()!);

    for (const args of scrollTo.mock.calls) {
      expect(args[0]).not.toMatchObject({ behavior: "smooth" });
    }
  });
});
