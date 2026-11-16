import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { JsonLd } from "./JsonLd";

function renderJsonLd(data: object) {
  const html = renderToStaticMarkup(<JsonLd data={data} />);
  const json = html.match(/<script type="application\/ld\+json">(.*)<\/script>/)?.[1];
  return { html, data: JSON.parse(json ?? "null") };
}

describe("JsonLd", () => {
  it("renders the data in a JSON-LD script", () => {
    const data = { "@context": "https://schema.org", "@type": "WebSite", name: "Site" };
    expect(renderJsonLd(data).data).toEqual(data);
  });

  it("can't be broken out of by a value containing a closing script tag", () => {
    const name = '</script><script>alert("x")</script>';
    const { html, data } = renderJsonLd({ name });
    expect(html.match(/<\/script>/gi)).toHaveLength(1);
    expect(data.name).toBe(name);
  });
});
