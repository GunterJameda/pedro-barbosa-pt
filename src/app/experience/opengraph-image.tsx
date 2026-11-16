import { shareImageRoute } from "@/_common/components/ShareImage";

const route = shareImageRoute("/experience");

export const { alt, size, contentType } = route;
export default route.Image;
