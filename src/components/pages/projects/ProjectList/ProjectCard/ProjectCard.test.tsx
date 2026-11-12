import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@tests/render";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "./types";

const project = (overrides: Partial<Project> = {}): Project => ({
  name: "Sample",
  tagline: "A sample project",
  kind: "Side Project",
  started: "2024-03",
  status: "Live",
  summary: "Summary.",
  details: "Details.",
  takeaways: [{ title: "Lesson", text: "Learned something." }],
  detailCards: [{ title: "Frontend", description: "Built it.", tags: ["React"] }],
  ...overrides,
});

describe("ProjectCard", () => {
  it("shows the dates of a finished project", () => {
    renderWithTheme(<ProjectCard project={project({ started: "2021-05", ended: "2026-01" })} />);
    expect(screen.getByText("Side Project · May 2021 - Jan 2026")).toBeInTheDocument();
  });

  it("shows an ongoing project as running until the present", () => {
    renderWithTheme(<ProjectCard project={project({ started: "2026-11" })} />);
    expect(screen.getByText("Side Project · Nov 2026 - Present")).toBeInTheDocument();
  });

  it("keeps January and December in their own year, whatever the time zone", () => {
    renderWithTheme(<ProjectCard project={project({ started: "2025-12", ended: "2026-01" })} />);
    expect(screen.getByText("Side Project · Dec 2025 - Jan 2026")).toBeInTheDocument();
  });

  it("links to public code in a new tab, without giving that tab access to the site", () => {
    renderWithTheme(
      <ProjectCard project={project({ repoUrl: "https://github.com/someone/sample" })} />,
    );
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", "https://github.com/someone/sample");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("says the code is private instead of linking to it", () => {
    renderWithTheme(<ProjectCard project={project()} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText(/private/i)).toBeInTheDocument();
  });

  it("doesn't call public code private", () => {
    renderWithTheme(
      <ProjectCard project={project({ repoUrl: "https://github.com/someone/sample" })} />,
    );
    expect(screen.queryByText(/private/i)).not.toBeInTheDocument();
  });

  it("gives each project its own section, named by its heading", () => {
    renderWithTheme(<ProjectCard project={project()} />);
    const heading = screen.getByRole("heading", { level: 2, name: "Sample" });
    expect(within(heading.closest("section")!).getByText("A sample project")).toBeInTheDocument();
  });
});
