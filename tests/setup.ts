import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

// next/font only works inside a Next.js build. The theme loads the site's
// fonts, so every test that uses it needs this.
vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "" }),
  JetBrains_Mono: () => ({ variable: "" }),
}));
