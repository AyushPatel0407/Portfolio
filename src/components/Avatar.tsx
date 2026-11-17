"use client";

import { useEffect, useRef } from "react";

/**
 * Illustrated avatar whose head turns and eyes follow the pointer anywhere on the page.
 * Pure SVG + one rAF loop that sleeps when nothing moves; ~3 KB.
 */
export default function Avatar({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const head = useRef<SVGGElement>(null);
  const pupils = useRef<SVGGElement>(null);
  const brows = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    let target = { x: 0, y: 0 };
    let cur = { x: 0, y: 0 };
    let raf = 0;

    const tick = () => {
      cur = { x: cur.x + (target.x - cur.x) * 0.12, y: cur.y + (target.y - cur.y) * 0.12 };
      head.current?.setAttribute(
        "transform",
        `translate(${(cur.x * 7).toFixed(2)} ${(cur.y * 4).toFixed(2)}) rotate(${(cur.x * 5).toFixed(2)} 100 150)`,
      );
      pupils.current?.setAttribute("transform", `translate(${(cur.x * 4.5).toFixed(2)} ${(cur.y * 3.5).toFixed(2)})`);
      brows.current?.setAttribute("transform", `translate(0 ${(Math.min(cur.y, 0) * 2.5).toFixed(2)})`);
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };

    const still = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
    const onMove = (e: PointerEvent) => {
      if (still()) return;
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.42);
      const reach = Math.max(window.innerWidth, window.innerHeight) * 0.45;
      target = { x: Math.max(-1, Math.min(1, dx / reach)), y: Math.max(-1, Math.min(1, dy / reach)) };
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const html = document.documentElement;
    window.addEventListener("pointermove", onMove, { passive: true });
    html.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      html.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={`avatar group relative ${className}`}>
      <svg ref={root} viewBox="0 0 200 220" aria-hidden className="h-full w-full overflow-visible">
        {/* Shoulders: hoodie with orange strings */}
        <path d="M30 220c4-38 30-58 70-58s66 20 70 58z" fill="var(--avatar-hoodie)" />
        <path d="M78 166c6 10 14 15 22 15s16-5 22-15" fill="none" stroke="var(--avatar-hood)" strokeWidth="5" strokeLinecap="round" />
        <path d="M88 178v20M112 178v20" stroke="var(--avatar-strings)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="88" cy="200" r="3" fill="var(--avatar-strings)" />
        <circle cx="112" cy="200" r="3" fill="var(--avatar-strings)" />
        {/* Neck */}
        <path d="M86 140h28v26c-8 6-20 6-28 0z" fill="#c98e62" />

        <g ref={head}>
          {/* Ears */}
          <ellipse cx="53" cy="104" rx="9" ry="12" fill="#d79d70" />
          <ellipse cx="147" cy="104" rx="9" ry="12" fill="#d79d70" />
          {/* Face */}
          <path d="M100 42c28 0 48 20 48 52v14c0 26-20 48-48 48s-48-22-48-48V94c0-32 20-52 48-52z" fill="#e2a97c" />
          {/* Hair */}
          <path
            d="M52 98c-6-36 12-62 46-64 22-2 38 6 46 18 8 2 12 14 8 28l-4 18c-2-14-8-24-18-28-14 8-40 10-62 4-8 6-12 14-16 24z"
            fill="#1d1a17"
          />
          <path d="M70 48c10-8 26-10 40-6" fill="none" stroke="#3a342e" strokeWidth="3" strokeLinecap="round" />
          {/* Brows */}
          <g ref={brows}>
            <path d="M68 84q12-6 22 0" fill="none" stroke="#1d1a17" strokeWidth="4" strokeLinecap="round" />
            <path d="M110 84q10-6 22 0" fill="none" stroke="#1d1a17" strokeWidth="4" strokeLinecap="round" />
          </g>
          {/* Eyes */}
          <g className="avatar-eyes">
            <ellipse cx="80" cy="102" rx="9" ry="8" fill="#fff" />
            <ellipse cx="120" cy="102" rx="9" ry="8" fill="#fff" />
            <g ref={pupils}>
              <circle cx="80" cy="102" r="4.6" fill="#141413" />
              <circle cx="120" cy="102" r="4.6" fill="#141413" />
              <circle cx="81.6" cy="100.4" r="1.4" fill="#fff" />
              <circle cx="121.6" cy="100.4" r="1.4" fill="#fff" />
            </g>
          </g>
          {/* Glasses */}
          <g fill="none" stroke="#141413" strokeWidth="3.2">
            <rect x="64" y="89" width="32" height="26" rx="10" />
            <rect x="104" y="89" width="32" height="26" rx="10" />
            <path d="M96 100q4-4 8 0M64 98l-10-3M136 98l10-3" strokeLinecap="round" />
          </g>
          {/* Nose + smile */}
          <path d="M100 108q-4 12 2 14" fill="none" stroke="#b97b52" strokeWidth="3" strokeLinecap="round" />
          <path className="avatar-smile" d="M86 132q14 10 28 0" fill="none" stroke="#7a3b22" strokeWidth="3.4" strokeLinecap="round" />
          <path className="avatar-grin" d="M85 130q15 16 30 0z" fill="#7a3b22" />
          {/* Cheeks */}
          <ellipse cx="68" cy="124" rx="7" ry="4" fill="#e8846a" opacity=".35" />
          <ellipse cx="132" cy="124" rx="7" ry="4" fill="#e8846a" opacity=".35" />
        </g>
      </svg>
    </div>
  );
}
