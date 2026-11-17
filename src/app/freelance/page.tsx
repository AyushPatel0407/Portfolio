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
      <section className="pb-20 pt-14 sm:pb-24 sm:pt-20">
        <h1 className="display text-6xl sm:text-8xl">
          Let&apos;s build your
          <br />
          <span className="text-accent">next product.</span>
        </h1>
        <div className="mt-12 grid gap-8 sm:grid-cols-[1.2fr_1fr] sm:items-end">
          <p className="title text-2xl leading-snug sm:text-[2.1rem] sm:leading-[1.15]">{freelance.pitch}</p>
          <div>
            <p className="flex items-center gap-2.5 text-sm font-medium">
              <span className={freelance.available ? "pulse" : "h-2 w-2 rounded-full bg-line-strong"} aria-hidden />
              {freelance.available ? freelance.status : "Not taking new projects right now"}
            </p>
            <p className="mt-3 leading-relaxed text-ink-2">{freelance.note}</p>
            <a href="#brief" className="btn btn-primary mt-6">
              Start a project
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <SectionLabel index="01">What I can build for you</SectionLabel>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {freelance.services.map((s) => (
            <div key={s.title} className="flex flex-col justify-between gap-8 bg-surface p-6 sm:p-8">
              <div>
                <h3 className="title text-2xl leading-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
              </div>
              <p className="text-sm text-muted">
                Proof: <span className="text-foreground">{s.proof}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="pb-24">
        <SectionLabel index="02">How we&apos;ll work together</SectionLabel>
        <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {freelance.process.map((p, i) => (
            <li key={p.step} className="border-t border-line pt-5">
              <h3 className="title text-xl">
                <span className="mr-2 text-sm font-normal text-accent">{String(i + 1).padStart(2, "0")}</span>
                {p.step}
              </h3>
              <p className="mt-2 max-w-prose leading-relaxed text-ink-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Engagements */}
      <section className="pb-24">
        <SectionLabel index="03">Ways to work with me</SectionLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {freelance.engagements.map((e) => (
            <div key={e.name} className="card p-6 sm:p-8">
              <h3 className="title text-2xl leading-tight">{e.name}</h3>
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
                <span className="title text-2xl transition-colors group-hover:text-accent sm:text-3xl">{p.name}</span>
                <span className="text-sm text-muted">
                  {p.category}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Link href="/#work" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent">
          See all projects
        </Link>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <SectionLabel index="05">Questions</SectionLabel>
        <div className="divide-y divide-line border-y border-line">
          {freelance.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="title flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-xl">
                {f.q}
                <span className="text-accent transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-prose leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Brief */}
      <section id="brief" className="scroll-mt-28 pb-24">
        <SectionLabel index="06" title="Tell me what you're building" intro="Fill in a few details and I'll get back to you with questions or a plan.">
          Start a project
        </SectionLabel>
        <ProjectBrief services={freelance.services.map((s) => s.title)} email={profile.email} linkedin={profile.linkedin} />
      </section>
    </main>
  );
}
