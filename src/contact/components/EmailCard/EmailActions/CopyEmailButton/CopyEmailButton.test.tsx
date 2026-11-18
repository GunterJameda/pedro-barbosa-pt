import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@tests/render";
import { CopyEmailButton } from "./CopyEmailButton";

describe("CopyEmailButton", () => {
  it("offers to copy the email address", () => {
    renderWithTheme(<CopyEmailButton onCopy={vi.fn()} />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Copy email address");
  });

  it("asks to copy when clicked", async () => {
    const onCopy = vi.fn();
    renderWithTheme(<CopyEmailButton onCopy={onCopy} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onCopy).toHaveBeenCalledTimes(1);
  });
});
