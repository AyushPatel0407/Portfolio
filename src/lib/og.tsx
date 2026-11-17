import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200×630 share card: eyebrow, big title, subtitle, name footer. */
export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f6f2",
          color: "#141413",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#b8400b", letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#b8400b" }} />
          {eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: title.length > 28 ? 76 : 104, lineHeight: 1, fontWeight: 700, letterSpacing: -4 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 34, lineHeight: 1.3, color: "#66635b", maxWidth: 980 }}>{subtitle}</div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#66635b" }}>
          <span>
            Ayush Patel<span style={{ color: "#b8400b" }}>.</span>
          </span>
          <span>Full-Stack Developer · Ahmedabad</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
