import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ayush Patel, full-stack developer building ERP, CRM and commerce software";

export default function Image() {
  return ogCard({
    eyebrow: "Portfolio",
    title: "Ayush Patel",
    subtitle: "I build ERP, CRM, marketplace and SaaS products for Indian businesses.",
  });
}
