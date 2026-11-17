"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";

const NAME = "Ayush Patel";

// What the avatar says as each part of the home page comes into view.
const LINES: [string, string][] = [
  ["work", "Here's what I've built"],
  ["experience", "My journey so far"],
  ["skills", "What I build with"],
  ["writing", "A few notes I wrote"],
  ["education", "Where I learned"],
  ["contact", "Let's build something"],
];

/**
 * Header identity: the avatar and a line of text. On landing it reads "Ayush Patel"; on the home
 * page it says one line per section as you scroll (the text slides vertically, the avatar bobs),
 * and hovering or focusing it shows the name again. Screen readers always get "Ayush Patel, home".
 */
export default function HeaderIdentity({ size = "md" }: { size?: "md" | "lg" }) {
  const pathname = usePathname();
  const [line, setLine] = useState(NAME);
  const [hover, setHover] = useState(false);
  const last = useRef(NAME);

  useEffect(() => {
    if (pathname !== "/") {
      setLine(NAME);
      return;
    }
    const els = LINES.map(([id, text]) => [document.getElementById(id), text] as const).filter(
      (x): x is readonly [HTMLElement, string] => !!x[0],
    );
    let raf = 0;
    const pick = () => {
      raf = 0;
      // The last section whose top has passed 40% of the viewport wins; above the first one, the name.
      const mark = window.innerHeight * 0.4;
      let text = NAME;
      for (const [el, t] of els) if (el.getBoundingClientRect().top < mark) text = t;
      if (text !== last.current) {
        last.current = text;
        setLine(text);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const shown = hover ? NAME : line;

  return (
    <Link
      href="/"
      aria-label={`${NAME}, home`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      data-identity
      className="group flex min-h-11 min-w-0 items-center gap-2 self-stretch"
    >
      {/* No background: the avatar peeks up from behind the header's bottom line. */}
      <span aria-hidden className={`relative shrink-0 self-stretch overflow-hidden ${size === "lg" ? "w-24" : "w-14 min-[400px]:w-[4.5rem]"}`}>
        <span className="absolute inset-x-1.5 -bottom-1 block">
          <Avatar className="w-full" />
        </span>
      </span>
      {/* Text slides vertically when it changes */}
      <span aria-hidden className={`relative block min-w-0 overflow-hidden ${size === "lg" ? "h-9" : "h-8"}`}>
        <span
          key={shown}
          className={`slide-in block truncate font-extrabold tracking-[-0.03em] ${size === "lg" ? "text-[1.6rem] leading-9" : "text-[0.95rem] leading-8 sm:text-[1.2rem]"}`}
        >
          {shown}
        </span>
      </span>
    </Link>
  );
}
