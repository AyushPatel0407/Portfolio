"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero name, woven from particles (BRAND.md: "Weave").
 *
 * The real <h1> text stays in the HTML (SEO, screen readers, first paint). Once fonts are ready,
 * every glyph is sampled from its exact on-screen position, the text fades and particles that
 * start as loose horizontal threads are pulled into the letters, left to right. The pointer
 * combs through them; they settle back. The loop only runs while something is moving.
 * Reduced motion / "Pause animations": the finished name is drawn once, nothing moves.
 */
export default function WovenName({
  lines,
  className = "",
  shortOnMobile = false,
  firstWordOnly = false,
}: {
  lines: string[];
  className?: string;
  /** Draw only the first word; the rest stays in the h1 for screen readers and search engines. */
  shortOnMobile?: boolean;
  firstWordOnly?: boolean;
}) {
  const h1 = useRef<HTMLHeadingElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [woven, setWoven] = useState(false);

  useEffect(() => {
    const el = h1.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;

    const PAD = 72; // room around the name for threads and combing
    let px: Float32Array, py: Float32Array, vx: Float32Array, vy: Float32Array;
    let tx: Float32Array, ty: Float32Array, delay: Float32Array, tone: Uint8Array;
    let n = 0;
    let gap = 6;
    let w = 0;
    let h = 0;
    let start = 0;
    let raf = 0;
    let pointer = { x: -1e4, y: -1e4 };
    let c1 = "#0a0a0a";
    let c2 = "#10b981";
    let glow = false;
    let skin = "a";
    let font = "";
    let sprites: HTMLCanvasElement[] = [];
    let sprite = 4;
    let alive = true;
    const BUCKETS = 6;
    // The name is drawn as a GitHub contribution graph: rounded squares in GitHub's four greens
    // on a grid of empty "no contributions" cells.
    let contrib = false;
    const LEVELS_DARK = ["#0e4429", "#006d32", "#26a641", "#39d353"];
    const LEVELS_LIGHT = ["#9be9a8", "#40c463", "#30a14e", "#216e39"];
    let ex = new Float32Array(0);
    let ey = new Float32Array(0);
    let emptySprite: HTMLCanvasElement | null = null;
    let elapsedNow = 1e9;

    const still = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

    function hexToRgb(hex: string) {
      const n = parseInt(hex.replace("#", ""), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    /** Theme colours → one pre-rendered dot sprite per colour bucket (fast to stamp). */
    function readColors() {
      const html = document.documentElement;
      const cs = getComputedStyle(html);
      c1 = cs.getPropertyValue("--p1").trim() || c1;
      c2 = cs.getPropertyValue("--p2").trim() || c2;
      glow = cs.getPropertyValue("--p-glow").trim() === "1";
      skin = html.dataset.skin ?? "a";
      const a = hexToRgb(c1);
      const b = hexToRgb(c2);
      const d = Math.max(2.4, gap * 0.92);
      if (contrib) {
        // Rounded squares, like the cells of a contribution graph.
        sprite = Math.max(3, Math.round(gap * 0.82));
        const square = (fill: string) => {
          const sp = document.createElement("canvas");
          sp.width = sp.height = sprite * 2;
          const g = sp.getContext("2d")!;
          g.scale(2, 2);
          g.fillStyle = fill;
          g.beginPath();
          g.roundRect(0, 0, sprite, sprite, Math.max(1, sprite * 0.2));
          g.fill();
          return sp;
        };
        const dark = html.dataset.theme !== "light";
        sprites = (dark ? LEVELS_DARK : LEVELS_LIGHT).map(square);
        emptySprite = square(dark ? "#161b22" : "#ebedf0");
        return;
      }
      emptySprite = null;
      sprite = glow ? Math.ceil(d * 3) : Math.ceil(d + 2);
      sprites = Array.from({ length: BUCKETS }, (_, k) => {
        const t = k / (BUCKETS - 1);
        const rgb = a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",");
        const sp = document.createElement("canvas");
        sp.width = sp.height = sprite * 2;
        const g = sp.getContext("2d")!;
        g.scale(2, 2);
        const r = sprite / 2;
        if (glow) {
          const grad = g.createRadialGradient(r, r, 0, r, r, r);
          grad.addColorStop(0, `rgba(${rgb},1)`);
          grad.addColorStop(0.28, `rgba(${rgb},0.9)`);
          grad.addColorStop(1, `rgba(${rgb},0)`);
          g.fillStyle = grad;
          g.fillRect(0, 0, sprite, sprite);
        } else {
          g.fillStyle = `rgb(${rgb})`;
          g.beginPath();
          g.arc(r, r, d / 2, 0, Math.PI * 2);
          g.fill();
        }
        return sp;
      });
    }

    function toneFor(x: number) {
      if (contrib) {
        // Mostly busy days, some quiet ones: weighted contribution levels.
        const r = Math.random();
        return r < 0.12 ? 0 : r < 0.38 ? 1 : r < 0.72 ? 2 : 3;
      }
      // Studio: ink with a sprinkle of emerald. Midnight: gradient across the name. Warm: teal and saffron mixed.
      if (skin === "b") return Math.min(BUCKETS - 1, Math.floor((x / w) * BUCKETS));
      if (skin === "c") return Math.random() < 0.5 ? 0 : BUCKETS - 1;
      return Math.random() < 0.14 ? BUCKETS - 1 : 0;
    }

    /** Draw every character at its real position into an offscreen canvas, then sample it. */
    function sample() {
      const rect = el!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width + PAD * 2;
      h = rect.height + PAD * 2;
      cv!.width = Math.round(w * dpr);
      cv!.height = Math.round(h * dpr);
      cv!.style.width = `${w}px`;
      cv!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cs = getComputedStyle(el!);
      const fontSize = parseFloat(cs.fontSize);
      font = cs.fontFamily;
      const off = document.createElement("canvas");
      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.font = `${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
      o.fillStyle = "#000";
      o.textBaseline = "alphabetic";
      const m = o.measureText("Hg");
      const asc = m.fontBoundingBoxAscent || fontSize * 0.8;
      const desc = m.fontBoundingBoxDescent || fontSize * 0.2;

      // Character-by-character via Range, so kerning/letter-spacing match the real text exactly.
      const walker = document.createTreeWalker(el!, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        // Skip text that is only there for screen readers (e.g. "Patel" on phones).
        const box = node.parentElement?.getBoundingClientRect();
        if (box && (box.width < 2 || box.height < 2)) continue;
        const text = node.textContent ?? "";
        for (let i = 0; i < text.length; i++) {
          if (text[i].trim() === "") continue;
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const r = range.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) continue; // visually hidden text (e.g. "Patel" on phones)
          const baseline = r.top - rect.top + PAD + (r.height - (asc + desc)) / 2 + asc;
          o.fillText(text[i], r.left - rect.left + PAD, baseline);
        }
      }

      gap = contrib ? Math.max(3, Math.round(fontSize / 16)) : Math.max(3, Math.round(fontSize / 30));
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const pts: number[] = [];
      for (let y = 0; y < off.height; y += gap)
        for (let x = 0; x < off.width; x += gap) if (data[(y * off.width + x) * 4 + 3] > 140) pts.push(x, y);

      // Empty graph cells fill the rest of the name's box (contribution mode only).
      if (contrib && pts.length) {
        let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
        for (let i = 0; i < pts.length; i += 2) {
          x0 = Math.min(x0, pts[i]);
          x1 = Math.max(x1, pts[i]);
          y0 = Math.min(y0, pts[i + 1]);
          y1 = Math.max(y1, pts[i + 1]);
        }
        const empty: number[] = [];
        for (let y = y0 - gap; y <= y1 + gap; y += gap)
          for (let x = x0 - gap; x <= x1 + gap; x += gap) if (data[(y * off.width + x) * 4 + 3] <= 140) empty.push(x, y);
        ex = new Float32Array(empty.length / 2);
        ey = new Float32Array(empty.length / 2);
        for (let i = 0; i < ex.length; i++) {
          ex[i] = empty[i * 2];
          ey[i] = empty[i * 2 + 1];
        }
      } else {
        ex = new Float32Array(0);
        ey = new Float32Array(0);
      }

      n = pts.length / 2;
      px = new Float32Array(n);
      py = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      tx = new Float32Array(n);
      ty = new Float32Array(n);
      delay = new Float32Array(n);
      tone = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        tx[i] = pts[i * 2];
        ty[i] = pts[i * 2 + 1];
        if (contrib) {
          // Cells light up in place, column by column, like a contribution graph filling in.
          px[i] = tx[i];
          py[i] = ty[i];
          delay[i] = (tx[i] / w) * 900 + Math.random() * 120;
        } else {
          // Start scattered like dust around the name, then gather into the letters left to right.
          const a = Math.random() * Math.PI * 2;
          const r = (0.35 + Math.random() * 0.65) * Math.max(w, h) * 0.6;
          px[i] = w / 2 + Math.cos(a) * r;
          py[i] = h / 2 + Math.sin(a) * r * 0.55;
          delay[i] = (tx[i] / w) * 500 + Math.random() * 300;
        }
        tone[i] = toneFor(tx[i]);
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = glow ? "lighter" : "source-over";
      const half = sprite / 2;
      if (emptySprite) for (let i = 0; i < ex.length; i++) ctx!.drawImage(emptySprite, ex[i] - half, ey[i] - half, sprite, sprite);
      for (let i = 0; i < n; i++) {
        if (contrib && elapsedNow < delay[i]) continue; // not "committed" yet
        ctx!.drawImage(sprites[tone[i]], px[i] - half, py[i] - half, sprite, sprite);
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    function settle() {
      elapsedNow = 1e9;
      for (let i = 0; i < n; i++) {
        px[i] = tx[i];
        py[i] = ty[i];
      }
      draw();
    }

    function step(t: number) {
      raf = 0;
      if (!alive) return;
      const elapsed = t - start;
      elapsedNow = elapsed;
      let moving = false;
      const R = 70;
      for (let i = 0; i < n; i++) {
        if (elapsed < delay[i]) {
          moving = true;
          continue;
        }
        // Spring towards the letter…
        let ax = (tx[i] - px[i]) * 0.06;
        let ay = (ty[i] - py[i]) * 0.06;
        // …and get combed aside by the pointer.
        const dx = px[i] - pointer.x;
        const dy = py[i] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * 4;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }
        vx[i] = (vx[i] + ax) * 0.82;
        vy[i] = (vy[i] + ay) * 0.82;
        px[i] += vx[i];
        py[i] += vy[i];
        if (!moving && (Math.abs(vx[i]) > 0.02 || Math.abs(vy[i]) > 0.02 || Math.abs(tx[i] - px[i]) > 0.3)) moving = true;
      }
      draw();
      if (moving) raf = requestAnimationFrame(step);
    }

    const kick = () => {
      if (!raf && alive && !still()) raf = requestAnimationFrame(step);
    };

    function build(animate: boolean) {
      cancelAnimationFrame(raf);
      raf = 0;
      contrib = true; // the whole site is a terminal now: the name is a contribution graph in both themes
      elapsedNow = 1e9;
      sample();
      readColors();
      if (!animate || still()) {
        settle();
      } else {
        start = performance.now();
        elapsedNow = 0;
        kick();
      }
      setWoven(true);
    }

    const onMove = (e: PointerEvent) => {
      const r = cv!.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (pointer.x > -40 && pointer.y > -40 && pointer.x < w + 40 && pointer.y < h + 40) kick();
    };
    const onLeave = () => {
      pointer = { x: -1e4, y: -1e4 };
      kick();
    };
    const onTheme = () => {
      // A different theme can mean a different font: re-form the name in it.
      if (getComputedStyle(el!).fontFamily !== font) {
        document.fonts.ready.then(() => alive && build(true));
        return;
      }
      readColors();
      for (let i = 0; i < n; i++) tone[i] = toneFor(tx[i]);
      draw();
    };
    const onMotion = () => {
      if (still()) {
        cancelAnimationFrame(raf);
        raf = 0;
        settle();
      }
    };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => build(false), 150);
    };

    document.fonts.ready.then(() => alive && build(true));
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("themechange", onTheme);
    window.addEventListener("motionchange", onMotion);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("themechange", onTheme);
      window.removeEventListener("motionchange", onMotion);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative">
      <h1
        ref={h1}
        className={`display relative transition-[color] duration-300 ${woven ? "text-transparent" : ""} ${className}`}
      >
        {lines.map((l, i) => {
          const [first, ...rest] = l.split(" ");
          return (
            <span key={l} className="block">
              {(shortOnMobile || firstWordOnly) && rest.length ? (
                <>
                  {first}
                  <span className={firstWordOnly ? "sr-only" : "max-sm:sr-only"}> {rest.join(" ")}</span>
                </>
              ) : (
                l
              )}
              {i < lines.length - 1 ? " " : ""}
            </span>
          );
        })}
      </h1>
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute -left-[72px] -top-[72px]" />
    </div>
  );
}
