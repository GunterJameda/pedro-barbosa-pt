import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "./utils";

describe("serializeJsonLd", () => {
  it("parses back to the same data", () => {
    const data = { "@type": "Person", name: "Ana", sameAs: ["https://example.com"], age: 30 };
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it("keeps a closing script tag in a value from closing the tag", () => {
    const data = { name: '</script><script>alert("x")</script>' };
    const json = serializeJsonLd(data);
    expect(json).not.toMatch(/<\/script/i);
    expect(JSON.parse(json)).toEqual(data);
  });

  it("catches a closing script tag in any letter case", () => {
    expect(serializeJsonLd({ name: "</ScRiPt>" })).not.toMatch(/<\/script/i);
  });

  it("keeps a value from opening an HTML comment", () => {
    const data = { name: "<!-- <script>" };
    const json = serializeJsonLd(data);
    expect(json).not.toContain("<!--");
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual(data);
  });

  it("escapes values in keys and nested objects too", () => {
    const data = { "<key>": { list: ["</script>"] } };
    const json = serializeJsonLd(data);
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual(data);
  });

  it("escapes the line and paragraph separators", () => {
    const data = { name: "a\u2028b\u2029c" };
    const json = serializeJsonLd(data);
    expect(json).not.toMatch(/[\u2028\u2029]/);
    expect(json).toContain("\\u2028");
    expect(json).toContain("\\u2029");
    expect(JSON.parse(json)).toEqual(data);
  });

  it("leaves other characters as they are", () => {
    expect(serializeJsonLd({ name: 'Pedro & Sons > "co" - Lisboa, Portugal' })).toBe(
      '{"name":"Pedro & Sons > \\"co\\" - Lisboa, Portugal"}',
    );
  });
});
