"use client";

import dynamic from "next/dynamic";

// WebGL only runs in the browser, so the scene is never server-rendered.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroCanvas() {
  return <HeroScene />;
}
