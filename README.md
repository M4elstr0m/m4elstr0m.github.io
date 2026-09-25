# m4elstr0m.github.io

Personal portfolio site.

## Requirements

- Node.js 22.12 or later
- [just](https://github.com/casey/just)

## Development

Install dependencies:

```sh
npm install
```

Start the dev server in the background:

```sh
just dev-start
```

The site is served at `http://localhost:4321`. Logs are written to `.dev.log`.

Stop the dev server:

```sh
just dev-stop
```

## Content

All content lives under `data/`, outside `src/`:

- `data/pages/*.md` — prose for the About and Contact sections. Frontmatter holds structured fields (About's interests/stack/skills lists, Contact's heading/GitHub link), the markdown body holds the prose. `stack`/`skills` entries are matched against `simple-icons` by name at render time; an unmatched name just renders without an icon.
- `data/projects/<slug>/index.md` — one folder per project, with its cover image, gallery images, and any audio/video files colocated in the same folder. Reference them from frontmatter as relative paths (e.g. `cover: ./cover.svg`). Non-image files (audio, self-hosted video) are copied into the build automatically by `scripts/sync-project-media.ts`; images are picked up and optimized directly by Astro's content pipeline.

Adding a new project means adding a new folder under `data/projects/`, nothing else needs to change.

## Theming

Color palette and font live in `src/styles/themes/`, one file per theme, each defining the same set of `--color-tui-*` tokens and `--font-mono` via a Tailwind `@theme` block. The current theme is `terminal-user-interface.css`. `src/styles/global.css` imports exactly one of them, that import is the active theme. To switch themes, add a new file under `src/styles/themes/` with the same token names and point the import in `global.css` at it, then rebuild. There is no runtime theme switcher and none is planned, this is a dev-time choice only.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and deploys it to GitHub Pages. There is no manual build or deploy step.
