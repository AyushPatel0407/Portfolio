import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile } from "@/data/profile";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="pb-24">
      <article className="mx-auto max-w-3xl">
        <header className="pb-12 pt-16 sm:pt-24">
          <Link href="/blog" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent">
            ← All posts
          </Link>
          <h1 className="mt-8 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{post.summary}</p>
          <p className="mt-8 font-mono text-xs text-muted">
            {profile.name} · {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
        </header>
        {/* Safe: HTML comes only from Markdown files committed in /content/blog */}
        <div className="prose-site prose prose-lg max-w-none border-t border-line pt-12" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
