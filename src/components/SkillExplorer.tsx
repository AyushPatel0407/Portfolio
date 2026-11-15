"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Group = { group: string; items: string[] };
type ProjectRef = { name: string; slug: string; category: string; description: string; stack: string[] };

// "Next.js 16" -> "nextjs16", "Ag-Grid" -> "aggrid", "React.js" -> "react"
function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/\.js\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Domain skills are found in a project's category, summary or stack by these terms.
const DOMAIN_TERMS: Record<string, string[]> = {
  ERP: ["erp"],
  CRM: ["crm"],
  "GST e-invoicing": ["gst"],
  "B2B marketplaces": ["marketplace"],
  Payments: ["razorpay", "google play billing", "escrow"],
  "WhatsApp messaging": ["whatsapp"],
  "AI connectors (MCP)": ["mcp"],
};

// Matched by exact name only (prefix matching would catch "GitHub Actions").
const EXACT_ONLY = new Set(["git"]);

function uses(project: ProjectRef, skill: string) {
  const terms = DOMAIN_TERMS[skill];
  if (terms) {
    // Whole-word match so "erp" doesn't hit inside other words.
    const haystack = ` ${[project.category, project.description, ...project.stack].join(" ").toLowerCase().replace(/[^a-z0-9]+/g, " ")} `;
    return terms.some((t) => new RegExp(` ${t}s? `).test(haystack));
  }
  const k = norm(skill);
  if (!k) return false;
  return project.stack.some((s) => {
    const n = norm(s);
    if (k === "react") return n === "react" || /^react\d/.test(n) || n.startsWith("reactrouter");
    if (EXACT_ONLY.has(k)) return n === k;
    return n === k || n.startsWith(k);
  });
}

export default function SkillExplorer({ groups, projects }: { groups: Group[]; projects: ProjectRef[] }) {
  const [active, setActive] = useState<string | null>(null);

  const usage = useMemo(() => {
    const map = new Map<string, ProjectRef[]>();
    for (const g of groups) for (const s of g.items) map.set(s, projects.filter((p) => uses(p, s)));
    return map;
  }, [groups, projects]);

  const matches = active ? (usage.get(active) ?? []) : [];

  return (
    <div>
      <p className="mb-8 max-w-xl text-muted">Pick a skill to see the projects where I used it.</p>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.group}>
            <h3 className="mb-4 font-serif text-2xl">{group.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const count = usage.get(item)?.length ?? 0;
                const isActive = active === item;
                return (
                  <li key={item}>
                    {count > 0 ? (
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActive(isActive ? null : item)}
                        className={`btn-press min-h-9 rounded-full px-3 py-1 text-sm transition-colors ${
                          isActive ? "bg-accent text-white" : "bg-accent-soft hover:bg-accent hover:text-white"
                        }`}
                      >
                        {item} <span className="ml-0.5 font-mono text-[11px] opacity-70">{count}</span>
                      </button>
                    ) : (
                      <span className="inline-block rounded-full border border-line px-3 py-1 text-sm text-muted">{item}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-10 min-h-16">
        {active && (
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {active} · used in {matches.length} project{matches.length === 1 ? "" : "s"}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {matches.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="btn-press inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm hover:border-accent hover:text-accent"
                  >
                    {p.name} <span className="ml-1" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
