import { allProjects } from "@/data/caseStudies";
import { freelance, profile } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// A plain-text guide to this site for AI assistants (https://llmstxt.org).
export function GET() {
  const projects = allProjects()
    .map((p) => `- [${p.name}](${siteUrl}/work/${p.slug}): ${p.description}`)
    .join("\n");
  const posts = getAllPosts()
    .map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.summary}`)
    .join("\n");

  const body = `# ${profile.name}

> ${profile.role}. ${profile.headline} Based in ${profile.location}.

${profile.intro}

## Pages

- [Home](${siteUrl}/): projects, experience, skills and education
- [Freelance](${siteUrl}/freelance): ${freelance.pitch}
- [Blog](${siteUrl}/blog): notes on building business software, the MERN stack and Next.js

## Projects

${projects}

## Writing

${posts}

## Contact

- Email: ${profile.email}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
