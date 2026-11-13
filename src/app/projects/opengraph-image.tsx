import { shareImageRoute } from "@/components/_common/ShareImage";

const route = shareImageRoute("/projects");

export const { alt, size, contentType } = route;
export default route.Image;
