# Repository Guidelines

Note for agents: This repository is private. Use branches + PRs (no direct pushes to `main`). See Repository & Access below.

## Repository & Access

- Default branch: `main`. Branch protections are configured (1 approving review, conversation resolution, linear history, no force-push/deletion). If enforcement is unavailable due to plan limits, follow the same rules manually:
  - No direct pushes to `main`
  - At least 1 approving review per PR
  - Resolve all conversations before merge
  - Keep linear history (rebase or squash)
- Remote: `origin` pointing to the private GitHub repo.
- Branch naming: `feat/<short-topic>`, `fix/<issue-id>`, `chore/<task>`.
- Open PRs with clear description, screenshots/GIFs for UI changes, and linked issues.

## Project Structure & Module Organization

- Current layout:
  - `public/index.html` — main page hosting the canvas and panels
  - `src/js/app.js` — app logic and scene setup
  - `src/styles/main.css` — styles for layout, tooltip, legend, filters
  - `public/` — served root (built assets land here via `make build`)
  - `.github/` — CI and repo configs

## Build, Test, and Development Commands

- Build: `make build` (copies from `src/` to `public/`)
- Serve locally: `make serve` (http://localhost:8000)
- Clean: `make clean`
- Optional formatting: `npx prettier --write .`

## Coding Style & Naming Conventions

- JavaScript: 2‑space indent; use `const`/`let`; semicolons required; double quotes for strings to match current snippet; camelCase for variables/functions; PascalCase for classes.
- CSS: `kebab-case` class names (e.g., `controls-panel`, `legend-item`).
- HTML: Prefer semantic tags where possible; ids/classes in `kebab-case`.

## Testing Guidelines

- No formal test harness. Validate manually:
  - Scene renders (axes, grid, lighting) without console errors.
  - Hover tooltip appears; click updates details panel.
  - Concern filters toggle visibility correctly.
  - Window resize maintains correct aspect and layout in Chrome/Firefox.

## Commit & Pull Request Guidelines

- Commits: Use Conventional Commits (e.g., `feat: add filter toggles`, `fix: correct tooltip position`, `chore: format with prettier`).
- Pull Requests:
  - Clear description of changes and rationale.
  - Screenshots or short GIF for UI changes.
  - Steps to reproduce and test locally.
  - Link related issue(s) if applicable.

## Merging Policy
- Squash-only merges. Merge commits and rebase merges are disabled; branches deleted on merge.
- CODEOWNERS in `.github/CODEOWNERS` defines default reviewers. Code owner review is required by branch protection.

## Security & Configuration Tips

- Pin CDN versions (as in the README) and use HTTPS.
- For offline/dev stability, place third‑party files in `vendor/` and reference locally.
- Avoid introducing eval/dynamic script injection; keep data generation deterministic.
