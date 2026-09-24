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

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and deploys it to GitHub Pages. There is no manual build or deploy step.
