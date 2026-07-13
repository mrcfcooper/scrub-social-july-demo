# Mobile UI Kit — Scrub Society

Five core screens for the Scrub Society member app, shown side-by-side in `index.html`:

1. **Onboarding** — hero intro on Plum Grove with the "Belong everywhere." headline.
2. **Feed** — spotlights, resources, and community posts in a card-based feed.
3. **Jobs** — search, filter chips, and job cards for travel & permanent positions.
4. **Community** — circles, threads, and support surfaces.
5. **Profile** — member stats, saved items, settings.

Components live in `components.jsx` and are shared across screens. Screen-level components live in `<Name>Screen.jsx`.

## Placeholders

- **Imagery is represented by flat color blocks** (Clear Sky, Lavender Field, Morning Dew, Plum Grove) since the brand shoot was not supplied. Drop real editorial photography into `.cover`, `.img`, and avatar surfaces when assets arrive.
- **Avatars** are represented by tinted circles with the member initial.

## Icons

All icons via Lucide CDN (1.75 stroke, rounded). Change the `data-lucide` value in the `<Icon>` component call site to swap.
