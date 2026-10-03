# GAYONGX Athlete Analytics

Screenshot-driven React + TypeScript frontend demo. All athlete profiles, measurements, competition records and benchmarks are synthetic; this is not an official performance or medical service.

## Run

Use Node.js 24.x (the tested Vercel runtime).

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

No environment variables, API keys, backend or database are needed. Settings persist locally; training/profile/nutrition edits last for the current mounted screen. Reports export a local CSV. Video screens demonstrate annotations; no video files or playback are claimed.

## Verification

With the production preview running on port 4173:

```sh
npx playwright install chromium
npm run qa
```

Browser evidence and screenshots are written to `artifacts/`. `QA_URL` can point the checks at another preview URL.

## Reference and assets

The supplied references are `athlete-desktop.jpg` (1672×941) and `athlete-mobile.jpg` (941×1672), both at repository root. They correspond to the PNG names in the brief. They are not used as page backgrounds. The mobile reference is a promotional two-phone composition; the app reconstructs its inner screens, without a fake device frame/status bar.

`public/assets/pssgm-logo.png` is an unchanged copy of the supplied official `pssgm-logo.png`. The photographic `*-demo` assets are small presentation crops extracted from the supplied desktop and mobile references, explicitly permitted for this demo. Do not treat these as verified athlete identities or redistribute them as independently licensed stock photographs.

The UI, charts and navigation are real React/SVG/CSS. Barlow and Barlow Condensed load through Google Fonts, with sans-serif fallbacks.

## Static hosting

Vercel: framework Vite, build command `npm run build`, output directory `dist`, no environment variables. `vercel.json` includes an SPA fallback. All twelve routes use hash URLs (for example `/#/latihan`) and survive refresh on static hosting.

GitHub repository: https://github.com/syahmiaof/gayongx-athlete-analytics (private). Vercel project: gayongx-athlete-analytics. Production publication is managed from the main branch.

## Structure

- `src/App.tsx`: responsive shell and hash routing.
- `src/components/layout`: brand, official logo sidebar and athlete hero.
- `src/components/dashboard`, `charts`: compact desktop panels and interactive SVG charts.
- `src/components/mobile`: dedicated dashboard, training composition and safe-area navigation.
- `src/components/screens`: full demo modules sharing `ScreenPrimitives`.
- `src/data`: typed synthetic data, with explicit benchmark provenance.
- `src/index.css`: shared design tokens and viewport-specific composition.
- `scripts/verify.mjs`: browser route, responsive, asset, console and interaction checks.

See `artifacts/FINAL-REPORT.md` for visual parity limits and test evidence.


