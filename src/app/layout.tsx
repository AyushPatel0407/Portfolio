import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { education, profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Ayush Patel is a full-stack developer in Ahmedabad building ERP, CRM, marketplace and SaaS products with MERN, Next.js and NestJS. Tech Head at CHEMAZON.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayush Patel — Full-Stack Developer",
    template: "%s · Ayush Patel",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0d" },
  ],
};

// Structured data so search engines and AI assistants know who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: "Full-Stack Developer",
  worksFor: [
    { "@type": "Organization", name: "CHEMAZON", url: "https://www.chemazon.store" },
    { "@type": "Organization", name: "Kira Intrilogy", url: "https://www.kiraintrilogy.com" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  knowsAbout: ["React", "Next.js", "Node.js", "NestJS", "MongoDB", "PostgreSQL", "ERP software", "CRM software"],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // Static data from profile.ts; "<" is escaped so the JSON can't close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <SiteHeader />
          <div id="content" tabIndex={-1} className="outline-none">
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
