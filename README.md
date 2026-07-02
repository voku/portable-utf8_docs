# Portable UTF-8 Documentation Site

Production-ready Vite + React documentation for [`voku/portable-utf8`](https://github.com/voku/portable-utf8), a PHP library for Unicode-safe string handling, cleanup, transliteration, and encoding utilities.

## What this site provides

- A focused landing page that explains why byte-oriented PHP string helpers need UTF-8-safe alternatives.
- Interactive feature showcases for common Unicode pitfalls such as byte length, casing, cleanup, and transliteration.
- A searchable API catalogue for discovering Portable UTF-8 methods and usage examples.
- Copy-ready Composer and PHP bootstrap snippets.
- Static-site deployment through GitHub Pages using a Vite production build.

## Tech stack

- React 19 with TypeScript
- Vite 6
- Tailwind CSS 4 via `@tailwindcss/vite`
- Lucide icons
- GitHub Actions + GitHub Pages deployment

## Requirements

- Node.js 22 or newer is recommended for parity with the deployment workflow.
- npm, using the committed `package-lock.json` for reproducible installs.

## Local development

```bash
npm ci
npm run dev
```

The dev server listens on `http://localhost:3000` and `0.0.0.0` for containerized preview environments.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

The build output is written to `dist/`. `npm run preview` serves the compiled output locally so you can verify routing, assets, favicon, and metadata before deploying.

## GitHub Pages deployment

This repository includes `.github/workflows/deploy.yml`, which:

1. Runs on pushes to `main` and manual `workflow_dispatch` events.
2. Installs dependencies with `npm ci`.
3. Runs the TypeScript check with `npm run lint`.
4. Builds the static site with `GITHUB_PAGES=true npm run build`.
5. Uploads `dist/` and deploys it with GitHub Pages.

The Vite config uses `/portable-utf8_docs/` as the base path when `GITHUB_PAGES=true`, matching this repository name. If the repository is renamed, update the base path in `vite.config.ts`.

## SEO and browser metadata

The HTML shell includes production metadata for:

- Canonical URL
- Search description
- Open Graph preview cards
- Twitter/X summary cards
- Theme color
- SVG favicon

Update the canonical and social image URLs in `index.html` if the deployed Pages URL changes.

## Project structure

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages deployment workflow
├── public/favicon.svg            # Browser favicon
├── src/                          # React application source
├── index.html                    # HTML shell and SEO metadata
├── vite.config.ts                # Vite config and Pages base path
└── package.json                  # npm scripts and dependencies
```

## Key Files Detector helper prompt

Use this prompt when handing the project to an assistant or reviewer that needs to quickly identify the files that matter most:

```text
You are reviewing a Vite + React documentation site for voku/portable-utf8. Detect the key files that control product content, build behavior, deployment, SEO metadata, and styling. Start with README.md, package.json, vite.config.ts, index.html, .github/workflows/deploy.yml, public/favicon.svg, src/App.tsx, src/index.css, and src/components/*.tsx. Summarize each file's purpose, identify any stale generated-template references, and call out changes needed before a production GitHub Pages deployment. Do not inspect node_modules or dist unless debugging a build artifact.
```

## Maintenance checklist

- Keep package dependencies current and rebuild after upgrades.
- Run `npm run lint` before merging content or TypeScript changes.
- Run `npm run build` before deployment changes.
- Verify the deployed GitHub Pages URL after workflow changes.
- Keep README instructions aligned with `package.json` scripts and workflow behavior.
