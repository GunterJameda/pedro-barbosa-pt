import { shareImageRoute } from "@/_common/components/shareImage";

const route = shareImageRoute("/contact");

export const { size, contentType, generateStaticParams } = route;
export default route.Image;
