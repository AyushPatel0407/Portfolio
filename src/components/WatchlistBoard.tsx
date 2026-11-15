"use client";

import { useMemo, useState } from "react";
import { STATUS_ORDER, type WatchItem, type WatchStatus } from "@/data/watchlist";

const STATUS_STYLE: Record<WatchStatus, string> = {
  Watching: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Completed: "bg-accent-soft text-accent",
  "Plan to watch": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  Dropped: "bg-line text-muted",
};

type Filter = "All" | WatchStatus;

export default function WatchlistBoard({ items }: { items: WatchItem[] }) {
  const [status, setStatus] = useState<Filter>("All");
  const [type, setType] = useState<string>("All");

  const types = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.type)))], [items]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const s of STATUS_ORDER) c[s] = items.filter((i) => i.status === s).length;
    return c;
  }, [items]);

  const shown = items
    .filter((i) => (status === "All" || i.status === status) && (type === "All" || i.type === type))
    .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) || (b.rating ?? 0) - (a.rating ?? 0));

  const chip = (active: boolean) =>
    `btn-press min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
      active ? "border-foreground bg-foreground text-background" : "border-line hover:border-foreground"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
          {(["All", ...STATUS_ORDER] as Filter[])
            .filter((s) => s === "All" || counts[s] > 0)
            .map((s) => (
              <button key={s} type="button" aria-pressed={status === s} onClick={() => setStatus(s)} className={chip(status === s)}>
                {s} <span className="ml-1 font-mono text-xs opacity-60">{counts[s]}</span>
              </button>
            ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-muted">
          Type
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="min-h-11 rounded-full border border-line bg-background px-4 text-foreground"
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((item) => (
          <li key={item.title} className="card-lift flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6">
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLE[item.status]}`}>{item.status}</span>
                {item.rating !== undefined && (
                  <span className="font-mono text-sm" aria-label={`Rated ${item.rating} out of 10`}>
                    <span className="text-accent">★</span> {item.rating}
                    <span className="text-muted">/10</span>
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-serif text-3xl leading-tight">{item.title}</h3>
              <p className="mt-1 font-mono text-xs text-muted">
                {item.type} · {item.year}
                {item.platform && ` · ${item.platform}`}
              </p>
              {item.seasons && (
                <div className="mt-5">
                  <div className="flex justify-between font-mono text-xs text-muted">
                    <span>
                      {item.seasons.watched === 0
                        ? "Not started"
                        : item.seasons.watched >= item.seasons.total
                          ? `All ${item.seasons.total} season${item.seasons.total > 1 ? "s" : ""}`
                          : `Season ${item.seasons.watched} of ${item.seasons.total}`}
                    </span>
                    <span>
                      {item.seasons.watched}/{item.seasons.total}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1" aria-hidden>
                    {Array.from({ length: item.seasons.total }, (_, s) => (
                      <span
                        key={s}
                        className={`h-1.5 flex-1 rounded-full ${s < item.seasons!.watched ? "bg-accent" : "bg-line"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {item.note && <p className="mt-4 leading-relaxed text-muted">{item.note}</p>}
            </div>
            <ul className="flex flex-wrap gap-2">
              {item.genres.map((g) => (
                <li key={g} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                  {g}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-8 text-muted">Nothing here yet.</p>}
    </div>
  );
}
