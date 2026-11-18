import { shareImageRoute } from "@/_common/components/ShareImage";

const route = shareImageRoute("/about");

export const { size, contentType, generateStaticParams } = route;
export default route.Image;
