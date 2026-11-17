import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Award, Briefcase, Mail } from "lucide-react";
import { siCoursera, siGithub, siUdemy } from "simple-icons";
import ExperienceThread, { type ThreadStop } from "@/components/ExperienceThread";
import WorkTerminal, { type WorkEntry } from "@/components/WorkTerminal";
import { LOGOS, projectIcon } from "@/components/ProjectCard";
import { caseStudies, slugify } from "@/data/caseStudies";
import RepoCard from "@/components/RepoCard";
import SectionLabel from "@/components/SectionLabel";
import SkillWeave from "@/components/SkillWeave";
import TechIcon from "@/components/TechIcon";
import WovenName from "@/components/WovenName";
import Neofetch from "@/components/Neofetch";
import {
  certifications,
  clientProjects,
  earlierBuilds,
  education,
  experience,
  personalProjects,
  profile,
  workProjects,
} from "@/data/profile";
import { formatDate, getAllPosts } from "@/lib/blog";

function IssuerLogo({ issuer }: { issuer: string }) {
  const brand = issuer === "Coursera" ? siCoursera : issuer === "Udemy" ? siUdemy : null;
  if (brand)
    return (
      <svg aria-hidden viewBox="0 0 24 24" width={20} height={20} fill={`#${brand.hex}`}>
        <path d={brand.path} />
      </svg>
    );
  if (issuer === "Microsoft")
    return (
      <svg aria-hidden viewBox="0 0 24 24" width={20} height={20}>
        <path fill="#f25022" d="M1 1h10.5v10.5H1z" />
        <path fill="#7fba00" d="M12.5 1H23v10.5H12.5z" />
        <path fill="#00a4ef" d="M1 12.5h10.5V23H1z" />
        <path fill="#ffb900" d="M12.5 12.5H23V23H12.5z" />
      </svg>
    );
  return <Award aria-hidden size={18} className="text-accent" />;
}

/** A shell prompt line: user@host, path, command. Decorative for screen readers. */
function Prompt({ cmd, path = "~" }: { cmd: string; path?: string }) {
  return (
    <p className="code text-muted" aria-hidden>
      <span className="text-ok">ayush@portfolio</span>:<span className="text-link">{path}</span>$ <span className="text-foreground">{cmd}</span>
    </p>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** One stop per role, oldest first; the side studio always comes last. */
function threadStops(): ThreadStop[] {
  const rows = experience.flatMap((c) => c.roles.map((r) => ({ c, r })));
  rows.sort((a, b) => (a.c.kind === "side" ? 1 : 0) - (b.c.kind === "side" ? 1 : 0) || a.r.start - b.r.start);
  const seen = new Set<string>();
  return rows.map(({ c, r }) => {
    const first = !seen.has(c.company);
    seen.add(c.company);
    const status: ThreadStop["status"] =
      c.kind === "side" ? "Side venture" : r.type.startsWith("Internship") ? "Internship" : !first ? "Promoted" : r.end === undefined ? "Current" : "Joined";
    return {
      id: `${c.company}-${r.role}`,
      company: c.company,
      role: r.role,
      type: r.type,
      period: r.period,
      year: r.start,
      detail: r.detail,
      location: c.location,
      url: c.url,
      note: c.note,
      status,
      logo: c.logo ? <Image src={c.logo} alt="" width={44} height={44} className="h-full w-full object-contain p-1" /> : null,
      stack: (r.stack ?? c.stack).map((name) => ({ name, icon: <TechIcon name={name} size={14} /> })),
    };
  });
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  // Every work product as a README in the ~/work terminal.
  const workEntries: WorkEntry[] = workProjects.map((p) => {
    const study = caseStudies[p.name];
    return {
      slug: slugify(p.name),
      name: p.name,
      category: p.category,
      description: p.description,
      url: p.url,
      logo: LOGOS[p.name],
      icon: (() => {
        const Icon = projectIcon(p);
        return <Icon aria-hidden size={15} strokeWidth={2} />;
      })(),
      highlights: study ? study.highlights.slice(0, 4).map((h) => h.title) : p.tags,
      stack: (study?.stack ?? p.tags).slice(0, 8).map((name) => ({ name, icon: <TechIcon name={name} size={13} mono /> })),
      hasStudy: Boolean(study),
    };
  });

  return (
    <main id="top">

      {/* Hero: a shell session */}
      <section className="flex min-h-[calc(100svh-5.5rem)] flex-col justify-center pb-16 pt-10 sm:pt-14">
        <div className="grid items-start gap-8 xl:grid-cols-[auto_1fr] xl:gap-16">
          <div className="min-w-0">
            <Prompt cmd="whoami" />
            <div className="mt-3">
              <WovenName lines={["Ayush Patel"]} firstWordOnly className="whitespace-nowrap text-[clamp(5rem,26vw,13.5rem)]" />
            </div>
          </div>
          <div className="min-w-0">
            <Prompt cmd="neofetch" />
            <div className="mt-3">
              <Neofetch />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <Prompt cmd="cat about.txt" />
            <p className="title rise mt-4 max-w-[30ch] text-[1.55rem] leading-[1.25] sm:text-[2.1rem]" style={{ "--i": 0 } as React.CSSProperties}>
              {profile.headline}
            </p>
            <p className="rise mt-4 max-w-[68ch] text-pretty leading-relaxed text-ink-2" style={{ "--i": 1 } as React.CSSProperties}>
              {profile.intro}
            </p>
          </div>

          {/* open: a command menu that fills the column */}
          <div className="rise min-w-0" style={{ "--i": 2 } as React.CSSProperties}>
            <Prompt cmd="open" />
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface">
              {[
                { href: "#work", cmd: "./see-the-work", note: "Products, case studies", icon: <ArrowDown aria-hidden size={17} />, primary: true },
                { href: "/freelance", cmd: "./hire-me", note: "Freelance services and a project brief", icon: <Briefcase aria-hidden size={17} /> },
                ...(profile.email ? [{ href: `mailto:${profile.email}`, cmd: "mail", note: profile.email, icon: <Mail aria-hidden size={17} /> }] : []),
                { href: profile.linkedin, cmd: "linkedin", note: "Profile and messages", icon: <LinkedInIcon />, external: true },
                ...(profile.github ? [{ href: profile.github, cmd: "github", note: "Code and activity", icon: <svg aria-hidden viewBox="0 0 24 24" width={17} height={17} fill="currentColor"><path d={siGithub.path} /></svg>, external: true }] : []),
              ].map((item) => (
                <li key={item.cmd}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-sunken ${item.primary ? "bg-accent-soft" : ""}`}
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[var(--r)] ${item.primary ? "bg-accent text-surface" : "border border-line text-ink-2"}`}>
                      {item.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="code block font-bold text-foreground">{item.cmd}</span>
                      <span className="block truncate text-sm text-muted">{item.note}</span>
                    </span>
                    <ArrowUpRight aria-hidden size={16} className="nudge shrink-0 text-muted group-hover:text-accent" />
                    {item.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
            <p aria-hidden className="code mt-3 text-muted">
              ayush@portfolio:~$ <span className="cursor align-middle" />
            </p>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-28 border-t border-line pb-24 pt-16">
        <SectionLabel index="" title="Products I've built at work" intro="Production software for manufacturers, marketplaces and teams. Most of it is live and used every day.">
          cd ~/work
        </SectionLabel>
        <WorkTerminal entries={workEntries} />
      </section>

      {/* Client work + own products as pinned repositories */}
      <section className="pb-24">
        <SectionLabel index="" title="More projects" intro="Client builds, my own products and the earlier experiments, pinned like repositories.">
          gh repo list --pinned
        </SectionLabel>

        <h3 className="code mb-3 flex items-center gap-2 text-sm font-bold text-ink-2">
          clients/ <span className="rounded-full border border-line px-2 text-xs font-normal text-muted">{clientProjects.length}</span>
        </h3>
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clientProjects.map((p) => (
            <li key={p.name}>
              <RepoCard project={p} />
            </li>
          ))}
        </ul>

        <h3 className="code mb-3 mt-10 flex items-center gap-2 text-sm font-bold text-ink-2">
          side-projects/ <span className="rounded-full border border-line px-2 text-xs font-normal text-muted">{personalProjects.length}</span>
        </h3>
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {personalProjects.map((p) => (
            <li key={p.name}>
              <RepoCard project={p} />
            </li>
          ))}
        </ul>

        <h3 className="code mb-3 mt-10 flex items-center gap-2 text-sm font-bold text-ink-2">
          archive/ <span className="rounded-full border border-line px-2 text-xs font-normal text-muted">{earlierBuilds.length}</span>
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {earlierBuilds.map((b) => {
            const inner = (
              <>
                <span className="flex items-center justify-between gap-2">
                  <span className="code truncate font-bold text-link">{b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}</span>
                  <span className="code shrink-0 rounded-full border border-line-strong px-2 text-[0.7rem] text-muted">
                    {b.period || "Archived"}
                  </span>
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-2">{b.detail}</span>
              </>
            );
            return (
              <li key={b.name}>
                {b.url ? (
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-[var(--r-lg)] border border-dashed border-line-strong p-4 hover:border-line-strong hover:bg-surface">
                    {inner}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className="h-full rounded-[var(--r-lg)] border border-dashed border-line-strong p-4">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Experience */}
      <section id="experience" className="scroll-mt-28 pb-16">
        <SectionLabel
          index=""
          title="Career log"
          intro="From the first internship to today. CHEMAZON and Kira Intrilogy are sister companies under one parent group, so I lead both. I also founded True || False, a small software studio."
        >
          git log --oneline --reverse
        </SectionLabel>
        <ExperienceThread stops={threadStops()} />
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-28 pb-24">
        <SectionLabel index="" title="What I build with" intro="Everything I reach for, from the screen down to the servers.">
          ls ~/stack
        </SectionLabel>
        <SkillWeave />
      </section>

      {/* Writing */}
      {posts.length > 0 && (
        <section id="writing" className="scroll-mt-28 pb-24">
          <SectionLabel index="" title="Writing">
            tail ~/blog
          </SectionLabel>
          <ul className="border-t border-line">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-line">
                <Link href={`/blog/${post.slug}`} className="group grid gap-1 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
                  <time dateTime={post.date} className="num text-sm text-muted">
                    {formatDate(post.date)}
                  </time>
                  <span>
                    <span className="title block text-2xl transition-colors group-hover:text-accent">{post.title}</span>
                    <span className="mt-1 block max-w-[68ch] text-ink-2">{post.summary}</span>
                  </span>
                  <span className="text-sm text-muted">{post.readingMinutes} min read</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      <section id="education" className="scroll-mt-28 pb-24">
        <SectionLabel index="" title="Education and certificates">
          cat education.md
        </SectionLabel>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <a href={education.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-[14px] border border-line bg-white p-2">
              <Image src={education.logo} alt="" width={64} height={64} className="h-full w-full object-contain" />
            </span>
            <span>
              <span className="title block text-2xl">{education.degree}</span>
              <span className="link-draw mt-1 inline-block font-semibold text-accent">{education.university}</span>
              <span className="sr-only"> (opens in a new tab)</span>
              <span className="mt-2 flex items-center gap-2 text-ink-2">
                <Image src={education.campusLogo} alt="" width={20} height={20} className="h-5 w-auto" />
                {education.campus} campus
              </span>
              <span className="num mt-1 block text-sm text-muted">
                {education.period}, {education.grade}
              </span>
            </span>
          </a>
          <ul className="border-t border-line">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-center gap-4 border-b border-line py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-line bg-white">
                  <IssuerLogo issuer={c.issuer} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium leading-snug">{c.name}</span>
                  <span className="text-sm text-muted">
                    {c.issuer}
                    {c.year && `, ${c.year}`}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

