import type { CollectionEntry } from 'astro:content';
import { fetchGithubStars } from './github-stars';

export type ProjectWithStars = CollectionEntry<'projects'> & { stars: number | null };

export async function sortProjectsByRank(entries: CollectionEntry<'projects'>[]): Promise<ProjectWithStars[]> {
  const withStars: ProjectWithStars[] = await Promise.all(
    entries.map(async (entry) => ({
      ...entry,
      stars: entry.data.displayStars && entry.data.repo ? await fetchGithubStars(entry.data.repo) : null,
    })),
  );

  return withStars.sort((a, b) => {
    const aRank = a.data.rank;
    const bRank = b.data.rank;
    const aHasRank = aRank !== undefined;
    const bHasRank = bRank !== undefined;

    if (aHasRank !== bHasRank) return aHasRank ? -1 : 1;
    if (aHasRank && bHasRank && aRank !== bRank) return aRank - bRank;

    const aStars = a.stars ?? 0;
    const bStars = b.stars ?? 0;
    if (aStars !== bStars) return bStars - aStars;

    return a.data.title.localeCompare(b.data.title);
  });
}
