import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CAREER_START_YEAR } from "@/_common/constants";
import { setCareerStartYear } from "./career";
import { routeModule } from "./pages";
import { renderWithTheme } from "./render";

const OTHER_YEAR = 2015;

describe("career start year", () => {
  it("is written once in the source: no other file in src hard-codes it", () => {
    const SRC = join(process.cwd(), "src");
    const offenders = readdirSync(SRC, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.(ts|tsx)$/.test(entry.name))
      .map((entry) => join(entry.parentPath, entry.name))
      .filter((file) => !file.endsWith("_common/constants/career.ts"))
      .filter((file) => !/\.test\.tsx?$/.test(file))
      .filter((file) => readFileSync(file, "utf8").includes(String(CAREER_START_YEAR)));
    expect(offenders).toEqual([]);
  });

  it("is what the page descriptions say", async () => {
    setCareerStartYear(OTHER_YEAR);
    for (const route of ["/about", "/experience"]) {
      const { metadata } = await routeModule<{ metadata: Metadata }>(route, "page.tsx");
      expect(metadata.description, route).toContain(`since ${OTHER_YEAR}`);
      expect(metadata.description, route).not.toContain(String(CAREER_START_YEAR));
    }
  });

  it("is what the page copy says", async () => {
    setCareerStartYear(OTHER_YEAR);
    const { AboutHero } = await import("@/about/components/AboutHero");
    const { TechnicalToolbox } = await import("@/about/components/TechnicalToolbox");
    const { ExperienceHero } = await import("@/experience/components/ExperienceHero");
    const { AcademicBackground } = await import("@/experience/components/AcademicBackground");
    const { FoundationRoles } = await import("@/experience/components/FoundationRoles");
    const { CareerChart } = await import("@/experience/components/EvolutionBlueprint/CareerChart");
    const { container } = renderWithTheme(
      <>
        <AboutHero />
        <TechnicalToolbox />
        <ExperienceHero />
        <AcademicBackground />
        <FoundationRoles />
        <CareerChart />
      </>,
    );
    const text = container.textContent ?? "";
    expect(text).not.toContain(String(CAREER_START_YEAR));
    expect(text).toContain(`Senior Frontend Engineer · Since ${OTHER_YEAR}`);
    expect(text).toContain(`Senior · Since ${OTHER_YEAR}`);
    expect(screen.getByText(`Since ${OTHER_YEAR}`)).toBeInTheDocument();
    expect(text).toContain(
      `microfrontends, and building scalable design systems since ${OTHER_YEAR}.`,
    );
    expect(text).toContain(`BSc in Informatics Engineering · 2014 - ${OTHER_YEAR}`);
    expect(text).toContain(`Jul ${OTHER_YEAR} - Mar 2018`);
    expect(screen.getByRole("img")).toHaveAccessibleName(
      expect.stringContaining(`from ${OTHER_YEAR} to`),
    );
  });
});
