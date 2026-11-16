import { shareImageRoute } from "@/_common/components/ShareImage";

// Without a path: the site-wide image, which the 404 page also uses.
const route = shareImageRoute();

export const { alt, size, contentType } = route;
export default route.Image;
