---
applyTo: "**/*.css"
description: Styling conventions and design tokens for HPD Demo.
---

# CSS conventions

Applies to every `.css` file in this repository, in addition to
[`../copilot-instructions.md`](../copilot-instructions.md).

## Tokens are mandatory

`assets/css/styles.css` section 1 defines every colour, space, size, radius, shadow, and
transition as a custom property. **Rules must reference tokens, never literal values.**

```css
/* Correct */
.promo__badge {
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-pill);
  background-color: var(--color-surface);
  color: var(--color-primary);
}

/* Wrong - literal colour, literal spacing, literal radius */
.promo__badge {
  padding: 8px 16px;
  border-radius: 999px;
  background-color: #f5f7fa;
  color: #2563eb;
}
```

Available token families:

| Family      | Tokens                                                                       |
| ----------- | ---------------------------------------------------------------------------- |
| Colour      | `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-primary-hover`, `--color-primary-contrast`, `--color-accent`, `--color-success`, `--color-danger` |
| Spacing     | `--space-2xs` `--space-xs` `--space-sm` `--space-md` `--space-lg` `--space-xl` `--space-2xl` `--space-3xl` |
| Typography  | `--font-sans`, `--font-size-sm` ... `--font-size-3xl`, `--line-height-tight`, `--line-height-base` |
| Shape       | `--radius-sm` `--radius-md` `--radius-lg` `--radius-pill`                      |
| Depth       | `--shadow-sm` `--shadow-md` `--shadow-lg`                                     |
| Motion      | `--transition-fast` `--transition-base`                                       |
| Layout      | `--container-width`, `--container-width-narrow`                               |

Adding a new token means adding it in **two** places: `:root` (light) and
`[data-theme="dark"]` (dark). A token defined in only one place is a bug.

## Naming - BEM

- `.block`, `.block__element`, `.block--modifier`. Lowercase and hyphenated.
- One block per component, and the block name matches the component's banner comment.
- No `#id` selectors, no element selectors for components, no `>` chains deeper than one
  level, no `!important` (the `prefers-reduced-motion` block is the single exception).
- State that JavaScript toggles is expressed as a modifier class
  (`form__status--success`) or an ARIA attribute selector (`[aria-invalid="true"]`).

## File organisation

Keep the numbered sections in `assets/css/styles.css` in order:

1. Design tokens
2. Reset and base
3. Layout
4. Components
5. Sections
6. Responsive overrides

New reusable component -> section 4. New page-specific block -> section 5. Both get a
banner comment:

```css
/* Component name ------------------------------------------- */
```

## Declaration order inside a rule

1. Layout: `display`, `position`, `inset`, `z-index`, `grid-*`, `flex-*`, `gap`
2. Box model: `width`, `height`, `padding`, `margin`, `border`
3. Visual: `background`, `color`, `box-shadow`, `opacity`
4. Typography: `font-*`, `line-height`, `letter-spacing`, `text-*`
5. Interaction: `cursor`, `transition`, `transform`

## Layout preferences

- Grid or Flexbox with `gap`; do not use floats or margin hacks for layout.
- Logical properties: `padding-inline`, `padding-block`, `margin-inline`.
- Fluid grids with `repeat(auto-fit, minmax(<min>, 1fr))` rather than fixed columns.
- `rem` for sizes and typography, `px` only for hairline borders.
- Media queries live in section 6 and use `max-width` in `rem`.

## Motion

- Transitions use `--transition-fast` or `--transition-base`; do not invent durations.
- Animate only `transform`, `opacity`, `color`, `background-color`, `border-color`, and
  `box-shadow`.
- Any new motion must be neutralised by the existing `prefers-reduced-motion` block, or
  guarded by its own query.
