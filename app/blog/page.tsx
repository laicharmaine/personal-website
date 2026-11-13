import type { Metadata } from "next";
import BlogView from "@/components/views/BlogView";

export const metadata: Metadata = {
  title: "Blog",
  description: "Published posts by Charmaine Lai for Intel and Numenta.",
};

export default function BlogPage() {
  return <BlogView />;
}
