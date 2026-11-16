/** Whether a page's link is the current one: its own address, or any address inside it. */
export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
