# Scrub Society — Design System

> *"Better together. You're in good company."*

Scrub Society is a community and resource hub for travel nurses and allied health professionals. This design system contains the brand foundations, type + color tokens, iconography rules, and product-level UI kits used to design for the Scrub Society brand.

---

## Source materials

The brand system is derived from a single canonical source:

- **Brand deck:** `uploads/ScrubSociety_BrandIdentity_RoundThree_04.03.26.pdf` (Round 3, 4.3.26) — contains the brand positioning statement, tone of voice, type hierarchy, color palette, logo mark, and social / in-situ mockups.
- **Extracted text:** `assets/brand-pdf-text.txt` — plaintext dump of the deck.

> ⚠️ **Image extraction failed** for the brand deck PDF (pages are too heavy to render in the sandbox). As a result, the logotype in this system is a hand-recreated wordmark based on the deck's text and tone — it is **not** the final vector logo. Please ask the brand owner for the vector logomark and logotype files (usually `.svg` / `.ai` / `.pdf`) and drop them in `assets/logo/` when available.

---

## Product & audience

Scrub Society is positioned as:

> "a vital niche, providing an essential bridge between the adventurous spirit of travel nursing and the practical needs of a successful, fulfilling career. We are a thriving online community and resource hub for nurses and healthcare professionals who embody that lifestyle."

**Audience:** travel nurses, occupational therapists, and other allied health professionals who move between assignments, cities, and chapters of their careers.

**Core product surfaces** — the design system includes UI kits for each:

1. **Mobile app** — primary member experience: feed, spotlights, community, jobs, resources
2. **Marketing website** (`scrubsociety.com`) — landing / member sign-up / content hub

**Core jobs-to-be-done** surfaced in the brand deck:

- **Succeed · Guide · Share Experiences**
- **Mentor · Learn · Community**
- **Find Support · Journey · Travel · Lifestyle**
- **Find Housing · Education Pathways · Member Sign-up · Find a Job**

---

## CONTENT FUNDAMENTALS

### Voice

Warm, peer-to-peer, supportive. Scrub Society speaks **with** its members, not **at** them. Copy reads like a trusted friend who's been where you're going — confident but never corporate, practical but never cold.

### Casing rules (from the deck's type hierarchy)

| Element | Weight | Tracking | Casing |
|---|---|---|---|
| Headline | Outfit Regular | −40 (−0.04em) | **Sentence case** |
| Body copy | Outfit Light | 0 | **Sentence case** |
| Subtext | Outfit Regular | 0 | **lowercase** |

- **Headlines never shout.** Sentence case, not Title Case, not ALL CAPS.
- **Subtext is always lowercase** (e.g. `scrubsociety.com`, `@thescrubsociety`). This is a deliberate, recurring brand motif.
- **Eyebrows** (small labels) may be set in UPPERCASE + wider tracking; use sparingly.

### Tone examples (from the deck)

- `Belong everywhere.`
- `Flourish in your field.`
- `Find your journey.`
- `Better Together`
- `You're in good company.`
- `Your way and the highway.`
- `Happy Nursiversary!`
- `Because we've been there..`

Notice:
- **Short, declarative sentences.** Usually 2–4 words.
- **Period endings** even on fragments — gives each line a finished, considered cadence.
- **Trailing ellipses (`..`)** appear occasionally as a warm, conversational beat (`Because we've been there..`).
- **Second person (`you / your`)** is the default. "We" appears for the brand collectively ("we've been there").
- **Verbs of belonging, movement, growth:** *find, flourish, belong, journey, guide, mentor, share, connect, succeed.*

### What Scrub Society does **NOT** do

- No emoji. The brand is warm without leaning on them.
- No exclamation marks except in genuinely celebratory moments (`Happy Nursiversary!`).
- No medical jargon or corporate HR-speak.
- No stock-photo clichés (heroic scrubs, crossed arms, fake smiles). Imagery in the deck leans editorial / lifestyle.
- No gradients or neon accents. The palette is quiet and grounded.

---

## VISUAL FOUNDATIONS

### Palette

A six-color palette, all soft except for the deep Plum Grove ink. See `colors_and_type.css` for the full token set.

| Name | Hex | RGB | Role |
|---|---|---|---|
| **Soft Cloud** | `#FFFFFF` | 255, 255, 255 | Pure white — elevated surfaces |
| **Morning Dew** | `#F9F2E8` | 249, 242, 232 | **Primary page background** — warm off-white |
| **Clear Sky** | `#CEDBFE` | 206, 219, 254 | Soft blue — section backgrounds, chips |
| **Open Air** | `#82ABF4` | 130, 171, 244 | Saturated sky-blue — accents, links on dark |
| **Lavender Field** | `#BBAFEF` | 187, 175, 239 | Lilac — decorative fills, highlights |
| **Plum Grove** | `#421A31` | 66, 26, 49 | **Primary ink** — all body text, logos, borders |

**Usage mix (from page 27 of the deck):**
Plum Grove 40% · Soft Cloud 20% · Morning Dew 15% · Clear Sky 10% · Lavender Field 10% · Open Air 5%.

Plum Grove is the workhorse. Most designs are Plum Grove on Morning Dew, with soft color washes from the other four used sparingly to delineate sections or highlight emotion.

### Typography

**Single family: [Outfit](https://fonts.google.com/specimen/Outfit)** (Google Fonts, free). Weights used: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700).

- **Headlines** are Outfit **Regular** (not bold) with **−0.04em** tracking. The tight tracking gives headlines their signature close, confident feel.
- **Body** is Outfit **Light**. Low density, lots of air.
- **Subtext** (URLs, handles, fine print) is Outfit Regular, lowercase, 0 tracking.

See `colors_and_type.css` for the full scale. Use `.type-display`, `.type-headline`, `.type-body`, `.type-subtext`, `.type-eyebrow` utility classes.

### Backgrounds & imagery

- **Primary background is Morning Dew (`#F9F2E8`)**, not white. White is reserved for elevated cards and specific layouts.
- **Full-bleed editorial photography** is a signature. The deck shows imagery with real people in real environments — warm natural light, shallow depth of field, often golden-hour or soft overcast.
- **No gradients.** The brand never uses gradient backgrounds — always flat colors.
- **No repeating patterns or textures.** Surfaces are clean and flat.
- **Color washes** (solid Lavender Field or Clear Sky blocks behind type) are used instead of gradients for variety.

### Layout

- Generous whitespace. Copy is set small relative to the space around it.
- **Large, confident headlines** anchored in one corner of the composition — especially bottom-left over imagery — with a short `scrubsociety.com` tag nearby in lowercase subtext.
- **One idea per view.** The deck's in-situ mockups pair a single 2–4 word headline with a full-bleed image.
- **Asymmetric balance** over centered symmetry. Headlines often sit against one edge of the canvas.

### Corner radii

Soft but not round-everywhere. Cards and modules use `--r-lg` (20px) or `--r-xl` (28px). Buttons and chips are **fully pill-shaped** (`--r-full`). Form inputs use `--r-md` (12px) for a settled, grounded feel.

### Shadows

Low-contrast, **tinted toward Plum Grove** (never gray). Scrub Society uses shadow as a gentle lift, not as drama. See `--shadow-sm` → `--shadow-xl` tokens. Large modals may layer `--shadow-xl` with an `inset` highlight (`--shadow-inset`) to catch light on the top edge.

### Borders

- Hairline borders at `1px solid var(--border)` (pale plum at 20% opacity).
- Strong outlined buttons use `1px solid var(--plum-grove)` — a confident ink line rather than a filled button.

### Motion

- **Gentle cubic-bezier easing** (`--ease-out`, `--ease-inout`). No springs, no bounces, no elastic.
- **Durations** live between 160ms (fast UI response) and 420ms (slower fades on entry / page transitions).
- **Fade + small translate** is the house transition: `opacity 0→1` plus a 4–8px rise.
- **Hover states** darken ink by ~10% or shift to Open Air dark for links. Buttons may swap fill on hover.
- **Press states** reduce scale to `0.98` with a short duration (`--dur-fast`).

### Transparency & blur

Used sparingly. Frosted blur only appears on sticky headers over imagery (`backdrop-filter: blur(16px)` with 70% opacity Morning Dew). No blur on decorative elements.

### Cards

- Background: `--soft-cloud` (pure white) on a Morning Dew page.
- Border: `1px solid var(--border)` OR a `--shadow-md`, rarely both.
- Radius: `--r-lg` (20px) for content cards, `--r-xl` (28px) for feature modules.
- Padding: minimum `--s-5` (24px); prefer `--s-6` or `--s-7` for content density that feels calm.

---

## ICONOGRAPHY

The brand deck does not define a proprietary icon set. For consistency, this design system uses **[Lucide](https://lucide.dev)** (loaded via CDN) as the icon library across all surfaces:

- **Stroke weight 1.75px** (Lucide's default weight paired with `stroke-width="1.75"`)
- **Rounded joins and caps** (matches Outfit's soft, round strokes)
- **Color: `currentColor`** — always inherits from the text color. Use Plum Grove by default.
- **Sizes:** 16 / 20 / 24 / 32 / 48 — keep to these five.

**Emoji:** Not used in UI. The brand's warmth comes from copy and color, not glyphs.

**Unicode glyphs:** Not used as icons. Use Lucide or omit.

**Logo marks:**

- `assets/logo/wordmark.svg` — stacked "Scrub / Society" wordmark, Outfit Regular, Plum Grove ink. **Placeholder — please replace with the official vector from the brand deck.**
- `assets/logo/wordmark-inline.svg` — single-line wordmark for horizontal lockups.
- `assets/logo/favicon.svg` — simplified "S" for small contexts.

When the final logotype vector arrives, drop it in `assets/logo/` and update the filenames referenced across UI kits.

> **Open questions for the brand owner:**
> 1. Is there an official logomark (symbol separate from the wordmark)?
> 2. Are there approved secondary icons or illustration styles for editorial use?
> 3. Is there a photography direction brief beyond what's shown in the deck?

---

## Index

| Path | What's in it |
|---|---|
| `README.md` | This file — full brand guidelines |
| `SKILL.md` | Agent-invocable skill manifest for Claude Code |
| `colors_and_type.css` | CSS variables, base type styles, utility classes |
| `assets/logo/` | Wordmark SVGs (placeholder — see caveat above) |
| `assets/brand-pdf-text.txt` | Extracted text from the source brand deck |
| `preview/` | Small HTML cards that populate the Design System tab |
| `ui_kits/mobile/` | React/JSX mobile-app UI kit (`index.html` shows a click-through prototype) |
| `ui_kits/web/` | React/JSX marketing-website UI kit |

---

## Caveats

1. **Logo is a placeholder.** Awaiting the final vector files from the brand owner.
2. **Photography is referenced, not supplied.** The deck demonstrates full-bleed editorial photography as a signature — replace any placeholder imagery in UI kits with the real approved shoot.
3. **Outfit is loaded from Google Fonts via CDN.** If offline usage is required, download the .woff2 files into `assets/fonts/` and swap the `@import` for `@font-face` rules.
4. **Imagery from the deck (pages 3–8, 13, 16–17, 21–24) could not be extracted** as rendered PNGs due to sandbox limits. Where the brand deck likely showed specific in-situ mockups, the UI kits reflect an interpretation of the style rather than pixel-matching those compositions.
