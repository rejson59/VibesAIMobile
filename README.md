# VibesAIMobile

**vibes.ai — wersja mobilna.** Mobile-first rebuild of the [vibes.ai](https://vibes.ai) landing
page, plus an interactive mock of the Vibes mobile app. Pure HTML/CSS/JS, no build step.

> ⚠️ Unofficial concept / demo. Not affiliated with Meta or vibes.ai.
> All imagery is AI-generated placeholder art.

## Run it

```bash
python3 -m http.server 8080        # or any static server
# → http://localhost:8080
```

Open it on a phone, or on desktop — wide viewports present the very same mobile
layout inside a device bezel (append `?noframe=1` for full width).

## Pages

| Page         | What it is                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| `index.html` | Mobile landing: hero, community rail, ingredients / timeline / workflows, mobile perks, app-demo card, CTA, cookie sheet, sticky download dock |
| `app.html`   | Interactive app mock: snapping feed (like / remix / share), create screen with simulated render, projects, profile |

## Mobile-first details

- Base CSS **is** the phone layout; `viewport-fit=cover` + `env(safe-area-inset-*)` for notches
  and home-indicator safe areas.
- Thumb-zone UI: sticky bottom dock, bottom tab bar, ≥48 px touch targets, no hover-only states.
- Native feel: scroll-snap feed & carousels, momentum scrolling, full-screen menu sheet,
  sticky cookie sheet, `prefers-reduced-motion` respected.
- Installable PWA: `manifest.webmanifest`, icons (incl. maskable), `sw.js` network-first
  service worker → works offline after first visit.
- i18n: **EN / PL** switcher (top bar, menu, profile). Default follows the browser language
  (`pl*` → Polish), choice persisted in `localStorage`.

## Structure

```
├── index.html          landing page
├── app.html            app mock
├── manifest.webmanifest  PWA manifest
├── sw.js               offline service worker
├── css/
│   ├── base.css        tokens, reset, components, desktop phone frame
│   ├── landing.css     landing page
│   └── app.css         app mock
├── js/
│   ├── i18n.js         EN/PL dictionary + applier (data-i18n*)
│   ├── frame.js        desktop device-bezel wiring
│   ├── main.js         landing behaviour
│   └── app.js          app-mock behaviour
└── images/             generated art + PWA icons
```

## i18n usage

```html
<h1 data-i18n="hero.title">…</h1>          <!-- textContent -->
<p  data-i18n-html="cookie.text">…</p>     <!-- innerHTML (trusted strings) -->
<input data-i18n-ph="create.ph" />         <!-- placeholder -->
<button data-i18n-aria="act.like">         <!-- aria-label -->
```

Add keys to both dictionaries in `js/i18n.js`.
