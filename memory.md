# Project memory / session log

Running log of decisions, context, and non-obvious history for this repo. Not user-facing —
for whoever (human or agent) picks this project back up later. Newest entries at the top.

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
- **The "Слушай" (listen) button was silent** on many real devices due to three compounding Web
  Speech API issues: the utterance getting garbage-collected mid-speech, a `cancel()`+`speak()`
  race in the same tick, and forcing `lang=bg-BG` with no matching installed voice (silent
  no-op on some Android/Chrome configs instead of falling back to a default voice).

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
