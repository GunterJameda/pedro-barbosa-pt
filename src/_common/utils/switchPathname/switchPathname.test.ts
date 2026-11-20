import { describe, expect, it } from "vitest";
import { switchPathname } from "./switchPathname";

describe("switchPathname", () => {
  it.each(["/", "/about", "/experience", "/projects", "/contact"])(
    "keeps the page %s",
    (pathname) => {
      expect(switchPathname(pathname)).toBe(pathname);
    },
  );

  it.each(["/_not-found", "/nope", "/experience/nope", "/About", "/about/"])(
    "sends %s, which isn't a page, to the home page",
    (pathname) => {
      expect(switchPathname(pathname)).toBe("/");
    },
  );
});
