import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@tests/render";
import { CopyStatusMessage } from "./CopyStatusMessage";

describe("CopyStatusMessage", () => {
  it("says nothing while idle", () => {
    const { container } = renderWithTheme(<CopyStatusMessage status="idle" />);
    expect(container).toHaveTextContent("");
  });

  it("confirms the copy", () => {
    renderWithTheme(<CopyStatusMessage status="copied" />);
    expect(screen.getByText("Copied to clipboard!")).toBeVisible();
  });

  it("says so when the copy failed", () => {
    renderWithTheme(<CopyStatusMessage status="failed" />);
    expect(screen.getByText("Couldn't copy the email")).toBeVisible();
  });

  it("is a polite live region that exists even before there is a message", () => {
    const { container, rerender } = renderWithTheme(<CopyStatusMessage status="idle" />);
    const region = container.querySelector("[aria-live]");
    expect(region).toHaveAttribute("aria-live", "polite");
    rerender(<CopyStatusMessage status="copied" />);
    expect(container.querySelector("[aria-live]")).toBe(region);
    expect(region).toHaveTextContent("Copied to clipboard!");
  });
});
