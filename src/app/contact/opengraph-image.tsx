import { shareImageRoute } from "@/components/_common/ShareImage";

const route = shareImageRoute("/contact");

export const { alt, size, contentType } = route;
export default route.Image;
