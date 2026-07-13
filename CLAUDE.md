# Scrub Social July Demo

Standalone Vite + React demo for the scrub social stakeholder meeting. Mock data only. Deploys to Vercel.

## Rules
- reference/ is READ-ONLY visual and content reference. Never modify it, never import from it, never copy files out of it wholesale.
- reference/tgn-demo and reference/ux-specs show the approved demo-redesign look (tgn-staging.staffbot.com/demo). Match its visual language: spacing, card style, type treatment, component patterns. Port patterns into src/, do not port Next.js code — this app is Vite + react-router.
- Brand: Outfit font. Plum Grove #421A31, Open Air #F9F2E8, Lavender Field #BBAFEF, Clear Sky #82ABF4, Morning Dew #CEDBFE. Sentence case headlines. Speech-bubble corner language (one squared corner).
- All people/facilities are fictional except personas in src/data.js. Never add real candidate data, real facility incidents, or PHI.
- The attribution chips ("X asked for this · May 11") are the demo's thesis. Preserve them on every feature.
- No new dependencies without asking. No analytics, no auth, no backend calls.
