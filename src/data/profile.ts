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
  { value: "7", label: "Products shipped at work" },
  { value: "MERN", label: "Plus Next.js, GraphQL and Firebase" },
];

export const workProjects: Project[] = [
  {
    name: "OEMup",
    category: "Manufacturing ERP · SaaS",
    description:
      "Cloud ERP for small and mid-sized Indian factories. It brings CRM, production planning, inventory, GST e-invoicing and payroll into one platform instead of Tally plus spreadsheets.",
    url: "https://oemup.app",
    tags: ["BOM & MRP", "GST e-invoice", "Payroll", "Biometric sync"],
  },
  {
    name: "CHEMAZON",
    category: "B2B Marketplace",
    description:
      "Marketplace for industrial chemicals where every batch carries its COA, TDS and SDS documents and every seller is KYC-verified.",
    url: "https://chemazon.store",
    tags: ["Marketplace", "Seller KYC", "Batch documents"],
  },
  {
    name: "TECTET",
    category: "Customer Messaging",
    description:
      "Shared WhatsApp inbox for teams: assignment, internal notes, template broadcasts with delivery reports, and prepaid message credits.",
    url: "https://tectet.co",
    tags: ["WhatsApp API", "Team inbox", "Broadcasts"],
  },
  {
    name: "ALFAconnect",
    category: "Industrial E-commerce",
    description:
      "Online store for Alfa Pumps' chemical-process pumps, with spare-part search by model, engineer-assisted sizing, bulk RFQs and a dealer portal.",
    url: "https://store.alfapumps.com",
    tags: ["E-commerce", "RFQ", "Dealer portal"],
  },
  {
    name: "Night Zero",
    category: "Event Ticketing",
    description:
      "Pass booking for a Garba night in Ahmedabad: OTP checkout, Razorpay payments, group bookings and QR entry passes sent over WhatsApp and email.",
    url: "https://nightzero.in",
    tags: ["Next.js", "Razorpay", "QR entry"],
  },
  {
    name: "E Gate",
    category: "Company project",
    description: "", // TODO: add a one-line description and URL
    tags: [],
  },
  {
    name: "The StartKidz",
    category: "Company project",
    description: "", // TODO: add a one-line description and URL
    tags: [],
  },
];

export const personalProjects: Project[] = [
  {
    name: "Contact Convoy",
    category: "Personal project",
    description: "", // TODO: add a one-line description and URL
    tags: [],
  },
];

export const earlierBuilds = [
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
      "Leading the team that builds SaaS and commerce products end to end on the MERN stack, including OEMup, TECTET, ALFAconnect and Night Zero.",
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
    items: ["React.js", "Next.js", "Redux", "React Hooks", "JavaScript", "HTML", "SCSS", "Bootstrap"],
  },
  {
    group: "Back end & data",
    items: ["Node.js", "MongoDB", "Express", "GraphQL", "Firebase", "Socket.io"],
  },
  {
    group: "Tools & cloud",
    items: ["Git", "GitHub", "AWS EC2"],
  },
  {
    group: "Domains",
    items: ["ERP", "CRM", "GST e-invoicing", "B2B marketplaces", "Payments", "WhatsApp messaging"],
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
