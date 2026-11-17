import { skills } from "@/data/profile";
import TechIcon from "./TechIcon";

const FOLDER: Record<string, string> = {
  "Front end": "frontend",
  Mobile: "mobile",
  Integrations: "integrations",
  "Back end & APIs": "backend",
  Data: "data",
  AI: "ai",
  "Cloud & DevOps": "cloud",
  "Testing & tools": "tooling",
  Domains: "domains",
};

// Reading order: the stack from the screen down to the servers, then the business side.
const ORDER = ["Front end", "Back end & APIs", "Data", "Mobile", "Integrations", "AI", "Cloud & DevOps", "Testing & tools", "Domains"];

/**
 * Skills, easy to scan: one card per group (folder name, plain label, count) holding a grid of
 * tiles with each tool's logo and name.
 */
export default function SkillWeave() {
  const groups = [...skills].sort((a, b) => ORDER.indexOf(a.group) - ORDER.indexOf(b.group));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g) => {
        const wide = g.group === "Domains";
        return (
          <section
            key={g.group}
            aria-label={g.group}
            className={`rounded-[var(--r-lg)] border border-line bg-surface p-4 sm:p-5 ${wide ? "sm:col-span-2 lg:col-span-3" : ""}`}
          >
            <header className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="min-w-0">
                <span className="code block font-bold text-accent">{FOLDER[g.group] ?? g.group}/</span>
                <span className="text-sm text-muted">{g.group}</span>
              </h3>
              <span className="code shrink-0 rounded-[4px] border border-line px-1.5 text-xs text-muted">{g.items.length}</span>
            </header>
            <ul className={`grid gap-2 ${wide ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-2"}`}>
              {g.items.map((item) => (
                <li
                  key={item}
                  className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-[var(--r)] border border-line bg-background px-2.5 py-2 transition-colors hover:border-line-strong"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center">
                    <TechIcon name={item} size={18} />
                  </span>
                  <span className="min-w-0 break-words text-[0.82rem] font-medium leading-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
