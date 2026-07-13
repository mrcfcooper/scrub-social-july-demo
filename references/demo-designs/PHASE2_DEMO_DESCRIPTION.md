# Scrub Society — Phase 2 Clickable Demo: Full Description

A complete description of the Phase 2 clickable demo built inside the Scrub Society
(TGN) codebase, written so it can be compared against a separately-built demo. Nothing
here is aspirational — every screen described is implemented, type-checks clean, and
serves HTTP 200 locally.

---

## 1. What this is

Scrub Society is an AI-powered job platform for travel nurses and allied health
professionals. Its Phase 2 features existed only as ~16 disconnected design prototypes
(standalone HTML exports). This demo stitches them into **one coherent, clickable
website that runs inside the real production app shell**, so a stakeholder (CEO, CTO,
internal business users, agency partners) can click through a connected experience
rather than review screens one at a time.

It is a **design-fidelity communication artifact, not production code**: realistic
enough to feel like the product, loudly stubbed so nobody mistakes demo data for real
data. It lives entirely on a side branch (`demo/phase2-clickthrough`) and is fully
isolated from the real application.

**Stack it's built in:** Next.js 15.5 (App Router), React 18, TypeScript (strict),
Lucide icons. No new dependencies were introduced — the demo imports only `react`,
`next/*`, `lucide-react`, and its own relative files.

---

## 2. Architecture & isolation (the important structural choices)

- **Everything lives under one folder:** `frontend/app/(public)/demo/`. The real app
  already has a `(public)` route group whose layout wraps pages in the production
  `Layout` shell (header with Community/Resources/Events dropdowns, mobile bottom tab
  bar, footer). So every `/demo/*` route automatically renders **inside the real app
  chrome** — that's what makes it feel like the product and not a separate microsite.
- **Build beside, never inside, the "god components."** The production app has three
  enormous files — `JobDetail.tsx` (~7.7k lines), `ProfileOnboarding.tsx` (~7.9k),
  `Profile.tsx` (~6.5k). None were edited. The demo builds parallel screens and mounts
  them at new routes.
- **Total build isolation:** no file outside the demo folder imports anything from it.
  Demo styling is scoped under a single `.ss-demo` CSS class so tokens can't leak into
  production. The only global side effect is hiding the production chat launcher while
  on a demo route, via a `body.ss-demo-mode` class added on mount and removed on unmount.
- **Folder layout:**
  - `demo/layout.tsx` — wraps all demo routes in `.ss-demo`, pins the DEMO banner,
    mounts the Erin chat overlay (suppressed on the agency portal).
  - `demo/page.tsx` — the launchpad / index.
  - `demo/demo.css` — brand tokens + shared primitive classes, all scoped to `.ss-demo`.
  - `demo/_lib/` — shared infra: `demoData.ts` (all fabricated data), `DemoBanner.tsx`,
    `PhoneFrame.tsx`, `TargetState.tsx`, `ErinChat.tsx` + `erin/store.ts`.
  - `demo/_screens/` — one component per screen (each 300–1700 lines), plus per-screen
    helper subfolders (`jobs-list/`, `job-detail/`, `preferences/`, `profile/`,
    `agency/`, `facility/`, `readiness/`, `diary/`).
  - Route wrappers (`demo/<route>/page.tsx`) are thin: they `dynamic()`-import the screen
    with `ssr: false` and pass route params.

- **~11,000 lines of demo TSX/TS** across the screens, plus a ~410-line central data
  module.

---

## 3. The brand system (design tokens)

All visual tokens come from the Scrub Society brand and are defined once in `demo.css`,
scoped to `.ss-demo`:

- **Palette:** Plum Grove `#421A31` (primary ink / deep surfaces), Open Air `#F9F2E8`
  (warm cream — the primary page background), Morning Dew `#CEDBFE` (pale blue surface),
  Clear Sky `#82ABF4` (saturated sky-blue accent), Lavender Field `#BBAFEF` (lilac
  accent), Soft Cloud `#FFFFFF` (cards). Plus plum tints/shades for borders and muted text.
- **Typography:** single family **Outfit**. Headlines are Outfit Regular with −0.04em
  tracking, **sentence case** (the brand never shouts — no Title Case, no ALL CAPS).
  Body is Outfit Light. Subtext is lowercase (a deliberate brand motif, e.g.
  `scrubsociety.com`). Utility classes: `.ss-headline`, `.ss-body`, `.ss-subtext`,
  `.ss-eyebrow`.
- **Shape language:** buttons and chips are fully pill-shaped (`--r-full`); cards use
  20–28px radii. The **speech-bubble shape** (rounded except a squared bottom-left
  corner) is reserved as Erin's voice signature; functional status uses pills.
- **Shadows** are plum-tinted, never gray. **No gradients** anywhere (brand rule — flat
  color washes instead). **No emoji.** Icons are Lucide only.
- Shared primitive classes: `.ss-card`, `.ss-pill`, `.ss-btn` / `.ss-btn-primary` /
  `.ss-btn-outline`, `.ss-bubble`, `.ss-target-state`.

---

## 4. The demo-wide framing devices

Three reusable pieces wrap or annotate the whole experience:

1. **DEMO banner** (`DemoBanner.tsx`) — a sticky, plum diagonal-striped bar at the top of
   every demo page. Left side: a "DEMO" badge + "Phase 2 concept walkthrough — all data
   is fabricated." Right side: the spine click-path as numbered links (1 Meet Erin · 2
   Home · 3 Jobs · 4 Job detail · 5 Apply), with the current step highlighted. This is
   the persistent "this is not real" marker and the always-available next step.

2. **Phone frame** (`PhoneFrame.tsx`) — a phone bezel that wraps mobile-primary screens
   so desktop stakeholders see the mobile experience in context. It collapses to
   full-bleed below 480px (so on an actual phone there's no bezel-in-bezel).

3. **Target-state badge** (`TargetState.tsx`) — a small dashed lavender "TARGET STATE"
   chip marking anything shown in the demo that is **not live in the product today**. Its
   placement is deliberately restricted (see §7).

---

## 5. The data layer (one source of fabricated truth)

All fabricated content lives in `demo/_lib/demoData.ts` (~410 lines) plus a few
per-screen helper data files. Key fixtures:

- **`DEMO_NURSE`** — the persona "you" of the walkthrough: Carol Hathaway, RN/CCRN, ICU,
  6 years, home base Phoenix AZ, licenses AZ/CO/TX-compact, nights preference, desired
  pay $2,600/wk. Email on an `.invalid` domain, phone in the 555 range.
- **`DEMO_RECRUITER`** — Carla Espinosa, Senior Recruiter at St. Elsewhere Staffing, 4.9
  rating, with a stock-style portrait.
- **`DEMO_FACILITY`** + **`DEMO_FACILITY_PHOTOS`** — Sacred Heart Hospital (Denver, Level
  I trauma, 540 beds, Epic, ICU 1:2 ratios). The photos map deliberately covers only
  two facilities, to demonstrate a future capability (see §6, item 6).
- **`DEMO_JOBS`** (6 canonical) + an extended board (`DEMO_BOARD_JOBS`, 12 total) — each
  job has title, specialty, facility, city/state, start date, weeks, shift, hourly +
  stipend pay breakdown, tags, match score, and a description.
- **`DEMO_MATCHES`** — Erin's ranked match results joining jobs to "why it matched" reasons.
- **`DEMO_ERIN_SCRIPT`** — the scripted Erin conversation.
- **`DEMO_HOUSING`**, **`DEMO_COST_OF_LIVING`**, **`DEMO_WEATHER`**,
  **`DEMO_TRANSPORT_CRIME`** — rich-tab content for job detail.
- **`DEMO_DIARY`**, **`DEMO_READINESS`** — past assignments and the readiness-score model.

**Stub convention:** in code, every fabricated constant is `DEMO_`-prefixed with a
`// DEMO STUB` comment. But **displayed** names are recognizable fictional medical-TV
names with no on-screen prefix — the cast is on loan from Grey's Anatomy / House / ER /
Scrubs (Carol Hathaway, Carla Espinosa, Sacred Heart, Seattle Grace, County General,
Mercy West, Princeton-Plainsboro; inbox candidates Cristina Yang, Allison Cameron, Izzie
Stevens, Christopher Turk, Susan Lewis; reviewers John Carter, Samantha Taggart, Elliot
Reid). Agencies are show-riffs (St. Elsewhere Staffing, New Amsterdam Partners, Chicago
Hope Staffing, Night Shift Medical) chosen to avoid colliding with any real staffing
brand. The combination — obviously-fictional names + the persistent DEMO banner — is what
keeps demo data from being mistaken for real data.

---

## 6. The screens (16 prototypes, 14 routes)

### The spine (the demo narrative, in order)

1. **Erin onboarding** — `/demo/onboarding` (mobile-primary, in a phone frame). A
   dark-plum welcome takeover, then a 7-step conversational capture where Erin (the AI
   guide) asks profession → specialty → experience → home base → travel radius → shift →
   availability. Each step is a real interactive chat thread with a progress bar and
   tap-to-answer option trays; Carol's answers are pre-highlighted so a stakeholder can
   tap straight through. Ends with a "finding matches" beat, a best-match hero card, and
   "Erin's picks." Final CTA → Home.

2. **Home — Web** — `/demo/home`. The marketing/front-door page: a full-bleed hero photo
   with a search bar and quick-action tiles, an Erin match band, featured jobs (with real
   facility photos where known), a community/events strip, an employer strip, blog teasers,
   and a plum footer with a newsletter signup. Every CTA is wired into the demo. (The
   prototype's own nav was removed so the real app header is the only chrome.)

3. **Home — Mobile** — `/demo/home-mobile` (phone frame). A focused launchpad: greeting
   hero, an Erin teaser, a featured-jobs strip, quick actions, an events teaser, and a
   bottom tab bar. Sections that belong in other tabs (Events, Social, employers, blog)
   show an inline "lives in its own tab" note rather than dead links.

4. **Jobs list** — `/demo/jobs` (web + mobile responsive). A filterable job board over
   all 12 demo jobs: live search, filter chips (specialty / shift / state / pay floor),
   sort (best fit / pay / start date / recently updated), save/bookmark toggles, a result
   count, and list/grid views. Cards at the two photographed facilities show the facility
   photo; the rest show an initials thumbnail. Each card links to job detail.

5. **Job detail** — `/demo/jobs/[jobId]` (web + mobile). The richest screen. A hero
   (facility photo when known, else a flat on-brand placeholder with initials), a pay rail
   with full breakdown (hourly + housing/M&I stipends + travel reimbursement), the job
   description, a recruiter card (Carla), and **six section tabs**: Overview, Facility
   details, **Accommodation** (the housing prototype — listings, a map with pins, a
   nightly/monthly/assignment-period toggle), Cost of living, Transport & crime, Weather.
   The rich tabs attempt a live fetch against the real location-insights endpoint and fall
   back silently to stub data. Apply CTA → apply flow.

6. **Apply flow** — `/demo/apply/[jobId]`. A 3-step stepper (Confirm profile → Documents →
   Review), prefilled from Carol's profile so it's fast to click through, ending in a
   "submitted" state. **Compliance-aware:** because submission delivery is fire-and-forget
   in the real product today, the end state never claims a real "delivered/confirmed to
   recruiter" — the delivery-confirmation and follow-up-SLA lines are explicitly marked
   target-state, with a footnote that submissions are fire-and-forget today.

**Erin chat overlay** — `ErinChat.tsx`, mounted globally on every demo route except the
agency portal. A floating launcher (speech-bubble shape) opens a chat panel that plays a
scripted conversation: Erin's turns appear with a typing indicator and gentle delays; the
user's turns are one-tap suggested replies. When the script reaches its matches turn, it
renders in-chat match cards (the job-match prototype) that link to job detail. Panel state
(open / step / matches-shown) persists across navigation via sessionStorage, so moving
between pages doesn't restart the script.

### Secondary screens

7. **Profile** — `/demo/profile` (web + mobile). Carol's full profile: identity header,
   tabbed credentials (licenses / certifications / specialties / work history / education /
   references), preferences, a readiness-score card, job activity, and a documents section.
8. **Recruiter profile** — `/demo/recruiter`. Carla, in two presentations: an in-app
   mobile profile (in a phone frame) and a shareable public web-slug page
   (`scrubsociety.com/r/carla-espinosa`). Stock-style portrait, stats, bio, specialties,
   testimonials, and her open roles (linking to job detail).
9. **Readiness score** — `/demo/readiness` (mobile-primary; the source export is
   mobile-only). An animated score ring (renders its final value immediately), a band label
   ("Submission-ready"), a factor breakdown with bars, and "what would raise it" nudges.
10. **Preference Center** — `/demo/preferences`. A **notification matrix**: topic rows ×
    Push/Email/SMS/In-app columns, a toggle per cell with per-cell frequency, plus quiet
    hours and a save confirmation. Collapses to per-topic cards on mobile. **TCPA-compliant
    by construction** (see §8).
11. **Assignment diary** — `/demo/diary` (mobile-primary; source is mobile-only). A
    "How was [facility]?" entry flow (rating, structured prompts, tags, notes) that actually
    saves to a timeline of past entries.
12. **Facility intel** — `/demo/facility` (web + mobile responsive). The community/facility
    "moat": a facility hero (photo + plum panel with name, type, beds, unit profile, a Scrub
    Society score ring), a ratings breakdown, unit-culture tags, practical notes
    (parking/charting/float/housing), area context (cost of living / commute / weather), and
    open jobs at that facility.
13. **Agency portal / recruiter inbox** — `/demo/agency` (desktop/tablet; shows a "designed
    for desktop" card on small screens). The vendor-admin surface a paying agency sees: a
    dark nav rail, a conversation/candidate inbox with filters and readiness signals, a
    conversation view with an Erin-handoff card, and a candidate tracking panel (profile,
    readiness, pipeline stages, credentials). Carol's application for the spine job sits at
    the top with an Erin handoff, closing the narrative loop. All actions are local state —
    no real messaging.

A **launchpad** at `/demo` lists the spine (as numbered steps) and the secondary screens as
cards, with a one-line explanation that everything is fabricated.

---

## 7. Honesty / "target-state" policy

Because several Phase 2 capabilities aren't live yet, the demo marks them — but
deliberately sparingly, so the badges mean something. After iteration, target-state badges
appear in **exactly these places** and nowhere else:

- the **"recruiter follows up within one business day" SLA** copy (home, job detail, and
  the apply flow's two submitted-state lines) — an SLA the platform can't measure today;
- the **SMS "subscribed to texts"** state in the Preference Center — outbound SMS is gated
  on a separate ticket, so any subscribed state is target-state;
- **facility photos** — badged to tell the future-capability story (see below).

Everything else that's conceptually future (Erin's proactive matching, readiness scoring,
community reviews/diary data, resume auto-fill) is rendered without per-element badges; the
single persistent DEMO banner carries the overall "this is a concept" message. Earlier
per-element "live data / demo data" pills on the job-detail tabs were removed (the
live-fetch-with-fallback wiring stayed, just silent).

**Facility photos as a deliberate "future capability" demonstration:** only two facilities
have photos in the data; the rest show an on-brand placeholder. This contrast — and the
target-state badge on the photographed ones — communicates the intended future behavior:
"when we know the facility, we pull its photo."

---

## 8. Compliance details worth highlighting (TCPA / SMS)

The Preference Center's SMS handling was built to a strict, non-negotiable spec and
verified at runtime:

- Every SMS cell **defaults OFF** and is never pre-checked; the initial-state builder
  hard-forces SMS off regardless of config.
- The **only** code path that can turn an SMS cell on is an explicit consent dialog: tapping
  any SMS cell opens a modal with the required language (message & data rates may apply,
  reply STOP to opt out, consent is not a condition of use); the "Agree" button stays
  disabled until a consent checkbox is ticked; cancel leaves SMS off.
- Consent is granted once at the channel level; the resulting "subscribed" state carries the
  target-state badge.
- Bulk actions (e.g. "unsubscribe from all emails") touch only the email channel — never SMS.

---

## 9. What's wired vs. stubbed

- **Genuinely interactive (client state):** onboarding step flow, jobs search/filter/sort/save,
  job-detail tab switching + housing period toggle, the apply stepper, the Erin scripted chat
  + match cards, the preference matrix toggles + consent flow, the diary entry→timeline, the
  agency inbox selection/filter/handoff.
- **Live-with-fallback:** job-detail rich tabs (facility/cost-of-living/weather/transport) call
  the real location-insights API and silently fall back to stub data if it's unreachable. On a
  network that reaches the backend, those tabs show live data automatically.
- **Everything else is fabricated** `DEMO_` data from the central module. No database writes, no
  migrations, no outbound email/SMS/push, no new paid APIs, no secrets read.

---

## 10. Status & verification

- Branch: `demo/phase2-clickthrough` (pushed to origin; 5 commits: scaffold → spine →
  secondary screens → fixes → iteration).
- All 14 routes return HTTP 200; `tsc --noEmit` reports **zero errors in demo files**; the
  production `next build` exits 0 with all demo routes in the manifest; browser console is
  clean across the walkthrough.
- Two independent fresh-context audits passed: a **link-graph audit** (no broken links, no
  links escaping `/demo`, no missing assets, spine continuity intact) and a **compliance/stub
  audit** (no `DEMO_` in any displayed string, no real staffing-agency/hospital names
  displayed, badge policy honored, TCPA paths sound, no secrets, build isolation confirmed).
- `git diff main...HEAD` touches only demo surfaces; the three god components are untouched.

---

## 11. One-paragraph summary (for quick comparison)

A throwaway side branch turns ~16 disconnected Scrub Society Phase 2 prototypes into one
clickable Next.js demo that runs inside the real app shell at `/demo`. It has a 6-screen
narrative spine (Erin onboarding → web & mobile home → jobs list → rich job detail with a
6-tab + housing layout → apply flow) plus a global scripted Erin chat overlay, and 7
secondary screens (profile, recruiter profile, readiness score, a TCPA-compliant preference
matrix, assignment diary, facility intel, and an agency recruiter inbox). It's fully brand-
themed (Outfit type, Plum Grove/cream palette, pill + speech-bubble shape language, no
gradients/emoji), built beside the production "god components" without touching them, fully
build-isolated, and loudly stubbed: fabricated data uses fictional medical-TV names, a
persistent DEMO banner sits on every page, and a small set of "target-state" badges mark the
few not-yet-live claims (recruiter SLA, SMS subscription, facility photos). Live job-detail
insight tabs hit the real API with a silent stub fallback. It type-checks clean, builds for
production, and passed independent link and compliance audits.
