import { useMemo, useState } from "react";

interface StackTag {
  label: string;
  icon?: { path: string; title: string };
  colorClass: string;
}

interface Project {
  slug: string;
  title: string;
  summary: string;
  stack: StackTag[];
  cover: string;
  private: boolean;
  stars: number | null;
  startYear: number;
  endYear: number | null;
}

const STAR_ICON_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

function formatStarCount(count: number): string {
  if (count < 1000) return String(count);
  return `${(count / 1000).toFixed(1)}K`;
}

interface Props {
  projects: Project[];
}

function levenshtein(a: string, b: string): number {
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j];
      dp[j] =
        a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[b.length];
}

function matchesSearch(query: string, haystack: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const words = haystack.toLowerCase().split(/\W+/).filter(Boolean);
  const threshold = Math.max(1, Math.floor(q.length / 3));
  return words.some(
    (word) => word.includes(q) || levenshtein(q, word) <= threshold,
  );
}

export default function ProjectGrid({ projects }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const project of projects) {
      for (const tech of project.stack) {
        set.add(tech.label);
      }
    }
    return Array.from(set).sort();
  }, [projects]);

  const filtered = projects.filter((project) => {
    const matchesTag =
      !active || project.stack.some((tech) => tech.label === active);
    const haystack = `${project.title} ${project.summary} ${project.stack.map((tech) => tech.label).join(" ")}`;
    return matchesTag && matchesSearch(search, haystack);
  });

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 border border-tui-border bg-tui-panel px-3 py-2">
        <span className="text-tui-green">$</span>
        <span className="text-tui-muted">rg</span>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="search projects..."
          className="flex-1 bg-transparent text-tui-text placeholder:text-tui-muted focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 pb-10">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={`border px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
            active === null
              ? "border-tui-gold bg-tui-gold font-bold text-tui-panel"
              : "border-tui-border text-tui-muted hover:bg-tui-gold hover:text-tui-panel"
          }`}
        >
          all
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActive(tag)}
            className={`border px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
              active === tag
                ? "border-tui-gold bg-tui-gold font-bold text-tui-panel"
                : "border-tui-border text-tui-muted hover:bg-tui-gold hover:text-tui-panel"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="border border-tui-border bg-tui-panel px-4 py-6 text-center text-sm text-tui-muted">
          no matches
        </p>
      )}

      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex flex-col border border-tui-border bg-tui-panel transition-colors hover:border-tui-cyan"
          >
            <div className="flex items-center gap-2 border-b border-tui-border bg-tui-border/20 px-4 py-2">
              <span className="text-tui-green">$</span>
              <span
                className={`text-xs font-bold uppercase tracking-[0.25em] ${project.private ? "text-tui-red" : "text-tui-green"}`}
              >
                {project.private ? "private" : "public"}
              </span>
            </div>
            <img
              src={project.cover}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-video w-full border-b border-tui-border object-cover"
            />
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-tui-text transition-colors group-hover:text-tui-cyan">
                  {project.title}
                </h3>
                {project.stars != null && (
                  <span className="flex shrink-0 items-center gap-1 pt-0.5 text-xs font-semibold text-tui-gold">
                    <svg viewBox="0 0 24 24" role="img" aria-label="stars" className="h-3.5 w-3.5 fill-current">
                      <path d={STAR_ICON_PATH} />
                    </svg>
                    {formatStarCount(project.stars)}
                  </span>
                )}
              </div>
              <p className="flex-1 text-sm text-tui-muted">{project.summary}</p>
              <ul className="flex flex-wrap gap-2 pt-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech.label}
                    data-tag={tech.label.toLowerCase()}
                    className={`flex items-center gap-1.5 border border-tui-border px-2 py-0.5 text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${tech.colorClass}`}
                  >
                    {tech.icon && (
                      <svg
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label={tech.icon.title}
                        className="h-3 w-3 shrink-0 fill-current"
                      >
                        <path d={tech.icon.path} />
                      </svg>
                    )}
                    {tech.label}
                  </li>
                ))}
              </ul>
              <p className="pt-1 text-xs text-tui-muted">
                {project.startYear}-{project.endYear ?? "Now"}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
