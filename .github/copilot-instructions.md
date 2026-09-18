# Copilot instructions - HPD Demo

These instructions are loaded automatically for every Copilot Chat request, code review,
and coding-agent task in this repository. Follow them for **all** changes, even small ones.

The full rationale lives in [`CODING-STANDARDS.md`](../CODING-STANDARDS.md). The rules below
are the enforceable summary.

## Project overview

HPD Demo is a **static marketing-style page** used to demonstrate AI-assisted development.

- Stack: plain HTML5, CSS3, and vanilla JavaScript (ES modules). **No frameworks.**
- No build step, no bundler, no package manager, no transpiler.
- Files: `index.html`, `assets/css/styles.css`, `assets/js/main.js`.
- Deployment: pushing to `main` publishes the site to GitHub Pages via
  `.github/workflows/deploy.yml`. Anything committed goes live, so keep `main` working.

## Hard rules - never break these

1. **No dependencies.** Do not add npm packages, CDN `<script>`/`<link>` tags, web fonts,
   icon libraries, CSS frameworks, or build tooling. If a task seems to need one, solve it
   with plain HTML/CSS/JS instead.
2. **No hard-coded colours, spacing, radii, or font sizes in CSS rules.** Use the existing
   custom properties (`var(--color-primary)`, `var(--space-lg)`, ...). If a genuinely new
   value is required, add a token in the `:root` block *and* its dark-theme counterpart in
   the `[data-theme="dark"]` block, then use the token.
3. **Both themes must work.** Any new colour must be defined for light *and* dark themes.
4. **Keep the three-file structure.** Markup in `index.html`, styles in
   `assets/css/styles.css`, behaviour in `assets/js/main.js`. No inline `style=""`
   attributes, no `<style>` blocks, no inline `<script>`, no `onclick=""` handlers.
5. **Accessibility is not optional.** See the accessibility section below.

## HTML

- Two-space indentation. Lowercase tags and attributes. Double-quoted attribute values.
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>`, `<h1>`-`<h3>`, `<ol>`/`<ul>`, `<dl>`.
- Every `<section>` gets an `id` and `aria-labelledby` pointing at its own heading `id`.
- Start each top-level block with the existing banner comment style:

  ```html
  <!-- ============================================================
       Section name
       ============================================================ -->
  ```

- New page sections follow the established shape:

  ```html
  <section class="section" id="example" aria-labelledby="example-title">
    <div class="container">
      <header class="section__header">
        <h2 class="section__title" id="example-title">Heading</h2>
        <p class="section__subtitle">One supporting sentence.</p>
      </header>
      <!-- content -->
    </div>
  </section>
  ```

- Alternate `section--muted` on consecutive sections so the page keeps its striped rhythm.
- When a new section is added, add a matching link to the header `nav__list`.
- Use HTML entities for symbols (`&rarr;`, `&mdash;`), not raw Unicode characters.

## CSS

- **BEM naming**: `.block`, `.block__element`, `.block--modifier`. Lowercase, hyphenated.
  Never use `#id` selectors for styling, and never nest deeper than one level of specificity.
- Property order inside a rule: layout (`display`, `position`, `grid`, `flex`) -> box model
  (`width`, `padding`, `margin`, `border`) -> visual (`background`, `color`, `box-shadow`)
  -> typography (`font`, `line-height`, `letter-spacing`) -> `transition`.
- Keep the file's numbered section order: 1. Tokens, 2. Reset, 3. Layout, 4. Components,
  5. Sections, 6. Responsive. Add new component rules to section 4 with a banner comment;
  add new page-section rules to section 5.
- Prefer CSS Grid/Flexbox with `gap`. Prefer logical properties (`padding-inline`,
  `padding-block`, `margin-inline`).
- No `!important` outside the existing `prefers-reduced-motion` block.
- Responsive tweaks go in section 6, not scattered through the file.
- Any animation or transition must be disabled under `prefers-reduced-motion: reduce`.

## JavaScript

- ES modules, `const`/`let` only (never `var`), strict equality (`===`/`!==`), semicolons,
  single quotes, two-space indentation.
- One named function per feature, plus a `/** JSDoc */` block on **every** function with
  `@param` and `@returns`.
- New features follow the existing pattern: write an `initFeatureName()` function, put it
  under its own banner comment, and call it from `init()` at the bottom of the file.
- Always guard DOM lookups: `if (!element) { return; }` before using a queried node.
- Use `document.querySelector`/`querySelectorAll` and `addEventListener`. No `innerHTML`
  with interpolated values - use `textContent` or `document.createElement`.
- Wrap `localStorage` access in `try`/`catch`.
- No `console.log`, no `alert`, no `TODO` comments in committed code.

## Accessibility

- Every interactive control has an accessible name (visible text, `aria-label`, or
  `<label for>`).
- Toggle buttons expose state with `aria-pressed`; live regions use `role="status"` and
  `aria-live="polite"`.
- Decorative icons and glyphs carry `aria-hidden="true"`.
- Do not remove focus styles; the `:focus-visible` rule stays.
- Maintain at least 4.5:1 text contrast in both themes.

## Commits and pull requests

- Conventional Commits: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.
  Imperative mood, lower case, no trailing period. Example:
  `feat: add testimonials section below stats`.
- One logical change per commit. Update `README.md` when behaviour or structure changes.
- PR descriptions state what changed, why, and how it was checked in the browser.

## Definition of done for any change

Before reporting a task complete, confirm:

- [ ] The page opens in a browser with no console errors.
- [ ] Layout holds at 375 px, 768 px, and 1440 px wide.
- [ ] Light **and** dark themes both look correct.
- [ ] Keyboard tab order reaches every new control and focus is visible.
- [ ] No new dependency, no inline styles or scripts, no hard-coded colour values.
