# Victor Bessa Ribeiro — Portfolio

Personal portfolio website for Victor Bessa Ribeiro, Chief Information Security Officer at Magentrix; previously Head of Security Architecture & Engineering at Zerum IT (CISSP, ISO 27001/42001 Lead Auditor).

## Design

- **Layout**: Fixed sidebar (Brittany Chiang pattern) with scrollspy navigation, dark/light theme toggle
- **Design system**: Custom dark theme (zinc-scale surfaces, lime accent #95be1f, purple brand)
- **Typography**: Self-hosted Inter (400/500/600/700 woff2, via Fontsource)
- **Pattern**: Flat design (borders, not shadows), no third-party CDN dependencies

## Features

- Single-page static site (no framework, no build step, no npm)
- 8 sections: About, Experience, Projects (case-study format), Selected Impact, Perspective, Core Competencies, Certifications, Education/Languages
- Project case studies: Problem / Architecture / My role / Outcome
- Perspective section: AI security point of view (agents need identity, tools need authorization, autonomy needs controls)
- Sidebar CTAs: Download Resume + Contact (email)
- Download Resume button (assets/cv.pdf) with dedicated `@media print` stylesheet
- JSON-LD Person schema for recruiter discoverability
- Open Graph + Twitter Card meta tags
- CSP: `default-src 'self'; script-src 'self'` (no unsafe-inline)
- Dark/light theme with cookie persistence
- Responsive: sidebar collapses to top bar at 1024px, compact at 640px

## Structure

```
index.html              Single-page site
favicon.ico             ICO favicon (32x32)
assets/css/styles.css   Design tokens + all styles
assets/js/main.js       Scrollspy, theme toggle, preloader, print
assets/fonts/           Inter woff2 (400-700)
assets/images/          Profile image for OG tags
```

## Deployment

GitHub Pages, served from `main` branch. No build step required. Push to deploy.
