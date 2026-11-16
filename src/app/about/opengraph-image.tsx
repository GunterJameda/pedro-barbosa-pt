import { shareImageRoute } from "@/_common/components/ShareImage";

const route = shareImageRoute("/about");

export const { alt, size, contentType } = route;
export default route.Image;
