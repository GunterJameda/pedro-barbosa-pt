import { shareImageRoute } from "@/_common/components/shareImage";

const route = shareImageRoute("/projects");

export const { size, contentType, generateStaticParams } = route;
export default route.Image;
