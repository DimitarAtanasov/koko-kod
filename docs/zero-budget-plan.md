# koko-kod v2 — Zero-Budget Edition (Pilot Plan)

Everything below costs €0/month, with no credit card required anywhere. This is not the paid plan with the good parts removed — it is the same "Understanding Loop" concept, re-engineered around free primitives. In several places (offline execution, instant feedback) the free version is actually *better*.

---

## The stack (all free)

| Need | Solution | Cost / limits |
|---|---|---|
| Hosting | GitHub Pages (already have) | Free, unlimited for static |
| Auth + DB | **Supabase free tier** | Free: 50k monthly users, 500MB DB, no card needed |
| C++ execution | **In-browser via JSCPP** (C++ interpreter in pure JS), fallback: Piston public API | Free forever; Piston public = free, rate-limited |
| AI insights | **3-layer feedback engine** (see below) | €0 |
| Serverless glue | **Cloudflare Workers free tier** (only needed for layer 3) | 100k req/day free |

The architectural shift that makes this work: **push everything possible into the browser.** The kid's device does the compiling, the running, and 90% of the "AI". What remains for the backend — auth and progress storage — is exactly what Supabase's free tier handles comfortably.

---

## C++ execution — in the browser, no server

**Primary: JSCPP** (`felixhao28/JSCPP`, npm `JSCPP`). A C++ interpreter written in JavaScript:
- Runs entirely client-side — zero latency, zero cost, works offline (fits the existing service worker!)
- Supports the subset kids actually use: iostream, loops, conditionals, functions, arrays, basic STL
- Deliberately does NOT support advanced C++ — for a kids' curriculum that's a feature, not a bug
- Can sandbox infinite loops with an instruction-count limit

**Fallback: Piston public API** (`emkc.org/api/v2/piston/execute`) for the rare lesson JSCPP can't handle. Free, no key, ~5 req/sec public limit — fine for a pilot.

The payoff: the Playground works **offline on a phone**. No other kids' coding platform does that.

---

## Where Track B stands today (context for this plan)

Before sequencing the work, it helps to be precise about the starting point. Track B's 50 lessons are currently all **structured exercises**, not freeform code entry: `blanks` (fill a dropdown or number into a `codeLines` template), `order` (drag `cout <<` chips into sequence), plus a few `live`/`draw`/`game`/`info` types for Robi-driven visual output. There is no code editor and no "Run" button yet — every lesson already knows the single correct answer per blank via a `correct` field.

That shapes the sequencing below in one important way. **Phase 1 (Run button) and Phase 4 (CodeMirror bridge) are what turn Track B into a place where kids type real C++,** which is the precondition for the freeform-code rubric matching described in Phase 3's original design (regex/AST matching against arbitrary text like `i <= n` vs `i < n`). Until then, "Layer 1" rubric authoring really means writing sharper per-wrong-answer feedback for the *existing* blanks — matching against a chosen `blank.id`/value pair rather than parsing free text. Both versions are worth having, and they sequence naturally: the blanks-level version ships first because it needs neither JSCPP nor CodeMirror, then upgrades in place once Phase 1/4 land.

---

## AI insights without paying for AI — the 3-layer feedback engine

The instinct is to reach for an LLM first. Resist it. Layer the intelligence, cheapest first — most of what feels like "AI feedback" is actually pattern recognition you can author once and run forever:

**Layer 1 — Deterministic rubric (covers ~70% of cases, instant, offline)**
Each lesson ships a small JSON rubric of known wrong-answer patterns. Two shapes, depending on lesson type:

For today's `blanks`-type lessons (matching a specific wrong value):
```json
{
  "lessonId": 14,
  "checks": [
    {"blankId": "b1", "wrongValue": 4, "concept": "off_by_one",
     "luna_says": "Ммм, Роби направи една стъпка повече! Провери докъде брои цикълът ти."},
    {"blankId": "b1", "missing": true, "concept": "no_reset",
     "bo_says": "Не забрави да нулираш броя — и си мяу също!"}
  ]
}
```

For future freeform-code lessons (once Phase 1/4 land), the same idea extends to matching against submitted source text and JSCPP's actual stdout:
```json
{
  "lessonId": 61,
  "checks": [
    {"pattern": "i <= n", "expected": "i < n", "concept": "off_by_one",
     "luna_says": "Ммм, Роби направи една стъпка повече! Провери докъде брои цикълът ти."}
  ],
  "tests": [{"stdin": "5", "stdout": "120"}, {"stdin": "0", "stdout": "1"}]
}
```
For freeform-code lessons, run the tests via JSCPP and regex/AST-match the code against known patterns; for today's blanks lessons, just compare the submitted blank value against the `wrongValue` list. Either way, a character speaks the matched line. Authoring these rubrics per lesson is exactly the gold-dataset discipline from the spec-agent work, kid-sized. **This layer alone beats most paid platforms' feedback.**

**Layer 2 — Static analysis heuristics (generic, lesson-independent)**
A small JS module that catches universal issues once freeform code exists: unused variables, loop never executes, missing return, output format mismatch (extra space/newline — the #1 kid frustration). Still fully client-side. Not applicable to today's blanks lessons (there's nothing to statically analyze in a single dropdown pick) — this layer activates once Phase 1/4 land.

**Layer 3 — Free-tier LLM, only when layers 1-2 shrug (~10% of cases)**
Options ranked:
1. **Google Gemini API free tier** — genuinely free key, ~1,500 requests/day on flash models, good Bulgarian. Enough for a pilot with a handful of kids.
2. **Groq free tier** — fast, free key, Llama models (Bulgarian is weaker).
3. **Skip entirely for v1** — layers 1-2 already give in-character feedback; layer 3 is polish.

The free API key can't live in a static frontend, so layer 3 needs one tiny Cloudflare Worker (free tier) as a proxy with a per-child daily cap stored in Supabase. Skip layer 3, and you need **zero backend code at all** beyond Supabase.

---

## Auth — Supabase free tier, parent-anchored

Feedback layers need somewhere to record what they learn about each child, which is where auth and the database come in — kept deliberately minimal:

- Parent registers with email (Supabase Auth, magic link — no passwords to forget)
- Children = rows in a `profiles` table under the parent: avatar + 4-digit PIN, no PII
- Row Level Security so a parent only sees their own kids
- Tables: `parents`, `child_profiles`, `progress` (lesson_id, status, code_snapshot), `concept_gaps` (child_id, concept, count) — the last one feeds the Playground generator
- Offline-first: keep localStorage as write-through cache, sync to Supabase when online. The PWA stays fully functional without network — same pattern already used for progress persistence today.

---

## Execution plan — 6 phases, each independently shippable

Every phase leaves the app in a shippable state, so the pilot can pause at any point and still be a real product.

**Phase 0 — Prep (1 evening)**
Create Supabase project, define 4 tables + RLS policies. Get JSCPP running in a test HTML page against one existing Track B concept (e.g. the loop lessons in chapter 3).

**Phase 1 — Run button (weekend 1)**
Wire JSCPP into Track B: kid's code executes, stdout shown, diffed against expected output. Pure pass/fail. This is the single biggest UX jump for the least work — ship it first. (It is also the phase that turns Track B from "structured exercises" into "kids write real C++" — see the note above.)

**Phase 2 — Auth + sync (weekend 2)**
Supabase login flow (parent email + child avatar/PIN screen), migrate localStorage progress to write-through sync. Existing anonymous users keep working — login stays optional at first.

**Phase 3 — Feedback layers 1+2 (weekends 3-4)**
Build the rubric schema, author rubrics for the first 5 lessons (start with the ones test-kids fail most), implement the static-analysis heuristics, route matched feedback through the existing character dialogue + Web Speech narration. The blanks-level schema can start even before Phase 1 ships — see "Where Track B stands today" above.

**Phase 4 — CodeMirror 6 + block/text bridge (weekend 5)**
Swap Track B input to CodeMirror 6 (ESM from CDN, no build step — matches the existing architecture). Track A blocks render live dimmed C++ text underneath.

**Phase 5 — Playground generator (weekend 6)**
Read `concept_gaps`, pick the top gap, serve a matching mini-challenge from a small hand-authored challenge bank (10-15 challenges tagged by concept). No AI needed — it's a lookup.

**Phase 6 (optional) — Gemini free-tier layer 3**
One Cloudflare Worker, daily cap per child, only fires when layers 1-2 return nothing.

---

## What you give up vs. the paid version — honestly

- JSCPP won't run "real" advanced C++ (templates, most STL) — irrelevant for the curriculum's level, and a constraint only if the older track someday goes deep.
- Layer-1 rubrics demand authoring effort per lesson (~20-30 min each). That effort *is* the product quality, though — the same reason the spec-agent work needed a gold dataset.
- Gemini free tier could change terms anytime — which is why it sits at layer 3, optional and never load-bearing.
- Piston public API has no SLA — which is why it's the fallback, not the primary.

Notice the pattern: every fragile dependency is either optional or a fallback. Nothing here has a cliff where you suddenly need a credit card. Worst case, everything degrades to fully-offline mode — which still works.
