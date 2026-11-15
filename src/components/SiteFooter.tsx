import Link from "next/link";
import { profile } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line pb-12 pt-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Contact</p>
      <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
        Have a product to build?
        <br />
        <span className="italic text-accent">Let&apos;s talk.</span>
      </h2>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Message me on LinkedIn ↗
        </a>
        <Link
          href="/freelance"
          className="btn-press rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
        >
          Freelance services
        </Link>
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="btn-press rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
          >
            {profile.email}
          </a>
        )}
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
          >
            GitHub ↗
          </a>
        )}
      </div>
      <div className="mt-20 flex flex-wrap justify-between gap-4 font-mono text-xs text-muted">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
