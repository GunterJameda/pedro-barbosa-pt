export interface FastNavigationLink {
  name: string;
  /** A short second line, like the role at a company. */
  detail: string;
  /** The id of the section the link jumps to. */
  targetId: string;
}
