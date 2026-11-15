import Link from "next/link";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/freelance", label: "Freelance" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between bg-background/85 px-4 py-2 backdrop-blur sm:-mx-8 sm:px-8">
      <Link href="/" className="inline-flex min-h-11 items-center font-serif text-2xl leading-none" aria-label="Ayush Patel, home">
        AP<span className="text-accent">.</span>
      </Link>
      <nav className="flex gap-4 font-mono text-xs uppercase tracking-wider text-muted sm:gap-8">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
