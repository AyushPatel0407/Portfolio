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
  role: "Tech Head at CHEMAZON · Team Lead at Kira Intrilogy",
  headline: "I build ERP, CRM and commerce software for Indian businesses.",
  intro:
    "Full-stack MERN and Next.js developer from Ahmedabad. I'm Team Lead at Kira Intrilogy, where we've shipped production products since 2023, from a manufacturing ERP to a WhatsApp team inbox. I also lead technology at CHEMAZON.",
  location: "Ahmedabad, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/ayush-patel-691270187/",
  // TODO: add a public email or GitHub link if you want them on the site.
  email: "",
  github: "",
};

export const stats = [
  { value: "3+ yrs", label: "Building production software" },
  { value: "8", label: "Products shipped at work" },
  { value: "MERN", label: "Plus Next.js, NestJS and PostgreSQL" },
];

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
    category: "School Management",
    description:
      "School management platform. I led the contest and event creation modules and built QA screens and admin panel features as reusable React components.",
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
    // TODO: add url: "https://www.meghvinfoundation.org" once the domain is live
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

export const earlierBuilds = [
  { name: "Pixibytez website", detail: "Next.js company site built from Figma designs", period: "" },
  { name: "Koheva Quiz Game", detail: "React.js quiz game with Firebase", period: "2023" },
  { name: "Space-bet", detail: "Real-time game built with Socket.io", period: "2023" },
  { name: "News blog", detail: "React app built on a news API at InfoLabz", period: "2022" },
];

export const experience = [
  {
    role: "Tech Head",
    company: "CHEMAZON",
    type: "Full-time · On-site",
    period: "Jul 2026 – Present",
    detail: "Leading technology for a verified B2B chemicals marketplace.",
  },
  {
    role: "Team Lead",
    company: "Kira Intrilogy",
    type: "Full-time · On-site",
    period: "Jun 2023 – Present",
    detail:
      "Architected and lead the OEMup ERP: CRM, procurement, accounting, stock, production and HR modules. Optimised MongoDB aggregation pipelines, built Ag-Grid server-side tables for large datasets, Excel bulk import with validation, PDF invoices and role-based permissions. Lead the team shipping TECTET, ALFAconnect and Night Zero.",
  },
  {
    role: "React JS Developer",
    company: "Kira Intrilogy",
    type: "Internship",
    period: "Jan 2023 – May 2023",
    detail: "Front-end work in React, which led to the full-time role.",
  },
  {
    role: "React.js Intern",
    company: "InfoLabz",
    type: "Internship · Remote",
    period: "May 2022 – Jun 2022",
    detail: "Built a news blog app driven by API calls.",
  },
];

export const skills = [
  {
    group: "Front end",
    items: ["React.js", "Next.js", "TypeScript", "React Native", "Redux", "JavaScript", "Tailwind CSS", "Ant Design", "Ag-Grid"],
  },
  {
    group: "Back end & data",
    items: ["Node.js", "Express", "NestJS", "MongoDB", "PostgreSQL", "Prisma", "Redis", "BullMQ", "GraphQL", "Firebase", "Socket.io"],
  },
  {
    group: "Tools & cloud",
    items: ["Git", "GitHub", "AWS EC2"],
  },
  {
    group: "Domains",
    items: ["ERP", "CRM", "GST e-invoicing", "B2B marketplaces", "Payments", "WhatsApp messaging", "AI connectors (MCP)"],
  },
];

export const education = {
  degree: "B.E. Computer Engineering",
  school: "Aditya Silver Oak Institute of Technology",
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
      proof: "Night Zero",
    },
    {
      title: "Take over an existing codebase",
      body: "Fix bugs, clean up and ship new features on React, Next.js, Node.js or MongoDB projects that need a steady hand.",
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
