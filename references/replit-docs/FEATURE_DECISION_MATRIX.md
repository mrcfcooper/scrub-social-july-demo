# Scrub Society — Feature Decision Matrix

> Scoring: 1 (low) to 5 (high) for value dimensions.
> Risk dimensions: 1 (low risk/complexity) to 5 (high risk/complexity).
> Decision: Keep | Kill | Later | Research | Legal Review
> Last reviewed: 2026-05-03

---

## Scoring Key

| Dimension | Direction | Meaning |
|-----------|-----------|---------|
| User Value | ↑ = better | How directly this helps a traveler make a better decision |
| Marketplace Value | ↑ = better | How much this drives supply/demand participation |
| Data Asset Value | ↑ = better | How much this creates a defensible, proprietary data layer |
| Legal / Mod Risk | ↑ = worse | How much legal exposure or moderation burden this creates |
| Tech Complexity | ↑ = worse | How technically difficult to build correctly |
| MVP | ✅ / ⏳ / ❌ | ✅ = include in MVP, ⏳ = defer, ❌ = do not build |

---

## Feature Decision Matrix

| Feature | Decision | User Value | Marketplace Value | Data Asset Value | Legal/Mod Risk | Tech Complexity | MVP | Notes |
|---------|----------|:-----------:|:-----------------:|:----------------:|:--------------:|:---------------:|:---:|-------|
| **Facility Hub** | **Keep** | 5 | 4 | 5 | 2 | 3 | ✅ | Highest-value surface. Aggregates all 4 intelligence types in one place. Primary reason travelers use the product. |
| **Pay Report Submission** | **Keep** | 5 | 5 | 5 | 3 | 2 | ✅ | Core data contribution. Pay opacity is the #1 complaint. Anonymous submission is table stakes. |
| **Pay Transparency Board** | **Keep** | 4 | 4 | 4 | 3 | 2 | ✅ | Filterable board. Secondary to facility hub but strong standalone. Drives SEO and direct traffic. |
| **Pay Reality Check (job detail)** | **Keep** | 5 | 3 | 3 | 1 | 2 | ✅ | Listed rate vs. community avg with +/- %. Immediate legible value. No legal risk — math, not opinion. |
| **Q&A Submission** | **Keep** | 4 | 4 | 4 | 2 | 2 | ✅ | Low legal risk compared to insider notes. High-quality signal. Answers are attributed by default. |
| **Insider Notes** | **Keep** | 5 | 3 | 5 | 5 | 3 | ✅ | Highest user value, highest content risk. Anonymous insider notes = PHI/defamation risk. Mandatory moderation gate. |
| **Reviews (star + text)** | **Keep** | 4 | 3 | 4 | 4 | 2 | ✅ | Named/facility defamation risk is real. Moderation required. Core user expectation — no facility page looks complete without reviews. |
| **Traveler Score (computed)** | **Keep** | 4 | 3 | 3 | 1 | 3 | ✅ | Derived metric. Value depends on quality + volume of underlying data. Algorithm must be documented and explainable. |
| **Job Board** | **Keep** | 4 | 5 | 2 | 1 | 3 | ✅ | Entry surface. Travelers arrive via job search. No job board = no top-of-funnel. Does not need to be proprietary — can syndicate from partners. |
| **Healthcare-Specific Reactions** | **Keep** | 3 | 2 | 4 | 1 | 2 | ⏳ | Been There / Pay Intel / Red Flag / Same Shift / Traveler Tip. Unique taxonomy. Defer to when social feed is built. |
| **Facility Follow** | **Keep** | 3 | 2 | 2 | 1 | 2 | ✅ | Retention mechanic. "Alert me when there's a new pay report at this facility." Low risk, high retention value. |
| **Email Notifications** | **Keep** | 3 | 3 | 1 | 1 | 3 | ✅ | New answer to your Q&A, new pay report at followed facility, weekly digest. Required for retention. |
| **Community Feed (posts)** | **Keep** | 3 | 3 | 2 | 3 | 3 | ⏳ | Valuable at scale. Requires critical mass to be useful. Defer until facility intel layer has real data and users. |
| **Post Composer** | **Keep** | 3 | 3 | 2 | 3 | 2 | ⏳ | Depends on feed. Defer with feed. |
| **Comment Threads** | **Keep** | 3 | 2 | 2 | 3 | 2 | ⏳ | Depends on feed. Defer with feed. |
| **Moderation Queue (admin)** | **Keep** | 1 | 1 | 1 | 5 | 3 | ✅ | Internal tool — not user-facing. Mandatory before any UGC goes live. Without this, the platform is a liability. |
| **PHI Auto-Flagging** | **Keep** | 1 | 1 | 1 | 5 | 3 | ✅ | Regex + keyword scan at submission time. Non-negotiable before any anonymous content is accepted. |
| **User Authentication** | **Keep** | 1 | 5 | 5 | 3 | 3 | ✅ | Obvious. Start with email + OAuth (Google). Do not ship mock cookie auth. |
| **User Profiles** | **Keep** | 3 | 3 | 3 | 2 | 2 | ✅ | Name, specialty, license state, years of experience, travel status. License number capture (not verification) at MVP. |
| **Credential Verification** | **Research** | 4 | 4 | 4 | 3 | 5 | ❌ | High value if real. Extremely expensive to operate. Primary source verification is a separate business. Defer until post-Series A. |
| **Community Sub-Pages** | **Later** | 3 | 3 | 2 | 2 | 3 | ⏳ | Per-community feeds and member lists. Valuable at scale. Dead at launch. Defer 6–12 months. |
| **Messaging / DMs** | **Legal Review** | 4 | 3 | 1 | 5 | 4 | ❌ | "Ask someone who worked there" is a compelling CTA. DMs between healthcare workers carry HIPAA adjacency risk. Private channel for PHI leakage. Requires specific legal architecture. |
| **City / Travel Hubs** | **Later** | 3 | 2 | 2 | 1 | 2 | ⏳ | Housing tips, cost of living, safety notes by city. Nice context layer. Not core. Build when you have market coverage. |
| **Anonymous Posting (full)** | **Legal Review** | 4 | 2 | 3 | 5 | 3 | ⏳ | Fully anonymous posts (no pseudonymous attribution) carry significant defamation risk. Legal review required before enabling. Section 230 analysis needed. |
| **Recruiter Accounts** | **Research** | 2 | 4 | 2 | 5 | 3 | ❌ | Conflicts of interest (pay inflation, fake reviews). If allowed, requires strict disclosure + content separation. Research what Glassdoor / Blind learned first. |
| **Referral / Affiliate Program** | **Later** | 2 | 4 | 1 | 2 | 3 | ⏳ | Revenue mechanism. Defer until you have enough supply and demand to justify the management overhead. |
| **Stories** | **Kill** | 1 | 1 | 1 | 2 | 4 | ❌ | Ephemeral content has no data asset value. Healthcare travelers don't need a TikTok feature. Not this decade. |
| **Trending Topics / Explore** | **Later** | 2 | 2 | 2 | 1 | 3 | ⏳ | Good at scale. Useless at launch. Defer. |
| **Search (full-text)** | **Later** | 3 | 2 | 1 | 1 | 4 | ⏳ | Facility + job search is needed. Full-text content search requires Elasticsearch or similar. Faceted filter search (by state, specialty, type) is sufficient at MVP. |
| **Mobile App (native)** | **Later** | 4 | 3 | 2 | 1 | 5 | ⏳ | Mobile-responsive web is sufficient for MVP. Build native when you have 10k+ MAU and the budget to maintain two codebases. |
| **Terms of Service + Consent Flows** | **Keep** | 1 | 1 | 1 | 5 | 2 | ✅ | Non-negotiable. No production content before users have consented to terms that cover UGC, anonymity, and moderation. |
| **GDPR / CCPA Compliance** | **Keep** | 1 | 1 | 1 | 5 | 3 | ✅ | Data deletion, consent capture, retention policies. Required by law in target markets. Not optional. |
| **Abuse Prevention (rate limiting, CAPTCHAs)** | **Keep** | 1 | 1 | 1 | 4 | 3 | ✅ | Submission rate limits, IP-based throttling, suspicious pattern detection. Required before any public UGC surface goes live. |
| **Analytics (product)** | **Keep** | 1 | 2 | 3 | 1 | 2 | ✅ | Instrument from day one. Core events defined in MVP_EXTRACTION_PLAN.md. Product decisions without data are expensive guesses. |

---

## Summary Counts

| Decision | Count | Examples |
|----------|-------|---------|
| **Keep** | 20 | Facility Hub, Pay Reports, Job Board, Moderation, Auth, Analytics |
| **Later** | 8 | Community Pages, Social Feed, City Hubs, Mobile App, Search |
| **Kill** | 1 | Stories |
| **Research** | 2 | Credential Verification, Recruiter Accounts |
| **Legal Review** | 3 | Messaging / DMs, Full Anonymity, Anonymous Post Policy |

---

## Top 5 "Kill or Defer" Justifications

1. **Stories (Kill)** — Ephemeral content generates no proprietary data asset. The product's value is institutional memory, not daily updates.

2. **Credential Verification (Research → Later)** — Compelling, but primary source verification is a separate business (see: Nursys, state board API partnerships). Do not build a fake version that gives false assurance.

3. **Messaging / DMs (Legal Review)** — The "ask someone who worked there" mechanic is the most compelling CTA in the prototype. It is also the most legally complex. A private channel between healthcare workers is a natural channel for HIPAA-adjacent content. Get legal architecture before building.

4. **Recruiter Accounts (Research)** — Glassdoor, Blind, and Fishbowl all struggled with this. Recruiter-generated content erodes trust even with disclosure. Understand the failure modes before designing the model.

5. **Full Anonymity (Legal Review)** — The prototype's anonymous post mode is a UX approximation. Real legal anonymity (breaking the attribution chain) is a specific architecture + legal design challenge. Build pseudonymity first, fully anonymous posting only after counsel review.

---

*Feature Decision Matrix — Scrub Society Social Lab handoff package. Internal use only. Review with counsel before finalizing legal-risk decisions.*
