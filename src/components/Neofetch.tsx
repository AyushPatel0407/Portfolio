import Image from "next/image";
import { Activity, Clock, Layers, MapPin, UserRound, type LucideIcon } from "lucide-react";
import { experience, freelance, profile } from "@/data/profile";
import TechIcon from "./TechIcon";

const STACK = ["React.js", "Next.js", "Node.js", "NestJS", "MongoDB"];

/**
 * A neofetch-style readout: the "system info" developers show in their terminals, filled with
 * Ayush's real details, with an icon per row, company logos and stack icons.
 * Rendered as a description list so it reads well without the styling.
 */
export default function Neofetch() {
  const roles = experience
    .filter((c) => c.kind !== "earlier")
    .flatMap((c) => {
      const r = c.roles.find((x) => x.end === undefined);
      return r ? [{ role: r.role, company: c.company, logo: c.logo, start: r.start }] : [];
    })
    // Primary roles first (newest first), the side studio last.
    .sort((a, b) => (a.company === "True || False" ? 1 : 0) - (b.company === "True || False" ? 1 : 0) || b.start - a.start);
  const since = Math.floor(Math.min(...experience.flatMap((c) => c.roles.map((r) => r.start))));
  const years = new Date().getFullYear() - since;

  const rows: { key: string; icon: LucideIcon; value: React.ReactNode; tone?: string }[] = [
    { key: "location", icon: MapPin, value: profile.location },
    {
      key: "role",
      icon: UserRound,
      value: roles.map((r) => (
        <span key={r.company} className="flex items-center gap-2">
          {r.logo && (
            <span className="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-[3px] bg-white">
              <Image src={r.logo} alt="" width={20} height={20} className="h-full w-full object-contain" />
            </span>
          )}
          <span>
            {r.role} <span className="text-muted">@</span> {r.company === "True || False" ? "True || False studio" : r.company}
          </span>
        </span>
      )),
    },
    { key: "uptime", icon: Clock, value: `${years}+ years (since ${since})` },
    {
      key: "stack",
      icon: Layers,
      value: (
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          {STACK.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <TechIcon name={t} size={14} />
              {t.replace(".js", "")}
            </span>
          ))}
        </span>
      ),
    },
    { key: "status", icon: Activity, value: freelance.available ? "open to freelance" : "not taking projects", tone: "text-ok" },
  ];

  return (
    <div className="code min-w-0 text-[0.85rem] leading-7">
      <p aria-hidden className="font-bold text-accent">
        ayush<span className="text-muted">@</span>portfolio
      </p>
      <p aria-hidden className="text-muted">
        ───────────────
      </p>
      <dl className="space-y-0.5 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:space-y-0 xl:block xl:space-y-0.5">
        {rows.map(({ key, icon: Icon, value, tone }) => (
          <div key={key} className="grid grid-cols-1 gap-x-2 min-[420px]:grid-cols-[7.5rem_1fr]">
            <dt className="flex items-center gap-2 self-start font-bold text-accent">
              <Icon aria-hidden size={14} strokeWidth={2} className="shrink-0" />
              {key}
            </dt>
            <dd className={tone ?? "text-foreground"}>{value}</dd>
          </div>
        ))}
      </dl>
      <p aria-hidden className="mt-3 flex gap-1">
        {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c) => (
          <span key={c} className="h-4 w-6 rounded-[2px] border border-line" style={{ background: c }} />
        ))}
      </p>
    </div>
  );
}
