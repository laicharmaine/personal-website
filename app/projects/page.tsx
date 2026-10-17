import type { Metadata } from "next";
import ProjectsView from "@/components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things Charmaine Lai builds off the clock: M:XR (2nd place, MBAi Hackathon), Tabby, Dayline, and this site.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
