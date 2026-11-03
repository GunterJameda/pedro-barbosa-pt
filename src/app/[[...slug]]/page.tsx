import { redirect } from "next/navigation";

// Matches "/" and every path without its own route. Real routes always win over this one.
export default function CatchAll() {
  redirect("/home");
}
