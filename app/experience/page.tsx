import type { Metadata } from "next";
import ExperienceView from "@/components/views/ExperienceView";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Charmaine Lai’s résumé: Northwestern MBAi (Kellogg + McCormick), UC Berkeley, YES International, and three roles at Numenta.",
};

export default function ExperiencePage() {
  return <ExperienceView />;
}
