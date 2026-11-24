import { describe, expect, it } from "vitest";
import { pickMessages } from "./pickMessages";

const messages = {
  site: { title: "Site" },
  common: { NavLinks: { home: "Home" }, SkipLink: { label: "Skip" }, Footer: { text: "Footer" } },
};

describe("pickMessages", () => {
  it("keeps only the given namespaces, with their nesting", () => {
    expect(pickMessages(messages, ["common.NavLinks", "common.SkipLink"])).toEqual({
      common: { NavLinks: { home: "Home" }, SkipLink: { label: "Skip" } },
    });
  });

  it("keeps a whole top-level namespace", () => {
    expect(pickMessages(messages, ["site"])).toEqual({ site: { title: "Site" } });
  });

  it("skips a namespace the messages don't have", () => {
    expect(pickMessages(messages, ["common.Missing", "nothing.here"])).toEqual({});
  });

  it("does not change the messages it reads", () => {
    pickMessages(messages, ["common.NavLinks"]);
    expect(messages.common.Footer).toEqual({ text: "Footer" });
  });
});
