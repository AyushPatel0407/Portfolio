"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeaderIdentity from "./HeaderIdentity";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/freelance", label: "Freelance" },
  { href: "/blog", label: "Blog" },
];

/**
 * Floating header that morphs: a full bar at the top of the page; scrolling down collapses it into
 * a pill holding just the avatar and its current line, scrolling up (or reaching the top) expands it back from that circle.
 * Clicking the circle or tabbing into the header also expands it, so the nav is never out of reach.
 */
export default function SiteHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const lastY = useRef(0);
  const bar = useRef<HTMLDivElement>(null);

  // The collapsed pill is exactly as wide as the avatar plus its current line of text.
  useEffect(() => {
    const el = bar.current;
    const id = el?.querySelector<HTMLElement>("[data-identity]");
    if (!el || !id) return;
    const measure = () => el.style.setProperty("--id-w", `${Math.ceil(id.getBoundingClientRect().width) + 18}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(id);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < 80) setCollapsed(false);
        else if (y > lastY.current + 6) setCollapsed(true);
        else if (y < lastY.current - 6) setCollapsed(false);
        lastY.current = y;
      });
    };
    lastY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-30 -mx-4 px-4 pt-3 sm:-mx-8 sm:px-8">
      <div className="header-shadow">
        <div
          ref={bar}
          className={`header-bar pointer-events-auto relative flex h-[4.5rem] items-center justify-between gap-3 bg-surface pr-2 sm:pr-3 ${collapsed ? "is-collapsed" : ""}`}
          onFocusCapture={() => setCollapsed(false)}
          onClickCapture={(e) => {
            // In the circle, a click opens the header instead of navigating.
            if (collapsed) {
              e.preventDefault();
              e.stopPropagation();
              setCollapsed(false);
            }
          }}
        >
          <HeaderIdentity />
          <div className="header-rest flex shrink-0 items-center gap-1">
            <nav aria-label="Main" className="flex items-center text-[0.9rem] font-medium text-ink-2">
              {nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`min-h-10 items-center rounded-[var(--r)] px-2 transition-colors hover:bg-sunken hover:text-foreground sm:px-3 ${
                    label === "Experience" ? "hidden lg:inline-flex" : label === "Freelance" ? "hidden sm:inline-flex" : label === "Blog" ? "hidden min-[400px]:inline-flex" : "inline-flex"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/#contact" className="btn btn-primary ml-1 hidden !min-h-10 !py-2 sm:inline-flex">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
