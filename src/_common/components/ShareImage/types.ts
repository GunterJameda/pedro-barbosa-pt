export interface ShareImageFont {
  name: string;
  file: string;
  weight: 500 | 700;
}

/** A font as the image renderer takes it: the file's bytes, loaded. */
export interface LoadedFont {
  name: string;
  weight: ShareImageFont["weight"];
  style: "normal";
  data: Buffer;
}
