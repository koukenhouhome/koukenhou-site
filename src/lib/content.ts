import { getCollection, type CollectionEntry } from 'astro:content';

export const statusLabel = {
  planned: '计划中',
  'in-development': '开发中',
  released: '已发布',
} as const;

export const kindLabel = {
  education: '求学',
  work: '工作',
} as const;

/** Works in display order (lower `order` first). */
export async function getWorks(): Promise<CollectionEntry<'works'>[]> {
  return (await getCollection('works')).sort((a, b) => a.data.order - b.data.order);
}

/** Life posts, newest first. */
export async function getLifePosts(): Promise<CollectionEntry<'life'>[]> {
  return (await getCollection('life')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

/** Timeline entries, most recent start first. */
export async function getTimeline(): Promise<CollectionEntry<'timeline'>[]> {
  return (await getCollection('timeline')).sort((a, b) =>
    b.data.start.localeCompare(a.data.start),
  );
}

/** 2026-11-10. Dates from front matter are parsed as UTC midnight. */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** "2024-04" -> "2024.04". */
export function formatYearMonth(value: string): string {
  return value.replace('-', '.');
}

/** Rough reading time for mostly-Chinese text (~400 characters per minute). */
export function readingMinutes(body: string | undefined): number {
  const chars = (body ?? '').replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 400));
}
