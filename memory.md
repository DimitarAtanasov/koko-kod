# Project memory / session log

Running log of decisions, context, and non-obvious history for this repo. Not user-facing —
for whoever (human or agent) picks this project back up later. Newest entries at the top.

---

## 2026-07-02 — Zero-budget v2 plan + Phase 3 rubric slice + track-b.js split

**Owner**: DimitarAtanasov. Continued from a prior browser-based session where a "koko-kod v2
zero-budget" roadmap was drafted (6 phases: JSCPP in-browser C++ execution, Supabase
auth/sync, a 3-layer feedback engine, CodeMirror editor, a Playground generator, optional
Gemini-free-tier AI layer — all on free tiers, no build step, no card required anywhere).

### What actually shipped this session
- **`docs/zero-budget-plan.md`**: the roadmap, fact-checked against the real repo and given a
  Fable 5 prose-polish pass. Added a "Where Track B stands today" section because the original
  plan's Phase 3 example assumed freeform-code rubric matching (regex/AST against arbitrary
  text), but Track B's 50 lessons are currently all `blanks`/`order`/`live`/`draw`/`game`/`info`
  structured exercises — no code editor, no Run button. That gap only becomes closed once
  Phase 1 (Run button) and Phase 4 (CodeMirror) actually ship.
- **`docs/phase3-rubrics-batch1.json`** + **`js/rubrics.js`**: a real slice of Phase 3 Layer 1
  (deterministic wrong-answer feedback) — 15 in-character Luna/Bo/Mia lines covering every
  plausible wrong choice across 6 of the 50 lessons (chapter 1 + start of chapter 2), authored
  via a Fable 5 pass and wired into `checkExercise`'s failure branch in
  `js/track-b-exercise.js`. A wrong answer now names the specific misconception (e.g. picking
  `==` instead of `>` in the "Кой пази къщата" comparison lesson gets a line about equality vs.
  comparison) instead of the generic "Не съвсем" message.
- **Split `js/track-b.js`** (1422 lines) into an orchestrator + 6 section modules
  (`track-b-data/live/draw/game/exercise/review.js`) at the user's explicit request ("I don't
  want it to look like spaghetti"). See `CLAUDE.md`'s Architecture section for the full
  breakdown and the parameter-passing pattern used to keep it safe (DOM `container` passed
  explicitly instead of read from shared closure). Verified via `node --check` on every file,
  a Node ES-module resolution test, and real Playwright browser runs through all 6 lesson
  types (order/blanks/live/draw/game/review) — zero console/page errors both before and after
  the split.
- Bumped `service-worker.js` `CACHE_NAME` twice (v6 for rubrics.js, v7 for the full split) and
  added every new file to `APP_SHELL`.
- Two commits on `claude/koko-kod-improvements-pplama`, pushed to origin (not merged to
  `main` — GitHub Pages only deploys `main`, so none of this is live yet; user still needs to
  merge).

### Explicit decision: declined "do everything in one pass"
User asked whether the full 6-phase plan (including Supabase auth/login and Gemini free-tier
AI) could be implemented in one pass. Declined, for two reasons given directly to the user:
(1) Phase 0 (Supabase project), Phase 6 (Gemini API key), and the Cloudflare Worker each
require creating an external account and handing back credentials — not something an agent
should provision or hold unsupervised; (2) bundling auth + code execution + editor swap + AI
into one giant change defeats the entire point of the plan's 6-phase independently-shippable
structure, which exists specifically so a regression is traceable to one change, not five at
once. Phases 1 (JSCPP Run button) and 4 (CodeMirror 6) need no new accounts and are the
natural next slice if continuing this roadmap — both are pure frontend, CDN ESM, no build step.

### Environment gotcha repeated this session
Mid-session, the sandbox environment reset (installed `node_modules`/Playwright and a scratch
test directory both vanished without warning, mid-verification) — same class of issue as the
2026-07-01 session's environment reset noted below. Second occurrence — worth assuming this
can happen again in this environment and not being surprised when a previously-installed
scratch tool (Playwright, a temp http server) is suddenly gone; just recreate it rather than
treating it as a real failure.

---

## 2026-07-01 — Major overhaul session

**Owner**: DimitarAtanasov (miteto1990@gmail.com). Repo started as a single working
`index.html` (143KB, all HTML+CSS+JS inline) uploaded via "Add files via upload" — no prior
commit history to learn conventions from.

### Critical bugs found and fixed
- **Progress never actually saved on the real deployment.** The app only used `window.storage`,
  an API that exists in certain sandboxed artifact-preview embeds but is `undefined` in real
  browsers — so on the live GitHub Pages site, every child's progress silently failed to
  persist. Added a `localStorage` fallback. Confirmed via a real headless-browser reload test
  that this was previously broken and is now fixed.
- **PWA install/offline caching was broken.** `manifest.json` and `service-worker.js` pointed
  at `koko-academy.html`, a file that doesn't exist (the actual file is `index.html`) — this
  broke the install prompt and app-shell precaching.
- **The "Слушай" (listen) button was silent, then had two regressions from over-fixing it.**
  First pass fixed a real GC issue (holding a strong reference to the `SpeechSynthesisUtterance`
  - correct, kept). But it also (a) stopped forcing `utter.lang='bg-BG'` unless a matching
  voice was found via `getVoices()`, theorizing that forcing an unmatched lang causes a silent
  no-op on some Android/Chrome setups - in real user testing this was wrong and worse: with no
  lang set at all, devices without an installed Bulgarian voice fell back to reading Cyrillic
  text with an English voice/phoneme engine, mangling it and cutting off partway through. And
  (b) deferred `speak()` by 30ms via `setTimeout` to dodge a desktop-Chrome `cancel()`+`speak()`
  race, plus added a periodic `pause()`/`resume()` "keep-alive" for a documented Chrome-desktop
  15s-stall bug - both are real fixes *for that specific desktop bug*, but on the user's mobile
  device the deferred `speak()` broke the "this call came from a direct tap" gesture
  requirement (causing total silence specifically on Track A, the first track loaded by
  default), and the periodic pause/resume likely contributed to the cutting-off. Reverted both:
  `speak()` is now called synchronously in the click handler, `lang` is always forced to
  `bg-BG`, and there's no periodic pause/resume. **Lesson**: don't stack multiple speculative
  fixes for narrow platform-specific bugs without testing on the actual target device/browser -
  each "fix" here was individually defensible reasoning but wrong in aggregate for this user's
  real environment. Prefer the simplest implementation that satisfies the one bug you've
  actually reproduced, over pre-emptively guarding against bugs you've only read about.

### Feature additions (in rough chronological order)
- Extended Track A from 5 to 15 to 16 levels (themed: space, candy kingdom, ocean, forest,
  castle, birthday party, plus a hidden bonus). Every maze validated with a BFS pathfinding
  script before being added — this caught several unreachable-goal mistakes during design.
- Added Track B Chapter 11 ("Book of Stars") continuing the festival storyline, bridging to
  real languages (Python, JS, Unity/Godot) as "what's next."
- Added an interest picker (space/art/animals/games/logic/story) — onboarding + settings —
  with chapter tagging and a "learning tree" recommendation banner/badges.
- Narrative chapter intros (all 11 original chapters), an onboarding hook, and an academy
  motto — written via a Fable 5 creative pass, then integrated by hand.
- Accessibility pass: aria-labels on icon-only buttons, `role="status"` on feedback messages,
  global `prefers-reduced-motion` override, `:focus-visible` outlines.
- Confetti celebration on level/lesson completion + entrance animations for cards/tabs/badges.
- **Modularized the single file** into `index.html` + `styles.css` + `js/core.js` +
  `js/track-a.js` + `js/track-b.js`, then converted those to native ES modules with explicit
  `import`/`export` (see `CLAUDE.md` for the cyclic-import reasoning). No build step introduced
  at any point — the user explicitly deprioritized a React rewrite after a cost/benefit
  discussion (see below).
- Hidden bonus Robi level 16 and Track B chapter 12, both auto-unlocked only after 100%
  completion of everything before them, each with an original (non-franchise) magic-themed
  story reveal written via Fable 5.
- Secret easter egg: tap the 🐾 paw in the nav 5× → poem/badge/riddle modal (Fable 5 content).
  Caught and fixed a real bug here: the modal's centering `transform:translate(-50%,-50%)` was
  silently replaced by its own entrance animation's `transform:scale()` — CSS animations
  overwrite the whole `transform` property rather than composing with a static declaration.
  Only caught via an actual mobile-viewport Playwright test, not by reading the CSS.

### Decisions made along the way (with reasoning, in case they get questioned later)
- **Declined a React rewrite.** The user asked; we discussed it explicitly. For an app this
  size (one page, two clearly-separated stateful sections, no routing, no server), React would
  mean a required build step, a bundle-size cost, and rewriting ~1,700 lines of working
  imperative DOM logic (maze runner, drawing canvas, mini-game, multi-step quiz flows) with
  real regression risk — for a benefit (component structure) already achievable via plain
  modularization. Revisit only if there's a concrete new reason (bigger planned feature growth,
  a team that specifically knows React, wanting to share code across other apps).
- **Declined Harry Potter / Lord of the Rings theming.** The user asked for magic + references
  to these specific franchises in both tracks. Both are copyrighted/trademarked — using them
  directly on a public site under the repo owner's name is a real infringement risk. Built
  original magic/fellowship content instead (an invented "star wizard academy" for Track A's
  secret level, an invented "Fellowship of the Star Code" / "Codex of a Thousand Sparks" for
  Track B's secret chapter) inspired only by the general genre tropes, which nobody owns.
- **No build step, ever, without explicit ask.** The README documents this as a deliberate
  choice (GitHub Pages, "Deploy from a branch", zero-config). ES modules were chosen specifically
  *because* they modernize the architecture without requiring one.

### Deployment/environment gotchas hit this session (not app bugs, but worth knowing)
- This session's environment reset mid-way through (working directory changed from
  `/home/user/koko-kod` to `/workspaces/koko-kod`, git history/branch state was lost, GitHub
  write access went from broken to working). If a similar reset happens again: check
  `git remote -v`, `git branch --show-current`, and whether the expected commits/files are
  still present before assuming continuity.
- GitHub write access for the Claude Code session was initially read-only (`git push` and the
  GitHub API both returned `403 Resource not accessible by integration`) despite read access
  (`get_me`, `list_branches`, `git ls-remote`) working fine. This was NOT fixable via GitHub's
  own "GitHub Apps" settings pages (repo-level or account-level `github.com/settings/
  installations` both showed nothing installed) — it turned out to be controlled on Claude's
  side, not GitHub's. If this recurs, don't waste time in GitHub's UI; check the Claude Code /
  Cowork session's own environment/repository-access configuration first.
- The stop-hook signature-verification check (`~/.claude/stop-hook-git-check.sh`) can report
  "N" (unsigned) for commits that are actually correctly signed, because this sandbox has no
  `gpg.ssh.allowedSignersFile` configured for local verification — `git log --format=%G?`
  genuinely can't distinguish "unsigned" from "signed but locally unverifiable" here, contrary
  to what that hook's own comment assumes. Verified via `git cat-file commit` that the
  `gpgsig` block and correct `Claude <noreply@anthropic.com>` identity were present. Re-running
  the suggested `commit --amend --reset-author` doesn't change this local-only limitation.
