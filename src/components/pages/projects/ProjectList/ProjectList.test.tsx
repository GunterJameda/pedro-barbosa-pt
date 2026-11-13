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

  it("puts this website above Growth Tracker", () => {
    renderWithTheme(<ProjectList />);
    const names = projectNames();
    expect(names.indexOf("pedrobarbosa.pt")).toBeLessThan(names.indexOf("Growth Tracker"));
  });

  it("links this website to its public code on my GitHub", () => {
    renderWithTheme(<ProjectList />);
    const link = within(projectSection("pedrobarbosa.pt")).getByRole("link", { name: /github/i });
    expect(link.getAttribute("href")).toMatch(new RegExp(`^${GITHUB_URL}/`));
  });

  it("marks Growth Tracker's code as private, with no link to it", () => {
    renderWithTheme(<ProjectList />);
    const growthTracker = within(projectSection("Growth Tracker"));
    expect(growthTracker.queryByRole("link")).not.toBeInTheDocument();
    expect(growthTracker.getByText(/private/i)).toBeInTheDocument();
  });

  it("lists every project in Fast Navigation, in the same order as the cards", () => {
    renderWithTheme(<ProjectList />);
    const navigation = screen.getByRole("navigation", { name: "Projects" });
    const linked = within(navigation)
      .getAllByRole("link")
      .map((link) => link.textContent);
    projectNames().forEach((name, index) => expect(linked[index]).toContain(name));
    expect(linked).toHaveLength(projectNames().length);
  });

  it("jumps from each Fast Navigation link to that project's card", () => {
    const { container } = renderWithTheme(<ProjectList />);
    const navigation = screen.getByRole("navigation", { name: "Projects" });
    for (const link of within(navigation).getAllByRole("link")) {
      const target = container.querySelector(link.getAttribute("href")!);
      expect(target, `${link.textContent} has no section`).not.toBeNull();
      const heading = within(target as HTMLElement).getByRole("heading", { level: 2 });
      expect(link.textContent).toContain(heading.textContent);
    }
  });

  it("gives every project its own section id", () => {
    const { container } = renderWithTheme(<ProjectList />);
    const ids = [...container.querySelectorAll("section[id]")].map((section) => section.id);
    expect(new Set(ids).size).toBe(PROJECTS.length);
  });
});
