import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayush Patel — Full-Stack Developer",
    short_name: "Ayush Patel",
    description: "Portfolio, freelance services and blog of Ayush Patel, full-stack developer in Ahmedabad.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0d",
    theme_color: "#0f0f0d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
