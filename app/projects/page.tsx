import type { Metadata } from "next";
import ProjectsView from "@/components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Charmaine Lai: launching NuPIC, Numenta’s website revamp, A Thousand Brains, the Thousand Brains Theory explainer, and Brains@Bay, plus side projects.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
