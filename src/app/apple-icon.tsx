import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iPhone home-screen icon: solid background (iOS turns transparency black).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17160f",
          color: "#f5f3ee",
          fontSize: 92,
          fontFamily: "serif",
          letterSpacing: -2,
        }}
      >
        AP
        <span style={{ color: "#ff6a33" }}>.</span>
      </div>
    ),
    size,
  );
}
