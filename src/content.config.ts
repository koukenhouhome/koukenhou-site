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
        repo: z.url().optional(),
        download: z.url().optional(),
      })
      .optional(),
  }),
});

export const collections = { works };
