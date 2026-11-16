import { PAGES } from "@/_common/constants";
import { CONTENT_TYPE, SIZE } from "./constants";
import { ALT } from "./content";
import { ShareImage } from "./ShareImage";

const pageFor = (path?: string) => PAGES.find((page) => page.href === path);

/** Alt text for a page's preview image. Without a path, it's the site-wide one. */
export function shareImageAlt(path?: string) {
  const page = pageFor(path);
  return page ? `${page.name} · ${ALT}` : ALT;
}

/**
 * Everything a route's opengraph-image file exports, so each one only names
 * its page. Without a path, it's the site-wide image.
 */
export function shareImageRoute(path?: string) {
  const page = pageFor(path);
  return {
    alt: shareImageAlt(path),
    size: SIZE,
    contentType: CONTENT_TYPE,
    Image: () => ShareImage({ page }),
  };
}
