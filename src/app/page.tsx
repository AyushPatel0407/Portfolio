import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import SectionLabel from "@/components/SectionLabel";
import {
  certifications,
  clientProjects,
  earlierBuilds,
  education,
  experience,
  freelance,
  personalProjects,
  profile,
  skills,
  stats,
  workProjects,
  type Project,
} from "@/data/profile";
import { formatDate, getAllPosts } from "@/lib/blog";

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const pending = !project.description;
  const Wrapper = project.url ? "a" : "div";

  return (
    <Wrapper
      {...(project.url ? { href: project.url, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex flex-col justify-between gap-8 rounded-2xl border border-line bg-surface p-6 transition-colors sm:p-8 ${
        project.url ? "hover:border-accent" : ""
      }`}
    >
      <div>
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-muted">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">{project.name}</h3>
        <p className={`mt-4 max-w-prose leading-relaxed ${pending ? "italic text-muted" : "text-foreground/80"}`}>
          {pending ? "Write-up coming soon." : project.description}
        </p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              {tag}
            </li>
          ))}
        </ul>
        {project.url && (
          <span className="font-mono text-xs text-foreground transition-colors group-hover:text-accent">
            {hostOf(project.url)} <span aria-hidden>↗</span>
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main id="top">
      {/* Hero */}
      <section className="relative pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="absolute -top-20 bottom-0 left-1/2 w-screen -translate-x-1/2">
          <HeroCanvas />
        </div>
        <div className="relative">
          {freelance.available && (
            <Link
              href="/freelance"
              className="group mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-background/70 py-1.5 pl-3 pr-4 text-sm backdrop-blur transition-colors hover:border-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {freelance.status}
              <span className="text-muted transition-colors group-hover:text-accent" aria-hidden>
                →
              </span>
            </Link>
          )}
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {profile.role} · {profile.location.split(",")[0]}
          </p>
          <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-8xl lg:text-[9.5rem]">
            {profile.name.split(" ")[0]}
            <br />
            <span className="italic text-accent">{profile.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <div className="mt-12 grid gap-8 sm:grid-cols-[1.2fr_1fr] sm:items-end">
            <p className="text-2xl leading-snug tracking-tight sm:text-3xl">{profile.headline}</p>
            <div>
              <p className="leading-relaxed text-muted">{profile.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  See my work
                </a>
                <Link
                  href="/freelance"
                  className="rounded-full border border-line bg-background/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:border-foreground"
                >
                  Hire me
                </Link>
              </div>
            </div>
          </div>

          <dl className="mt-20 grid grid-cols-1 border-y border-line sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse py-6 sm:px-6 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}
              >
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                <dd className="font-serif text-5xl leading-none">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-20 pb-24">
        <SectionLabel index="01">Products I&apos;ve built at work</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          {workProjects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Client */}
      <section className="pb-24">
        <SectionLabel index="02">Freelance &amp; client work</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          {clientProjects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className="pb-24">
        <SectionLabel index="03">My own products</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          {personalProjects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
          <div className="rounded-2xl border border-dashed border-line p-6 sm:p-8">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">Earlier builds</p>
            <ul className="divide-y divide-line">
              {earlierBuilds.map((b) => (
                <li key={b.name} className="flex items-baseline justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium">{b.name}</p>
                    <p className="text-sm text-muted">{b.detail}</p>
                  </div>
                  <span className="font-mono text-xs text-muted">{b.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="scroll-mt-20 pb-24">
        <SectionLabel index="04">Experience</SectionLabel>
        <ol>
          {experience.map((job) => (
            <li
              key={job.role + job.company}
              className="grid gap-2 border-b border-line py-8 first:pt-0 sm:grid-cols-[14rem_1fr] sm:gap-8"
            >
              <div className="font-mono text-xs text-muted">
                <p>{job.period}</p>
                <p className="mt-1">{job.type}</p>
              </div>
              <div>
                <h3 className="text-2xl tracking-tight">
                  {job.role} <span className="font-serif italic text-accent">at</span> {job.company}
                </h3>
                <p className="mt-2 max-w-prose leading-relaxed text-muted">{job.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-20 pb-24">
        <SectionLabel index="05">Skills</SectionLabel>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.group}>
              <h3 className="mb-4 font-serif text-2xl">{group.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-accent-soft px-3 py-1 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Writing */}
      {posts.length > 0 && (
        <section id="writing" className="scroll-mt-20 pb-24">
          <SectionLabel index="06">Latest writing</SectionLabel>
          <ul className="border-t border-line">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-line">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                  <span>
                    <span className="block font-serif text-3xl leading-tight transition-colors group-hover:text-accent">
                      {post.title}
                    </span>
                    <span className="mt-2 block max-w-prose text-muted">{post.summary}</span>
                  </span>
                  <span className="font-mono text-xs text-muted" aria-hidden>
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/blog" className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-accent">
            All posts →
          </Link>
        </section>
      )}

      {/* Education */}
      <section className="pb-24">
        <SectionLabel index={posts.length > 0 ? "07" : "06"}>Education &amp; certifications</SectionLabel>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-mono text-xs text-muted">{education.period}</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight">{education.degree}</h3>
            <p className="mt-2 text-muted">
              {education.school} · {education.grade}
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 py-4">
                <span>{c.name}</span>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {c.issuer}
                  {c.year && ` · ${c.year}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
