---
applyTo: "**/*.js"
description: JavaScript conventions for HPD Demo.
---

# JavaScript conventions

Applies to every `.js` file in this repository, in addition to
[`../copilot-instructions.md`](../copilot-instructions.md).

## Language level

- Modern browser ES modules. No transpiler, no polyfills, no bundler.
- `const` by default, `let` when reassigned, **never `var`**.
- Strict equality `===` / `!==` only.
- Semicolons required. Single quotes for strings. Two-space indentation.
- Arrow functions for callbacks; named `function` declarations for features.

## Feature pattern

Every feature is one `initFeatureName()` function under its own banner comment, called
from `init()` at the bottom of the file:

```js
/* ============================================================
   Feature name
   ============================================================ */

/**
 * One-line summary of what this sets up.
 *
 * @returns {void}
 */
function initFeatureName() {
  const element = document.querySelector('#featureRoot');

  if (!element) {
    return;
  }

  element.addEventListener('click', () => {
    // ...
  });
}
```

Then register it:

```js
function init() {
  initThemeToggle();
  initStatCounters();
  initContactForm();
  initFeatureName();
}
```

## Documentation

Every function - including nested helpers - carries a JSDoc block with a summary,
`@param {Type} name - description` for each parameter, and `@returns {Type} description`.

## DOM access

- Query with `document.querySelector` / `querySelectorAll`.
- **Always guard**: check the node exists and return early before using it.
- Bind events with `addEventListener`; never assign `onclick` or use inline handlers.
- Write text with `textContent`. Build nodes with `document.createElement`. Never assign
  `innerHTML` from a variable.
- Read and write `data-*` attributes through the `dataset` API.
- Toggle presentation via classes or ARIA attributes, not `element.style`.

## Robustness

- Wrap `localStorage` / `sessionStorage` access in `try`/`catch` - it throws in private
  browsing.
- Coerce and validate input from the DOM (`Number(...)`, `Number.isNaN(...)`, `.trim()`).
- Respect `prefers-reduced-motion` before starting any animation.
- Prefer `IntersectionObserver` over scroll listeners, and
  `window.requestAnimationFrame` over `setInterval` for animation.

## Constants

Module-level constants go at the top of the file in `SCREAMING_SNAKE_CASE`
(`const THEME_STORAGE_KEY = 'hpd-demo-theme';`). No magic numbers inside functions.

## Not allowed

- `console.log`, `alert`, `confirm`, `prompt`, or `debugger` in committed code.
- `eval`, `document.write`, or `setTimeout` with a string argument.
- `TODO` / `FIXME` comments - finish the work or leave it out.
- Global variables; everything stays module-scoped.
