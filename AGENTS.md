# AGENTS.md

Instructions for AI coding agents working in this repository.

## The rules

All coding standards live in **[`CODING-STANDARDS.md`](CODING-STANDARDS.md)**. Read it
before making any change. The enforceable summary is in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md), with per-file-type
detail in [`.github/instructions/`](.github/instructions/).

## The short version

- Static site: `index.html`, `assets/css/styles.css`, `assets/js/main.js`.
- Plain HTML, CSS, and vanilla JS. **No dependencies, no build step, no frameworks.**
- CSS uses BEM naming and design tokens only - never literal colour or spacing values.
- New colours must be defined for both the light and the dark theme.
- JavaScript: ES modules, `const`/`let`, `===`, JSDoc on every function, one
  `initFeatureName()` per feature registered in `init()`.
- Accessibility: semantic landmarks, `aria-labelledby` on sections, accessible names on
  controls, visible focus, reduced-motion support.
- Conventional Commits (`feat:`, `fix:`, `docs:`, ...).

## Running it

No install and no build, but serve the folder over HTTP - `index.html` loads an ES module,
which browsers refuse to load from `file://`:

```bash
python -m http.server 8000
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the repository
to GitHub Pages. Keep `main` in a working state.
