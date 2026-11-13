import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "About",
  description: "About Charmaine Lai.",
};

export default function AboutPage() {
  return <ContactView />;
}
