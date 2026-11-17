import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, PenLine } from "lucide-react";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
  description:
    "Notes from Ayush Patel on building ERP and business software, the MERN stack, Next.js and leading a small product team.",
};

const TOPICS = ["Business software", "MERN & Next.js", "Integrations", "Leading a team"];

export default function BlogIndex() {
  const posts = getAllPosts();
  const [latest, ...rest] = posts;
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <main className="pb-24">
      <section className="grid gap-8 pb-14 pt-14 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow mb-6">Blog</p>
          <h1 className="display text-6xl sm:text-8xl">
            Notes from
            <br />
            <span className="text-accent">the build.</span>
          </h1>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-ink-2">
            What I learn shipping business software for Indian companies, and what changes when you go from writing the
            code to leading the team that writes it.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="What I write about">
            {TOPICS.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {!latest ? (
        <p className="border-t border-line pt-8 text-muted">The first post is on its way.</p>
      ) : (
        <>
          {/* Latest post, given room */}
          <Link
            href={`/blog/${latest.slug}`}
            className="card group relative grid gap-8 overflow-hidden p-6 sm:p-10 lg:grid-cols-[1fr_16rem] lg:items-end"
          >
            <div className="relative">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="rounded-[6px] bg-accent-soft px-2 py-0.5 font-semibold text-accent">Latest</span>
                <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                <span className="inline-flex items-center gap-1">
                  <Clock aria-hidden size={12} /> {latest.readingMinutes} min read
                </span>
              </p>
              <h2 className="title mt-5 max-w-3xl text-3xl transition-colors group-hover:text-accent sm:text-5xl">{latest.title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{latest.summary}</p>
              {latest.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
                  {latest.tags.map((t) => (
                    <li key={t} className="chip">
                      #{t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative flex items-center justify-between gap-4 border-t border-line pt-5 lg:flex-col lg:items-end lg:border-0 lg:pt-0">
              <span aria-hidden className="hidden h-28 w-28 place-items-center rounded-3xl bg-sunken text-accent lg:grid">
                <PenLine size={40} strokeWidth={1.25} />
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                Read the post <ArrowRight aria-hidden size={15} className="nudge nudge-x" />
              </span>
            </div>
          </Link>

          {rest.length > 0 && (
            <section className="mt-16">
              <h2 className="eyebrow mb-4">Earlier posts</h2>
              <ul className="divide-y divide-line border-y border-line">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-8">
                      <time dateTime={post.date} className="text-sm text-muted">
                        {formatDate(post.date)}
                      </time>
                      <span>
                        <span className="title block text-2xl transition-colors group-hover:text-accent">{post.title}</span>
                        <span className="mt-1 block max-w-prose text-muted">{post.summary}</span>
                      </span>
                      <span className="text-sm text-muted">{post.readingMinutes} min</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tags.length > 0 && (
            <p className="mt-10 text-sm text-muted">
              {posts.length} post{posts.length === 1 ? "" : "s"} so far, on {tags.join(", ")}
            </p>
          )}
        </>
      )}
    </main>
  );
}
