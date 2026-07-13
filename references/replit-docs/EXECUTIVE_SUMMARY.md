# Scrub Society Social Lab — Executive Summary

> For non-technical stakeholders. No code knowledge required.
> Prototype build date: 2026-05-03

---

## What This Prototype Demonstrates

Scrub Society Social Lab is a working interactive prototype of a social intelligence platform for travel nurses and allied healthcare professionals. It simulates the full product experience — not as a mockup, but as a functional web application with a real database, real navigation, real form submissions, and real data relationships.

The prototype demonstrates four things:

1. **The core product loop works** — A healthcare traveler can look up a job, research the facility behind it using community-contributed intelligence (pay reports, insider notes, Q&A, reviews), contribute their own knowledge, and participate in a community feed. Every step of that loop is functional in this prototype.

2. **The data model is sound** — The intelligence that makes Scrub Society valuable (who worked where, what they were paid, what the unit culture was like, whether management is traveler-friendly) can be structured, stored, and surfaced in useful ways. The 17-model database schema and 34-user work history graph demonstrate this.

3. **The product differentiator is built and visible** — Job cards show pay differences vs. community-reported averages. Facility hubs aggregate all four intelligence types in one place. Healthcare-specific reactions (Been There, Pay Intel, Red Flag, Same Shift) replace generic engagement metrics with meaningful signals.

4. **The hard product decisions have been made explicitly** — The Product Lab feature matrix documents every proposed feature with scoring across 8 dimensions (user value, revenue potential, legal risk, technical complexity, etc.) and a Keep/Kill/Later/Needs Research/Needs Legal decision. Nothing was left unexamined.

---

## Why This Matters Strategically

**The problem is real and significant.** Travel nurses commit to 13-week contracts — often relocating across the country — with almost no verified information about the facility, the unit, or the actual pay package. Agencies have strong incentives to withhold unflattering information. The only reliable intelligence comes from peer nurses who have already been there.

**The product mechanic is defensible.** A platform whose primary asset is community-contributed facility intelligence becomes more valuable with every report, every review, and every Q&A — and harder to replicate once the data flywheel is spinning.

**The legal complexity is real but manageable.** Anonymity, PHI risk, defamation exposure, and potential recruiter manipulation of pay data are all genuine product risks. The prototype documents these explicitly, builds PHI warnings into submission forms, and uses a moderation queue. This is not a product that can be shipped carelessly, but it is buildable with the right legal and compliance framework.

**The total addressable market is substantial.** Over 300,000 nurses work as travelers in any given year. Each makes multiple contract decisions per year, each involving significant financial stakes. A platform that materially improves those decisions has compounding value.

---

## What Is Fake / Prototype-Only

The following are explicitly not real. Nothing in this prototype should be mistaken for a production-ready system.

| What looks real | What is actually happening |
|----------------|---------------------------|
| 20 user profiles with names, photos, bios | All seeded fake data. No real users. |
| 10 hospital listings with names and scores | Real hospital names, completely fake data attached. |
| Pay reports ($65–$91/hr) | Seeded fake numbers. Do not represent real pay rates. |
| Community reactions and engagement counts | Seeded. Reactions persist locally but are not connected to real users. |
| Reviews, Q&As, insider notes | Seeded plus anything submitted during the demo. Fake. |
| User authentication | A mock cookie. Anyone can impersonate any user. |
| Anonymous posting | Not real anonymity. All data is in a local database attributable to whoever submitted it. |
| Moderation system | Client-side state only. No real content moderation occurring. |
| Job applications | A clearly labeled mock button. No real application is submitted anywhere. |
| "People in your network who worked here" count | Queries a seeded `WorkHistory` table. Not real professional connections. |
| The database | SQLite running on a single local server. Not suitable for production. |

---

## The Strongest Product Ideas (Worth Carrying Forward)

These are the prototype elements that demonstrated genuine product strength and should be prioritized in any real build:

**1. The Facility Hub**
The most complete page in the prototype. Aggregates Q&A, insider notes, reviews, pay reports, open jobs, culture tags, and traveler score in one place — all queryable by facility. This is the product's highest-value surface.

**2. Job Cards with Social Context**
Pay diff vs. community average, network count, and Q&A count on every job card. This is the product differentiator in its simplest, most scannable form. Travelers get the key signal before even opening a listing.

**3. Healthcare-Specific Reaction Taxonomy**
Been There, Pay Intel, Red Flag, Same Shift, Traveler Tip, Following, Star. These are information signals, not vanity metrics. A "Red Flag" from 18 ICU travelers at a facility is a different kind of data point than a thumbs-up. This taxonomy is worth protecting and refining.

**4. Pay Transparency Layer**
The pay reality check on job detail pages — listed rate vs. community-reported average with a +/- % indicator — is immediately legible and immediately valuable. No explanation required.

**5. The Moderation Framework**
The prototype's moderation queue demonstrates the content risk surface: PHI leakage, defamation, anonymous OSHA claims, pay inflation by recruiters, mental health disclosures. These are the actual risks that need pre-built moderation infrastructure — not afterthoughts.

**6. Product Lab Feature Matrix**
The Keep/Kill/Later/Needs Research/Needs Legal decision framework is a valuable internal tool. It forced explicit scoring on legal risk and content complexity for features that might otherwise have been built without scrutiny.

---

## What Should Not Be Assumed Production-Ready

- **Authentication**: The mock cookie system is for demo purposes only. A production system requires real authentication with verified identities, secure sessions, and role-based access controls.

- **Anonymity**: Anonymous posts in this prototype are not truly anonymous. Real anonymity infrastructure requires careful separation of attribution data from content, legal review, and explicit user consent flows.

- **Content Moderation**: The prototype moderation queue is a UI exercise. Real moderation requires automated flagging, human review workflows, escalation paths, appeals processes, and documented content policies.

- **Data Integrity**: Seeded fake data will produce seeded fake insights. The pay transparency layer only works when the underlying pay data is real, sufficient in volume, and protected against manipulation.

- **Legal Compliance**: Anonymous reviews, insider notes about named facilities, and pay transparency features all carry legal exposure. None of the prototype's legal-risk features should be shipped without counsel review.

- **Credential Verification**: The "Verified" badge on user profiles is purely cosmetic. Real credential verification (nursing license, specialty, employer history) is a significant technical and operational challenge.

- **Privacy**: No GDPR/CCPA flows, no data deletion mechanisms, no consent capture, no data retention policies.

---

## Recommended Next Step

Extract an MVP from the prototype using the `MVP_EXTRACTION_PLAN.md` in this handoff package. Start with the facility intelligence layer (Q&A, insider notes, pay reports), real authentication, and basic content moderation. Defer social feed, messaging, stories, and community sub-pages until the core intelligence contribution loop has real users generating real data.

The prototype answered the question: **"Can this product be built?"** The answer is yes.

The next question is: **"What is the smallest version that delivers real value to real travelers?"** That is what the MVP plan addresses.

---

*Scrub Society Social Lab — internal prototype, not for external distribution. All data fake. No production systems connected.*
