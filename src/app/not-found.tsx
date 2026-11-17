import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pb-32 pt-24">
      <p className="eyebrow !text-accent">404</p>
      <h1 className="mt-6 display text-6xl sm:text-8xl">
        This page
        <br />
        <span className="text-accent">doesn&apos;t exist.</span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-muted">The link may be old, or the page may have moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="btn btn-primary"
        >
          Back to the home page
        </Link>
        <Link
          href="/#work"
          className="btn btn-ghost"
        >
          See my projects
        </Link>
      </div>
    </main>
  );
}
