import type { NextConfig } from "next";

// The site is fully static and loads nothing from other origins, so the policy can be tight.
// Next.js inlines small bootstrap scripts in static pages, which needs 'unsafe-inline' for scripts
// unless every page is rendered per request with a nonce; there is no user content to inject into.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  // Only on the real deploy: on plain-http LAN testing (http://192.168.x.x) it would break every asset.
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Rewrites `import { X } from "lucide-react"` to per-icon imports so only used icons ship.
    optimizePackageImports: ["lucide-react", "simple-icons"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Hashed build assets never change, so browsers can keep them for a year.
      { source: "/_next/static/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
