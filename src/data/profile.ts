// All portfolio content lives here. Edit this file to update the site.

export type Project = {
  name: string;
  category: string;
  description: string; // empty string = "write-up coming soon"
  url?: string;
  tags: string[];
};

export const profile = {
  name: "Ayush Patel",
  role: "Tech Head at CHEMAZON · Technical Lead at Kira Intrilogy",
  headline: "I build ERP, CRM and commerce software for Indian businesses.",
  intro:
    "Full-stack MERN and Next.js developer from Ahmedabad. I'm Technical Lead at Kira Intrilogy, where I've helped ship products since 2023, from a manufacturing ERP to a WhatsApp team inbox. I also lead technology at CHEMAZON.",
  location: "Ahmedabad, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/ayush-patel-691270187/",
  email: "patelayush4702@gmail.com",
  github: "https://github.com/AyushPatel0407",
};

export const workProjects: Project[] = [
  {
    name: "OEMup",
    category: "Manufacturing ERP · SaaS",
    description:
      "Cloud ERP for Indian manufacturers that I architect and lead: sales, stock, production, GST accounting and HR, with an Android app and a read-only MCP connector for Claude.",
    url: "https://oemup.app",
    tags: ["Multi-level BOM", "GST accounting", "React Native app", "MCP connector"],
  },
  {
    name: "CHEMAZON",
    category: "B2B Marketplace",
    description:
      "Verified B2B chemicals marketplace: buyers purchase batches from KYC-checked sellers, with quality documents, quotes, escrow-protected payments and live order updates.",
    url: "https://www.chemazon.store",
    tags: ["Escrow ledger", "Socket.IO", "Claude listing AI", "Cart stock holds"],
  },
  {
    name: "TECTET",
    category: "WhatsApp Business SaaS",
    description:
      "Shared WhatsApp inbox for teams on the official Meta Cloud API: assign chats, reply together and send approved template broadcasts to contact lists.",
    url: "https://tectet.co",
    tags: ["NestJS", "Next.js", "BullMQ + Redis", "WhatsApp Cloud API"],
  },
  {
    name: "ALFAconnect",
    category: "Industrial E-commerce",
    description:
      "Online store for industrial pumps, spare parts and accessories, with 3D product views, model comparison, GST invoicing and warehouse pickup.",
    url: "https://store.alfapumps.com",
    tags: ["NestJS", "Next.js", "3D product viewer", "GST invoicing"],
  },
  {
    name: "Night Zero",
    category: "Event Ticketing",
    description:
      "Garba night ticketing: buy passes, get signed QR passes on WhatsApp and email, and check guests in with gate scanners that work even offline.",
    url: "https://www.nightzero.in",
    tags: ["Razorpay", "Offline scanner", "Signed QR passes", "WhatsApp delivery"],
  },
  {
    name: "Kira Intrilogy website",
    category: "Company Website · CMS",
    description:
      "Company website with services, portfolio, careers and blog, plus a custom admin panel so the team can edit every page and its SEO without code.",
    url: "https://www.kiraintrilogy.com",
    tags: ["Next.js 16", "Prisma", "Headless CMS", "Playwright"],
  },
  {
    name: "E Gate",
    category: "Visitor Management",
    description:
      "Visitor management for offices: guests self-register or get pre-invited, hosts approve, QR passes go out by email, and security scans visitors in and out.",
    tags: ["QR gate passes", "Self check-in", "Access control", "MERN stack"],
  },
  {
    name: "Starkidz",
    category: "Kids' Contests Platform",
    description:
      "Online contests and events for school children. I led the contest and event creation modules and built QA screens and admin features as reusable React components.",
    url: "https://thestarkidz.in",
    tags: ["React", "Events & contests", "Admin panel"],
  },
];

export const personalProjects: Project[] = [
  {
    name: "Contact Convoy",
    category: "B2B SaaS · Android app",
    description:
      "Scan business cards at exhibitions, let AI tidy the details, and follow up on every lead. Built for sales teams, with one plan per company and employee handover.",
    url: "https://www.contactconvoy.com",
    tags: ["Flutter", "AI card scanning", "Razorpay", "Cloud Run"],
  },
  {
    name: "LetterHead Studio",
    category: "Document SaaS · MVP",
    description:
      "Set up a letterhead and templates once, then issue numbered, print-accurate letters and PDFs, one at a time or in bulk from Excel. Built for small businesses.",
    tags: ["Next.js 15", "Puppeteer PDF", "Tiptap editor", "Bulk from Excel"],
  },
  {
    name: "VoltGo India",
    category: "EV Charging · Prototype",
    description:
      "Find, book and pay for EV charging in India's Tier-2 cities: a driver app, operator and admin portals, and an OCPP gateway that talks directly to chargers.",
    tags: ["OCPP 1.6J", "React Native", "Turborepo", "Razorpay"],
  },
];

// Client and team projects where I contributed part of the work.
export const clientProjects: Project[] = [
  {
    name: "MeghVin Foundation",
    category: "NGO Website · CMS",
    description:
      "Bilingual English–Gujarati website and content studio for a charitable trust: donations, activity diary and gallery, plus admin tools for posters, receipts and certificates.",
    url: "https://www.meghvinfoundation.in",
    tags: ["Next.js 16", "Poster studio", "PDF receipts", "Three.js"],
  },
  {
    name: "Swadhyay Shala",
    category: "Online Learning · Contributor",
    description:
      "Course and exam platform for Jain studies with paid enrolment, level-wise exams and PDF certificates in three languages. I built the learner web app and exam progress saving.",
    url: "https://www.swadhyayshala.org",
    tags: ["React 19", "Online exams", "Razorpay", "EN · HI · GU"],
  },
  {
    name: "Dhandhar Porvad",
    category: "Community Portal · Contributor",
    description:
      "Community portal and mobile-app backend covering census, matrimony, jobs, events and directories. I shipped PostgreSQL migrations, multi-image uploads and self-hosted file storage.",
    url: "https://www.dhandharporvad.com",
    tags: ["Next.js", "PostgreSQL", "Firebase push", "VPS deploy"],
  },
];

export const earlierBuilds: { name: string; detail: string; period: string; url?: string }[] = [
  { name: "PixieBytez website", detail: "Next.js company site built from Figma designs", period: "", url: "https://www.pixiebytez.com" },
  { name: "Koheva Quiz Game", detail: "React.js quiz game with Firebase", period: "2023" },
  { name: "Space-bet", detail: "Real-time game built with Socket.io", period: "2023" },
  { name: "News blog", detail: "React app built on a news API at InfoLabz", period: "2022" },
];

// Experience, grouped by company. CHEMAZON and Kira Intrilogy are sister companies under one
// parent group, so those two roles run side by side; True || False is his own studio.
export type Company = {
  company: string;
  logo?: string; // file in /public/logos
  url?: string;
  location: string;
  kind: "primary" | "side" | "earlier";
  note?: string;
  roles: { role: string; type: string; period: string; start: number; end?: number; detail: string; stack?: string[] }[];
  stack: string[];
};

export const experience: Company[] = [
  {
    company: "CHEMAZON",
    logo: "/logos/chemazon.svg",
    url: "https://www.chemazon.store",
    location: "Ahmedabad, India",
    kind: "primary",
    note: "Sister company of Kira Intrilogy under the same parent group.",
    roles: [
      {
        role: "Tech Head",
        type: "Full-time, on-site",
        period: "Jul 2026 – Present",
        start: 2026.5,
        detail:
          "Leading technology for a verified B2B chemicals marketplace: KYC-checked sellers, quality documents, quotes, escrow-protected payments and live order updates.",
      },
    ],
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Razorpay", "Claude API", "Tailwind CSS"],
  },
  {
    company: "Kira Intrilogy",
    logo: "/logos/kira-intrilogy.png",
    url: "https://www.kiraintrilogy.com",
    location: "Ahmedabad, India",
    kind: "primary",
    roles: [
      {
        role: "Technical Lead",
        type: "Full-time, on-site",
        period: "Apr 2026 – Present",
        start: 2026.25,
        detail:
          "Architect and technical lead for the company's SaaS and commerce products: OEMup's architecture and its MCP connector for Claude, and the teams shipping TECTET, ALFAconnect, Night Zero and E Gate.",
        stack: ["NestJS", "Next.js", "Redis", "BullMQ", "React Native", "MCP", "Claude API"],
      },
      {
        role: "MERN Stack Developer",
        type: "Full-time, on-site",
        period: "Jun 2023 – Nov 2026",
        start: 2023.42,
        end: 2026.83,
        detail:
          "Built the OEMup ERP: CRM, procurement, multi-level BOM and production, stock, GST accounting and HR. Optimised MongoDB aggregation pipelines, built AG Grid server-side tables for large datasets, Excel bulk import with validation, PDF invoices and role-based permissions.",
        stack: ["React.js", "Node.js", "Express", "MongoDB", "Redux", "Ant Design", "AG Grid"],
      },
      {
        role: "React JS Developer",
        type: "Internship",
        period: "Jan 2023 – May 2023",
        start: 2023,
        end: 2023.37,
        detail: "Front-end work in React, which led to the full-time role.",
        stack: ["React.js", "JavaScript", "Redux", "Ant Design", "HTML", "CSS", "Git"],
      },
    ],
    stack: ["React.js", "Node.js", "Express", "MongoDB", "NestJS", "Next.js", "Redis", "BullMQ", "AG Grid", "React Native", "MCP"],
  },
  {
    company: "True || False",
    logo: "/logos/true-or-false.svg",
    url: "https://trueorfalse.dev/team",
    location: "Remote",
    kind: "side",
    note: "A small software studio with Dev Parikh and Trupal Patel.",
    roles: [
      {
        role: "Founder",
        type: "",
        period: "2026 – Present",
        start: 2026,
        detail:
          "We build mobile apps, desktop apps, SaaS, websites, AI and MCP servers. I lead Contact Convoy, LetterHead Studio, MeghVin Foundation and Nyara Melamine.",
      },
    ],
    stack: ["Flutter", "Next.js", "Puppeteer", "Claude API", "MCP", "Google Cloud"],
  },
  {
    company: "InfoLabz",
    logo: "/logos/infolabz.png",
    location: "Remote",
    kind: "earlier",
    roles: [
      {
        role: "React.js Intern",
        type: "Internship",
        period: "May 2022 – Jun 2022",
        start: 2022.33,
        end: 2022.5,
        detail: "Built a news blog app driven by API calls.",
      },
    ],
    stack: ["React.js", "JavaScript", "HTML", "CSS", "REST APIs", "Axios", "Git"],
  },
];

// Grouped like a system map (row by row, 3 × 3): every layer connects to the back end in the middle.
export const skills: { group: string; link?: string; items: string[] }[] = [
  { group: "Front end", link: "REST · GraphQL", items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Ant Design", "Vite", "shadcn/ui", "TanStack Query", "Three.js"] },
  { group: "Integrations", link: "webhooks", items: ["Razorpay", "WhatsApp Cloud API", "Google Play Billing", "Cloudinary", "Puppeteer"] },
  { group: "Data", link: "queries · queues", items: ["MongoDB", "PostgreSQL", "Prisma", "Redis", "BullMQ", "SQLite"] },
  { group: "Mobile", link: "REST · push", items: ["React Native", "Expo", "Flutter", "Firebase"] },
  { group: "Back end & APIs", items: ["Node.js", "Express", "NestJS", "GraphQL", "Socket.IO", "JWT"] },
  { group: "AI", link: "MCP · tools", items: ["Claude API", "MCP", "Gemini"] },
  { group: "Cloud & DevOps", link: "deploys", items: ["AWS EC2", "Google Cloud", "Docker", "GitHub Actions", "PM2", "Turborepo"] },
  { group: "Testing & tools", link: "CI", items: ["Vitest", "Playwright", "Git", "GitHub", "AG Grid"] },
  { group: "Domains", items: ["ERP", "CRM", "GST e-invoicing", "B2B marketplaces", "Payments", "WhatsApp messaging", "AI connectors (MCP)"] },
];

export const education = {
  degree: "B.E. Computer Engineering",
  university: "Gujarat Technological University",
  url: "https://www.gtu.ac.in",
  logo: "/logos/gtu.png",
  campus: "Aditya Silver Oak Institute of Technology",
  campusLogo: "/logos/silver-oak-emblem.png",
  period: "2019 – 2023",
  grade: "CGPA 7.96",
};

// ------------------------------------------------------------------
// Freelance page — review the wording, especially the FAQ answers.
// ------------------------------------------------------------------

export const freelance = {
  available: true,
  status: "Open to freelance projects",
  pitch:
    "I help businesses replace spreadsheets and patchwork tools with software built around how they actually work: ERPs, CRMs, marketplaces and the SaaS products in between.",
  note: "I take on a small number of projects alongside my full-time work, so each one gets proper attention.",
  services: [
    {
      title: "Custom ERP & CRM",
      body: "Inventory, production planning, billing, GST e-invoicing and payroll, shaped around your team's workflow instead of the other way round.",
      proof: "OEMup",
    },
    {
      title: "E-commerce & B2B marketplaces",
      body: "Online stores, dealer portals, RFQ flows and multi-seller marketplaces with KYC and document checks.",
      proof: "ALFAconnect · CHEMAZON",
    },
    {
      title: "SaaS MVPs",
      body: "Take an idea to a launched product: sign-in, roles, dashboards, billing and the admin tools you need to run it.",
      proof: "TECTET",
    },
    {
      title: "WhatsApp & payment integrations",
      body: "WhatsApp Business messaging, Razorpay checkout, OTP sign-in and QR tickets wired into your existing product.",
      proof: "TECTET · Night Zero",
    },
    {
      title: "Next.js websites",
      body: "Fast, search-friendly marketing sites and landing pages that are easy to update.",
      proof: "Kira Intrilogy website · MeghVin Foundation",
    },
    {
      title: "Take over an existing codebase",
      body: "Fix bugs, clean up and ship new features on React, Next.js, Node.js or MongoDB projects.",
      proof: "MERN stack",
    },
  ],
  process: [
    { step: "Discovery call", body: "We talk through the problem, who will use the software and what success looks like." },
    { step: "Scope & estimate", body: "You get a written scope with milestones, a timeline and a clear estimate." },
    { step: "Build in sprints", body: "Work ships in short cycles with a demo at the end of each, so you see progress every week." },
    { step: "Launch & support", body: "I deploy, hand over documentation and stay available for fixes and the next round of features." },
  ],
  engagements: [
    { name: "Fixed-scope project", body: "A defined set of features, a timeline and a fixed estimate. Best for MVPs and websites." },
    { name: "Monthly retainer", body: "A set number of hours each month for ongoing features, maintenance and support." },
    { name: "Consulting", body: "Architecture reviews, code audits or a second opinion on a technical decision." },
  ],
  faqs: [
    {
      q: "What do you need from me to get started?",
      a: "A short description of the problem, who will use the software, any tools you use today, and your ideal timeline. Rough notes are fine.",
    },
    {
      q: "Can you work on my existing project?",
      a: "Yes, if it's built with React, Next.js, Node.js or MongoDB. I'll start with a short code review so we both know what we're working with.",
    },
    {
      q: "How will we stay in touch?",
      a: "A weekly demo call plus updates on the channel you prefer: WhatsApp, email or Slack.",
    },
  ],
};

export const certifications = [
  { name: "HTML, CSS, and JavaScript for Web Developers", issuer: "Coursera", year: "2022" },
  { name: "JavaScript: Basics to Advanced", issuer: "Udemy", year: "2022" },
  { name: "Introduction to Programming Using Python", issuer: "Microsoft", year: "2022" },
  { name: "Access an EC2 Instance Shell from the AWS Console", issuer: "Coursera", year: "" },
];
