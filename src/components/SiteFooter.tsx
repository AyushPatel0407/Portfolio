import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { siGithub } from "simple-icons";
import { profile } from "@/data/profile";
import MotionToggle from "./MotionToggle";

const STUDIO = "https://trueorfalse.dev/team";

export default function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-28 pb-10 pt-8">
      {/* Contact: dark GitHub green in both themes (white 11:1, light green 9:1). */}
      <div className="relative overflow-hidden rounded-[18px] bg-[#0e4429] px-6 py-14 text-white sm:px-12 sm:py-16">
        <div className="relative max-w-3xl">
          <p aria-hidden className="code text-[#7ee2a8]">
            ayush@portfolio:~$ <span className="text-white">./contact</span>
          </p>
          <h2 className="display mt-4 text-[2.5rem] sm:text-[4rem]">Have a product to build? Let&apos;s talk.</h2>
          <p className="mt-4 max-w-[52ch] text-lg text-[#c8f0d2]">
            ERP, CRM, a marketplace or a SaaS idea: tell me what it needs to do and I&apos;ll come back with questions or a plan.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="btn bg-white text-[#0e4429] hover:bg-[#dafbe1]">
                <Mail aria-hidden size={17} />
                Email
              </a>
            )}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/60 text-white hover:border-white hover:bg-white/10"
            >
              <svg aria-hidden viewBox="0 0 24 24" width={17} height={17} fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/60 text-white hover:border-white hover:bg-white/10"
              >
                <svg aria-hidden viewBox="0 0 24 24" width={17} height={17} fill="currentColor">
                  <path d={siGithub.path} />
                </svg>
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#c8f0d2]">
            {profile.email && <span className="code">{profile.email}</span>}
            <Link href="/freelance#brief" className="link-draw inline-flex min-h-11 items-center font-semibold text-white">
              or write a project brief
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-1 text-sm text-ink-2">
          {[
            { href: "/#work", label: "Work" },
            { href: "/freelance", label: "Freelance" },
            { href: "/blog", label: "Blog" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center rounded-[8px] px-3 hover:bg-sunken hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={STUDIO} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-2.5 self-start text-sm text-ink-2 sm:self-auto">
          <Image src="/logos/true-or-false.svg" alt="" width={24} height={24} className="h-6 w-6 rounded-[6px]" />
          <span className="link-draw">Founder of True || False, a small software studio</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <MotionToggle />
        <span className="inline-flex items-center gap-1.5">
          <MapPin aria-hidden size={13} />
          {profile.location}
        </span>
      </div>
    </footer>
  );
}
