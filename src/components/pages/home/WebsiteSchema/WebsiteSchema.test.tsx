import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/constants";
import { setProfile } from "@tests/profile";

async function renderSchema() {
  const { WebsiteSchema } = await import("./WebsiteSchema");
  const html = renderToStaticMarkup(<WebsiteSchema />);
  const json = html.match(/<script type="application\/ld\+json">(.*)<\/script>/)?.[1];
  return { html, data: JSON.parse(json ?? "null") };
}

describe("WebsiteSchema", () => {
  it("describes the site with its name and address", async () => {
    const { data } = await renderSchema();
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("WebSite");
    expect(data.url).toBe(SITE_URL);
    expect(data.name).toEqual(expect.any(String));
  });

  it("can't be broken out of by a value containing a closing script tag", async () => {
    // The site name comes from the name in profile.ts.
    const name = '</script><script>alert("x")</script>';
    setProfile({ name });
    const { html, data } = await renderSchema();
    expect(html.match(/<\/script>/gi)).toHaveLength(1);
    expect(data.name).toBe(name);
  });
});
