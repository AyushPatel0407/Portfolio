import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/data/caseStudies";
import type { Project } from "@/data/profile";
import { LOGOS, projectIcon } from "./ProjectCard";

const DOTS = ["#3fb950", "#58a6ff", "#d29922", "#f778ba"];

/** Status from the project's category ("Document SaaS · MVP" → MVP) or a live URL. */
function status(p: Project) {
  const tail = p.category.split("·").pop()?.trim() ?? "";
  if (/mvp|prototype|contributor/i.test(tail)) return tail;
  return p.url ? "Live" : "Private";
}

/** A GitHub-style pinned repository card for a project. */
export default function RepoCard({ project }: { project: Project }) {
  const logo = LOGOS[project.name];
  const Icon = projectIcon(project);
  const st = status(project);
  const live = st === "Live";
  const category = project.category.split("·")[0].trim();

  return (
    <Link
      href={`/work/${slugify(project.name)}`}
      className="group flex h-full flex-col gap-3 rounded-[var(--r-lg)] border border-line bg-surface p-4 transition-colors hover:border-line-strong sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[var(--r)] border border-line bg-white p-0.5">
          {logo ? (
            <Image src={logo} alt="" width={36} height={36} className="h-full w-full object-contain" />
          ) : (
            <Icon aria-hidden size={18} strokeWidth={2} className="text-[#1f2328]" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="code block truncate font-bold text-link group-hover:underline">{slugify(project.name)}</span>
          <span className="block truncate text-sm text-muted">{category}</span>
        </span>
        <span
          className={`code shrink-0 rounded-full border px-2 py-0.5 text-[0.7rem] ${
            live ? "border-ok/50 text-ok" : "border-line-strong text-muted"
          }`}
        >
          {st}
        </span>
      </div>
      <p className="line-clamp-3 flex-1 text-[0.9rem] leading-relaxed text-ink-2">{project.description}</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-muted" aria-label="Highlights">
        {project.tags.slice(0, 3).map((t, i) => (
          <li key={t} className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: DOTS[i % DOTS.length] }} />
            {t}
          </li>
        ))}
      </ul>
    </Link>
  );
}
