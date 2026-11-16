import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NAME } from "@/constants";
import { renderWithTheme } from "@tests/render";
import { ErrorPage } from "./ErrorPage";

function renderErrorPage() {
  const retry = vi.fn();
  renderWithTheme(<ErrorPage retry={retry} />);
  return { retry };
}

describe("ErrorPage", () => {
  it("explains what happened, under a single main heading", () => {
    renderErrorPage();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Something failed to render.",
    );
    expect(screen.getByText(/unexpected error stopped this page/)).toBeInTheDocument();
  });

  it("retries the page once per click, and not before", async () => {
    const { retry } = renderErrorPage();
    expect(retry).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(2);
  });

  it("offers a way back to Home", () => {
    renderErrorPage();
    expect(screen.getByRole("link", { name: "Go to Home" })).toHaveAttribute("href", "/");
  });

  it("names the browser tab, with the site's name", () => {
    renderErrorPage();
    expect(document.title).toContain("Something went wrong");
    expect(document.title).toContain(NAME);
  });
});
