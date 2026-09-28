import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const CACHE_TTL_MS = 60 * 60 * 1000;
const FAILURE_TTL_MS = 5 * 60 * 1000;
const CACHE_FILE = join(process.cwd(), '.astro/github-stars-cache.json');

interface CacheEntry {
  stars: number | null;
  ok: boolean;
  fetchedAt: number;
}

function loadDiskCache(): Record<string, CacheEntry> {
  try {
    return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveDiskCache(cache: Record<string, CacheEntry>) {
  try {
    mkdirSync(dirname(CACHE_FILE), { recursive: true });
    writeFileSync(CACHE_FILE, JSON.stringify(cache));
  } catch {}
}

const memoryCache = new Map<string, number | null>();
let diskCache: Record<string, CacheEntry> | null = null;

export async function fetchGithubStars(repoUrl: string): Promise<number | null> {
  const match = repoUrl.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return null;

  const owner = match[1];
  const repo = match[2].replace(/\.git$/, '');
  const key = `${owner}/${repo}`.toLowerCase();

  if (memoryCache.has(key)) return memoryCache.get(key) ?? null;

  diskCache ??= loadDiskCache();
  const cached = diskCache[key];
  if (cached) {
    const ttl = cached.ok ? CACHE_TTL_MS : FAILURE_TTL_MS;
    if (Date.now() - cached.fetchedAt < ttl) {
      memoryCache.set(key, cached.stars);
      return cached.stars;
    }
  }

  let stars: number | null = null;
  let ok = true;
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (res.ok) {
      const data = await res.json();
      stars = data.private ? null : (data.stargazers_count ?? null);
    } else {
      ok = false;
    }
  } catch {
    ok = false;
  }

  memoryCache.set(key, stars);
  diskCache[key] = { stars, ok, fetchedAt: Date.now() };
  saveDiskCache(diskCache);
  return stars;
}

export function formatStarCount(count: number): string {
  if (count < 1000) return String(count);
  return `${(count / 1000).toFixed(1)}K`;
}
