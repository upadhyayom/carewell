# CareWell Dental Clinic — Website & Admin

An all-in-one growth platform for **CareWell Dental Clinic** — public marketing website + role-based admin dashboard, built as a production-grade SaaS demo that could be sold to dental clinics across India.

Everything runs on **typed mock data** (no backend required). A future-ready Prisma schema for Supabase/PostgreSQL is included in `prisma/schema.prisma`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

## What's inside

### Public website (`/`)
- **Home** — hero, booking/WhatsApp/emergency CTAs, Google reviews, stats, doctors, treatments bento, before/after gallery, testimonials, insurance partners, FAQs, latest blogs
- **About** — story, mission/vision, doctors, staff, clinic tour, awards, certificates, timeline
- **Services** — 12 fully-written treatment pages (implants, root canal, braces, aligners, smile design, veneers, whitening, kids, scaling, extraction, wisdom tooth, dentures) with overview, benefits, procedure, FAQs, pricing, before/after
- **Book Appointment** — validated form (React Hook Form) with WhatsApp/email/admin confirmation simulation
- **CareWell Academy** — landing + 30 courses (5 flagship with full curriculum), apply/lead forms
- **Blog** — 100 SEO-optimized articles (10 rich featured), categories, authors, share, related posts
- **Smile Stories** — reviews wall, Instagram/YouTube feeds, smile gallery
- **Contact** — map panel, hours, parking, emergency, enquiry form

### Admin — CareWell Dental Clinic admin (`/admin`)
Login at `/admin/login` — pick a role (mock auth, stored locally):
- **Admin** (Priya Sharma) — everything
- **Doctor** (Dr. Ananya Mehta) — My Day, patients, consents, reports
- **Receptionist** (Amit Verma) — reception, leads, patients, consents

Modules: Executive dashboard · Marketing (Meta/Google campaigns, GA summary) · Leads CRM (300 leads, 8-stage kanban + list + lead drawer) · Patients (full profiles: treatments, prescriptions, invoices, reports, consents) · Doctor & Reception dashboards · **Consent Form Generator** (13 templates, English/Hindi, QR + consent ID, A4 print — physical signatures, no digital) · Academy management · Social Media Center (July calendar, approval queue, festival planner) · AI Content Assistant · Reports (CSV export + print-to-PDF) · Settings · Global search (⌘K) · Notifications · AI Business Insights

## Tech
Next.js 15 · TypeScript · Tailwind CSS v4 · shadcn-style UI kit (Radix) · Chart.js · Framer Motion · React Hook Form · Prisma schema (future Supabase/PostgreSQL)

## Mock data
`src/lib/data/` — 10 patients, 2 doctors, 3 staff, 10+35 appointments, 300 leads, 100 consent forms, 100 blog posts, 50 reviews, 30 courses, 100 social posts, campaigns & analytics. All deterministic (seeded PRNG) so SSR and client renders match.

## Wiring a real backend later
1. Create a Supabase project, set `DATABASE_URL`
2. `npx prisma migrate dev` using the included schema
3. Replace imports from `src/lib/data/*` with queries — UI types match the schema models
