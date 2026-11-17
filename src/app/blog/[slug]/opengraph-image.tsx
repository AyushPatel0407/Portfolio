import { getAllPosts, getPost } from "@/lib/blog";
export const dynamicParams = false; // only real slugs get an image; unknown ones 404
import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Blog post by Ayush Patel";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return ogCard({ eyebrow: "Blog", title: post?.title ?? "Blog", subtitle: post?.summary });
}
