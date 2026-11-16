import { describe, expect, it } from "vitest";
import { isActivePath } from "./utils";

describe("isActivePath", () => {
  it("matches a page's own address", () => {
    expect(isActivePath("/about", "/about")).toBe(true);
  });

  it("matches addresses inside a page", () => {
    expect(isActivePath("/projects/growth-tracker", "/projects")).toBe(true);
  });

  it("matches a page's address with a trailing slash", () => {
    expect(isActivePath("/about/", "/about")).toBe(true);
  });

  it("doesn't match an address that only starts with the same letters", () => {
    expect(isActivePath("/aboutness", "/about")).toBe(false);
  });

  it("matches Home only on the home page itself, though every address starts with /", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/about", "/")).toBe(false);
  });

  it("doesn't match another page", () => {
    expect(isActivePath("/contact", "/about")).toBe(false);
  });
});
