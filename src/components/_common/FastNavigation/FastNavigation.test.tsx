import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@tests/render";

import { FastNavigation } from "./FastNavigation";

const LINKS = [
  { name: "First", detail: "One detail", targetId: "first" },
  { name: "Second", detail: "Another detail", targetId: "second" },
];

function renderNavigation() {
  renderWithTheme(<FastNavigation label="Things" title="All Things" links={LINKS} />);
  return screen.getByRole("navigation", { name: "Things" });
}

describe("FastNavigation", () => {
  it("is a navigation landmark named for screen readers", () => {
    expect(renderNavigation()).toBeInTheDocument();
  });

  it("jumps to each section, in the order given", () => {
    const links = within(renderNavigation()).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["#first", "#second"]);
  });

  it("names each link and its detail", () => {
    const navigation = renderNavigation();
    const second = within(navigation).getByRole("link", { name: /Second/ });
    expect(second).toHaveTextContent("Another detail");
  });

  it("shows nothing to click when there are no sections", () => {
    renderWithTheme(<FastNavigation label="Empty" title="Nothing" links={[]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
