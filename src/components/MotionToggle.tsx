"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

/** Lets anyone stop every looping animation (WCAG 2.2.2), not only people with reduced motion set. */
export default function MotionToggle() {
  const [off, setOff] = useState(false);

  useEffect(() => {
    setOff(document.documentElement.dataset.motion === "off");
  }, []);

  function toggle() {
    const next = !off;
    if (next) document.documentElement.dataset.motion = "off";
    else delete document.documentElement.dataset.motion;
    try {
      localStorage.setItem("motion", next ? "off" : "on");
    } catch {}
    setOff(next);
    window.dispatchEvent(new CustomEvent("motionchange"));
  }

  return (
    <button
      type="button"
      aria-pressed={off}
      onClick={toggle}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-[8px] px-3 text-sm text-muted hover:bg-sunken hover:text-foreground"
    >
      {off ? <Play aria-hidden size={13} /> : <Pause aria-hidden size={13} />}
      Pause animations
    </button>
  );
}
