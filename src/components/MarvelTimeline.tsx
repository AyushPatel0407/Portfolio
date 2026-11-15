"use client";

import { useEffect, useMemo, useState } from "react";
import type { McuEntry } from "@/data/marvel";

type Order = "release" | "story";
type KindFilter = "all" | "film" | "series";

const PHASE_COLOR: Record<number, string> = {
  1: "#e0592a",
  2: "#d4a017",
  3: "#2f9e6e",
  4: "#2b7bb9",
  5: "#c2410c",
  6: "#0e9488",
};

const KIND_LABEL: Record<McuEntry["kind"], string> = {
  film: "Film",
  series: "Series",
  special: "Special",
  animated: "Animated",
};

const STORAGE_KEY = "mcu-watched-v1";

function formatDate(e: McuEntry) {
  const d = new Date(`${e.released}T00:00:00`);
  return e.monthOnly
    ? d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function MarvelTimeline({ entries }: { entries: McuEntry[] }) {
  const [order, setOrder] = useState<Order>("release");
  const [phase, setPhase] = useState<number | "all">("all");
  const [kind, setKind] = useState<KindFilter>("all");
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [watched, setWatched] = useState<Set<string>>(new Set());

  // Watched ticks are a per-viewer convenience, kept in this browser only.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWatched(new Set(JSON.parse(raw)));
    } catch {
      /* storage unavailable: start empty */
    }
  }, []);

  function toggle(title: string) {
    setWatched((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const phases = useMemo(() => Array.from(new Set(entries.map((e) => e.phase))).sort(), [entries]);

  const list = useMemo(() => {
    const filtered = entries.filter((e) => {
      if (phase !== "all" && e.phase !== phase) return false;
      if (kind === "film" && e.kind !== "film") return false;
      if (kind === "series" && e.kind === "film") return false;
      if (!showUpcoming && e.status === "upcoming") return false;
      if (order === "story" && e.chrono === null) return false;
      return true;
    });
    return order === "story"
      ? filtered.sort((a, b) => (a.chrono ?? 0) - (b.chrono ?? 0))
      : filtered.sort((a, b) => a.released.localeCompare(b.released));
  }, [entries, phase, kind, showUpcoming, order]);

  const released = entries.filter((e) => e.status === "released");
  const watchedCount = released.filter((e) => watched.has(e.title)).length;
  const progress = released.length ? Math.round((watchedCount / released.length) * 100) : 0;
  const offTimeline = order === "story" ? entries.filter((e) => e.chrono === null && e.status === "released") : [];

  const seg = (active: boolean) =>
    `btn-press min-h-11 rounded-full px-4 py-2 text-sm transition-colors ${
      active ? "bg-foreground text-background" : "text-muted hover:text-foreground"
    }`;
  const chip = (active: boolean) =>
    `btn-press min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
      active ? "border-foreground bg-foreground text-background" : "border-line hover:border-foreground"
    }`;

  return (
    <div>
      {/* Progress */}
      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm text-muted">Your progress, saved in this browser</p>
          <p className="font-mono text-sm">
            {watchedCount} / {released.length} watched · {progress}%
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Titles watched">
          <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Controls */}
      <div className="z-10 -mx-4 mt-8 md:sticky md:top-16 flex flex-col gap-3 border-y border-line bg-background/90 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Order" className="inline-flex rounded-full border border-line p-1">
            <button type="button" aria-pressed={order === "release"} onClick={() => setOrder("release")} className={seg(order === "release")}>
              Release order
            </button>
            <button type="button" aria-pressed={order === "story"} onClick={() => setOrder("story")} className={seg(order === "story")}>
              Story order
            </button>
          </div>
          <label className="flex min-h-11 items-center gap-2 text-sm text-muted">
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as KindFilter)}
              className="min-h-11 rounded-full border border-line bg-background px-4 text-foreground"
              aria-label="Type"
            >
              <option value="all">Films & series</option>
              <option value="film">Films only</option>
              <option value="series">Series & specials</option>
            </select>
          </label>
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={showUpcoming} onChange={(e) => setShowUpcoming(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
            Show upcoming
          </label>
        </div>
        <div role="group" aria-label="Phase" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-8 sm:px-8">
          <button type="button" aria-pressed={phase === "all"} onClick={() => setPhase("all")} className={chip(phase === "all")}>
            All phases
          </button>
          {phases.map((p) => (
            <button key={p} type="button" aria-pressed={phase === p} onClick={() => setPhase(p)} className={chip(phase === p)}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full align-middle" style={{ background: PHASE_COLOR[p] }} />
              Phase {p}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <ol className="relative mt-10 border-l border-line pl-6 sm:pl-10" aria-live="polite">
        {list.map((e, i) => {
          const prev = list[i - 1];
          const newPhase = order === "release" && (!prev || prev.phase !== e.phase);
          const isWatched = watched.has(e.title);
          const upcoming = e.status === "upcoming";
          return (
            <li key={e.title} className="relative pb-6">
              {newPhase && (
                <p className="-ml-6 mb-5 pt-4 font-mono text-xs uppercase tracking-[0.2em] sm:-ml-10" style={{ color: PHASE_COLOR[e.phase] }}>
                  <span className="mr-3 inline-block h-px w-4 align-middle sm:w-8" style={{ background: PHASE_COLOR[e.phase] }} />
                  Phase {e.phase} · {e.saga} Saga
                </p>
              )}
              <span
                className="absolute -left-[31px] top-7 h-3 w-3 rounded-full ring-4 ring-background sm:-left-[47px]"
                style={{ background: upcoming ? "transparent" : PHASE_COLOR[e.phase], border: `2px solid ${PHASE_COLOR[e.phase]}` }}
                aria-hidden
              />
              <div
                className={`card-lift flex flex-col gap-4 rounded-2xl border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
                  upcoming ? "border-dashed border-line" : "border-line"
                } ${isWatched ? "opacity-70" : ""}`}
                style={{ borderLeft: `4px solid ${PHASE_COLOR[e.phase]}` }}
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    #{order === "story" ? e.chrono : i + 1} · {KIND_LABEL[e.kind]} · Phase {e.phase}
                    {upcoming && <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 normal-case tracking-normal text-accent">Upcoming</span>}
                  </p>
                  <h3 className={`mt-2 font-serif text-2xl leading-tight sm:text-3xl ${isWatched ? "line-through decoration-accent/60" : ""}`}>
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {order === "story" ? `Set in ${e.setting} · released ${e.released.slice(0, 4)}` : `${formatDate(e)} · set in ${e.setting}`}
                  </p>
                  {e.note && <p className="mt-2 text-sm text-muted">{e.note}</p>}
                </div>
                {!upcoming && (
                  <button
                    type="button"
                    onClick={() => toggle(e.title)}
                    aria-pressed={isWatched}
                    className={`btn-press min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm ${
                      isWatched ? "border-accent bg-accent text-white" : "border-line hover:border-foreground"
                    }`}
                  >
                    {isWatched ? "✓ Watched" : "Mark watched"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {list.length === 0 && <p className="mt-8 text-muted">No titles match these filters.</p>}

      {offTimeline.length > 0 && (
        <p className="mt-6 text-sm text-muted">
          Not in story order (another universe or outside the main timeline): {offTimeline.map((e) => e.title).join(", ")}.
        </p>
      )}
    </div>
  );
}
