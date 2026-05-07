# Domeniul Poiana Ursului

Site de prezentare pentru **Domeniul Poiana Ursului** — pensiune premium în Dumbrăveni, județul Sibiu.

## Tech stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4
- Framer Motion (lazy-loaded, doar pentru animațiile sub fold)
- Wouter pentru routing minimal
- shadcn/ui components disponibile (în `src/components/ui`, neimportate by default)

## Comenzi

```bash
pnpm install         # instalează dependențele
pnpm dev             # dev server pe http://localhost:21558
pnpm build           # build de producție în ./dist
pnpm preview         # servește build-ul local
pnpm typecheck       # verifică tipurile TypeScript
```

## Structura

```
src/
├── App.tsx                       # Root: Router + LanguageProvider
├── main.tsx                      # Bootstrap React
├── index.css                     # Tailwind + variables + animations
├── pages/
│   ├── Home.tsx                  # Hero eager, BelowFold lazy
│   └── not-found.tsx             # Lazy-loaded
├── components/
│   ├── Hero.tsx                  # LCP — img preloaded AVIF/WebP
│   ├── Navbar.tsx                # Fără framer-motion (CSS animations)
│   ├── BelowFold.tsx             # Wrapper LazyMotion pentru toate sub fold
│   ├── About / Rooms / Facilities / Pricing / Distances / Reviews / FAQ / Contact / Footer / WhatsAppButton
│   └── ui/                       # shadcn components (neutilizate, gata de adăugat la nevoie)
├── contexts/
│   └── LanguageContext.tsx       # RO eager, EN lazy via dynamic import
└── i18n/
    ├── ro.ts
    └── en.ts                     # ~12KB, lazy-loaded
```

## Optimizări de performanță

- **LCP**: hero image preload cu AVIF/WebP picture sources, `fetchpriority="high"`
- **Bundle splitting**: react-vendor + motion-vendor + main + lazy chunks
- **Framer Motion lazy**: `LazyMotion` mutat în chunk-ul BelowFold (0% în critical path)
- **EN lazy**: traducerile EN se încarcă doar la switch RO→EN
- **CSS slim**: Tailwind scanează doar componentele utilizate (`@source not "./components/ui/**/*"`)
- **Parallax cu rAF**: throttled, dezactivat pe mobil + `prefers-reduced-motion`
- **Imagini**: AVIF cu fallback WebP, srcset responsive, dimensiuni explicite (zero CLS)

## Deploy

### Vercel (recomandat)

1. Importă repo-ul pe [vercel.com](https://vercel.com/new)
2. Vercel detectează automat configul din `vercel.json`
3. Build command: `pnpm build`, Output dir: `dist`
4. Custom domain: `domeniulpoianaursului.ro`

### Self-hosted

```bash
pnpm build
# Servește ./dist cu nginx, Caddy, etc.
# Asigură-te că ai gzip/brotli activat și SPA fallback la index.html
```

## SEO

- JSON-LD Schema (LodgingBusiness + FAQPage) în [index.html](index.html)
- Open Graph + Twitter Cards
- Sitemap XML în [public/sitemap.xml](public/sitemap.xml)
- Robots în [public/robots.txt](public/robots.txt)
- Canonical URL setat
- GEO meta tags pentru Local SEO
