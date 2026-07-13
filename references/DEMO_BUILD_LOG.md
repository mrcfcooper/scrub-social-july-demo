# DEMO_BUILD_LOG — Phase 2 clickable demo

**Branch:** `demo/phase2-clickthrough` (local only unless Cooper pushes to staging)

## Iteration pass — 2026-06-11 (Cooper's click-through feedback)

1. **Color tokens corrected to brand standard.** The design-system README's naming was wrong (the original brief was right): now `--open-air: #F9F2E8` (cream), `--morning-dew: #CEDBFE`, `--clear-sky: #82ABF4` in demo.css. Applied as a 3-cycle variable rename across all demo files, so every screen's rendered colors are unchanged — verified by computed-style check (page background still resolves to the cream). Derived tokens renamed `--clear-sky-dark` / `--clear-sky-tint`.
2. **Facility intel fixed.** Root cause of the unreadable header: `.ss-demo .ss-headline` (plum ink, specificity 0,2,0) silently beat the screen's single-class cream overrides — facility name rendered plum-on-plum. Fixed with higher-specificity rules; all hero text now cream `#F9F2E8` or ≥ rgba(249,242,232,.78). Screen made responsive to 393px (new ≤600px breakpoint; verified in-browser at 393×800). Score ring renders its final value immediately (no count-up; 320ms fill only, disabled under reduced motion). The same plum-on-plum bug was found and fixed on the recruiter profile's two name headlines during the verification pass.
3. **Preference Center rebuilt as the notification matrix** (web): 7 topic rows × Push/Email/SMS/In-app columns, per-cell toggles with per-cell frequency selects (per `matrix-mockup.html`), legend, unsubscribe-all-emails (touches email only), quiet hours, save confirmation. Collapses to per-topic cards ≤700px. TCPA re-verified at runtime in-browser: all SMS cells default OFF; tapping any SMS cell opens the consent dialog (rates + STOP language); Agree stays disabled until the consent checkbox is ticked; only the consented cell turns on; the subscribed state carries the target-state badge.
4. **Prototype navs removed** from web home and job detail — the real app header (Community/Resources dropdowns) is the only chrome.
5. **Recruiter portrait**: initials avatar replaced with a stock-style portrait in both views (`/demo/assets/recruiter-portrait.png`, cropped from imagery already bundled in the prototypes; not a real identifiable person — initials remain as onError fallback).
6. **Facility photos as the future-capability story**: `DEMO_FACILITY_PHOTOS` maps facility → photo for Sacred Heart Hospital and Seattle Grace Hospital only; jobs list thumbs, job detail hero, home featured card, and facility intel hero render the photo where known (badged target-state) and an on-brand flat placeholder elsewhere. Hero photos downscaled (9.2MB → ~250KB each) and unused font binaries removed; assets folder now 2.4MB total.
7. **Missing layouts — findings from the source exports**: the readiness/lead-score export (`clean/lead-score`) and the assignment-diary export (`clean/assignment-diary`) are **mobile-only designs** (no desktop layout, no media queries; phone-mock structure), so per instruction no web layouts were invented — both remain phone-framed. Facility intel's export is web-only; our implementation is now responsive, covering the mobile bezel.
8. **Naming**: displayed people/hospitals now use recognizable fictional medical-TV names — Carol Hathaway (nurse persona), Carla Espinosa (recruiter), Sacred Heart, Seattle Grace, County General, Mercy West, Princeton-Plainsboro, Pacific Northwest General, Seattle Presbyterian, Princeton General, Mercy Hospital, St. Eligius; inbox candidates Cristina Yang, Allison Cameron, Izzie Stevens, Christopher Turk, Susan Lewis; reviewers John Carter, Samantha Taggart, Elliot Reid, Abby Lockhart, J.D. Dorian; references Lisa Cuddy, Kerry Weaver; blog authors Laverne Roberts, Peter Benton. Agencies are show-riffs (St. Elsewhere Staffing, New Amsterdam Partners, Chicago Hope Staffing, Night Shift Medical) to avoid colliding with real staffing brands. All defined in the demo data module (constants keep their `DEMO_` prefixes in code); no `DEMO_` appears in any displayed string. Per-element "demo data / live data" pills removed (live-fetch fallback wiring kept, silent). **Target-state badges reduced to exactly 9**, on: the one-business-day recruiter SLA (home, job detail, apply ×2 incl. the delivery-confirmation line), the SMS subscribed state, and the four facility-photo renders.

**Badge-policy interpretation note:** the brief's "keep exactly two things" lists the SLA and SMS badges; facility photos also carry one because item 6 explicitly asks for it, and the apply flow's delivery-confirmation line keeps its badge because rendering it as real is the exact compliance risk the original brief flagged. Total: 9 badges, enumerated above — say the word to trim further.

**Staging-readiness:** `/demo` is fully build-isolated — no file outside `frontend/app/(public)/demo/` imports demo code (verified by grep, confirmed by an independent verifier); demo styles are scoped under `.ss-demo`; the only global side effect is hiding the production chat launcher via a `body.ss-demo-mode` class that the demo layout adds on mount and removes on unmount. **`npm run build` (production) completed with exit 0** — all 14 demo routes appear in the route manifest (the only build warnings are pre-existing blog-prerender cache notices from the real app, unrelated to the demo).

**Iteration verification (evidence from this run):**
- All 15 demo route checks return HTTP 200; `npx tsc --noEmit` → 0 errors in demo files; browser console → 0 errors across the re-verified screens
- TCPA matrix re-verified at runtime in-browser (defaults, dialog gating, single-cell consent, badge)
- Fresh-context link verifier: PASS — no broken links, no links leaving /demo, no missing assets, spine continuity intact, all 12 board-job ids resolve in detail + apply
- Fresh-context compliance verifier: PASS on all verifiable rules — no `DEMO_` in any displayed string; badge inventory is exactly the 9 allowed placements (plus the launchpad's intentional legend chip explaining the convention); TCPA code paths sound; no secrets; build isolation confirmed; tokens correct. Its two nits (a real agency name in a source comment; one inconsistent stub email) were fixed after its run. Scope-of-diff it could not check (git denied in its sandbox) — verified directly: `git diff main...HEAD --name-only` contains only demo surfaces.
- One session-state note: SMS consent is granted once per browser session (channel-level), so re-enabling an SMS cell later doesn't re-prompt — matches the channel-level consent rule; flag if per-cell re-consent is wanted.

---

**Original build (pass 1):**
**Status legend:** built / partial / blocked / in progress
**Run:** started 2026-06-11. Dev server: `cd frontend && npm run dev` → http://localhost:3000/demo

All design sources were found as local exports in `~/Downloads` (the `api.anthropic.com` share links in the tracker have expired and return 404). They are staged in `demo-designs/` — `demo-designs/clean/<name>/` holds the de-bundled, readable template + source for each prototype; extracted images live in `frontend/public/demo/assets/`.

## Foundation

### 0. Design system
- **Status:** built
- **Where:** tokens scoped under `.ss-demo` in `frontend/app/(public)/demo/demo.css`; canonical bundle staged at `demo-designs/design-system/` (README, colors_and_type.css, UI kits)
- **Note:** the build brief's color names were swapped vs. the design-system README; hex values agree, README naming used (Morning Dew `#F9F2E8` background, Open Air `#82ABF4` accent).

## Demo shell (not in the manifest, required for coherence)
- **Status:** built
- Routes under `/demo` with launchpad at `/demo`; persistent striped DEMO banner with spine step links; phone-bezel frame for mobile-primary screens; `TargetState` badge component; canonical stub data in `_lib/demoData.ts`; production chat launcher hidden on demo routes.

## Primary spine — all verified in-browser (HTTP 200, interactive walk-through, 0 console errors, 0 demo type errors)

### 1. Erin onboarding flow — TSS-1116
- **Route:** /demo/onboarding
- **Status:** built (clicked through welcome → profession step in browser; full 7-step conversational flow + match results)
- **Stubbed:** DEMO_ERIN_* option sets and copy, DEMO_NANCY_PATH quick path (sparkled chips), DEMO_MATCH_COUNT, DEMO_PAY_DELTA
- **Target-state:** match-fit % (TSS-1111 scoring), Erin's proactive-watch promise, "proactive ranking · phase 2" results header

### 2. Home — Web
- **Route:** /demo/home
- **Status:** built (verified: hero w/ extracted photo, quick-action tiles, Erin match band, featured jobs, events, employers, blog, plum footer — all CTAs wired into demo routes)
- **Stubbed:** DEMO_MEMBER_COUNT, DEMO_QUICK_LINKS, DEMO_EVENTS (DEMO_TravFest 2026), DEMO_EMPLOYERS, DEMO_BLOGS (authors DEMO_Maya_Medsurg, DEMO_Devon_Dayshift); prototype's real agency names (Aya, AMN, TNAA…) replaced with DEMO_ fictional ones
- **Target-state:** Erin proactive match band; "recruiter follows up within one business day" SLA copy (badged inline, per brief — confirm with Jenny before public use)
- **Known artifact:** the prototype's own site nav renders below the real app header (double nav) — kept because the prototype nav is the proposed Phase 2 IA and its links stay inside the demo; the real shell's links leave the demo

### 3. Home — Mobile
- **Route:** /demo/home-mobile
- **Status:** built (verified in phone bezel: greeting hero, ask pill, quick actions, featured-jobs strip, Erin teaser, event teaser, bottom tab bar; pushed-off sections show "lives in its own tab" toast)
- **Stubbed:** DEMO_HOME_EVENT (DEMO_Mile_High_Park meetup), DEMO_TAB_NOTE, DEMO_GREETING
- **Target-state:** Erin proactive-matching teaser

### 4. Jobs list
- **Route:** /demo/jobs
- **Status:** built (verified: search/filters/sort/save all functional over 12 DEMO_ jobs; cards link to job detail)
- **Stubbed:** DEMO_EXTRA_JOBS (demo-job-7…12 at DEMO_Foggy_Harbor_General, DEMO_Larkfield_Childrens, DEMO_Copper_Canyon_Medical, DEMO_Sunny_Mesa_Regional, DEMO_Evergreen_Summit_Health), DEMO_TOTAL_BOARD (2,400), DEMO_INITIAL_SAVED_IDS
- **Target-state:** "Erin is watching the board" module (its Show-my-matches button really filters)

### 5+6. Job detail — TSS-1109 + Housing tab — TSS-1118
- **Route:** /demo/jobs/demo-job-1 (Accommodation tab carries TSS-1118; demo-job-2…12 and unknown-id fallback also work)
- **Status:** built (verified: hero, pay rail + breakdown, all six tabs incl. Accommodation with map/pins/listings; Apply CTA → apply flow)
- **Live wiring:** rich tabs call the real location-insights endpoint (same contract as `locationInsightsAPI`) with 4s timeout → DEMO_ stub fallback; each tab carries a "live data" / "demo data" pill. From this sandbox the staging probe is blocked so tabs show "demo data"; on a network that reaches staging they flip to live automatically.
- **Stubbed:** DEMO_FACILITY_PHOTO, DEMO_HOUSING_* (availability/pins/filters), DEMO_NIGHTLY/DEMO_ASSIGNMENT_TOTAL calculators
- **Target-state:** SLA copy in pay card, % match chip, facility reviews line (Phase 3), "Reserve through Scrub Society" booking CTA (Phase 3)

### 7+8. Erin chat widget — TSS-1108 + Erin job match — TSS-1111
- **Route:** global overlay on all /demo routes except /demo/agency (launcher bottom-right)
- **Status:** built (verified: scripted conversation with typing indicator and one-tap replies plays through; TSS-1111 match cards render in-thread and link to job detail; state survives navigation via sessionStorage)
- **Stubbed:** DEMO_ERIN_NUDGE / MATCH_INTRO / MATCH_OUTRO, DEMO_MATCH_CARDS join, TYPING_MS
- **Target-state:** panel header badge, proactive nudge notification, "I'll keep watching the board" outro — Erin is context-injection today, not an agent loop

### 9. Apply flow — TSS-1107
- **Route:** /demo/apply/demo-job-1
- **Status:** built (verified: 3-step stepper Confirm profile → Documents → Review, prefilled from DEMO_NURSE, submit reached in-browser)
- **Stubbed:** DEMO_APPLY_DOCS (incl. DEMO_Nancy_Nightshift_Resume.pdf)
- **Compliance:** end state is "Application submitted — DEMO_Rita_Recruiter takes it from here"; "Delivery confirmation from the recruiter" and "follow-up within one business day" are listed but badged target-state, with a footnote that submissions are fire-and-forget today. No delivered/confirmed state rendered as real.

## Secondary — all routes verified 200, 0 demo type errors, 0 console errors

### 10. Profile
- **Route:** /demo/profile — **Status:** built (screenshot-verified)
- **Stubbed:** DEMO_LICENSES/CERTIFICATIONS/SPECIALTIES/WORK_HISTORY/EDUCATION/REFERENCES (DEMO_Marisol_Manager, DEMO_Charlie_ChargeNurse), DEMO_DOCUMENTS, DEMO_APPLICATION, fictional DEMO_Camelback_Heights_Medical, DEMO_Sonoran_State_University
- **Target-state:** completeness meter + resume auto-fill/parsed resume (TSS-1019), readiness card (TSS-1112)

### 11. Recruiter profile — TSS-1110
- **Route:** /demo/recruiter — **Status:** built (screenshot-verified; both in-app mobile view and shareable web-slug view)
- **Identity:** prototype's "Maya Torres" mapped to canonical DEMO_Rita_Recruiter so job detail/apply/agency stay coherent
- **Stubbed:** DEMO_PLACED_COUNT, DEMO_TESTIMONIALS (DEMO_Tina_Traveler, DEMO_Victor_Vitals), DEMO_OPEN_ROLES
- **Target-state:** community ratings/reviews (Phase 3) — 3 badges

### 12. Readiness / lead score — TSS-1112
- **Route:** /demo/readiness — **Status:** built (screenshot-verified; animated score ring, factor bars)
- **Stubbed:** DEMO_BANDS, DEMO_RAISE_ITEMS; consumes canonical DEMO_READINESS
- **Target-state:** the whole concept — badges on score card, recruiter-facing framing, and point-gain nudges

### 13. Preference Center — TSS-1113
- **Route:** /demo/preferences — **Status:** built (runtime-verified compliance, not just code review: SMS switch is the only control defaulting OFF; toggling it opens a consent dialog with message/data-rates + STOP language; Agree stays disabled until the consent checkbox is ticked; after explicit confirm the subscribed state carries the target-state badge per SSGNR-20)
- **Stubbed:** DEMO_TOPICS/TOPIC_DEFAULTS/FREQUENCIES/QUIET_*_OPTIONS, DEMO_SMS_CONSENT_COPY
- **Compliance:** TCPA rules from the brief implemented and runtime-tested

### 14. Assignment diary — TSS-1114
- **Route:** /demo/diary — **Status:** built (screenshot-verified; entry flow is fully tappable and saves to the timeline)
- **Stubbed:** DEMO_CURRENT_ASSIGNMENT, DEMO_PARKING/CHARTING/FLOAT/TAG_OPTIONS, DEMO_IMPACT; "Rose Medical Center" replaced with DEMO_Pinnacle_Peak_Medical_Center
- **Target-state:** 5 badges (diary/review data is Phase 3)

### 15. Facility Intel — TSS-1115
- **Route:** /demo/facility — **Status:** built (screenshot-verified)
- **Stubbed:** DEMO_SYSTEM (DEMO_Summit_Range_Health), DEMO_FACILITY_SCORE, DEMO_RATINGS, DEMO_CULTURE_TAGS, DEMO_UNIT_NOTES, DEMO_REVIEWS (DEMO_Ivan_ICU, DEMO_Tessa_Tele, DEMO_Erica_ER), diary excerpts
- **Target-state:** member-generated score, ratings breakdown, reviews + diary wrap (Phase 3)

### 16. Agency portal / recruiter inbox — TSS-1117
- **Route:** /demo/agency — **Status:** built (screenshot-verified; inbox/conversation/tracking panes all functional in local state; below 768px shows a "designed for desktop" card per brief)
- **Narrative:** DEMO_Nancy_Nightshift's application for demo-job-1 tops the inbox with an Erin handoff — consistent with the apply flow
- **Stubbed:** DEMO_INBOX candidates (DEMO_Tara_Telemetry, DEMO_Ellie_Emergency, DEMO_Carmen_Cardiac, DEMO_Oscar_Operating, DEMO_Layla_Laborday), DEMO_AGENCY_WORKSPACE, DEMO_PIPELINE_STAGES
- **Target-state:** readiness scores on rows, readiness panel, Erin handoff card
- **Erin overlay:** suppressed on this route (vendor surface)

## Manifest decisions taken (ambiguities resolved without blocking)

1. **Expired share links.** Every `api.anthropic.com/v1/design` URL 404s. Used the local standalone exports from `~/Downloads` (same artifacts, verified by title/content). The S3 home file is byte-identical to the local `Scrub Society Home.html`.
2. **Preference Center (TSS-1113).** The tracker's export warning doesn't apply to the local file: `TSS-1113 - Preference Center (standalone).html` really is the Preference Center (verified by title/content). Building from it as visual reference, while enforcing the brief's compliance rules (SMS consent defaults OFF, explicit opt-in, subscribed state = target-state).
3. **Color naming.** Brief vs. design-system README disagree on names for `#F9F2E8`/`#82ABF4`/`#CEDBFE`; hexes agree. Followed the README.
4. **Real-world names in prototypes.** Prototype fixtures reference real orgs (HCA HealthONE, Aya Healthcare). Replaced with fictional `DEMO_` entities per the stub convention (`DEMO_Pinnacle_Peak_Medical_Center`, `DEMO_Atlas_Staffing_Co`).
5. **"Mobile" surface.** The product's mobile app is the same Next.js code in Capacitor. Mobile-primary screens are shown inside a phone bezel on desktop so stakeholders see the mobile experience without a device.

## Stub audit (grep -r DEMO_ over frontend/app/(public)/demo — 145 distinct identifiers, 153 `// DEMO STUB` comments)

**People (all fictional, alliterative per convention):** DEMO_Nancy_Nightshift (the nurse persona), DEMO_Rita_Recruiter, DEMO_Ivan_ICU, DEMO_Tessa_Tele, DEMO_Erica_ER, DEMO_Tina_Traveler, DEMO_Victor_Vitals, DEMO_Maya_Medsurg, DEMO_Devon_Dayshift, DEMO_Marisol_Manager, DEMO_Charlie_ChargeNurse, DEMO_Tara_Telemetry, DEMO_Ellie_Emergency, DEMO_Carmen_Cardiac, DEMO_Oscar_Operating, DEMO_Layla_Laborday

**Organizations (all fictional):** DEMO_Atlas_Staffing_Co, DEMO_Cactus_Care_Partners, DEMO_Pinnacle_Peak_Medical_Center, DEMO_Summit_Range_Health, DEMO_Bluebird_Bay_Regional/Health, DEMO_Granite_Gate_University_Hospital/Health, DEMO_Harborlight_Community, DEMO_Saguaro_Springs_Medical, DEMO_Foggy_Harbor_General, DEMO_Larkfield_Childrens, DEMO_Copper_Canyon_Medical, DEMO_Sunny_Mesa_Regional, DEMO_Evergreen_Summit_Health, DEMO_Camelback_Heights_Medical, DEMO_Sonoran_State_University, housing: DEMO_The_Larkspur_Lofts, DEMO_Quietwater_Residences, DEMO_Stipend_Stretch_Suites; events: DEMO_TravFest, DEMO_Mile_High_Park

**Data sets:** DEMO_JOBS (+DEMO_EXTRA_JOBS = 12 jobs), DEMO_MATCHES, DEMO_READINESS, DEMO_DIARY, DEMO_HOUSING, DEMO_COST_OF_LIVING/WEATHER/TRANSPORT_CRIME (rich-tab fallbacks), DEMO_ERIN_SCRIPT (+nudge/intro/outro copy), DEMO_INBOX, plus per-screen option sets (full inventory: run `grep -rhoE "DEMO_[A-Za-z0-9_]+" frontend/app/\(public\)/demo | sort -u`)

**Contact details:** all phones in the 555 range; all emails on `.invalid` domains.

## Fresh-context verifier results (two independent audit agents)

**Compliance/stub auditor — all 7 rules PASS:** stub convention (no real staffing agencies or hospital systems displayed anywhere; word-boundary sweep for Aya/AMN/TNAA/HCA/Vivian/Rose Medical etc. returned zero hits), god components untouched, TCPA implementation verified in code (single `setSmsOptIn(true)` call site, guarded by explicit consent), apply flow renders no real delivery confirmation, all required target-state flags present (verified by file:line), no secrets (single `process.env` reference is the allowed `NEXT_PUBLIC_API_URL`), no new dependencies (only react / next/* / lucide-react across all 44 demo files).
- Noted judgment call, accepted as-is: a few surfaces display fictional entities with the `DEMO_` prefix stripped for layout reasons (mobile-home quick cards, diary headline, scripted agency-chat copy like "Rita here from Atlas"). Canonical definitions stay prefixed, names are obviously fictional, and the persistent DEMO banner marks every screen.

**Link-graph auditor — 2 findings, both fixed and re-verified this run:**
1. Onboarding match card "Apply now" linked to `/demo/apply` (404). Fixed → `/demo/apply/demo-job-1`.
2. Job detail and apply flow only looked up jobs 1–6, so extended-board cards (demo-job-7…12) silently showed the wrong job. Fixed → both screens now look up `DEMO_BOARD_JOBS`; `/demo/jobs/demo-job-7` verified rendering "MedSurg Travel RN in San Francisco" at DEMO_Foggy_Harbor_General with matching apply page.
- Also confirmed: zero links that leave `/demo/*` from any demo screen; spine continuity complete; all 14 route wrappers resolve.

## Verification summary (evidence from this run)

- All 14 demo routes return HTTP 200 (curl, this session)
- `npx tsc --noEmit`: 0 errors in any demo file (742 pre-existing errors elsewhere in the repo, untouched)
- Browser console: 0 errors across the full spine walk + all secondary screens (only pre-existing PushNotifications warnings from the production shell)
- Interactive walk-through performed in-browser: onboarding steps, jobs filtering, job-detail tabs incl. Accommodation, apply 3-step flow to submitted state, Erin chat script through match cards, TCPA consent flow
- `git diff main...HEAD --name-only`: only demo surfaces (demo routes, public/demo assets, demo-designs, this log, .claude/launch.json); god components untouched
- No `.env*`, secrets, or credentials read at any point (the dev server itself loads `.env.local` as it always does; its contents were never read into this work)
- Branch `demo/phase2-clickthrough`: 3 local commits, unpushed, unmerged

## How to run the demo

```bash
cd frontend && npm run dev
# open http://localhost:3000/demo
```

Start at `/demo` (launchpad) or go straight into the spine via the DEMO banner's numbered steps. The Erin launcher (bottom-right) works on every demo page except the agency portal.
