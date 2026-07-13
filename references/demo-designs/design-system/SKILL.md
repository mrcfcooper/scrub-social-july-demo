---
name: scrub-society-design
description: Use this skill to generate well-branded interfaces and assets for Scrub Society — a community and resource hub for travel nurses and allied health professionals. Contains essential design guidelines (colors, type, fonts, voice), logos, icon conventions, and UI kit components for prototyping mobile and web experiences.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files. Key entry points:

- `README.md` — full brand guidelines: product context, content fundamentals (voice, casing, tone), visual foundations (palette, type, motion, shadows), iconography rules.
- `colors_and_type.css` — drop-in CSS variables + base type styles + utility classes (`.type-display`, `.type-headline`, `.type-body`, `.type-subtext`, `.type-eyebrow`). Import this in every new artifact.
- `fonts/` — Outfit TTFs (variable + Light + Regular). Referenced by `colors_and_type.css`.
- `assets/logo/` — wordmark SVGs (⚠ placeholder — ask the user for official vectors if this matters).
- `preview/` — one-off cards demonstrating each token/component in isolation.
- `ui_kits/mobile/` — React/JSX mobile app: Onboarding, Feed, Jobs, Community, Profile.
- `ui_kits/web/` — React/JSX marketing site: Nav, Hero, Strip, Pillars, Spotlight, Join, Footer, Signup modal.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (surface / audience / key message / variations), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Brand anchors to remember:**
- Single type family: Outfit. Headlines: Regular, −0.04em tracking, sentence case. Body: Light. Subtext: Regular, lowercase.
- Six-color palette. Plum Grove (#421A31) is the primary ink. Morning Dew (#F9F2E8) is the primary page background. Never white unless elevating.
- No gradients, no emoji, no exclamation marks (except genuine celebration).
- Pill buttons, 20–28px card radii, soft shadows tinted toward Plum Grove.
- Copy rhythm: short (2–4 word) sentence-case lines with periods. Trailing `..` for warmth.
