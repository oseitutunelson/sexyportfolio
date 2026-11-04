# Sexy — Fashion x Code Portfolio

React 19 + Vite + TypeScript + React Router + GSAP. Illustrated SVG scenes (no heavy 3D), so it loads fast.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist (SPA: serve index.html for every route)
```

## Edit your content
- `src/config.ts` — email, Instagram, WhatsApp, LinkedIn, optional Formspree `formEndpoint`.
- `src/content.ts` — designs, projects, skills.
- **Your real Illustrator designs:** export PNG/WebP/SVG into `public/designs/`, then set `image: '/designs/file.png'` on a design in `src/content.ts`. (The Colour Studio recolours the built-in vector garments; real images show in Gallery, Lookbook and Simple view.)

## Deploy
Vercel/Netlify/Cloudflare Pages. Add a rewrite of all paths to `/index.html` so deep links like `/gallery/bloom-jacket` work.

## Features
Door entry → scroll corridor → pattern map → Gallery (modal, lookbook, live GitHub repos), About, Studio (Colour Studio + PNG export, mood board), Contact form, achievements, Konami disco, thread cursor, light/dark, `/simple` no-motion view, reduced-motion support. Sound is off by default.
