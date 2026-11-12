import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per work in src/content/works/. The file name (without .md)
// becomes the entry id and must match the page path, e.g. wakarito.md -> /wakarito/.
const works = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string().min(1),
    tagline: z.string().min(1),
    status: z.enum(['planned', 'in-development', 'released']),
    platforms: z.array(z.string()).min(1),
    // Lower numbers are listed first on the home page.
    order: z.number().int(),
    links: z
      .object({
        // The live website, for works that run in the browser.
        site: z.url().optional(),
        repo: z.url().optional(),
        download: z.url().optional(),
      })
      .optional(),
  }),
});

// Blog-style posts about life. The file name becomes the URL: foo.md -> /life/foo/.
const life = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/life' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
  }),
});

// "YYYY" or "YYYY-MM"; strings of the same shape sort chronologically.
const yearMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Use YYYY or YYYY-MM');

// Education and work history shown as a timeline. No detail pages.
const timeline = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/timeline' }),
  schema: z.object({
    kind: z.enum(['education', 'work']),
    start: yearMonth,
    // Omit for an ongoing entry; shown as "至今".
    end: yearMonth.optional(),
    org: z.string().min(1),
    role: z.string().min(1),
    summary: z.string().min(1).optional(),
  }),
});

export const collections = { works, life, timeline };
