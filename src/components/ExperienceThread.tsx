export type ThreadStop = {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  year: number;
  detail: string;
  location: string;
  url?: string;
  note?: string;
  status: "Internship" | "Joined" | "Promoted" | "Current" | "Side venture";
  logo: React.ReactNode;
  stack: { name: string; icon: React.ReactNode }[];
};

// Short, stable "commit hash" per role so the log reads like real git output.
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const REF: Partial<Record<ThreadStop["status"], string>> = {
  Current: "HEAD",
  Promoted: "promoted",
  "Side venture": "true-or-false",
};

/**
 * The career as a summary: `git log --oneline`, oldest first, one line per role
 * (hash, logo, role @ company, tag, dates). Each line expands like a commit to show what the role was.
 */
export default function ExperienceThread({ stops }: { stops: ThreadStop[] }) {
  const main = stops.filter((s) => s.status !== "Side venture");
  const side = stops.filter((s) => s.status === "Side venture");
  const log = [...main, ...side];

  return (
    <ol aria-label="Career, oldest first" className="overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface">
      {log.map((s) => {
        const ref = REF[s.status];
        return (
          <li key={s.id} className="border-b border-line last:border-b-0">
            <details className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-sunken sm:gap-4 [&::-webkit-details-marker]:hidden">
                <span className="code hidden w-[4.5rem] shrink-0 text-accent-2 sm:block">{hash(s.id)}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[var(--r)] border border-line bg-white">{s.logo}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="title text-[1.05rem] sm:text-lg">{s.role}</span>
                    <span className="text-ink-2">@ {s.company}</span>
                    {ref && (
                      <span className={`code rounded-[4px] border px-1.5 text-xs ${s.status === "Current" ? "border-ok/50 text-ok" : "border-line text-accent"}`}>
                        {ref}
                      </span>
                    )}
                  </span>
                  <span className="code block text-xs text-muted">{s.period}</span>
                </span>
                <span aria-hidden className="code shrink-0 text-muted transition-transform group-open:rotate-90">
                  ›
                </span>
              </summary>
              <div className="border-t border-dashed border-line px-4 py-3 sm:pl-[calc(4.5rem+2rem+2.25rem)]">
                <p className="max-w-[70ch] leading-relaxed text-ink-2">{s.detail}</p>
                <p className="code mt-2 text-xs text-muted">
                  {s.type ? `${s.type} · ` : ""}
                  {s.location}
                  {s.url && (
                    <>
                      {" · "}
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-draw text-link">
                        {s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </>
                  )}
                </p>
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}
