import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GITHUB_URL } from "@/constants";
import { renderWithTheme } from "@tests/render";
import { PROJECTS } from "./config";
import { ProjectList } from "./ProjectList";

const projectNames = () =>
  screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);

const projectSection = (name: string) =>
  screen.getByRole("heading", { level: 2, name }).closest("section")!;

describe("ProjectList", () => {
  it("shows the newest project first", () => {
    renderWithTheme(<ProjectList />);
    const newestFirst = [...PROJECTS]
      .sort((a, b) => b.started.localeCompare(a.started))
      .map((project) => project.name);
    expect(projectNames()).toEqual(newestFirst);
  });

  it("puts this website above GrowthTracker", () => {
    renderWithTheme(<ProjectList />);
    const names = projectNames();
    expect(names.indexOf("pedrobarbosa.pt")).toBeLessThan(names.indexOf("GrowthTracker"));
  });

  it("links this website to its public code on my GitHub", () => {
    renderWithTheme(<ProjectList />);
    const link = within(projectSection("pedrobarbosa.pt")).getByRole("link", { name: /github/i });
    expect(link.getAttribute("href")).toMatch(new RegExp(`^${GITHUB_URL}/`));
  });

  it("doesn't link to GrowthTracker's code, which is private", () => {
    renderWithTheme(<ProjectList />);
    expect(within(projectSection("GrowthTracker")).queryByRole("link")).not.toBeInTheDocument();
  });
});
