# BLUEPRINT.md — Platform Architecture

## 1. Vision
A trust-first, escrow-native classifieds marketplace for Pakistan. Own the transaction, not just the listing.

## 2. Tech Stack
| Layer | Tech |
|---|---|
| Web | Next.js 16, React 19, TypeScript, TailwindCSS |
| Android | React Native (New Architecture), Hermes |
| API | NestJS (Node.js, TypeScript) |
| DB | PostgreSQL (RLS enabled) |
| Search | Elasticsearch 8+ |
| Cache | Redis |
| Realtime | Socket.io |
| Media | S3 + CloudFront; on-device compression |
| Auth | Supabase Auth + JWT + OTP |
| Payments | Raast + JazzCash + Easypaisa + PSP rails |
| Infra | Docker + AWS; GitHub Actions CI/CD |

## 3. Repository Layout (Monorepo)
```text
/apps
  /web → Next.js
  /mobile → React Native
  /api → NestJS
  /admin → Next.js admin panel
/packages
  /shared → types, validators, constants
  /ui → design system
  /config → eslint, tsconfig, tailwind
/migrations → SQL migrations
/docs → this documentation
```

## 4. High-Level Modules
1. Identity & Auth
2. Listings & Catalogue
3. Search & Discovery
4. Trust, Safety & Verification
5. Payments & Escrow
6. Logistics & Fulfilment
7. Monetisation
8. Seller Tools & Analytics
9. Communication (chat + WhatsApp)
10. Admin, Moderation & Compliance

## 5. Data Flow (Listing → Transaction)
```text
Seller → Create Listing → AI Moderation → Published
Buyer → Search → Listing → Chat → Intent to Buy
→ Escrow Initiated → Payment Held → Delivery/Pickup
→ Buyer Confirms → Escrow Released → Seller Payout
→ Review & Rating
```

## 6. Non-Functional Requirements
- **P95 latency:** < 400ms for search, < 250ms for listing fetch
- **Uptime:** 99.9% API
- **Mobile data budget:** listing page < 500KB
- **Image:** WebP/AVIF, max 1920px, quality 80
- **i18n:** Urdu (RTL) + English (LTR)
- **Accessibility:** WCAG 2.1 AA on web

## 7. Environments
- `dev` — local + staging DB
- `staging` — full mirror
- `prod` — multi-AZ, encrypted at rest

## 8. Versioning
- API: URL versioned (`/v1/`, `/v2/`)
- Mobile: semantic (`1.2.3`); force-update for breaking changes
- Docs: append-only, never delete history
