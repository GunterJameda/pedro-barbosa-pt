import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MAIN_ID } from "@/constants";
import { renderWithTheme } from "@tests/render";

import { SkipLink } from "./SkipLink";

function renderPage() {
  return renderWithTheme(
    <>
      <SkipLink />
      <nav>
        <a href="/about">About</a>
      </nav>
      <main id={MAIN_ID} tabIndex={-1}>
        <a href="/contact">Contact</a>
      </main>
    </>,
  );
}

describe("SkipLink", () => {
  it("is the first thing keyboard users reach", async () => {
    renderPage();
    await userEvent.tab();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveFocus();
  });

  it("moves keyboard focus past the navigation, to the main content", async () => {
    renderPage();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("main")).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveFocus();
  });

  it("doesn't add #main to the address", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("link", { name: "Skip to content" }));
    expect(window.location.hash).toBe("");
  });
});
