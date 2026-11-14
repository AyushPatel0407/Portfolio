import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Ayush Patel on building ERP and business software, the MERN stack, Next.js and leading a small product team.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="pb-24">
      <section className="pb-16 pt-16 sm:pt-24">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Blog</p>
        <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-8xl">
          Notes from
          <br />
          <span className="italic text-accent">the build.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          What I learn building business software, working with the MERN stack and Next.js, and leading a small
          product team.
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="border-t border-line pt-8 text-muted">The first post is on its way.</p>
      ) : (
        <ul className="border-t border-line">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-3 py-8 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <div className="font-mono text-xs text-muted">
                  <p>{formatDate(post.date)}</p>
                  <p className="mt-1">{post.readingMinutes} min read</p>
                </div>
                <div>
                  <h2 className="font-serif text-3xl leading-tight transition-colors group-hover:text-accent sm:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-prose leading-relaxed text-muted">{post.summary}</p>
                  {post.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
