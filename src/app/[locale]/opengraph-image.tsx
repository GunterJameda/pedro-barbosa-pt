import { shareImageRoute } from "@/_common/utils/shareImage";

// Without a path: the site-wide image, which the 404 page also uses.
const route = shareImageRoute();

export const { size, contentType, generateStaticParams } = route;
export default route.Image;
