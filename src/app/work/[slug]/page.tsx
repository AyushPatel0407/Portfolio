import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/SectionLabel";
import { allProjects, getProject } from "@/data/caseStudies";
import { profile } from "@/data/profile";
import TechIcon from "@/components/TechIcon";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // Trim to the last whole word under 158 characters.
  const full = project.study?.summary ?? project.description;
  const description = full.length <= 158 ? full : `${full.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  return {
    title: `${project.name} case study`,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: `${project.name} – ${profile.name}`, description, type: "article" },
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
      <section className="pb-16 pt-14 sm:pt-20">
        <Link href="/#work" className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-accent">
          ← All projects
        </Link>
        <p className="eyebrow mt-10 !text-accent">
          {GROUP_LABEL[project.group]}, {project.category.toLowerCase()}
        </p>
        <h1 className="mt-4 display text-6xl sm:text-8xl">{project.name}</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed sm:text-2xl">{study?.summary ?? project.description}</p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface p-5">
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-2">{f.value}</dd>
            </div>
          ))}
          <div className="bg-surface p-5">
            <dt className="text-sm text-muted">Live site</dt>
            <dd className="mt-2">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center text-accent">
                  {hostOf(project.url)} <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
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
          <SectionLabel index="01">Highlights</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {study.highlights.map((h) => (
              <div key={h.title} className="card p-6 sm:p-8">
                <h3 className="title text-2xl leading-tight">{h.title}</h3>
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
            <li key={s} className="chip !px-3.5 !py-1.5 !text-xs">
              <TechIcon name={s} size={14} />
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Next */}
      <section className="border-t border-line pt-10">
        <Link href={`/work/${next.slug}`} className="card group flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
          <span className="eyebrow">Next project</span>
          <span className="title text-4xl transition-colors group-hover:text-accent sm:text-5xl">
            {next.name}
          </span>
        </Link>
      </section>
    </main>
  );
}
