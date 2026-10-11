import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Charmaine Lai.",
};

export default function ContactPage() {
  return <ContactView />;
}
