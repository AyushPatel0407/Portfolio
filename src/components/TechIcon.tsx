// Brand logos for skills, in brand colour. Rendered on the server, so icon data never ships as client JS.
import {
  siAntdesign,
  siAxios,
  siCss,
  siHtml5,
  siClaude,
  siCloudinary,
  siDocker,
  siExpo,
  siExpress,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGooglecloud,
  siGooglegemini,
  siGoogleplay,
  siGraphql,
  siJavascript,
  siJsonwebtokens,
  siModelcontextprotocol,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPm2,
  siPostgresql,
  siPrisma,
  siPuppeteer,
  siRazorpay,
  siReact,
  siReactquery,
  siRedis,
  siRedux,
  siShadcnui,
  siSocketdotio,
  siSqlite,
  siTailwindcss,
  siThreedotjs,
  siTurborepo,
  siTypescript,
  siVite,
  siVitest,
  siWhatsapp,
} from "simple-icons";
import {
  Bot,
  Cloud,
  Network,
  CreditCard,
  Drama,
  Factory,
  ListOrdered,
  MessageCircle,
  ReceiptIndianRupee,
  Store,
  Table2,
  Users,
  type LucideIcon,
} from "lucide-react";

type Brand = { path: string; hex: string };

const BRANDS: Record<string, Brand> = {
  "React.js": siReact,
  HTML: siHtml5,
  CSS: siCss,
  Axios: siAxios,
  React: siReact,
  "React Native": siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  Redux: siRedux,
  "Ant Design": siAntdesign,
  Vite: siVite,
  "shadcn/ui": siShadcnui,
  "TanStack Query": siReactquery,
  "Three.js": siThreedotjs,
  Expo: siExpo,
  Flutter: siFlutter,
  Firebase: siFirebase,
  Razorpay: siRazorpay,
  "WhatsApp Cloud API": siWhatsapp,
  "Google Play Billing": siGoogleplay,
  Cloudinary: siCloudinary,
  Puppeteer: siPuppeteer,
  "Node.js": siNodedotjs,
  Express: siExpress,
  NestJS: siNestjs,
  GraphQL: siGraphql,
  "Socket.IO": siSocketdotio,
  JWT: siJsonwebtokens,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Redis: siRedis,
  SQLite: siSqlite,
  "Claude API": siClaude,
  MCP: siModelcontextprotocol,
  Gemini: siGooglegemini,
  "Google Cloud": siGooglecloud,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  PM2: siPm2,
  Turborepo: siTurborepo,
  Vitest: siVitest,
  Git: siGit,
  GitHub: siGithub,
};

const GLYPHS: Record<string, LucideIcon> = {
  "AG Grid": Table2,
  "REST APIs": Network,
  BullMQ: ListOrdered,
  "AWS EC2": Cloud,
  Playwright: Drama,
  ERP: Factory,
  CRM: Users,
  "GST e-invoicing": ReceiptIndianRupee,
  "B2B marketplaces": Store,
  Payments: CreditCard,
  "WhatsApp messaging": MessageCircle,
  "AI connectors (MCP)": Bot,
};

function lum(hex: string) {
  const n = parseInt(hex, 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}

/** Light theme: brand colour, darkened when too faint on white (e.g. JavaScript yellow). */
function inkLight(hex: string) {
  if (lum(hex) < 0.62) return `#${hex}`;
  const n = parseInt(hex, 16);
  const k = 0.55;
  return `rgb(${Math.round(((n >> 16) & 255) * k)} ${Math.round(((n >> 8) & 255) * k)} ${Math.round((n & 255) * k)})`;
}

/** Dark theme: brand colour, except near-black logos (Next.js, GitHub, Express) turn off-white. */
function inkDark(hex: string) {
  return lum(hex) < 0.2 ? "#e8e6e1" : `#${hex}`;
}

export function hasTechIcon(name: string) {
  return name in BRANDS || name in GLYPHS;
}

export default function TechIcon({ name: raw, size = 16, mono = false }: { name: string; size?: number; mono?: boolean }) {
  // "Next.js 16" / "React 19" use the same icon as "Next.js" / "React".
  const base = raw.replace(/\s+\d+(\.\d+)*$/, "");
  const name = raw in BRANDS || raw in GLYPHS ? raw : base;
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={mono ? "currentColor" : undefined}
        className={mono ? "shrink-0" : "ti shrink-0"}
        style={mono ? undefined : ({ "--ti-l": inkLight(brand.hex), "--ti-d": inkDark(brand.hex) } as React.CSSProperties)}
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const Glyph = GLYPHS[name];
  return Glyph ? <Glyph aria-hidden size={size} strokeWidth={1.75} className="shrink-0 text-accent" /> : null;
}
