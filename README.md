# HPD Demo

A small static website used to demonstrate **AI-assisted development with GitHub Copilot**:
describe a change in plain English, let the assistant write it against documented coding
standards, and let the pipeline deploy it automatically.

- **Stack:** HTML5, CSS3, vanilla JavaScript (ES modules)
- **Dependencies:** none
- **Build step:** none
- **Deployment:** push to `main` publishes to GitHub Pages

## Run it locally

No install required, but you must **serve the folder over HTTP** rather than double-clicking
`index.html`. The page script is an ES module, and browsers block module scripts loaded from
`file://`, which would leave the theme toggle and stat counters dead.

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>. (The deployed GitHub Pages site is served over HTTP, so
this only affects local previews.)

## Project structure

```
HPD-Demo/
├── index.html                          # All page markup
├── assets/
│   ├── css/styles.css                  # Tokens, components, sections
│   └── js/main.js                      # Theme toggle, stat counters, contact form
├── .github/
│   ├── copilot-instructions.md         # Repo-wide rules, loaded by Copilot automatically
│   ├── instructions/
│   │   ├── html.instructions.md        # applyTo: **/*.html
│   │   ├── css.instructions.md         # applyTo: **/*.css
│   │   └── javascript.instructions.md  # applyTo: **/*.js
│   ├── prompts/
│   │   ├── add-section.prompt.md       # Reusable "/add-section" task
│   │   └── check-standards.prompt.md   # Reusable "/check-standards" audit
│   └── workflows/deploy.yml            # Auto-deploy to GitHub Pages
├── .vscode/settings.json               # Enables instruction + prompt files in VS Code
├── CODING-STANDARDS.md                 # Source of truth for how code is written here
└── AGENTS.md                           # Same rules, for non-Copilot AI agents
```

## How the AI instructions are wired

| File | Picked up by | When |
| ---- | ------------ | ---- |
| `.github/copilot-instructions.md` | Copilot Chat, Copilot code review, Copilot coding agent | Every request in this repo |
| `.github/instructions/*.instructions.md` | Copilot | When the edited file matches the `applyTo` glob |
| `.github/prompts/*.prompt.md` | VS Code Copilot Chat | When you type `/add-section` or `/check-standards` |
| `AGENTS.md` | Agents following the AGENTS.md convention | Every request |
| `.editorconfig` | The editor | On save |

Nothing has to be pasted into the chat window. Opening this repository is enough for the
assistant to know the house style.

### Verifying Copilot is using them

In VS Code, expand the **References** section above a Copilot Chat reply. When the setup is
working you will see `copilot-instructions.md` (and the relevant `*.instructions.md` file)
listed as a used reference.

## Deployment setup

One-time, on the GitHub repository:

1. **Settings -> Pages -> Build and deployment -> Source:** select **GitHub Actions**.
2. Push to `main`.
3. Watch the run under the **Actions** tab. The live URL is printed on the deploy job and
   also appears under Settings -> Pages.

After that, every push to `main` redeploys the site with no manual steps.

## The page itself

| Section  | What it demonstrates                                          |
| -------- | ------------------------------------------------------------- |
| Hero     | Headline, supporting copy, primary and ghost buttons           |
| Features | `.card-grid` of six `.card` blocks                             |
| Impact   | `dl.stat-grid` with counters that animate into view            |
| Workflow | `ol.steps` numbered process                                    |
| Contact  | Form with client-side validation and a polite live region      |
| Header   | Sticky nav plus a light/dark theme toggle saved to localStorage |

## Contributing

Read [`CODING-STANDARDS.md`](CODING-STANDARDS.md) first. In short: no dependencies, design
tokens instead of literal values, BEM class names, JSDoc on every function, accessible
markup, Conventional Commit messages.
