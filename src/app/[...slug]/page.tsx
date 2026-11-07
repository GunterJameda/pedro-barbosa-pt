import { redirect } from "next/navigation";

// Matches every path without its own route. Real routes always win over this one.
export default function CatchAll() {
  redirect("/");
}
