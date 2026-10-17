import { redirect } from "next/navigation";

/** The site is public now; old /login links go home. */
export default function LoginPage() {
  redirect("/");
}
