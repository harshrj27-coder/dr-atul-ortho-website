# Dr. Atul Rai Sharma — Ultra-Premium Orthopedic Website

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion · Three.js
(React Three Fiber) · Supabase · Swiper.

A glassmorphic, animation-rich rebuild inspired by Apple, Tesla and premium
private-hospital sites, built for Dr. Atul Rai Sharma's orthopedic practice.

## 1. Install & run

```
npm install
cp .env.example .env.local     # fill in real keys as you get them (optional — site works without them)
npm run dev
```

Open http://localhost:3000. Everything works out of the box in **mock
mode** — no external accounts required to see and use every feature.

## 2. What's fully real vs. what's mocked

This spec asked for a huge amount of functionality, some of which needs
accounts/assets that only you can create (payment provider, Google Cloud
project, a professional photographer, etc). Here's the honest breakdown:

### Fully real / working today
- Glass UI, animations, aurora backgrounds, cursor glow, magnetic buttons, card tilt — all custom code, nothing mocked.
- Preloader, sticky glass navbar with dropdown + mobile menu + dark mode toggle.
- **3D interactive rotating skeleton** — built from Three.js primitives (spheres + cylinders), not a downloaded model, so it has zero external asset dependency. Hover any joint for a real info popover (problems/treatments) pulled from `src/data/joints.ts`.
- **AI Symptom Checker** — a genuine rule-based decision-tree engine (`src/lib/symptomRules.ts`) that returns possible conditions, recommended department, suggested tests and an emergency flag. It is *not* a real AI model (see below for how to upgrade it).
- Doctor profile, animated counters, interactive career timeline, specialities/technology glass cards, patient journey, before/after slider (interaction is real, imagery is placeholder), 360° tour shell (interaction is real, panoramas are placeholder), testimonials carousel, stats, health library with working search/filter, insurance partner marquee.
- **Appointment booking** — full calendar + slot picker UI, posts to `/api/appointments`, which inserts into Supabase if configured, or logs + returns success in mock mode so you can test the whole flow today.
- **Admin panel** at `/admin` (not linked from the public nav — bookmark it) — single-password login, lists all bookings with a search box, and lets you mark each one's status (new/confirmed/completed/cancelled) and payment (pending/paid/cash). Password is set via `ADMIN_PASSWORD` in `.env.local` (default `Atul@Admin123` — change this before going live). Needs Supabase connected to show real data; online payment collection isn't wired up yet, so payments are marked manually for now.
- Newsletter signup → `/api/newsletter` (same mock/real pattern).
- Emergency bar: real `tel:` / `wa.me` links, and a working "Share My Location" button using the browser Geolocation API.
- Google Maps: the free iframe embed (no API key needed).
- PWA basics: manifest.json, app icons, a real offline-caching service worker.
- SEO: per-page metadata, Open Graph tags, and JSON-LD `Physician` schema markup.

### Scaffolded, needs your accounts/assets to go fully live
| Feature | What's built | What you need to add |
|---|---|---|
| Appointment DB | Full schema + API routes | A Supabase project → run `supabase/schema.sql` → paste keys into `.env.local` |
| SMS/Email/WhatsApp confirmation | `TODO` marked in `src/app/api/appointments/route.ts` | An SMS/email provider (Twilio, MSG91, Resend, etc.) |
| Google Calendar sync | Env vars reserved in `.env.example` | Google Cloud project + OAuth credentials |
| Payment gateway | Env vars reserved | Pick Razorpay/Stripe, add keys, wire into a new `/api/payment` route |
| Cloudinary image hosting | Env vars reserved | A Cloudinary account, once you have real photos to host |
| Real 3D skeleton model | Procedural version works today | Optional: replace `SkeletonModel` in `src/components/SkeletonScene.tsx` with a loaded `.glb` if you want an anatomically realistic mesh instead of the stylised joint-map |
| 360° hospital tour | Interactive shell (drag-to-pan, hotspot nav) works today | Real equirectangular photography of your clinic, swapped into `src/components/VirtualTour.tsx` |
| Before/after photos | Interactive slider works today | Real, consented patient photos |
| Testimonials | Carousel works today | Real, consented patient reviews (replace `src/data/testimonials.ts`) + Google Reviews API key if you want live reviews |
| Real AI (LLM) symptom checker | Rule-based engine works today | An `ANTHROPIC_API_KEY` — see the comment block at the top of `src/lib/symptomRules.ts` and `src/app/api/symptom-check/route.ts` for exactly where to plug it in |
| Doctor portrait | Placeholder panel | A real photo of Dr. Sharma, dropped into `src/components/DoctorProfile.tsx` |
| Contact details | "To be added" placeholders throughout | Real phone/email/address |

### Not attempted in this pass (flagged, not silently skipped)
- Server-side rendering tuning / Lighthouse 100 certification — needs a real deployment + measurement pass, not something that can be guaranteed from source code alone.
- Full WCAG AA certification — the markup follows accessible patterns (semantic HTML, labels, focus states) but hasn't been through a formal audit.
- Push notifications — needs a configured push service (Firebase Cloud Messaging, OneSignal, etc.).
- Multi-language content — the navbar has a language toggle UI; actual Hindi translations aren't written yet.

## 3. Project structure

```
src/
  app/                  → Next.js App Router pages (/, /about, /services, /symptom-checker, /appointment, /contact, /blog)
  app/api/               → appointments, symptom-check, newsletter route handlers
  components/            → all UI building blocks (30+ components)
  data/                  → services, timeline, testimonials, blog posts, joint info (edit these to update content)
  lib/                   → supabase client, symptom rule engine, utils
supabase/schema.sql       → run this in Supabase's SQL editor
public/                  → manifest, icons, service worker
```

## 4. Content you'll want to edit first

- `src/data/services.ts`, `src/data/timeline.ts` — already filled with Dr. Sharma's real credentials/education.
- `src/data/testimonials.ts`, `src/components/BeforeAfterSlider.tsx`, `src/components/VirtualTour.tsx` — clearly marked placeholders, swap for real content.
- `src/components/ContactSection.tsx`, `src/components/Footer.tsx`, `src/components/EmergencyBar.tsx` — phone/email/address ("to be added").
- `src/components/DoctorProfile.tsx`, `src/components/Hero.tsx` — swap the portrait placeholder panels for a real photo.

## 5. Deployment

Built for Vercel (zero-config for Next.js). Push to a Git repo, import into
Vercel, add your `.env.local` values as project environment variables, done.

## 6. A note on scope

This is a large, ambitious spec — the kind that in a real studio would take
a small team several weeks. Everything above is real, working code (not
lorem-ipsum stand-ins) except where a feature *requires* an account, a
physical asset (photo/video/3D model), or a business decision (which
payment provider, which SMS provider) that only you can make. Those are
flagged clearly rather than faked.
