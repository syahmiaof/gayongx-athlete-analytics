<div align="center">
  <img src="public/og-image.png" alt="GayongX Athlete Analytics Dashboard Preview" width="100%" />

  <h1>GAYONGX Athlete Analytics</h1>
  <p><strong>Responsive Silat Performance Analytics & Athlete Conditioning Dashboard</strong></p>

  <p>
    <a href="https://gxaa.syahmiaof.my"><img src="https://img.shields.io/badge/Demo-gxaa.syahmiaof.my-60E1B5?style=for-the-badge&logo=vercel&logoColor=60E1B5&labelColor=101713" alt="Demo Live" /></a>
    <a href="https://github.com/syahmiaof/gayongx-athlete-analytics"><img src="https://img.shields.io/badge/Source-GitHub-60E1B5?style=for-the-badge&logo=github&logoColor=60E1B5&labelColor=101713" alt="GitHub Source" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-All_Rights_Reserved-60E1B5?style=for-the-badge&logoColor=60E1B5&labelColor=101713" alt="License All Rights Reserved" /></a>
    <a href="https://syahmiaof.my"><img src="https://img.shields.io/badge/Author-syahmiaof-60E1B5?style=for-the-badge&logo=readme&logoColor=60E1B5&labelColor=101713" alt="Author syahmiaof" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React_19-101713?style=for-the-badge&logo=react&logoColor=60E1B5" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-101713?style=for-the-badge&logo=typescript&logoColor=60E1B5" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-101713?style=for-the-badge&logo=vite&logoColor=60E1B5" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-101713?style=for-the-badge&logo=tailwindcss&logoColor=60E1B5" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/SVG_Data_Viz-101713?style=for-the-badge&logo=d3.js&logoColor=60E1B5" alt="SVG Data Viz" />
    <img src="https://img.shields.io/badge/Playwright-101713?style=for-the-badge&logo=playwright&logoColor=60E1B5" alt="Playwright" />
    <img src="https://img.shields.io/badge/Vercel-101713?style=for-the-badge&logo=vercel&logoColor=60E1B5" alt="Vercel" />
  </p>
</div>

---

## Overview

- **Functionality**: Specialized silat sports-science performance cockpit featuring typed synthetic benchmarks, interactive radar charts, biometric conditioning tracking, and combat video review annotations.
- **Aesthetic Value**: High-contrast athletic dashboard aesthetic blending dense numerical readouts with responsive SVG radar graphs, modular card surfaces, and mobile safe-area adaptations.
- **Business Value**: Equips martial arts coaches with empirical training load analytics, pinpointing reaction velocity and aerobic endurance deficits ahead of tournament selections.

Screenshot-driven React + TypeScript frontend demo. All athlete profiles, measurements, competition records, and benchmarks are synthetic; this is an exploratory athletic performance dashboard prototype.

---

## Platform Scope & Architecture

No external database or server runtime dependencies are required. Settings persist locally, and training/profile/nutrition edits are reactive across the mounted application screen. Reports export directly to local CSV. Video review screens illustrate tactical frame annotations.

- **Hash-Routing Architecture**: All twelve routes use hash URLs (e.g. `/#/latihan`) to ensure seamless refresh tolerance on static edge hosts.
- **Component Breakdown**:
  - `src/App.tsx`: Responsive application shell and hash routing provider.
  - `src/components/layout`: Brand header, official PSSGM emblem sidebar, and athlete hero strip.
  - `src/components/dashboard`, `charts`: High-density desktop panels and interactive SVG radar/trend charts.
  - `src/components/mobile`: Dedicated mobile dashboard, training composition, and safe-area touch navigation.
  - `src/components/screens`: Full demo modules sharing reusable `ScreenPrimitives`.
  - `src/data`: Typed synthetic data models with explicit benchmark provenance.
  - `src/index.css`: Shared design tokens and viewport-specific composition.

---

## Reference and Assets

The supplied references are `athlete-desktop.jpg` and `athlete-mobile.jpg`, archived under `public/images/`. The app reconstructs the complete screen flow with responsive SVG charts and modular cards without artificial device frames.

`public/assets/pssgm-logo.png` is an unchanged copy of the official PSSGM emblem. Photographic demo assets are presentation crops extracted from the supplied references, strictly for demonstration purposes.

---

## Continuous Integration & Quality

Platform stability is maintained through automated continuous integration workflows:
- **Type Checking**: Strict TypeScript validation across all modules.
- **Automated Verification**: GitHub Actions workflow (`.github/workflows/ci.yml`) validates linting and production bundling on every push to `main`.
- **Browser QA**: Automated Playwright test coverage verifying route health, interaction stability, and visual layout fidelity.

---

## License

Copyright (c) 2026 Muhammad Syahmi ([syahmiaof](https://syahmiaof.my)). All rights reserved.  
Proprietary source code created solely for demonstration and portfolio showcase purposes.
