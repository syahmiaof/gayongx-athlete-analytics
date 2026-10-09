<div align="center">
  <h1>GAYONGX Athlete Analytics</h1>
  <p><strong>Responsive combat athlete intelligence interface for PSSGM Perak.</strong></p>
  <p><a href="https://gxaa.syahmiaof.my">Open prototype</a> · <a href="https://syahmiaof.my/projects">Portfolio</a></p>
</div>

![GayongX Athlete Analytics dashboard](https://raw.githubusercontent.com/syahmiaof/syahmiaof/main/public/images/gayongx-athlete-analytics.png)

> Frontend prototype. Athlete profiles, measurements, competition records and benchmarks are synthetic; this is not an official performance or medical service.

## What is implemented

- Twelve responsive application routes.
- Performance, readiness, body-composition and training views.
- Interactive React/SVG charts.
- Local CSV report export.
- Settings and editable demo screens with local state.
- Dedicated mobile layouts and safe-area navigation.
- Browser QA for routes, assets, interactions, accessibility and responsive containment.

No environment variables, API keys, backend or database are required. Settings persist locally for the mounted screen. Video screens demonstrate annotations; no video playback is claimed.

## Run

Use Node.js 24.x, the tested Vercel runtime.

~~~bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
~~~

## Verification

With the production preview on port 4173:

~~~bash
npx playwright install chromium
npm run qa
~~~

Evidence and screenshots are written to artifacts/. QA_URL can point the checks at another preview.

## Structure

- src/App.tsx — responsive shell and hash routing.
- src/components/dashboard and charts — desktop panels and SVG charts.
- src/components/mobile — dedicated mobile compositions.
- src/components/screens — application modules sharing screen primitives.
- src/data — typed synthetic data with benchmark provenance.
- scripts/verify.mjs — browser routes, assets, console and interaction checks.

## Deployment

Production: [gxaa.syahmiaof.my](https://gxaa.syahmiaof.my)

Vercel builds the main branch as a Vite static application. vercel.json supplies the SPA fallback.

## Assets and limits

The supplied desktop and mobile references guide the reconstruction. The interface uses real React, SVG and CSS; it does not use the complete references as page backgrounds. Demo photography comes from permitted crops of supplied references and should not be treated as verified athlete identity data.

## Builder

[Muhammad Syahmi](https://syahmiaof.my)
