import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/SectionLabel";
import { allProjects, getProject } from "@/data/caseStudies";
import { profile } from "@/data/profile";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = project.study?.summary.slice(0, 158) ?? project.description;
  return {
    title: `${project.name} case study`,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: `${project.name} · ${profile.name}`, description, type: "article" },
  };
}

const GROUP_LABEL = {
  work: "Built at work",
  client: "Freelance & client work",
  personal: "My own product",
} as const;

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const list = allProjects();
  const index = list.findIndex((p) => p.slug === slug);
  const next = list[(index + 1) % list.length];
  const study = project.study;

  const facts = [
    { label: "Role", value: study?.role },
    { label: "Period", value: study?.period },
    { label: "Status", value: study?.status },
  ].filter((f) => f.value);

  return (
    <main className="pb-24">
      {/* Intro */}
      <section className="pb-16 pt-16 sm:pt-24">
        <Link href="/#work" className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent">
          ← All projects
        </Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {GROUP_LABEL[project.group]} · {project.category}
        </p>
        <h1 className="mt-4 font-serif text-6xl leading-[0.9] tracking-tight sm:text-8xl">{project.name}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed sm:text-2xl">{study?.summary ?? project.description}</p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface p-5">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{f.label}</dt>
              <dd className="mt-2">{f.value}</dd>
            </div>
          ))}
          <div className="bg-surface p-5">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Live site</dt>
            <dd className="mt-2">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-draw text-accent">
                  {hostOf(project.url)} ↗
                </a>
              ) : (
                <span className="text-muted">Not public</span>
              )}
            </dd>
          </div>
        </dl>
      </section>

      {/* Highlights */}
      {study && (
        <section className="pb-20">
          <SectionLabel index="01">What I built</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {study.highlights.map((h, i) => (
              <div key={h.title} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-3xl leading-tight">{h.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{h.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Stack */}
      <section className="pb-20">
        <SectionLabel index={study ? "02" : "01"}>Tech stack</SectionLabel>
        <ul className="flex flex-wrap gap-2">
          {(study?.stack ?? project.tags).map((s) => (
            <li key={s} className="rounded-full bg-accent-soft px-4 py-1.5 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Next */}
      <section className="border-t border-line pt-10">
        <Link href={`/work/${next.slug}`} className="card-lift group flex flex-wrap items-baseline justify-between gap-4 rounded-2xl p-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Next project</span>
          <span className="font-serif text-4xl transition-colors group-hover:text-accent sm:text-5xl">
            {next.name} <span aria-hidden>→</span>
          </span>
        </Link>
      </section>
    </main>
  );
}
