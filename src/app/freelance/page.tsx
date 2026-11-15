import type { Metadata } from "next";
import Link from "next/link";
import ProjectBrief from "@/components/ProjectBrief";
import SectionLabel from "@/components/SectionLabel";
import { freelance, profile, workProjects } from "@/data/profile";

export const metadata: Metadata = {
  title: "Freelance",
  alternates: { canonical: "/freelance" },
  description:
    "Hire Ayush Patel for custom ERP and CRM software, B2B marketplaces, SaaS MVPs, WhatsApp and payment integrations, and Next.js websites.",
};

export default function FreelancePage() {
  const liveWork = workProjects.filter((p) => p.url);

  return (
    <main>
      {/* Intro */}
      <section className="pb-20 pt-16 sm:pb-28 sm:pt-24">
        <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-3 pr-4 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {freelance.available ? freelance.status : "Not taking new projects right now"}
        </p>
        <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-8xl">
          Let&apos;s build your
          <br />
          <span className="italic text-accent">next product.</span>
        </h1>
        <div className="mt-12 grid gap-8 sm:grid-cols-[1.2fr_1fr] sm:items-end">
          <p className="text-2xl leading-snug tracking-tight sm:text-3xl">{freelance.pitch}</p>
          <div>
            <p className="leading-relaxed text-muted">{freelance.note}</p>
            <a
              href="#brief"
              className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Start a project
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <SectionLabel index="01">What I can build for you</SectionLabel>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {freelance.services.map((s, i) => (
            <div key={s.title} className="flex flex-col justify-between gap-8 bg-surface p-6 sm:p-8">
              <div>
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-3xl leading-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Proof: <span className="text-foreground">{s.proof}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="pb-24">
        <SectionLabel index="02">How we&apos;ll work together</SectionLabel>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {freelance.process.map((p, i) => (
            <li key={p.step} className="relative">
              <span className="font-serif text-6xl leading-none text-accent">{i + 1}</span>
              <h3 className="mt-4 text-xl tracking-tight">{p.step}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Engagements */}
      <section className="pb-24">
        <SectionLabel index="03">Ways to work with me</SectionLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {freelance.engagements.map((e) => (
            <div key={e.name} className="rounded-2xl border border-line p-6 sm:p-8">
              <h3 className="font-serif text-3xl leading-tight">{e.name}</h3>
              <p className="mt-3 leading-relaxed text-muted">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="pb-24">
        <SectionLabel index="04">Products I&apos;ve shipped</SectionLabel>
        <ul className="border-t border-line">
          {liveWork.map((p) => (
            <li key={p.name} className="border-b border-line">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5"
              >
                <span className="font-serif text-3xl transition-colors group-hover:text-accent">{p.name}</span>
                <span className="font-mono text-xs text-muted">
                  {p.category} <span aria-hidden>↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Link href="/#work" className="mt-4 inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wider text-accent">
          See all projects →
        </Link>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <SectionLabel index="05">Questions</SectionLabel>
        <div className="divide-y divide-line border-y border-line">
          {freelance.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl tracking-tight">
                {f.q}
                <span className="font-mono text-accent transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-prose leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Brief */}
      <section id="brief" className="scroll-mt-20 pb-24">
        <SectionLabel index="06">Start a project</SectionLabel>
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="font-serif text-5xl leading-[0.95] tracking-tight">
              Tell me what
              <br />
              <span className="italic text-accent">you&apos;re building.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Fill in a few details and I&apos;ll get back to you with questions or a plan.
            </p>
          </div>
          <ProjectBrief
            services={freelance.services.map((s) => s.title)}
            email={profile.email}
            linkedin={profile.linkedin}
          />
        </div>
      </section>
    </main>
  );
}
