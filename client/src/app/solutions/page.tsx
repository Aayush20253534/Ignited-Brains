import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";
export const metadata: Metadata = { title: "Our Solutions" };
export default function SolutionsPage() {
  return <PagePlaceholder currentPath="/solutions" title="From classrooms to innovation spaces." description="We design and build hands-on learning environments that make science tangible, technology accessible, and innovation part of everyday school life." />;
}
