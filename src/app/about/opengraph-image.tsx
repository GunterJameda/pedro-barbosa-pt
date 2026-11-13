import { ShareImage, shareImageAlt, shareImageSize } from "@/components/_common/ShareImage";

const PATH = "/about";

export const alt = shareImageAlt(PATH);
export const size = shareImageSize;
export const contentType = "image/png";

export default function Image() {
  return ShareImage({ path: PATH });
}
