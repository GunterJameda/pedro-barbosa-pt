import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/constants";
import { setProfile } from "@tests/profile";

async function renderSchema() {
  const { PersonSchema } = await import("./PersonSchema");
  const html = renderToStaticMarkup(<PersonSchema />);
  const json = html.match(/<script type="application\/ld\+json">(.*)<\/script>/)?.[1];
  return { html, data: JSON.parse(json ?? "null") };
}

describe("PersonSchema", () => {
  it("describes the site as the profile page of a person", async () => {
    const { data } = await renderSchema();
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("ProfilePage");
    expect(data.mainEntity["@type"]).toBe("Person");
  });

  it("links the person to the site and their public profiles", async () => {
    const { data } = await renderSchema();
    expect(data.mainEntity.url).toBe(SITE_URL);
    expect(data.mainEntity.sameAs).toEqual(
      expect.arrayContaining([GITHUB_URL, LINKEDIN_URL]),
    );
  });

  it("can't be broken out of by a value containing a closing script tag", async () => {
    const name = '</script><script>alert("x")</script>';
    setProfile({ name });
    const { html, data } = await renderSchema();
    expect(html.match(/<\/script>/gi)).toHaveLength(1);
    expect(data.mainEntity.name).toBe(name);
  });
});
