// Module-level cache so multiple pages rendering the same project in one
// build (home teaser, full grid, detail page) only hit the GitHub API once
// per repo, not once per render call-site.
const starCache = new Map<string, number | null>();

export async function fetchGithubStars(repoUrl: string): Promise<number | null> {
  const match = repoUrl.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return null;

  const owner = match[1];
  const repo = match[2].replace(/\.git$/, '');
  const key = `${owner}/${repo}`.toLowerCase();

  if (starCache.has(key)) return starCache.get(key) ?? null;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) {
      starCache.set(key, null);
      return null;
    }
    const data = await res.json();
    const stars = data.private ? null : (data.stargazers_count ?? null);
    starCache.set(key, stars);
    return stars;
  } catch {
    starCache.set(key, null);
    return null;
  }
}

export function formatStarCount(count: number): string {
  if (count < 1000) return String(count);
  return `${(count / 1000).toFixed(1)}K`;
}
