# Ayush Patel — Portfolio

Personal portfolio, freelance page and blog, built with Next.js 15, Tailwind CSS 4 and Three.js.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

Almost everything on the site lives in [`src/data/profile.ts`](src/data/profile.ts):

- `profile`: name, role, intro, LinkedIn, and optional `email` / `github` links
- `workProjects` / `personalProjects`: project cards (leave `description` empty to show "Write-up coming soon")
- `experience`, `skills`, `education`, `certifications`
- `freelance`: availability badge, services, process, ways to work and FAQ. Set `available: false` to hide the "Open to freelance" badge.

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
| `/` | Portfolio home with the Three.js hero |
| `/freelance` | Freelance services and project brief form |
| `/blog` | Blog index |
| `/blog/[slug]` | A single post |
| `/work/[slug]` | Case study for each project (content in `src/data/caseStudies.ts`) |

## Deploy

The site is fully static, so it works on Vercel, Netlify or any Node host. On Vercel: import the GitHub repository and deploy with the default settings.
