import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Hire Ayush Patel for ERP, CRM, marketplace and SaaS projects";

export default function Image() {
  return ogCard({
    eyebrow: "Open to freelance projects",
    title: "Let's build your next product.",
    subtitle: "Custom ERP and CRM, marketplaces, SaaS MVPs, WhatsApp and payment integrations.",
  });
}
