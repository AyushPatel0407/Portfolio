import type { Metadata } from "next";
import Link from "next/link";
import WatchlistBoard from "@/components/WatchlistBoard";
import { profile } from "@/data/profile";
import { watchlist } from "@/data/watchlist";

export const metadata: Metadata = {
  title: "Binge-watch list",
  description: "The series and movies Ayush Patel is watching, has finished and plans to watch next, with ratings.",
  alternates: { canonical: "/watchlist" },
};

export default function WatchlistPage() {
  const isSample = watchlist.some((i) => i.sample);
  const completed = watchlist.filter((i) => i.status === "Completed").length;
  const watching = watchlist.filter((i) => i.status === "Watching").length;
  const planned = watchlist.filter((i) => i.status === "Plan to watch").length;

  return (
    <main className="pb-24">
      <section className="pb-14 pt-16 sm:pt-24">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Off the clock</p>
        <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-8xl">
          Binge-watch
          <br />
          <span className="italic text-accent">list.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          What I&apos;m watching after the code is shipped, what I&apos;ve finished, and what&apos;s next in the queue. Marvel
          has its own <Link href="/marvel" className="link-draw text-accent">timeline page</Link>.
        </p>

        <dl className="mt-12 grid grid-cols-3 border-y border-line">
          {[
            { label: "Watching now", value: watching },
            { label: "Finished", value: completed },
            { label: "Up next", value: planned },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse py-6 ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : ""}`}>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              <dd className="font-serif text-5xl leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>

        {isSample && (
          <p className="mt-6 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">
            Sample list: these titles show the layout. Replace them in <code className="font-mono">src/data/watchlist.ts</code>.
          </p>
        )}
      </section>

      <WatchlistBoard items={watchlist} />

      <section className="mt-16 flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="font-serif text-3xl leading-tight">Got a show I should watch?</h2>
          <p className="mt-2 text-muted">Send me a suggestion and I&apos;ll add it to the queue.</p>
        </div>
        <a
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Show suggestion for your watch list")}`}
          className="btn-press inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white"
        >
          Suggest a show
        </a>
      </section>
    </main>
  );
}
