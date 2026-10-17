import type { Metadata } from "next";
import FunView from "@/components/views/FunView";

export const metadata: Metadata = {
  title: "For fun",
  description:
    "Charmaine Lai off the clock: photography, dance and choreography, arts and crafts, and a famous cat.",
};

export default function FunPage() {
  return <FunView />;
}
