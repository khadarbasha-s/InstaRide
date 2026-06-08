# FastRental — Self Drive Car Rental Website

A production-ready Next.js 15 + TypeScript marketing/lead-capture website for a self-drive car rental business in Goa (inspired by FastRental.co). Built with App Router, Prisma, Tailwind CSS, and shadcn-style components.

## What's included (Phase 1 — Public Site)

- **11 public route templates**, generating 39 static pages
- **Homepage** with 9 sections (hero, cities, popular cars carousel, features, brands, why-us)
- **Goa listing page** with URL-state filters (category, brand, transmission, price slider, search)
- **Car detail pages** (15 of them) with image gallery, sticky sidebar, quick-inquiry form
- **Thar landing page** — filtered listing for Mahindra Thar variants
- **Goa FAQ page** with grouped accordion + JSON-LD
- **6 location landing pages** (Calangute, Baga, Candolim, Anjuna, Vagator, Porvorim)
- **Blog index + 3 seeded blog posts** with sanitized HTML
- **Contact page** with form (RHF + Zod)
- **3 legal pages** (privacy, terms, rental policy)
- **404 page** with recovery CTAs
- **POST /api/leads** route — Zod validation, DB write, fire-and-forget email notification
- **Sitemap.xml & robots.txt** auto-generated
- **Schema.org JSON-LD** for Car and FAQ pages

## Tech stack

- Next.js 15 (App Router) + React 18 + TypeScript 5 (strict)
- Tailwind CSS 3 + shadcn-style components (Radix primitives)
- Prisma 5 + SQLite (dev) / PostgreSQL (prod swap)
- React Hook Form + Zod
- Resend (email; stubbed if no key)
- Embla Carousel, lucide-react icons, sonner toasts

## Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment
cp .env.example .env

# 3. Sync schema + seed
pnpm prisma db push
pnpm db:seed

# 4. Run
pnpm dev
# → http://localhost:3000
```

## Available scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm typecheck` | TypeScript check, no emit |
| `pnpm db:seed` | Re-run seed file |
| `pnpm db:reset` | Drop, migrate, re-seed (destructive) |
| `pnpm db:studio` | Open Prisma Studio |

## Environment variables

All variables documented in `.env.example`. Mandatory for v1:

- `DATABASE_URL` — defaults to `file:./prisma/dev.db` (SQLite)
- `NEXT_PUBLIC_SITE_URL` — for canonical/OG URLs
- `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_WHATSAPP` — CTA buttons

Optional:
- `RESEND_API_KEY` — if blank, emails are skipped silently (form still works)
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_META_PIXEL_ID` — analytics (P3)

## Project structure

```
fastrental/
├── app/
│   ├── (marketing)/         11 public route templates
│   ├── api/leads/           lead submission API
│   ├── layout.tsx           root layout + fonts + metadata
│   ├── globals.css          tokens + animations
│   ├── not-found.tsx        404 page
│   ├── sitemap.ts           auto sitemap
│   └── robots.ts            robots.txt
├── components/
│   ├── ui/                  button, card, input, badge, accordion, slider, sheet, label, textarea
│   ├── layout/              Header, Footer, AnnouncementBar
│   ├── home/                Hero, CitiesSection, FeaturedCarsCarousel, FeaturesBenefits, BrandsCarousel, WhyRideWithUs
│   ├── cars/                CarCard, CarFilters, CarGallery, CarSidebar, CarsGrid, ReadMoreText
│   └── forms/               ContactForm, QuickInquiryForm
├── lib/                     prisma, utils, validations, whatsapp, email, sanitize, cars-query
├── data/contact.ts          static site contact info
├── prisma/
│   ├── schema.prisma        SQLite-compatible
│   ├── seed.ts              15 cars, 6 locations, 8 FAQs, 3 blogs
│   └── dev.db               (gitignored)
├── public/
│   ├── cars/                25 car images downloaded
│   ├── locations/           9 location images
│   ├── brands/              8 SVG brand logos
│   ├── hero/                hero image
│   ├── blog/                3 blog covers
│   ├── logo.svg
│   └── og.svg
└── scripts/
    └── download-images.sh   reproducible image-download script
```

## Known limitations (intentional v1 scope)

These are deferred to later phases — **not bugs**:

- **No admin dashboard yet** (Phase 2): no login, no CRUD UI. Edit data via `prisma studio` or re-run `pnpm db:seed`.
- **No image upload** in admin (Phase 2): images live in `public/cars/`. Update seed to add new ones.
- **Sanitization is basic** (`lib/sanitize.ts`): adequate for seed/admin-controlled blog content. Swap for `sanitize-html` when admin TipTap editor lands.
- **No analytics yet** (Phase 3): env vars exist but the GA4/Clarity/Pixel script tags need to be wired up in `app/layout.tsx`.
- **No rate limiting** on `/api/leads` (Phase 3): production deploy must add Upstash before going live.
- **SQLite for dev**: production should switch `provider = "postgresql"` in `prisma/schema.prisma` and convert `featuresJson`/`tagsJson` to native `String[]`.

## Replace seeded images with real ones

Real production launch needs photos shot consistently:

1. Photograph each car on the same background, 4:3 aspect, 1600×1200+.
2. Export as WebP, q80, target <300KB.
3. Drop into `public/cars/<car-slug>-1.jpg`, `<car-slug>-2.jpg`, etc.
4. Update image paths in `prisma/seed.ts` if naming differs, then `pnpm db:reset`.
5. Once Phase 2 admin lands, upload via the admin UI (UploadThing-backed).

## Test it now

```bash
pnpm dev
```

Visit:
- http://localhost:3000 — homepage
- http://localhost:3000/goa/self-drive-car-rental-goa — listing with filters
- http://localhost:3000/rental-car/maruti-swift — car detail
- http://localhost:3000/rental-car/mahindra-thar-hardtop-auto — "Fully Booked" state demo
- http://localhost:3000/goa/calangute — location landing
- http://localhost:3000/contact-us — submit a form

Submit a lead and check the DB:

```bash
pnpm db:studio
# → opens Prisma Studio in browser; check the Lead table
```

## License

Proprietary / TBD. Replace as appropriate.

---

Built as Phase 1 of a multi-phase spec. **Phase 2** = admin dashboard with auth, CRUD, image upload. **Phase 3** = SEO schemas, analytics, deployment hardening (Neon + Vercel).
