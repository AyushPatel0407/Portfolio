# Ayush Patel — Portfolio

Personal portfolio, freelance page and blog, built with Next.js 15 and Tailwind CSS 4. Design rules are in [`BRAND.md`](BRAND.md).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

Almost everything on the site lives in [`src/data/profile.ts`](src/data/profile.ts):

- `profile`: name, role, intro, LinkedIn, and optional `email` / `github` links
- `workProjects`: the large project cards on the home page; `clientProjects` / `personalProjects`: the compact project rows; `earlierBuilds`: the one-line list under them
- `experience`: companies and their roles. The home page shows every role as a commit in a git log (oldest first, the side studio last); `kind` is `primary`, `side` or `earlier`
- `skills`: groups shown as a package.json
- `education`, `certifications`
- Logos live in `public/logos`; product logos are mapped in `src/components/ProjectCard.tsx`, tech icons in `src/components/TechIcon.tsx`
- `freelance`: availability badge, services, process, ways to work and FAQ. Set `available: false` to show "Not taking new projects right now" on the freelance page.

## Write a blog post

Add a Markdown file to `content/blog/`. The file name becomes the URL, so `content/blog/my-first-erp.md` is served at `/blog/my-first-erp`.

```md
---
title: "My post title"
date: 2026-12-01
summary: "One or two sentences shown on the blog list."
tags: ["Next.js", "ERP"]
draft: false
---

Write the post here in Markdown.
```

Set `draft: true` to keep a post off the site while you work on it.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Portfolio home: particle name, arched portrait, work, career as a git log, skills as package.json |
| `/freelance` | Freelance services and project brief form |
| `/blog` | Blog index |
| `/blog/[slug]` | A single post |
| `/work/[slug]` | Case study for each project (content in `src/data/caseStudies.ts`) |
| `/llms.txt` | Plain-text guide to the site for AI assistants |

## Deploy

The site is fully static, so it works on Vercel, Netlify or any Node host. On Vercel: import the GitHub repository and deploy with the default settings.

## Theme, motion and accessibility

- Light and dark themes: tokens in `src/app/globals.css` (`:root` and `:root[data-theme="dark"]`). The header sun/moon button switches the dark terminal (default) and the light terminal; the choice is saved in `localStorage` and applied before first paint.
- Footer "Pause animations" stops every looping animation (WCAG 2.2.2); `prefers-reduced-motion` is respected too.
- The header avatar (`src/components/HeaderIdentity.tsx`) says one line per section as you scroll and shows the name on hover; edit `LINES` to change what it says.

## Deploy settings

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain`) on any host other than Vercel, otherwise canonical URLs, the sitemap and `llms.txt` point at localhost.
