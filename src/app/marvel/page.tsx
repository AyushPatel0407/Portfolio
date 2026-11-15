import type { Metadata } from "next";
import Link from "next/link";
import MarvelTimeline from "@/components/MarvelTimeline";
import { mcu, mcuUpdated } from "@/data/marvel";

export const metadata: Metadata = {
  title: "Marvel timeline",
  description:
    "Every Marvel Cinematic Universe film and series in release order or story order, filtered by phase, with a tracker for what you've watched.",
  alternates: { canonical: "/marvel" },
};

export default function MarvelPage() {
  const released = mcu.filter((e) => e.status === "released");
  const films = released.filter((e) => e.kind === "film").length;
  const shows = released.length - films;
  const upcoming = mcu.length - released.length;

  return (
    <main className="pb-24">
      <section className="pb-12 pt-16 sm:pt-24">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Off the clock</p>
        <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-8xl">
          The Marvel
          <br />
          <span className="italic text-accent">timeline.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          Every Marvel Cinematic Universe film and series, from <em>Iron Man</em> to what&apos;s next. Watch in the order they
          came out, or in the order the story happens. Tick titles off as you go.
        </p>

        <dl className="mt-12 grid grid-cols-3 border-y border-line">
          {[
            { label: "Films released", value: films },
            { label: "Series & specials", value: shows },
            { label: "Coming up", value: upcoming },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse py-6 ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : ""}`}>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              <dd className="font-serif text-5xl leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <MarvelTimeline entries={mcu} />

      <p className="mt-12 text-sm text-muted">
        Story order follows Disney+&apos;s official timeline order. Dates are US release dates; list checked {mcuUpdated}. Marvel
        and all titles are trademarks of Marvel / Disney; this is a fan list, not affiliated with them. See also my{" "}
        <Link href="/watchlist" className="link-draw text-accent">
          binge-watch list
        </Link>
        .
      </p>
    </main>
  );
}
