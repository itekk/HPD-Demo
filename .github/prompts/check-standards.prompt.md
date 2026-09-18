---
mode: agent
description: Audit the working tree against the HPD Demo coding standards.
---

# Standards check

Review the current changes against `CODING-STANDARDS.md` and
`.github/copilot-instructions.md`, then report any violations.

Check for, at minimum:

- Literal colour, spacing, radius, or font-size values in CSS instead of tokens.
- A new token declared in `:root` but missing from `[data-theme="dark"]`.
- Non-BEM class names, `#id` styling selectors, or `!important`.
- Inline `style=""`, `<style>`, inline `<script>`, or `onclick=""` attributes.
- Sections missing `id` / `aria-labelledby`, or a missing navigation link.
- `var`, loose equality, missing JSDoc, unguarded DOM lookups, `console.log`, `innerHTML`.
- Controls with no accessible name, or removed focus styles.
- Any added dependency, CDN link, web font, or build tooling.

Report each finding as `file:line - rule broken - suggested fix`. Do not change files
unless asked to.
