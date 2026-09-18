# Coding standards - HPD Demo

This is the source of truth for how code is written in this repository. It is written for
humans **and** for AI assistants.

The machine-facing copies are wired up so tools pick them up automatically:

| File                                       | Read by                                              |
| ------------------------------------------ | ---------------------------------------------------- |
| `.github/copilot-instructions.md`          | GitHub Copilot Chat, Copilot code review, Copilot coding agent |
| `.github/instructions/*.instructions.md`   | Copilot, scoped per file type via `applyTo`          |
| `AGENTS.md`                                | Other AI coding agents that follow the AGENTS.md convention |
| `.editorconfig`                            | The editor itself                                    |

**If you change this file, update `.github/copilot-instructions.md` to match.**

---

## 1. Principles

1. **Plain platform code.** HTML, CSS, and JavaScript as the browser ships them. A reader
   should be able to open any file and understand it without knowing a framework.
2. **No dependencies.** No npm packages, no CDN links, no web fonts, no icon libraries, no
   build step. This keeps the deploy pipeline to a single copy operation and keeps diffs
   readable in a pull request.
3. **Tokens over literals.** Colour, spacing, and type come from CSS custom properties, so
   a rebrand is one edit in one place.
4. **Accessible by construction.** Semantic markup, labelled controls, visible focus, and
   reduced-motion support are part of "done", not a follow-up ticket.
5. **Consistency beats cleverness.** Match the surrounding code. A new section should be
   indistinguishable in style from the ones already there.

## 2. Repository layout

```
HPD-Demo/
├── index.html                  # All page markup
├── assets/
│   ├── css/styles.css          # All styles, organised in 6 numbered sections
│   └── js/main.js              # All behaviour, one init function per feature
├── .github/
│   ├── copilot-instructions.md # Repository-wide AI instructions
│   ├── instructions/           # Per-file-type AI instructions (applyTo globs)
│   ├── prompts/                # Reusable prompt files for common tasks
│   └── workflows/deploy.yml    # Auto-deploy to GitHub Pages on push to main
├── CODING-STANDARDS.md         # This file
├── AGENTS.md                   # Pointer for non-Copilot AI agents
└── README.md                   # What the project is and how to run it
```

Markup goes in `index.html`, styles in `styles.css`, behaviour in `main.js`. Do not
introduce inline `style` attributes, `<style>` blocks, or inline `<script>` tags.

## 3. HTML

### Formatting

- Two-space indentation, lowercase tags and attributes, double-quoted values.
- Lines wrap around 100 characters.
- A blank line between top-level sibling blocks.

### Structure

- One `<h1>`, in the hero. Heading levels never skip.
- `<header class="site-header">`, `<main id="top">`, `<footer class="site-footer">`.
- Every `<section>` carries an `id` and `aria-labelledby` referencing its heading's `id`.
- Top-level blocks are introduced by a banner comment:

  ```html
  <!-- ============================================================
       Section name
       ============================================================ -->
  ```

### Adding a section

Use the standard shell, alternate `section--muted` against the section above it, and add a
matching link to the header navigation:

```html
<section class="section section--muted" id="pricing" aria-labelledby="pricing-title">
  <div class="container">
    <header class="section__header">
      <h2 class="section__title" id="pricing-title">Pricing</h2>
      <p class="section__subtitle">One supporting sentence.</p>
    </header>

    <div class="card-grid">
      <!-- cards -->
    </div>
  </div>
</section>
```

### Reusable blocks

Reach for an existing block before writing new markup: `.card-grid` / `.card`, `ol.steps`,
`dl.stat-grid` / `.stat`, `.button--primary` / `.button--ghost`, `.form__field`.

## 4. CSS

### Design tokens

Section 1 of `assets/css/styles.css` holds every colour, space, size, radius, shadow, and
transition. Rules reference tokens; they never contain literal colour values.

A new token must be declared **twice**: in `:root` for the light theme and in
`[data-theme="dark"]` for the dark theme.

### Naming

BEM: `.block`, `.block__element`, `.block--modifier`. No `#id` selectors for styling, no
element selectors for components, no `!important` (except the existing reduced-motion
block).

### File order

1. Design tokens
2. Reset and base
3. Layout
4. Components
5. Sections
6. Responsive overrides

New reusable component goes in section 4 under a banner comment; new page-section styling
goes in section 5; media queries go in section 6.

### Declaration order

Layout -> box model -> visual -> typography -> interaction.

### Layout

Grid and Flexbox with `gap`. Logical properties (`padding-inline`, `padding-block`). Fluid
grids via `repeat(auto-fit, minmax(<min>, 1fr))`. `rem` units, `px` only for hairlines.

## 5. JavaScript

- ES modules, `const`/`let`, `===`, semicolons, single quotes, two-space indent.
- One `initFeatureName()` per feature, under a banner comment, registered in `init()`.
- JSDoc on every function: summary, `@param`, `@returns`.
- Guard every DOM lookup with an early return.
- `textContent` over `innerHTML`. `addEventListener` over inline handlers.
- `try`/`catch` around storage access.
- Module-level `SCREAMING_SNAKE_CASE` constants instead of magic numbers.
- No `console.log`, `alert`, `eval`, globals, or `TODO` comments in committed code.

## 6. Accessibility

- Every control has an accessible name.
- Toggles expose `aria-pressed`; status messages use `role="status"` with
  `aria-live="polite"`.
- Decorative glyphs get `aria-hidden="true"`.
- The `:focus-visible` outline stays; do not set `outline: none`.
- Text contrast is at least 4.5:1 in both themes.
- All motion is neutralised under `prefers-reduced-motion: reduce`.

## 7. Git

- Conventional Commits: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.
  Imperative, lower case, no trailing period.
- One logical change per commit.
- `main` is always deployable - every push to it goes straight to the live site.
- Branch names: `feat/short-description`, `fix/short-description`.

## 8. Definition of done

- [ ] Opens in a browser with no console errors.
- [ ] Layout holds at 375 px, 768 px, and 1440 px.
- [ ] Light and dark themes both correct.
- [ ] Keyboard reaches every control, focus visible.
- [ ] No new dependency, no inline styles or scripts, no hard-coded colours.
- [ ] `README.md` updated if behaviour or structure changed.
