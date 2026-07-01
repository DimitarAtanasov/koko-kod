# Коко Код Академия — CLAUDE.md

Guidance for Claude Code (or any agent) working in this repository.

## What this is

A Bulgarian-language storybook coding app for children, deployed as a static PWA on GitHub
Pages — no backend, no build step. Two tracks:

- **Track A (age 6+)** — Robi ("Роби"), a space robot, navigates maze grids using arrow
  commands plus a "repeat x2/x3..." multiplier. 16 levels (15 regular + 1 hidden bonus).
- **Track B (age 11+)** — Luna, Bo, and Mia learn real C++ concepts (variables, conditionals,
  loops, arrays, functions, classes) through a fairy-tale/festival narrative across 12
  "books"/chapters (11 regular + 1 hidden bonus), 50 lessons total.

## Architecture

Plain HTML/CSS/JS, native ES modules, **zero build step**:

- `index.html` — HTML shell (nav, onboarding root, settings panel, secret-egg modal), links to
  `styles.css` and a single `<script type="module" src="js/core.js">` entry point.
- `styles.css` — all styles.
- `js/core.js` — storage (with `localStorage` fallback), audio narration (Web Speech API),
  confetti effect, interests constant, onboarding/settings, `boot()`. Imports `TrackA` from
  `track-a.js` and `TrackB` from `track-b.js` to wire up `switchTrack()`.
- `js/track-a.js` — Robi track. Imports `speakText`/`fireConfetti` from `core.js`.
- `js/track-b.js` — Luna/Bo/Mia track. Imports `INTERESTS`/`fireConfetti`/`profile`/`speakText`
  from `core.js`.

This is a **cyclic import graph** (core.js ↔ track-a.js/track-b.js) and it works correctly
because all cross-module usage happens inside deferred function bodies (event handlers, calls
triggered by `boot()` after the whole graph has loaded) — never at a module's top-level
evaluation time. `speakText`/`fireConfetti` are `function` declarations (hoisted, no TDZ
issue); `profile` is a `let` re-exported live binding, only reassigned inside its owning module
(`core.js`), read elsewhere — this is safe with ES module live bindings. If you add new
cross-module state, keep to this pattern: only mutate an exported `let` from within the module
that declares it.

No bundler, no `node_modules` needed to run the app itself. GitHub Pages serves these files
as-is ("Deploy from a branch", root). Don't introduce a build step unless there's a strong
reason — it would change the whole deployment model documented in `README.md`.

## Conventions

- **Bulgarian content only** in-app (`lang="bg"`), Cyrillic throughout code data (lesson/level
  text, story copy). Comments in code are in English.
- **Maze levels must be validated for reachability.** Every `levels[]` entry in `track-a.js`
  has `start`/`goal`/`walls` on a grid where only 4-directional moves are allowed. Before
  adding or editing a level, BFS-validate it (see "Testing" below) — a level with an
  unreachable goal is unplayable and easy to introduce by hand.
- **Progress persistence**: `loadJSON`/`saveJSON` in `core.js` try `window.storage` first (an
  API that only exists in certain sandboxed preview embeds), then fall back to `localStorage`.
  Do not remove the `localStorage` fallback — without it, progress silently never saves on the
  real GitHub Pages deployment (this was a real, previously-shipped bug).
- **Service worker cache versioning**: bump `CACHE_NAME` in `service-worker.js` (e.g.
  `koko-kod-v4` → `v5`) on every change to `index.html`, `styles.css`, any `js/*.js`,
  `manifest.json`, or the icons. Otherwise devices that already installed the PWA keep serving
  stale cached files.
- **Chapters/lessons must stay contiguous.** `chapters[]` in `track-b.js` partitions
  `lessons[]` via `range: [start, end]` (1-indexed, matching `lesson.id`). If you add/remove
  lessons, make sure chapter ranges still exactly cover 1..lessons.length with no gaps/overlaps.
- **Hidden/bonus content pattern**: the last level in `levels[]` / last chapter+lesson in
  `chapters[]`+`lessons[]` can be a "secret" bonus (see level 16, chapter 12) — mark with
  `secret:true`, and it auto-unlocks via the existing cascade logic (completing the previous
  level/lesson unlocks the next) with zero extra unlock code needed.
- **No copyrighted/trademarked franchise content.** Don't add Harry Potter, Lord of the Rings,
  or similar characters/names/spells/terminology — this is a public site under the repo
  owner's name; use only wholly original fantasy/sci-fi concepts inspired by general genre
  tropes (see the `secretReveal` field on level 16 and chapter 12's lesson for examples of
  original invented content instead).
- **Fable 5** (`model: "fable"` on the `Agent` tool) has been used for narrative/creative
  writing passes (chapter intros, onboarding copy, easter-egg poem/riddle, secret bonus
  story reveals) — it's a good fit for this kind of Bulgarian storytelling content. Keep
  agent prompts constrained to plain-text output with an explicit "no straight quotes" rule
  (the output gets embedded in single-quoted JS string literals).

## Testing

There's no test suite in the repo — validate manually before committing:

1. **Syntax**: `node --check js/core.js`, `js/track-a.js`, `js/track-b.js` (these use
   `import`/`export`; recent Node versions auto-detect ES module syntax even without a
   `package.json`).
2. **Module resolution**: since there's no `package.json` in this repo (and shouldn't be —
   see "no build step" above), to test the ES module graph actually resolves, copy the `js/`
   files to a scratch directory with a throwaway `{"type":"module"}` package.json and
   dynamically `import()` them from Node.
3. **Maze reachability**: BFS over `rows`/`cols`/`start`/`goal`/`walls` for any level you touch.
4. **Browser smoke test**: install Playwright + Chromium in a scratch directory (`npm install
   playwright && npx playwright install chromium --with-deps`), serve the repo root with
   `python3 -m http.server`, and drive the onboarding → track → level/lesson flow. This is how
   the app-shell bugs (window.storage-only persistence, the modal transform/animation conflict)
   were actually caught — static review alone missed them.

## Known non-issues (don't "fix" these)

- `par` on Track A levels is a display-only field never read by any game logic (checked via
  grep across the codebase) — it doesn't need to match the true BFS-shortest-path length.
- The git-history "Unverified" signature warning on commits made in this environment is a
  local-verification-only artifact (`gpg.ssh.allowedSignersFile` isn't configured for local
  verification in this sandbox) — commits are correctly signed and attributed; this doesn't
  reflect what GitHub shows once pushed.
