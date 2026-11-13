import { shareImageRoute } from "@/components/_common/ShareImage";

const route = shareImageRoute("/about");

export const { alt, size, contentType } = route;
export default route.Image;
