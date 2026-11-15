// Case-study details for each project page (/work/[slug]).
// Written from each project's code, git history and the résumé.
// Keep claims to what is built and live; no client names, credentials or internal URLs.

import { clientProjects, personalProjects, workProjects, type Project } from "./profile";

export type CaseStudy = {
  role: string;
  period: string;
  status: string;
  summary: string;
  highlights: { title: string; body: string }[];
  stack: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  OEMup: {
    role: "Architect & team lead",
    period: "2023 – present",
    status: "Live",
    summary:
      "OEMup replaces Tally, spreadsheets and paper registers for small and mid-sized Indian factories. One cloud platform runs sales, purchasing, stock, production, GST accounting and HR, and the team uses it from the web and an Android app.",
    highlights: [
      {
        title: "Modular ERP architecture",
        body: "CRM and leads, procurement from RFQ to purchase order, stock with batches and serial numbers, multi-level BOM and routing-based production, job work, quality checks, accounting and HR, all sharing one data model.",
      },
      {
        title: "GST-ready accounting",
        body: "Ledgers, vouchers, credit and debit notes, bank reconciliation, GSTR preparation and TDS, with automated PDF invoices and reports.",
      },
      {
        title: "Built for large datasets",
        body: "Optimised MongoDB aggregation pipelines and Ag-Grid server-side row models keep tables of tens of thousands of rows fast, with Excel bulk import that validates every row and reports errors.",
      },
      {
        title: "AI connector for Claude",
        body: "A multi-company MCP server I wrote lets Claude read a company's ERP data securely: OAuth sign-in with the user's own permissions, read-only tools, one company per connection, rate limited.",
      },
      {
        title: "Role-based access and real-time updates",
        body: "A fine-grained permission system controls every module, and Socket.io pushes task, stock and price changes to everyone as they happen.",
      },
    ],
    stack: ["React", "Vite", "Redux Toolkit", "Ant Design", "Ag-Grid", "Node.js", "Express", "MongoDB", "Socket.io", "React Native", "MCP / Claude", "GitHub Actions", "pm2"],
  },
  CHEMAZON: {
    role: "Tech Head · full-stack developer",
    period: "2026 – present",
    status: "Live",
    summary:
      "CHEMAZON is a verified B2B marketplace for industrial chemicals. Buyers purchase batches from KYC-checked sellers and every batch carries its lab documents, so procurement teams can trust what they order.",
    highlights: [
      {
        title: "Four workflows in one platform",
        body: "Separate experiences for buyers, sellers, admins and logistics: batch stock with COA, TDS and SDS documents, RFQs and quotes, priority buyers and tiered, regional and quantity-slab pricing.",
      },
      {
        title: "No overselling, clean money trail",
        body: "Cart stock is held for 15 minutes so two buyers can't buy the same scarce batch, and a double-entry ledger tracks escrow, commission and GST on every order.",
      },
      {
        title: "AI-written listings",
        body: "A listing optimiser built on the Claude API writes search- and AI-answer-friendly product copy and structured data for each chemical.",
      },
      {
        title: "Live order updates",
        body: "JWT-authenticated Socket.IO rooms notify buyers and sellers the moment an order, quote or payment changes.",
      },
    ],
    stack: ["React", "React Router SSR", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Socket.IO", "Claude API", "PDFKit", "Docker"],
  },
  TECTET: {
    role: "Team lead · full-stack developer",
    period: "2026",
    status: "Live",
    summary:
      "TECTET lets a business sell and support customers on WhatsApp as one team. Everyone works from a shared inbox on Meta's official WhatsApp Cloud API and sends approved template broadcasts to their contact lists.",
    highlights: [
      {
        title: "Shared team inbox",
        body: "Chats are assigned to team members, with internal notes, canned replies, roles, business hours and away messages.",
      },
      {
        title: "Broadcasts at scale",
        body: "Template broadcasts run through BullMQ queues on Redis with rate limits, retries and scheduling, and report delivered, read and replied counts.",
      },
      {
        title: "Real-time across servers",
        body: "Socket.IO with a Redis adapter keeps every agent's inbox live even when the app runs on several servers.",
      },
      {
        title: "Security in layers",
        body: "Signed and de-duplicated Meta webhooks, encrypted request payloads, CSRF protection, rate limiting and stored tokens encrypted with a key ring.",
      },
    ],
    stack: ["NestJS", "Next.js 16", "React 19", "MongoDB", "BullMQ", "Redis", "Socket.IO", "Tailwind CSS", "shadcn/ui", "WhatsApp Cloud API", "Vitest", "Playwright"],
  },
  ALFAconnect: {
    role: "Lead developer",
    period: "2026",
    status: "Live",
    summary:
      "ALFAconnect is the online store for a maker of non-metallic industrial pumps. Plant buyers find the right pump, spare part or accessory, compare models and order with GST-correct paperwork.",
    highlights: [
      {
        title: "3D product views",
        body: "Interactive 3D models on product pages and product videos the server processes on upload, so buyers can inspect a pump before they order.",
      },
      {
        title: "India-ready ordering",
        body: "GST credit notes split into CGST, SGST and IGST, returns and refunds, promo codes, and delivery or pickup from a warehouse with set opening hours.",
      },
      {
        title: "Full admin console",
        body: "Products, models, spare parts, stock, policies and reports, with per-module permissions for sub-admins and encrypted API payloads.",
      },
    ],
    stack: ["NestJS", "Next.js 16", "React 19", "MongoDB", "Three.js model-viewer", "Tiptap", "React PDF", "ExcelJS", "GitHub Actions"],
  },
  "Night Zero": {
    role: "Team lead · full-stack developer",
    period: "2026",
    status: "Live",
    summary:
      "Night Zero sold passes for a large Garba night in Ahmedabad. Guests booked online, received a signed QR pass on WhatsApp and email, and walked through the gate in seconds, even where the venue had no internet.",
    highlights: [
      {
        title: "Offline-first gate scanner",
        body: "An Android scanner checks signed QR passes against a local SQLite database without holding the signing secret, saves every entry before showing success and syncs later without duplicates.",
      },
      {
        title: "Tamper-proof passes",
        body: "HMAC-signed QR passes, plus a check that blocks the same pass entering twice on a night, with the gate recorded for each check-in.",
      },
      {
        title: "Payments and delivery",
        body: "Razorpay checkout with signature checks and short seat holds; passes and confirmations go out as WhatsApp templates and PDFs.",
      },
      {
        title: "Bulk and corporate passes",
        body: "Dealers and corporate clients buy passes in bulk, with a dealer ledger to settle accounts.",
      },
    ],
    stack: ["Next.js 16", "React 19", "Express", "TypeScript", "MongoDB", "Razorpay", "WhatsApp templates", "React Native", "Expo", "SQLite"],
  },
  "Kira Intrilogy website": {
    role: "Lead developer",
    period: "2026",
    status: "Live",
    summary:
      "The Kira Intrilogy company website shows services, portfolio, careers and the blog. A custom admin panel lets the team edit every page and its SEO without touching code.",
    highlights: [
      {
        title: "Headless CMS admin",
        body: "About 35 content models cover services, portfolio, hiring pages, technology and industry pages, careers with applications, inquiries and email templates.",
      },
      {
        title: "SEO toolkit built in",
        body: "Per-page metadata, a redirect manager, automatic internal links for chosen keywords and entity blocks for AI search answers.",
      },
      {
        title: "Privacy-aware and tested",
        body: "The cookie banner appears only for visitors from regions that need it, and unit, API and Playwright end-to-end tests cover the site.",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "MongoDB", "NextAuth", "Tailwind CSS", "Tiptap", "Cloudinary", "Vitest", "Playwright"],
  },
  "E Gate": {
    role: "Lead front-end developer · back-end contributor",
    period: "2025 – 2026",
    status: "In use",
    summary:
      "E Gate replaces paper visitor registers at office gates. Visitors register themselves or are pre-invited, hosts approve, passes arrive by email, and security scans people in and out.",
    highlights: [
      {
        title: "Self check-in with approval",
        body: "A visitor fills in a form, verifies by email code and uploads a photo or document; the host approves, rejects or reschedules, and the visitor gets the result and pass by email.",
      },
      {
        title: "Security desk scanning",
        body: "The verification team scans QR passes with the device camera; passes are checked for the right day and every entry and exit is logged.",
      },
      {
        title: "Configurable for each company",
        body: "Colour-coded pass types for meetings, deliveries, VIPs and pre-invites, a visitor blacklist, multiple offices and departments, roles and Excel employee import.",
      },
    ],
    stack: ["React 18", "Vite", "Ant Design", "Tailwind CSS", "TanStack Query", "Zustand", "AG Grid", "Node.js", "Express", "MongoDB", "JWT"],
  },
  Starkidz: {
    role: "Front-end developer",
    period: "2023",
    status: "Delivered",
    summary:
      "Starkidz is a school management platform. I led the contest and event creation modules and built screens across the QA flow and admin panel.",
    highlights: [
      {
        title: "Contests and events",
        body: "Creation flows for school contests and events, from setup to publishing.",
      },
      {
        title: "Reusable components",
        body: "A set of reusable React components kept the admin panel consistent and responsive on every device.",
      },
      {
        title: "Live data and validation",
        body: "Front end wired to the back-end APIs with real-time data handling and form validation.",
      },
    ],
    stack: ["React", "JavaScript", "REST APIs"],
  },
  "MeghVin Foundation": {
    role: "Sole developer (freelance)",
    period: "2026",
    status: "Live",
    summary:
      "A bilingual English and Gujarati website and content studio for a charitable trust in Ahmedabad and Navi Mumbai. The trust's team updates every page, publishes activities and produces posters, receipts and certificates themselves.",
    highlights: [
      {
        title: "Poster studio",
        body: "A canvas editor with brand templates, layers, undo history and PNG export, so volunteers make on-brand posters in minutes.",
      },
      {
        title: "Receipts and certificates",
        body: "Letterhead documents with auto-numbered donation receipts, amounts in words, bulk certificates and PDF export.",
      },
      {
        title: "Edit everything, never break",
        body: "Every text and photo slot is editable from the admin panel; saves rebuild the pages, and the site falls back to built-in content if the database is down.",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "Cloudinary", "Konva", "Three.js", "jsPDF", "Tailwind CSS", "shadcn/ui"],
  },
  "Swadhyay Shala": {
    role: "Contributor (learner web app)",
    period: "2026",
    status: "Live",
    summary:
      "Swadhyay Shala is a course and exam platform for Jain studies. Learners enrol in paid courses, take exams level by level and download certificates in English, Hindi or Gujarati.",
    highlights: [
      {
        title: "Learner web app",
        body: "I built the learner-facing web app, including multi-language labels, the course payment flow and a media viewer for exam questions.",
      },
      {
        title: "Exam progress that survives",
        body: "Learners' answers are saved as they go, so an exam can be resumed after a break or a lost connection.",
      },
      {
        title: "Certificates in three languages",
        body: "The platform generates certificates and marksheets as PDFs in English, Hindi and Gujarati.",
      },
    ],
    stack: ["React 19", "Vite", "React Router", "Node.js", "Express", "MongoDB", "Redis", "Razorpay", "Cloudinary"],
  },
  "Dhandhar Porvad": {
    role: "Contributor",
    period: "2026",
    status: "Live",
    summary:
      "A community portal and mobile-app backend for the Dhandhar Porvad community: member census, matrimony, jobs, home businesses, news, events, and temple and monk directories.",
    highlights: [
      {
        title: "PostgreSQL migrations",
        body: "Moved contact details to JSONB for multiple contact people and added English-name columns, with SQL migration and sequence-sync scripts.",
      },
      {
        title: "Self-hosted file storage",
        body: "Moved image handling off a third-party blob store to the server's own file service, with multi-image uploads for the directories.",
      },
      {
        title: "Consistent dates",
        body: "UTC date normalisation and a shared date component so every page shows the same time.",
      },
    ],
    stack: ["Next.js 14", "TypeScript", "PostgreSQL", "NextAuth", "Firebase Cloud Messaging", "Razorpay", "GitHub Actions", "pm2"],
  },
  "Contact Convoy": {
    role: "Founder · full-stack developer",
    period: "2026",
    status: "Live on Google Play",
    summary:
      "Contact Convoy turns the stack of business cards from an exhibition into a follow-up list. A salesperson scans a card, AI cleans up the details, and every lead gets an exhibition, a stall and a status.",
    highlights: [
      {
        title: "AI card scanning",
        body: "The phone reads the card's text and AI tidies the fields into a clean contact, ready to follow up as Hot, Warm, Cold or Done.",
      },
      {
        title: "Built for companies",
        body: "Admins see every card in the company, employees see their own, and when someone leaves an admin hands their cards to a colleague.",
      },
      {
        title: "One plan per company",
        body: "Free, Starter and Pro plans priced per company, bought on the website or through Google Play billing.",
      },
      {
        title: "Shipped like a product",
        body: "Separate repos for app, API, website and admin, with CI, secret scanning, automated tests and deploys to Cloud Run and Firebase Hosting.",
      },
    ],
    stack: ["Flutter", "Node.js", "Express", "MongoDB", "OpenAI / Gemini", "Razorpay", "Google Play Billing", "Cloud Run", "Firebase Hosting", "React", "Vite"],
  },
  "LetterHead Studio": {
    role: "Solo builder",
    period: "2026",
    status: "MVP",
    summary:
      "LetterHead Studio is for small businesses that issue letters every day. Set up a letterhead and templates once, then issue numbered, print-accurate letters and PDFs, one at a time or in bulk.",
    highlights: [
      {
        title: "Numbering that never repeats",
        body: "Reference numbers like SDC/2026/001 are assigned atomically, including reserving a whole block for a bulk batch.",
      },
      {
        title: "Print-accurate pages",
        body: "Layout is measured in millimetres and paginated once, and the same result drives the preview, printing and the server-side PDF.",
      },
      {
        title: "Bulk issue from Excel",
        body: "Download a template, fill it in, and the wizard validates every row in place before producing one combined PDF.",
      },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "MongoDB", "Tiptap", "Puppeteer", "ExcelJS", "Tailwind CSS"],
  },
  "VoltGo India": {
    role: "Solo builder",
    period: "2026",
    status: "Prototype",
    summary:
      "VoltGo India is an EV-charging platform for India's Tier-2 cities: drivers find, book and pay for a charger, operators manage their stations, and the backend talks directly to the chargers.",
    highlights: [
      {
        title: "Talks to real chargers",
        body: "An OCPP 1.6J gateway handles boot, start and stop, meter values and remote start, with a charge-point simulator for testing.",
      },
      {
        title: "Fair billing",
        body: "Time-of-use pricing with peak and night bands and idle fees.",
      },
      {
        title: "Security from day one",
        body: "Rotating device-bound refresh tokens, account lockout, idempotency keys, rate limiting and redacted audit logs.",
      },
    ],
    stack: ["Turborepo", "TypeScript", "Express", "MongoDB", "Socket.IO", "Next.js 15", "React Native", "Expo", "Razorpay"],
  },
};

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ProjectGroup = "work" | "client" | "personal";

export type ProjectEntry = Project & { slug: string; group: ProjectGroup; study?: CaseStudy };

export function allProjects(): ProjectEntry[] {
  const tag = (list: Project[], group: ProjectGroup) =>
    list.map((p) => ({ ...p, slug: slugify(p.name), group, study: caseStudies[p.name] }));
  return [...tag(workProjects, "work"), ...tag(clientProjects, "client"), ...tag(personalProjects, "personal")];
}

export function getProject(slug: string) {
  return allProjects().find((p) => p.slug === slug);
}
