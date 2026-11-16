import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NAME } from "@/constants";
import { GlobalErrorPage } from "./GlobalErrorPage";

// It renders the whole document, like Next does, and without the site's theme,
// which may be what failed.
function renderGlobalErrorPage() {
  const retry = vi.fn();
  render(<GlobalErrorPage retry={retry} />, { container: document });
  return { retry };
}

describe("GlobalErrorPage", () => {
  it("explains what happened, under a single main heading", () => {
    renderGlobalErrorPage();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("The site failed to load.");
  });

  it("sets the page language, since it replaces the layout that would", () => {
    renderGlobalErrorPage();
    expect(document.documentElement).toHaveAttribute("lang", "en");
  });

  it("retries the site once per click, and not before", async () => {
    const { retry } = renderGlobalErrorPage();
    expect(retry).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("offers a way back to Home", () => {
    renderGlobalErrorPage();
    expect(screen.getByRole("link", { name: "Go to Home" })).toHaveAttribute("href", "/");
  });

  it("names the browser tab, with the site's name", () => {
    renderGlobalErrorPage();
    expect(document.title).toContain("Something went wrong");
    expect(document.title).toContain(NAME);
  });
});
