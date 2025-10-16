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
- PRs must pass CI before merge (required status check: `build`).
- Squash-only merges are enabled; branches are deleted on merge.
- Code owner review is required per `.github/CODEOWNERS`.

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
