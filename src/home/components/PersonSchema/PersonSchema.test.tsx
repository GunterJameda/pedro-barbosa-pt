import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/_common/constants";
import { messages, PORTUGUESE_INTL } from "@tests/intl";
import { setProfile } from "@tests/profile";
import { withIntl } from "@tests/render";

async function renderSchema(intl?: typeof PORTUGUESE_INTL) {
  const { PersonSchema } = await import("./PersonSchema");
  const html = renderToStaticMarkup(withIntl(<PersonSchema />, intl));
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
    expect(data.mainEntity.sameAs).toEqual(expect.arrayContaining([GITHUB_URL, LINKEDIN_URL]));
  });

  it("names the person's role and the page's language", async () => {
    const { data } = await renderSchema();
    expect(data.inLanguage).toBe("en");
    expect(data.mainEntity.jobTitle).toBe("Senior Frontend Engineer");
  });

  it("names the page's own address and a description, in English", async () => {
    const { data } = await renderSchema();
    expect(data.url).toBe(SITE_URL);
    expect(data.description).toBe(messages.site.description);
  });

  it("names the Portuguese page's own address and language, keeping the person at the site root", async () => {
    const { data } = await renderSchema(PORTUGUESE_INTL);
    expect(data.url).toBe(`${SITE_URL}/pt`);
    expect(data.inLanguage).toBe("pt-PT");
    expect(data.description).toBe(PORTUGUESE_INTL.messages.site.description);
    expect(data.mainEntity.url).toBe(SITE_URL);
  });

  it("can't be broken out of by a value containing a closing script tag", async () => {
    const name = '</script><script>alert("x")</script>';
    setProfile({ name });
    const { html, data } = await renderSchema();
    expect(html.match(/<\/script>/gi)).toHaveLength(1);
    expect(data.mainEntity.name).toBe(name);
  });
});
