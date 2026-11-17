import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
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
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: post.title, description: post.summary, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = i > 0 ? all[i - 1] : null;
  const older = i < all.length - 1 ? all[i + 1] : null;

  return (
    <main className="pb-24">
      {/* Reading progress (CSS scroll timeline; hidden where unsupported) */}
      <div aria-hidden className="read-progress" />

      <article>
        <header className="mx-auto max-w-3xl pb-12 pt-14 sm:pt-20">
          <Link href="/blog" className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-accent">
            <ArrowLeft aria-hidden size={15} className="transition-transform group-hover:-translate-x-0.5" /> All posts
          </Link>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden size={12} /> {post.readingMinutes} min read
            </span>
            {post.tags.map((t) => (
              <span key={t} className="chip">
                #{t}
              </span>
            ))}
          </p>
          <h1 className="display mt-6 text-5xl sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-2">{post.summary}</p>
          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-sm text-background">AP</span>
            <div className="text-sm">
              <p className="font-semibold">{profile.name}</p>
              <p className="text-muted">Tech Head at CHEMAZON, Technical Lead at Kira Intrilogy</p>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_13rem]">
          <div
            className="prose-site prose prose-lg mx-auto w-full max-w-3xl lg:mx-0"
            // Sanitised in lib/blog.ts from Markdown committed in /content/blog
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {post.headings.length > 1 && (
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow mb-3">On this page</p>
                <ul className="space-y-1 border-l border-line text-sm">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-muted hover:border-accent hover:text-foreground">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
        </div>
      </article>

      <aside className="mx-auto mt-16 max-w-3xl">
        <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="title text-2xl">Working on something like this?</p>
            <p className="mt-1 text-muted">I take on a few freelance projects alongside my roles.</p>
          </div>
          <Link href="/freelance#brief" className="btn btn-primary shrink-0">
            Start a project <ArrowRight aria-hidden size={15} />
          </Link>
        </div>

        {(newer || older) && (
          <nav aria-label="More posts" className="mt-6 grid gap-3 sm:grid-cols-2">
            {older ? (
              <Link href={`/blog/${older.slug}`} className="card group p-5">
                <span className="text-sm text-muted">Older post</span>
                <span className="title mt-1 block text-lg group-hover:text-accent">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link href={`/blog/${newer.slug}`} className="card group p-5 text-right">
                <span className="text-sm text-muted">Newer post</span>
                <span className="title mt-1 block text-lg group-hover:text-accent">{newer.title}</span>
              </Link>
            )}
          </nav>
        )}
      </aside>
    </main>
  );
}
