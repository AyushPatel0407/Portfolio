import { allProjects, getProject } from "@/data/caseStudies";
export const dynamicParams = false; // only real slugs get an image; unknown ones 404
import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project case study by Ayush Patel";

export function generateStaticParams() {
  return allProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogCard({
    eyebrow: `Case study: ${project?.category ?? ""}`,
    title: project?.name ?? "Project",
    subtitle: project?.description,
  });
}
