import { shareImageRoute } from "@/_common/utils/shareImage";

const route = shareImageRoute("/about");

export const { size, contentType, generateStaticParams } = route;
export default route.Image;
