# Scrub Society — MVP Extraction Plan

> Derived from the Social Lab prototype.
> Goal: Smallest realistic product that delivers genuine value to travel nurses, collects real data, and validates the core hypothesis before raising a Series A or hiring a full engineering team.
> Estimated scope: 3–5 engineers, 3–4 months.

---

## Core Hypothesis to Validate

> Travel nurses will contribute facility intelligence (pay rates, insider notes, Q&A) when given an anonymous, peer-trusted channel — and will make better contract decisions as a result.

The MVP must make this hypothesis testable with real users and real data, not simulate it.

---

## MVP Features (Build These)

### 1. Facility Intel Hub
The highest-value surface in the prototype. A per-facility page aggregating:
- Community-reported pay rates (specialty, rate, period, anonymized agency)
- Q&A thread (question + answers from verified members)
- Insider notes (culture, scheduling, management, safety — by note type)
- Traveler score (computed from reviews, Q&A volume, pay reports)
- Basic facility info (location, type, bed count)

**Why:** This is the product's core defensible asset. Without a real facility hub, nothing else matters.

### 2. Pay Transparency Layer
- Pay report submission (specialty, hourly rate, weekly package, agency, period, anonymous flag)
- Community average calculation by specialty × facility
- Pay reality check: compare a job's listed rate vs. community average
- Pay board: filterable list of recent reports

**Why:** Pay opacity is the #1 pain point. This is the hook that brings travelers in and keeps them contributing.

### 3. Verified User Accounts
- Real authentication (email + password, or OAuth via Google/Apple)
- Basic profile: name, specialty, license state, years of experience, travel status
- Nursing license number capture (for future verification — store but don't verify at MVP)
- No anonymous accounts — contributions are pseudonymous, not fully anonymous, at MVP

**Why:** Trust is the product. Unverified contributors undermine the intelligence value. Even pseudonymous attribution (handle only) is better than fully anonymous at MVP.

### 4. Contribution Forms (Wire to Real DB)
- Pay report submission (persisted, visible immediately)
- Q&A submission (question + optional answer)
- Insider note submission (goes to moderation queue)
- Review submission (rating + text, published after moderation)

**Why:** Read-only facility pages generate no defensible data asset. The contribution loop must work.

### 5. Basic Moderation Queue (Internal Tool)
- Moderation queue for insider notes and reviews (submitted content goes into `pending`)
- Admin review: approve / request edit / reject with note
- PHI auto-flagging: regex + keyword scan before submission
- Simple admin dashboard: pending count, recent actions, flagged items

**Why:** Insider notes and reviews carry real legal exposure. A human review gate is mandatory before anything anonymous goes live.

### 6. Job Board (Read-Only, Minimal)
- List of open positions with facility link + specialty + pay rate
- Pay reality check badge: listed rate vs. community average
- Link to facility hub from every job card
- No real application submission — "Contact Agency" link only

**Why:** Jobs are the entry point. Travelers arrive because of a job listing, then stay for the facility intel.

### 7. Email Notifications (Minimal)
- "New answer to your Q&A" — triggered when someone answers a question you posted
- "New pay report at a facility you follow" — triggered on new pay submission
- Weekly digest: top pay reports in your specialty

**Why:** Retention mechanism. Without notifications, users visit once and don't return.

---

## Non-MVP Features (Defer These)

| Feature | Why it's deferred |
|---------|------------------|
| Social feed (posts, comments) | Requires critical mass to be valuable. Builds on top of facility intel, not alongside it. |
| Healthcare-specific reactions | Depend on feed. Defer with feed. |
| Messaging / DMs | Complex, legally risky (PHI in DMs), and not the primary value at MVP. |
| Community pages | Requires volume. A community of 8 people is not a community. |
| City/travel hubs | Nice to have, not core. City intel goes stale faster than facility intel. |
| Stories | Marked Kill in Product Lab. Not this decade. |
| Credential verification | Expensive to operate. License number capture is sufficient for MVP. |
| Recruiter accounts | Conflict of interest to manage. Defer. |
| Referral / affiliate programs | Defer until you have enough supply and demand to manage it. |
| Mobile app | Web-first. Mobile browser experience is sufficient for MVP. Build native when you have paying users. |
| Product Lab / admin feature matrix | Internal prototype tool. Not a user-facing feature. |

---

## Required Backend Models (Minimum Schema for MVP)

```
User
  id, email (hashed at rest), handle, name, specialty, licenseState, licenseNumber,
  yearsExperience, travelStatus, createdAt, updatedAt, role

Facility
  id, name, city, state, facilityType, bedCount, travelFriendlyScore (computed),
  createdAt, updatedAt

PayReport
  id, facilityId, authorId, specialty, hourlyRate, totalPkg, agency (optional),
  period, isAnonymous, isTravel, modStatus, createdAt

FacilityQA
  id, facilityId, authorId, question, answer (optional), isAnonymous, status, createdAt

FacilityInsiderNote
  id, facilityId, authorId, content, unit, noteType, isAnonymous, modStatus, createdAt

FacilityReview
  id, facilityId, authorId, rating, content, pros, cons, travelFriendly,
  isAnonymous, modStatus, createdAt

Job
  id, facilityId, title, specialty, payRate, jobType, shiftType, startDate,
  duration, description, externalUrl, isActive, createdAt, updatedAt

FacilityFollow
  id, userId, facilityId, createdAt

ModerationItem
  id, contentType, contentId, status, moderatorId, moderatorNote, flagReason, createdAt, resolvedAt

Notification
  id, userId, type, payload (JSON), isRead, createdAt
```

Not required at MVP: Post, Comment, Reaction, Community, CommunityMembership, WorkHistory, Credential, FeatureScore, Story.

---

## Required API Routes (Minimum for MVP)

### Auth
- `POST /api/auth/register` — email + profile
- `POST /api/auth/login` — email + password
- `POST /api/auth/logout`
- `GET /api/auth/me` — current user

### Facilities
- `GET /api/facilities` — filterable list (state, type)
- `GET /api/facilities/:id` — full hub with aggregates
- `POST /api/facilities/:id/follow`

### Pay Reports
- `GET /api/pay-reports` — filterable board
- `POST /api/pay-reports` — submit report
- `GET /api/facilities/:id/pay-reports` — for facility hub

### Q&A
- `GET /api/facilities/:id/qa` — list for facility
- `POST /api/facilities/:id/qa` — submit question
- `POST /api/qa/:id/answer` — submit answer

### Insider Notes
- `GET /api/facilities/:id/notes` — approved only
- `POST /api/facilities/:id/notes` — submit (goes to moderation)

### Reviews
- `GET /api/facilities/:id/reviews` — approved only
- `POST /api/facilities/:id/reviews` — submit (goes to moderation)

### Jobs
- `GET /api/jobs` — filterable list
- `GET /api/jobs/:id` — detail with pay reality check

### Moderation (Admin only)
- `GET /api/admin/moderation` — pending queue
- `POST /api/admin/moderation/:id/approve`
- `POST /api/admin/moderation/:id/reject`

### Notifications
- `GET /api/notifications` — for current user
- `POST /api/notifications/:id/read`

---

## Required UI Components

### Page-level
- Facility Hub (primary surface — detailed and data-rich)
- Job Board (list + job detail with pay reality check)
- Pay Transparency Board (filterable list)
- User Profile (view + edit own)
- Moderation Dashboard (admin only)
- Notification Center

### Shared Components
- `FacilityCard` (compact + full variants)
- `JobCard` (with pay diff badge, network count)
- `PayReportCard`
- `QAThread`
- `InsiderNoteCard`
- `ReviewCard`
- `ContributionPanel` (4-tab form: Q&A / Note / Review / Pay)
- `ModerationQueue`
- `NotificationBell` + `NotificationList`
- `AuthModal` (login + register)
- `UserAvatar`
- `VerifiedBadge`
- `PayRealityCheck` (job detail panel)
- `TravelerScoreBar`
- `EmptyState` (generic + context-specific variants)
- `Toast` / `Toaster`

### What can be reused from prototype (conceptually, not code-for-code)
- `FacilityContributionForms` — form structure, tab layout, mobile layout patterns
- `PayRealityCheck` — the calculation logic and UI treatment
- `TravelerScoreBar` — the visual component
- `ModerationQueue` — the UI pattern (adapt to use real DB reads)
- `Toaster` — the event-based toast system can be directly ported
- Design tokens (dark navy, teal accent, card/badge/button patterns)

### What should be rebuilt cleanly
- Auth flows (prototype has none — start from scratch with real auth)
- User profile (add real fields: specialty, license state, license number)
- Moderation queue (rewrite as server-driven, not client-side state)
- Any component that directly mocks DB data or uses `Math.random()`

---

## Required Analytics Events

Instrument these from day one. These are the metrics that validate the core hypothesis.

| Event | Properties | Why |
|-------|-----------|-----|
| `facility_hub_viewed` | facilityId, userId, source (job / search / direct) | Primary surface engagement |
| `pay_report_submitted` | facilityId, specialty, hourlyRate, isAnonymous | Core contribution |
| `qa_submitted` | facilityId, hasAnswer | Contribution quality |
| `insider_note_submitted` | facilityId, noteType, isAnonymous | High-value contribution |
| `review_submitted` | facilityId, rating, travelFriendly | Contribution quality |
| `pay_reality_check_viewed` | jobId, facilityId, pctDiff, direction | Core value delivery |
| `job_external_click` | jobId, facilityId | Conversion signal |
| `facility_followed` | facilityId | Retention signal |
| `notification_opened` | notificationId, type | Retention |
| `user_registered` | specialty, travelStatus | Funnel |
| `user_returned` | daysSinceLastVisit | Retention |

---

## Required Moderation Rules (Pre-Launch)

These must be defined, documented, and built before any user-generated content goes live.

1. **PHI detection** — Regex + keyword scan blocking: patient names, dates of service, room numbers, diagnosis terms, "patient in [location]" constructs. Auto-reject with user notification.

2. **Named individual prohibition** — Content referencing specific named individuals (managers, coworkers) must be flagged for human review. No automation can reliably handle this.

3. **Anonymous insider notes** — All anonymous submissions go to `modStatus: pending` before publication. No exceptions.

4. **Pay report sanity check** — Hourly rates outside 2× standard deviation of specialty average auto-flag for review (suspect recruiter inflation or data entry error).

5. **Review bombing detection** — Multiple reviews for the same facility from the same IP or device fingerprint within a short window → auto-hold.

6. **Content removal SLA** — Documented policy: flagged content reviewed within 24 hours by a human moderator. Response time to reporter: 72 hours.

7. **Mental health escalation** — Any content mentioning suicide, self-harm, or crisis situations → immediate escalation path (not just moderation). This is a documented pattern from the prototype's moderation examples.

8. **Recruiter impersonation** — Accounts appearing to post fake pay reports or facility reviews from recruiter accounts are a documented risk. IP/device tracking + community flagging.

---

## Required Legal / Privacy Review (Before Any Real Users)

- **Terms of Service** — Define what users can and cannot post. Anonymous post policy. Dispute resolution for facility defamation claims.
- **Privacy Policy** — GDPR / CCPA compliant. Anonymous submission data handling. Data retention policy. Right to deletion.
- **Anonymity disclaimer** — Users must understand what "anonymous" means on the platform and what it does not mean (it is not legally privileged).
- **Defamation exposure** — Section 230 analysis. Content moderation policy must be documented and consistently applied to maintain platform protections.
- **HIPAA adjacency** — Even if the platform itself is not a covered entity, content about patient situations may create liability. Counsel review required.
- **Pay report manipulation** — If the pay transparency layer influences contract negotiations, there may be regulatory considerations (financial advice adjacency, labor market regulation).
- **Recruiter accounts** — If recruiters are permitted to post, a conflict of interest policy and disclosure requirement must be defined.
- **License number collection** — Even if not verified at MVP, collecting license numbers creates a data responsibility. Define how it's stored, used, and protected.

---

## Suggested Build Sequence

### Phase 1 — Infrastructure (Weeks 1–4)
- Production database (PostgreSQL)
- Real authentication (email + OAuth)
- User registration + basic profile
- Facility data ingestion (manual seeding of top 200 hospitals from public sources)
- Internal admin tooling foundation
- CI/CD pipeline + staging environment

### Phase 2 — Core Intelligence Layer (Weeks 5–10)
- Facility hub (read-only, with aggregates)
- Pay report submission + board
- Q&A submission
- Insider note + review submission (to moderation queue)
- Moderation queue (internal admin tool)
- PHI auto-flagging

### Phase 3 — Job Discovery (Weeks 11–14)
- Job board (manual seeded jobs initially, or one agency API partnership)
- Job detail with pay reality check
- Facility follow + email notifications

### Phase 4 — Retention + Growth (Weeks 15+)
- Email notification system
- Weekly digest
- Referral / invite mechanics (simple)
- Analytics instrumentation
- Community features (if hypothesis is validated)

---

## What Can Be Reused vs. Rebuilt

| Prototype Asset | Recommendation |
|----------------|---------------|
| Dark navy + teal design system | Reuse — it's polished and distinctive |
| Facility hub page layout | Reuse conceptually, rebuild in real stack |
| Job card with pay diff badge | Reuse conceptually |
| PayRealityCheck component | Reuse directly if Next.js stack continues |
| FacilityContributionForms structure | Reuse conceptually, rebuild with real validation |
| Toast system (lib/toast.ts) | Reuse directly |
| Healthcare reaction taxonomy | Keep — it's a product differentiator |
| Moderation queue UI | Reuse structure, rebuild to read from real DB |
| Prisma schema (16 models) | Reuse as foundation — prune non-MVP models |
| Seed data personas | Reuse for QA and staging environments |
| DEMO_SCRIPT.md | Reuse for investor/partner demos |
| Product Lab feature matrix | Reuse internally for roadmap decisions |
| SQLite database | Do not carry forward — switch to PostgreSQL |
| Mock cookie auth | Do not carry forward — real auth from day one |
| Client-side moderation state | Do not carry forward — rebuild server-driven |

---

*MVP Extraction Plan — Scrub Society Social Lab handoff package. Internal use only.*
