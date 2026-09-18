# HPD Demo

A small static website used to demonstrate **GitHub Copilot on GitHub.com**: describe a
change in plain English, Copilot writes the code against the standards documented in this
repository, opens a pull request, and merging it deploys the site automatically.

Everything happens in the browser. No local setup, no IDE, no terminal.

- **Stack:** HTML5, CSS3, vanilla JavaScript (ES modules)
- **Dependencies:** none
- **Build step:** none
- **Deployment:** merging to `main` publishes to GitHub Pages

---

## How a change happens

```
You describe it  ->  Copilot writes it  ->  You review the PR  ->  Merge  ->  It deploys
  (in English)       (following our          (a normal diff)                (automatically)
                      standards)
```

### 1. Give Copilot the task

From anywhere on GitHub, any of these work:

| Entry point | How |
|-------------|-----|
| **Agents page** | Go to [github.com/copilot/agents](https://github.com/copilot/agents), pick this repository, describe the task |
| **An issue** | Open an issue describing the change, then assign it to **Copilot** |
| **A pull request** | Comment `@copilot` on an existing PR to ask for changes |
| **Copilot Chat** | Ask from the Copilot panel on github.com |

Write the request the way you would write it for a colleague:

```
Add a testimonials section with three customer quotes.
```

You do not need to describe the coding style. That is what the instruction files are for.

### 2. Copilot works on a branch

It researches the repository, plans the change, and pushes to its own branch. You can
watch the session log while it works. When it is done it opens a pull request.

### 3. You review the pull request

This is a normal PR with a normal diff. Check that the new code matches the existing code:
BEM class names, `var(--color-...)` tokens instead of hex values, a banner comment, an
`aria-labelledby` on the new section, and a new link in the header navigation.

You can also request a review from **Copilot** in the reviewers list. Copilot code review
reads the same instruction files and comments on violations.

> Copilot cannot approve or merge its own pull request. A human always merges.

### 4. Merge, and it deploys

Merging to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which publishes the site to GitHub Pages. Nothing else to do.

---

## The instruction files

This is the part that makes generated code look like the rest of the codebase. These files
are committed to the repository, so Copilot reads them automatically. Nobody pastes
anything into a chat window.

| File | Read by | When |
|------|---------|------|
| [`.github/copilot-instructions.md`](.github/copilot-instructions.md) | Copilot Chat on github.com, Copilot coding agent, Copilot code review, and IDEs | Every request in this repo |
| [`.github/instructions/*.instructions.md`](.github/instructions/) | Copilot coding agent and Copilot code review | When the file being edited matches the `applyTo` glob |
| [`CODING-STANDARDS.md`](CODING-STANDARDS.md) | Humans | The source of truth the above are written from |
| [`AGENTS.md`](AGENTS.md) | AI agents following the AGENTS.md convention | Every request |

The scoped files use frontmatter to limit where they apply:

```markdown
---
applyTo: "**/*.css"
description: Styling conventions and design tokens for HPD Demo.
---
```

So the CSS rules load when a stylesheet is being edited, and stay out of the way when it
is not.

> **Note:** on github.com, path-specific `*.instructions.md` files are used by the coding
> agent and by code review. Copilot Chat in the browser uses the repository-wide file only.

### What the rules actually say

The rules worth knowing, because you can watch them being followed in any Copilot PR:

- No dependencies. No npm packages, CDN links, web fonts, or CSS frameworks.
- No hard-coded colours. Use the design tokens (`var(--color-primary)`), never `#2563eb`.
- Every new colour must be defined for both the light and the dark theme.
- BEM class names: `.card`, `.card__title`, `.card--large`.
- JSDoc on every JavaScript function.
- Every section needs an `id`, an `aria-labelledby`, and a link in the header nav.
- Conventional Commits (`feat:`, `fix:`, `docs:`).

Full detail in [`CODING-STANDARDS.md`](CODING-STANDARDS.md).

### An honest limitation

Instruction files shape the **default**. They are guidance, not enforcement. If you
explicitly ask Copilot for something the rules forbid, it will usually do it, because your
direct request outranks a file in the repository.

That is the correct behaviour, but it means a rule that must never be broken belongs in a
CI check, not only in markdown.

---

## Repository setup

Two things to enable, once:

**1. GitHub Pages**
Settings → Pages → Build and deployment → Source → **GitHub Actions**.
Without this, the deploy workflow fails.

**2. Copilot coding agent**
Available on all paid Copilot plans. On Business and Enterprise plans an administrator
enables it for the organisation first.

**Good to know:** GitHub Actions workflows do not run automatically on a pull request that
Copilot pushed to — you click **Approve and run workflows** in the merge box. This repo's
deploy workflow only runs on a push to `main`, so a normal merge deploys as usual.

---

## Project structure

```
HPD-Demo/
├── index.html                          # All page markup
├── assets/
│   ├── css/styles.css                  # Tokens, components, sections
│   └── js/main.js                      # Theme toggle, stat counters, contact form
├── .github/
│   ├── copilot-instructions.md         # Repo-wide rules, read automatically
│   ├── instructions/
│   │   ├── html.instructions.md        # applyTo: **/*.html
│   │   ├── css.instructions.md         # applyTo: **/*.css
│   │   └── javascript.instructions.md  # applyTo: **/*.js
│   ├── prompts/                        # Saved prompts (VS Code only)
│   └── workflows/deploy.yml            # Auto-deploy to GitHub Pages
├── .vscode/settings.json               # Editor settings (VS Code only)
├── CODING-STANDARDS.md                 # Source of truth for how code is written here
└── AGENTS.md                           # Same rules, for non-Copilot AI agents
```

`.github/prompts/` and `.vscode/settings.json` only matter if someone opens this repo in
VS Code. The GitHub website ignores them.

---

## The page itself

| Section  | What it demonstrates                                            |
| -------- | --------------------------------------------------------------- |
| Hero     | Headline, supporting copy, primary and ghost buttons             |
| Features | `.card-grid` of six `.card` blocks                               |
| Impact   | `dl.stat-grid` with counters that animate into view              |
| Workflow | `ol.steps` numbered process                                      |
| Contact  | Form with client-side validation and a polite live region        |
| Header   | Sticky nav plus a light/dark theme toggle saved to localStorage  |

---

## Running it locally (optional)

Not needed for the GitHub workflow. If you do want a local preview, **serve it over HTTP**
rather than opening `index.html` from the file system — the page script is an ES module,
and browsers block module scripts loaded from `file://`.

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

---

## Contributing

Read [`CODING-STANDARDS.md`](CODING-STANDARDS.md) first. In short: no dependencies, design
tokens instead of literal values, BEM class names, JSDoc on every function, accessible
markup, Conventional Commit messages.
