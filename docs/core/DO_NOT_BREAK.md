# DO_NOT_BREAK.md — Frozen Contracts

> These are contracts with users, regulators, payment providers, and the business. Breaking them breaks the company. **Do not modify without written approval.**

## 1. Frozen Business Logic
| Item | Location | Why Frozen |
|---|---|---|
| Escrow state machine | `apps/api/src/escrow/` | Money handling; regulator-audited |
| RBAC permission matrix | `apps/api/src/auth/rbac.matrix.ts` | Security boundary |
| CNIC threshold logic (>PKR 50,000 requires verification) | `apps/api/src/verification/` | Trust + compliance |
| PTA-approved flag on mobile listings | `apps/web/forms/mobiles/` | Resale value integrity |
| Marla/Kanal unit conversion | `packages/shared/units/` | Pakistan-specific; legal |
| FBR monthly seller reporting job | `apps/api/src/jobs/fbr/` | Regulatory requirement |

## 2. Frozen Integrations
- Raast (State Bank instant payments) — **do not change payload shape**
- JazzCash / Easypaisa wallet APIs — **do not change callback URLs**
- SMS OTP gateway — **do not swap providers without approval**
- WhatsApp Business API — **do not change template IDs**

## 3. Frozen Endpoints
Any endpoint prefixed with `/v1/` is versioned and consumed by the Android app. Breaking changes require `/v2/`.

## 4. Frozen Files (Never Delete)
- All `/docs/policies/*` content (legal)
- `apps/web/app/(legal)/*` pages
- `apps/api/src/escrow/stateMachine.ts`
- `apps/api/src/auth/`
- `packages/shared/types/`
- `migrations/*.sql`

## 5. Frozen UX Flows
- Listing creation must always end with a "Review & Publish" step.
- Property forms must always ask for **area unit** (Marla/Kanal/Sq.Yd./Sq.Ft.).
- Mobile listings must always ask **PTA Approved**.
- Vehicle listings must always ask **Assembly (Local/Imported)**.

## 6. Data Contracts
- Every listing has: `id, seller_id, category, subcategory, status, created_at, updated_at, city, area, price_pkr`
- Every user has: `id, phone, role, cnic_verified (bool), created_at`
- Every transaction has: `id, listing_id, buyer_id, seller_id, amount_pkr, status, escrow_state`

## 7. Compliance Contract
- Prohibited items must be removed within **24 hours** of report.
- Monthly FBR report must include: seller name, address, STRN, NTN.
- Privacy policy must disclose CNIC, phone, and location collection.

## 8. If You Must Change Something Here
1. Open a GitHub issue titled `[FROZEN-CHANGE] <item>`.
2. Get owner approval.
3. Add a migration + changelog entry.
4. Update this file.
