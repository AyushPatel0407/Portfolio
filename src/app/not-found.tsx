import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pb-32 pt-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-6 font-serif text-6xl leading-[0.9] tracking-tight sm:text-8xl">
        This page
        <br />
        <span className="italic text-accent">doesn&apos;t exist.</span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-muted">The link may be old, or the page may have moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="btn-press rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          Back to the home page
        </Link>
        <Link
          href="/#work"
          className="btn-press rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-foreground"
        >
          See my projects
        </Link>
      </div>
    </main>
  );
}
