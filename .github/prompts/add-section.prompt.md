---
mode: agent
description: Add a new section to the HPD Demo page, following the repository standards.
---

# Add a page section

Add a new section to `index.html` for: ${input:topic:What should the section cover?}

Follow `.github/copilot-instructions.md` and `CODING-STANDARDS.md`. Specifically:

1. Place the section inside `<main>`, in the position that makes narrative sense.
2. Use the standard section shell: banner comment, `<section class="section" id="..."
   aria-labelledby="...-title">`, `.container`, `.section__header` with
   `.section__title` and `.section__subtitle`.
3. Add `section--muted` only if the section directly above it does not have it, so the
   backgrounds keep alternating.
4. Reuse an existing block for the content (`.card-grid`, `ol.steps`, `dl.stat-grid`) if
   one fits. Only write new CSS if none does.
5. Add a matching link to the header `nav__list`.
6. Any new CSS goes in `assets/css/styles.css` section 4 or 5, uses BEM naming, and uses
   design tokens only - no literal colours, spacings, or radii.
7. Any new behaviour goes in `assets/js/main.js` as an `initFeatureName()` function with
   JSDoc, registered in `init()`.

Then confirm the definition-of-done checklist at the end of
`.github/copilot-instructions.md`.
