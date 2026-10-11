import type { Metadata } from "next";
import WritingView from "@/components/views/WritingView";

export const metadata: Metadata = {
  title: "Writing",
  description: "Published writing by Charmaine Lai for Intel and Numenta.",
};

export default function WritingPage() {
  return <WritingView />;
}
