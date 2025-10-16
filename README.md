# 3D Multi-Level System Framework Visualization

An interactive 3D visualization of Scope/Scale, Time, and Concern/Viewpoint using Three.js and OrbitControls.

## Quick Start

- Build + serve:
  - `make serve` (serves `public/` at http://localhost:8000)
- Manual build:
  - `make build` (copies from `src/` to `public/`)
  - Serve: `python3 -m http.server 8000 --directory public`

Project structure:

- `src/` — app source (JS/CSS)
- `public/` — served root (`index.html`, built assets)
- `.github/` — CI and repo configs

## Contributing & CI

- PRs must pass CI before merge (required status check: `build`). The `build` job runs:
  - ESLint (`npx eslint src/js --max-warnings=0`)
  - Prettier check (`npx prettier --check .`)
  - Build/verify static assets
- Squash-only merges are enabled; branches are deleted on merge.
- Code owner review is required per `.github/CODEOWNERS`.

## Linting & Formatting

- Lint: `make lint` (ESLint, zero warnings)
- Format: `make format` (Prettier write)
- Format check: `make format-check`
- Configs: `.eslintrc.json`, `.eslintignore`, `.prettierrc.json`, `.prettierignore`, `.editorconfig`

## Deployment

- GitHub Pages (simple): Settings → Pages → Deploy from Branch → select `main` and `/ (root)` or `docs/` pattern. For this repo, serve the `public/` directory by either:
  - Using Actions to deploy `public/` to `gh-pages` branch, or
  - Moving built files into `docs/` and selecting `main/docs`.
- Netlify: drag‑and‑drop `public/` or connect repo (build command `make build`, publish directory `public`)
- Vercel: import repo, set output directory to `public`, framework preset None
- Any static host: serve `public/` as the web root

## Security & Performance Tips

- Pin library versions (Three.js, OrbitControls) and prefer local `public/vendor/` for deterministic builds.
- Use cache headers for static assets; fingerprint filenames if you later add bundling.
- Avoid `eval`/dynamic code injection; sanitize any future user inputs.

## 3D Visualization Features

This app provides:

1. Three Core Axes
   - Scope/Scale (vertical): Nano → Micro → Meso → Macro → Supra → Meta
   - Time (horizontal): µs → ms → s → min → h → d → wk → mo → q → yr
   - Concern/Viewpoint (depth): Function → Data → Control → Security → Cost → UX
2. Interactive 3D Space
   - Rotate, pan, zoom; click for details; hover tooltip
3. Visual Connections
   - Lines between nearby points within the same scope; color‑coded by scope
4. Filtering
   - Toggle point visibility by concern type
5. Details Panel
   - Shows description, example, and considerations for selected point

## Benefits of the 3D Approach

1. Comprehensive Representation across multiple dimensions
2. Intuitive Navigation with natural 3D interactions
3. Visual Clarity via color and spatial grouping
4. Focused Analysis with concern filters
5. Holistic Understanding of interactions across scales and time

## Usage Instructions

1. Navigate: left‑drag rotate, right‑drag pan, scroll to zoom
2. Explore: click spheres to update the details panel
3. Filter: toggle concern checkboxes
4. Resize: window resize maintains aspect and layout
