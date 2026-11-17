"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** Day (indigo on cotton) / night (cotton on indigo). Saved per visitor, applied before first paint. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function apply(next: Theme) {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }

  function toggle() {
    apply(theme === "dark" ? "light" : "dark");
  }

  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Night theme"
      title={dark ? "Switch to day" : "Switch to night"}
      onClick={toggle}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-ink-2 transition-colors hover:bg-sunken hover:text-foreground"
    >
      {dark ? <Sun aria-hidden size={18} strokeWidth={1.75} /> : <Moon aria-hidden size={18} strokeWidth={1.75} />}
    </button>
  );
}
