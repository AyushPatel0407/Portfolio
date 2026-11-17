import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Trophy,
  Users,
  Zap,
  Factory,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { caseStudies, slugify } from "@/data/caseStudies";
import type { Project } from "@/data/profile";

// Product logos taken from each live site (see /public/logos).
export const LOGOS: Record<string, string> = {
  OEMup: "/logos/oemup.png",
  CHEMAZON: "/logos/chemazon.svg",
  TECTET: "/logos/tectet.png",
  ALFAconnect: "/logos/alfaconnect.png",
  "Night Zero": "/logos/night-zero.png",
  "Kira Intrilogy website": "/logos/kira-intrilogy.png",
  "Contact Convoy": "/logos/contact-convoy.png",
  "MeghVin Foundation": "/logos/meghvin-foundation.png",
};

const ICONS: Record<string, LucideIcon> = {
  OEMup: Factory,
  CHEMAZON: FlaskConical,
  TECTET: MessageCircle,
  ALFAconnect: ShoppingBag,
  "Night Zero": Ticket,
  "Kira Intrilogy website": Globe,
  "E Gate": ShieldCheck,
  Starkidz: Trophy,
  "Contact Convoy": ScanLine,
  "LetterHead Studio": FileText,
  "VoltGo India": Zap,
  "MeghVin Foundation": HeartHandshake,
  "Swadhyay Shala": GraduationCap,
  "Dhandhar Porvad": Users,
};

export function projectIcon(project: Project): LucideIcon {
  return ICONS[project.name] ?? (project.category.includes("Event") ? CalendarCheck : Building2);
}

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const pending = !project.description;
  const hasStudy = Boolean(caseStudies[project.name]);
  const logo = LOGOS[project.name];
  const Icon = projectIcon(project);

  return (
    <Link
      href={`/work/${slugify(project.name)}`}
      className={`card group relative flex flex-col justify-between gap-8 p-6 sm:p-8 ${featured ? "md:col-span-2 md:grid md:grid-cols-[1.3fr_1fr] md:items-end" : ""}`}
    >
      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          {logo ? (
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1 ">
              <Image src={logo} alt="" width={44} height={44} className="h-full w-full rounded-md object-contain" />
            </span>
          ) : (
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-sunken text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
              <Icon aria-hidden size={20} strokeWidth={1.75} />
            </span>
          )}
          {project.url ? (
            <span className={`${featured ? "md:absolute md:right-8 md:top-8" : ""} inline-flex items-center gap-2 rounded-[6px] bg-ok-soft px-2 py-0.5 text-xs font-semibold text-ok`}>
              <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
              Live
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted">{project.category}</p>
        <h3 className={`title mt-2 leading-none ${featured ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}>{project.name}</h3>
        <p className={`mt-4 max-w-prose leading-relaxed ${pending ? "italic text-muted" : "text-ink-2"}`}>
          {pending ? "Write-up coming soon." : project.description}
        </p>
      </div>

      <div className={`flex flex-col gap-5 ${featured ? "md:items-end" : ""}`}>
        <ul className={`flex flex-wrap gap-2 ${featured ? "md:justify-end" : ""}`} aria-label="Highlights">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <span className={`flex w-full items-center justify-between gap-4 border-t border-line pt-4 ${featured ? "md:w-auto md:border-0 md:pt-0" : ""}`}>
          {project.url && (
            <span className="text-sm text-muted md:hidden">{project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
            {hasStudy ? "Read case study" : "View project"}
            <ArrowUpRight aria-hidden size={16} className="nudge" />
          </span>
        </span>
      </div>
    </Link>
  );
}
