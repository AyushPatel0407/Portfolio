"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type WorkEntry = {
  slug: string;
  name: string;
  category: string;
  description: string;
  url?: string;
  logo?: string;
  icon?: React.ReactNode;
  highlights: string[];
  stack: { name: string; icon: React.ReactNode }[];
  hasStudy: boolean;
};

/**
 * Every work product as a README in one terminal: `ls ~/work` on the left, `cat README.md` for the
 * selected product on the right. WAI-ARIA tabs (arrow keys, Home/End); all READMEs are in the HTML.
 */
export default function WorkTerminal({ entries }: { entries: WorkEntry[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + entries.length) % entries.length;
    setActive(n);
    tabs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in step) {
      e.preventDefault();
      go(active + step[e.key]);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      go(e.key === "Home" ? 0 : entries.length - 1);
    }
  };

  const cur = entries[active];

  return (
    <div className="term">
      <div className="term-bar">
        <i />
        <i />
        <i />
        <span className="ml-2 truncate">~/work/{cur.slug}</span>
        {cur.url && <span className="ml-auto shrink-0 text-[var(--term-green)]">● live</span>}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[17rem_minmax(0,1fr)]">
        {/* ls ~/work */}
        <div className="min-w-0 border-b border-white/10 p-3 md:border-b-0 md:border-r">
          <p aria-hidden className="code px-2 pb-2 text-[var(--term-dim)]">
            <span className="text-[var(--term-green)]">$</span> ls ~/work
          </p>
          <div
            role="tablist"
            aria-label="Products built at work"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="grid grid-cols-2 gap-1 md:flex md:flex-col"
          >
            {entries.map((e, i) => {
              const on = i === active;
              return (
                <button
                  key={e.slug}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`work-tab-${e.slug}`}
                  aria-selected={on}
                  aria-controls={`work-panel-${e.slug}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`code flex min-h-11 min-w-0 items-center gap-2 rounded-[var(--r)] px-2 text-left transition-colors md:gap-2.5 ${
                    on ? "bg-white/10 text-[var(--term-ink)]" : "text-[var(--term-dim)] hover:bg-white/5 hover:text-[var(--term-ink)]"
                  }`}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-[4px] bg-white">
                    {e.logo ? <Image src={e.logo} alt="" width={26} height={26} className="h-full w-full object-contain p-0.5" /> : <span className="text-[#1f2328]">{e.icon}</span>}
                  </span>
                  <span className="min-w-0 truncate text-[0.78rem] md:text-[0.8125rem]" title={e.slug}>
                    {e.slug}
                    <span className="text-[var(--term-dim)]">/</span>
                  </span>
                  {e.url && <span aria-hidden className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-[var(--term-green)] md:block" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* cat README.md */}
        <div className="min-w-0">
          {entries.map((e, i) => (
            <div
              key={e.slug}
              role="tabpanel"
              id={`work-panel-${e.slug}`}
              aria-labelledby={`work-tab-${e.slug}`}
              hidden={i !== active}
              className="p-5 sm:p-7"
            >
              <p aria-hidden className="code text-[var(--term-dim)]">
                <span className="text-[var(--term-green)]">$</span> cat {e.slug}/README.md
              </p>
              <div className="mt-4 flex items-center gap-4">
                {e.logo && (
                  <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[var(--r)] bg-white p-1">
                    <Image src={e.logo} alt="" width={52} height={52} className="h-full w-full object-contain" />
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="title text-3xl sm:text-4xl"># {e.name}</h3>
                  <p className="code mt-1 text-[var(--term-dim)]">{e.category}</p>
                </div>
              </div>
              <p className="mt-5 max-w-[66ch] leading-relaxed text-[var(--term-ink)]">{e.description}</p>

              {e.highlights.length > 0 && (
                <>
                  <p aria-hidden className="code mt-6 text-[var(--term-amber)]">## Highlights</p>
                  <ul className="code mt-2 space-y-1.5 text-[var(--term-ink)]">
                    {e.highlights.map((h) => (
                      <li key={h}>
                        <span aria-hidden className="text-[var(--term-green)]">- </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p aria-hidden className="code mt-6 text-[var(--term-amber)]">## Stack</p>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Stack">
                {e.stack.map((t) => (
                  <li key={t.name} className="code inline-flex items-center gap-1.5 rounded-[4px] border border-white/15 px-2 py-0.5 text-[0.75rem] text-[var(--term-ink)]">
                    {t.icon}
                    {t.name}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5">
                {e.hasStudy && (
                  <Link href={`/work/${e.slug}`} className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-[var(--term-green)]">
                    ./read-case-study <ArrowUpRight aria-hidden size={16} className="nudge" />
                    <span className="sr-only">: {e.name}</span>
                  </Link>
                )}
                {e.url && (
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="code inline-flex min-h-11 items-center gap-1.5 text-[var(--term-dim)] hover:text-[var(--term-ink)]">
                    {e.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    <ArrowUpRight aria-hidden size={14} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
