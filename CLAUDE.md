# Scrub Social July Demo

Standalone Vite + React demo for the scrub social stakeholder meeting. Mock data only. Deploys to Vercel.

## Rules
- references/ is READ-ONLY visual and content reference. Never modify it, never import from it, never copy files out of it wholesale.
- Authoritative design reference = references/demo-designs/clean/<screen>/ folders. If any other copy of a screen exists, ignore it.
- These show the approved demo-redesign look (tgn-staging.staffbot.com/demo, built in Claude Design). Match their visual language: spacing, card style, type treatment, component patterns. Port patterns into src/; do not port framework code — this app is Vite + react-router.
- references/DEMO_BUILD_LOG.md and references/replit-docs/ carry decisions and feature context. Read before proposing changes.
- Brand: Outfit font. Plum Grove #421A31, Open Air #F9F2E8, Lavender Field #BBAFEF, Clear Sky #82ABF4, Morning Dew #CEDBFE. Sentence case headlines. Speech-bubble corner language (one squared corner).
- All people/facilities are fictional except personas in src/data.js. Never add real candidate data, real facility incidents, or PHI.
- The attribution chips ("X asked for this · May 11") are the demo's thesis. Preserve them on every feature.
- No new dependencies without asking. No analytics, no auth, no backend calls.
