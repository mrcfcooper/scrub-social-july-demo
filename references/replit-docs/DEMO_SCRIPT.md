# Scrub Society Social Lab — Demo Script

> Internal use only. Do not share externally.  
> Last updated: 2026-05-03  
> Prototype status: All data is seeded and fake. No real Scrub Society systems connected.

---

## Before You Start

**Setup checklist:**
- [ ] Open `/social` in a browser tab at the correct URL
- [ ] Open the **user switcher** (button, bottom-right) and select **Maya Chen** (travel_nurse) — she has the richest data connections
- [ ] Have a second tab ready at `/social/demo` for step-by-step reference
- [ ] If the DB needs resetting: switch to **Alex Replit** (admin), go to `/social/demo`, and use the Demo Reset button
- [ ] Know your key URLs:
  - Feed: `/social`
  - Facilities: `/social/facilities`
  - Jobs: `/social/jobs`
  - Pay board: `/social/pay`
  - Product Lab: `/social/lab` (admin only)

---

## 5-Minute Version

> Goal: Show the core value loop — find a job, research the facility, contribute, understand what the data layer makes possible.

### 1. Open Jobs (45 sec)
- Navigate to `/social/jobs`
- Point out: **"Every job card has a pay diff badge"** — the `+12%` or `-8%` vs. community-reported average
- Point out: **network count** ("4 community members worked here")
- Say: *"A standard job board shows you what the agency wants you to know. We show you what your peers actually experienced."*

### 2. Open a Facility Hub (60 sec)
- Click any facility name from a job card, or go to `/social/facilities` and pick **Vanderbilt University Medical Center** (highest traveler score, 91/100)
- Walk through the hero: traveler score bar, avg reported pay, Q&A count, community members count
- Scroll to **Insider Notes** — point out the note types (culture, scheduling, management)
- Say: *"This is real intelligence you can't get from the hospital's website or the agency recruiter."*

### 3. Submit a Q&A (45 sec)
- Click **+ Contribute** 
- Q&A tab is already active — type: *"What are the ICU nurse-to-patient ratios?"*
- Click Submit
- Toast appears: "Q&A question submitted"
- Say: *"It's live in the database. In production, this goes into a moderation queue first."*

### 4. Pay Reality Check on a Job (45 sec)
- Navigate to `/social/jobs` and click any job title
- Scroll to **Pay Reality Check** panel
- Say: *"The agency says $78/hr. The community says the average at this facility for ICU is $86/hr. That's an 11% gap. You know this before you sign."*

### 5. Healthcare-Specific Reactions (30 sec)
- Go back to the feed (`/social`)
- Click **"Been There"** on a post about a facility
- Point out the reaction types: Been There, Pay Intel, Red Flag, Same Shift, Traveler Tip
- Say: *"Thumbs up doesn't mean anything here. 'Been There' from 15 ICU travelers is a completely different signal. The reaction taxonomy is part of the product."*

**Close:** *"The full loop is: look up a job → research the facility → read what the community knows → contribute what you know → every contribution makes the next traveler smarter. That flywheel is what we're building."*

---

## 10-Minute Version

> Use this for investor, partner, or team demos where you have time to show depth.

### 1. Set the Stage (1 min)
- Open at `/social` as Maya Chen (travel_nurse, ICU specialist, currently in Los Angeles)
- Say: *"Maya is a travel ICU nurse. She gets a recruiter call about a 13-week contract at Tampa General Hospital paying $81/hr. Before she even calls back, she opens Scrub Society."*

### 2. Jobs with Social Context (90 sec)
- Navigate to `/social/jobs`
- Find the Tampa General listing or any ICU listing
- Walk through the job card:
  - **Pay diff**: what the agency says vs. what the community reported
  - **Network count**: community members who have worked at that facility
  - **Q&A count**: facility questions + answers from the community
- Say: *"She hasn't clicked anything yet and already knows more than she would from three recruiter calls."*

### 3. The Facility Hub (2 min)
- Click through to the facility detail page
- Walk through each section:
  - **Traveler score bar**: 91/100 — Great for Travelers
  - **Insider Notes**: staffing ratios, culture, management style — from travelers who worked there
  - **Reviews**: star ratings, pros/cons, "recommends for travelers" flag
  - **Pay Reports**: the community's actual numbers vs. the recruiter's pitch
  - **Q&A**: specific operational questions with answers from experienced travelers
  - **Community members who worked here**: "5 community members have history here"
- Say: *"This is what it looks like when a community has been there before you."*

### 4. Contribute (90 sec)
- Click **+ Contribute**
- Show the 4-tab form: Q&A / Insider Note / Review / Pay Report
- Submit a Q&A: *"What's the call schedule like for ICU?"*
- Switch to Insider Note tab — show the PHI/defamation warning
- Say: *"Anonymous insider notes go into a moderation queue before going live. We built content policy into the submission flow, not as an afterthought."*

### 5. The Feed + Reactions (90 sec)
- Navigate to `/social`
- Show the post composer — write a short post about the Tampa General contract
- Show reactions on an existing post — click "Been There" or "Pay Intel"
- Expand comment thread on a post — show the threaded comments
- Say: *"The feed is where passive data becomes active conversation. And the reaction types are the data layer — 'Pay Intel' on a post is a structured signal, not just engagement."*

### 6. Pay Transparency Board (45 sec)
- Navigate to `/social/pay`
- Show the filter (by specialty, by state)
- Highlight: community average vs. top reported rate
- Say: *"We don't say 'nurses earn $X.' We show individual, anonymous reports — specialty, facility, agency, period. This is what transparency actually looks like."*

### 7. Product Lab (for investor/team demos only) (90 sec)
- Switch user to **Alex Replit** (admin)
- Navigate to `/social/lab`
- Show the feature matrix: Keep / Kill / Needs Research / Needs Legal / Later
- Point out the inverted risk columns: Legal Risk and Technical Complexity go red as they get worse
- Say: *"Stories are marked Kill. DMs are in 'Needs Legal' because of HIPAA surface area. We know what we're building and what we're explicitly not building, and why."*
- Click **Audit** — show the implementation audit page
- Say: *"Every gap in the prototype is documented with a priority level. P0 items block the demo. P1 items block the MVP. This is how we build with discipline."*

**Close:** *"The core insight is that travel nursing has a massive information asymmetry problem. Agencies know everything. Nurses know almost nothing until they've already signed. Scrub Society closes that gap with community intelligence. What you saw today is a working prototype — every piece of data you interacted with came from a real database, not a mockup."*

---

## What to Say for Common Questions

**"Is this data real?"**  
No — all data is seeded prototype data. Real hospital names, realistic numbers, but no actual traveler has contributed to this. The point is to show the product mechanics, not the data volume.

**"How does moderation work?"**  
Switch to Alex Replit, go to `/social/moderation`. Show the 6 examples — PHI risk, defamation, anonymous claims, pay inflation, mental health crisis. Each has an expand/collapse, mod notes input, and action buttons. In production, moderation would be a mix of automated flagging and human review.

**"What about HIPAA?"**  
We deliberately built the insider note form with a PHI warning. The moderation queue has explicit PHI flagging. Anonymous submissions go into pending status by default. The Product Lab has HIPAA-adjacent features marked "Needs Legal." We haven't solved it — we've scoped it honestly.

**"What's the business model?"**  
That's not what this prototype answers. The Product Lab has a Revenue Potential dimension on the feature matrix. That's the honest answer for a prototype.

**"When can I see the real thing?"**  
This demo shows what's possible with the data layer. The next step is defining the MVP extraction list from this prototype.

---

## What NOT to Over-Explain

- **The user switcher**: Just say "this lets me switch personas for the demo" — don't explain the mock auth cookie mechanism
- **"Prototype" banners**: Don't apologize for them. Say "we built in prototype transparency so no one confuses this with production"
- **Missing community detail pages**: Communities are listed but not clickable. Say "community sub-pages are on the roadmap" and move on
- **The "Ask someone" button**: It goes nowhere in the prototype. Skip it or say "the CTA is there, the messaging system is the next feature"
- **Notifications page**: Don't click it — it shows static placeholder content

---

## Known Limitations (For Honest Demos)

| Limitation | What to say |
|------------|-------------|
| Community detail pages are dead-ends | "Community feeds are on the roadmap — listed communities don't have sub-pages yet" |
| "Ask someone" button goes nowhere | "Messaging is a P1 — the CTA is placed, the feature isn't built" |
| Notifications are static | Skip entirely or say "placeholder" |
| No real search | "Search coming soon" is visible in the UI — honest |
| Lab + Moderation are admin-only | Switch to Alex Replit before those sections |
| Filter forms require a button click | Minor UX friction — don't draw attention to it |

---

## Persona Guide

| Persona | Role | Best for |
|---------|------|----------|
| Maya Chen | Travel nurse, ICU, LA | Core traveler demo — richest data |
| Jordan Rivera | Travel nurse, ER, NYC | Alternative traveler POV |
| Alex Replit | Admin | Product Lab, Moderation demos |
| Priya Sharma | Recruiter | Shows the "other side" perspective |
| Sam Holloway | Staff nurse | Shows staff vs. traveler experience |
| Taylor Brooks | Student nurse | Shows the aspiring professional POV |

---

*Demo script — internal only. Prototype: not connected to real Scrub Society systems. All data seeded and fake.*
