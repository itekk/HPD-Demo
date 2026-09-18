---
applyTo: "**/*.html"
description: Markup conventions for HPD Demo pages.
---

# HTML conventions

Applies to every `.html` file in this repository, in addition to
[`../copilot-instructions.md`](../copilot-instructions.md).

## Formatting

- Two-space indentation, no tabs. Lines wrap at roughly 100 characters.
- Lowercase tag and attribute names; attribute values always double-quoted.
- Void elements are written without a trailing slash: `<meta charset="UTF-8">`.
- Blank line between sibling top-level blocks; no blank line after an opening tag.

## Document structure

- One `<h1>` per page, inside the hero section.
- Heading levels never skip: `<h1>` -> `<h2>` (section titles) -> `<h3>` (card/step titles).
- All page content lives inside `<main id="top">`, except `<header class="site-header">`
  and `<footer class="site-footer">`.

## Section template

Copy this shape for any new page section:

```html
<!-- ============================================================
     Section name
     ============================================================ -->
<section class="section" id="section-name" aria-labelledby="section-name-title">
  <div class="container">
    <header class="section__header">
      <h2 class="section__title" id="section-name-title">Heading</h2>
      <p class="section__subtitle">One supporting sentence.</p>
    </header>

    <!-- content -->
  </div>
</section>
```

- Add `section--muted` when the preceding section does **not** have it, so backgrounds
  alternate down the page.
- Add a matching `<li class="nav__item">` link in the header navigation.

## Reusable blocks

Reuse these before inventing new markup:

| Need                  | Markup                                                                |
| --------------------- | --------------------------------------------------------------------- |
| Grid of feature cards | `.card-grid` > `article.card` > `.card__icon` / `.card__title` / `.card__text` |
| Numbered process      | `ol.steps` > `li.steps__item` > `.steps__number` / `.steps__title` / `.steps__text` |
| Figures               | `dl.stat-grid` > `div.stat` > `dt.stat__label` / `dd.stat__value`      |
| Actions               | `a.button.button--primary` or `a.button.button--ghost`                 |
| Form field            | `.form__field` > `label.form__label` + `input.form__input`             |

## Attributes

- Never use `style=""`, `onclick=""`, or any other inline event attribute.
- Decorative glyphs: `aria-hidden="true"` on the wrapping element.
- Images require meaningful `alt` text, or `alt=""` when purely decorative.
- Form inputs need `id`, `name`, a matching `<label for>`, and an `autocomplete` value
  where a standard one exists.
- Hooks for JavaScript use `id` or a `data-*` attribute, never a styling class.
