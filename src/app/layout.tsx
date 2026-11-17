import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { education, profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// One monospace family for the whole terminal (BRAND.md).
const mono = JetBrains_Mono({ variable: "--font-code", subsets: ["latin"], weight: ["400", "500", "700", "800"] });

const description =
  "Ayush Patel builds ERP, CRM, marketplace and SaaS products with MERN, Next.js and NestJS. Tech Head at CHEMAZON and Technical Lead at Kira Intrilogy.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayush Patel — Full-Stack Developer",
    template: "%s – Ayush Patel",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ayush Patel — Full-Stack Developer",
    description: "ERP, CRM, marketplace and SaaS products for Indian businesses.",
    type: "website",
    siteName: "Ayush Patel",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "light dark",
};

// Structured data so search engines and AI assistants know who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: ["Tech Head", "Technical Lead"],
  worksFor: [
    { "@type": "Organization", name: "CHEMAZON", url: "https://www.chemazon.store" },
    { "@type": "Organization", name: "Kira Intrilogy", url: "https://www.kiraintrilogy.com" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.university, url: education.url },
  knowsAbout: ["React", "Next.js", "Node.js", "NestJS", "MongoDB", "PostgreSQL", "ERP software", "CRM software"],
  memberOf: { "@type": "Organization", name: "True || False", url: "https://trueorfalse.dev" },
  sameAs: [profile.linkedin, profile.github, "https://trueorfalse.dev/team"],
};

const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t!=="light")t="dark";document.documentElement.dataset.theme=t;if(localStorage.getItem("motion")==="off")document.documentElement.dataset.motion="off"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${mono.variable} antialiased`}
      >
        {/* Set the saved theme before first paint so dark mode never flashes light. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // Static data from profile.ts; "<" is escaped so the JSON can't close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="site-shell mx-auto max-w-6xl px-4 sm:px-8 2xl:max-w-7xl">
          <SiteHeader />
          <div id="content" tabIndex={-1} className="scroll-mt-28 outline-none">
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
