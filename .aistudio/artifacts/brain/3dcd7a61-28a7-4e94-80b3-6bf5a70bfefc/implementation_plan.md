# olx.com.pk — Trust-First Managed Classifieds Marketplace (Pakistan)

A next-generation, trust-engineered C2C & managed marketplace for Pakistan, solving the legacy "Trust Anonymity" deficit of classic classifieds through integrated escrow payments, CNIC seller verification, certified inspection reports, and predictable weekly seller payouts.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters were confirmed during Phase 1 clarification:
> - **Platform Brand & Identity**: `olx.com.pk` (The evolved Trust Edition resolving OLX Pakistan's structural trust and GMV leakage issues).
> - **Experience Scope**: Unified interactive platform with seamless role-switching across **Buyer Marketplace**, **Seller Hub**, **Certified Inspector Portal**, and **Trust & Admin Command Center**.
> - **Launch Geography & Verticals**: **Lahore pilot** featuring high-ticket, high-friction categories: **Mobiles & Tablets**, **Electronics & Home Appliances**, and **Motors (Cars & Bikes)** with localized areas (DHA Phases, Gulberg, Johar Town, Bahria Town, Model Town).

- **Confirmed Decision 1**: Multi-role interactive simulator allowing the evaluator to experience end-to-end escrow transactions from buyer checkout to seller weekly payout and admin dispute resolution.
- **Confirmed Decision 2**: Urdu & English bilingual toggle (اردو / English) across UI labels, category breadcrumbs, and trust guarantees to demonstrate tier-2/3 market readiness.
- **Confirmed Decision 3**: WhatsApp hybrid listing simulation ("Send photos via WhatsApp to auto-generate verified listing") paired with standard web listing form.

---

### 1. Overview & Core Concept

- **What It Does**: Transforms the traditional free-listing classifieds board into a **managed marketplace with Trust-as-a-Service**. It handles the complete lifecycle: CNIC-backed seller identity, structured search with market price intelligence, verified vehicle/device inspection reports, Raast & JazzCash/Easypaisa escrow fund holding, and automated weekly payout tracking.
- **Target Audience / Personas**:
  1. *Pakistani Buyers*: Looking for authentic smartphones and vehicles in Lahore without fear of scams, fake PTA statuses, or stolen goods.
  2. *Individual & SME Sellers*: Wanting genuine buyers, protection against bounced checks, transparent 1% fee accounting, and guaranteed 7-day payouts (ending OLX's notorious 30+ day payout delays).
  3. *Certified Inspectors*: Freelance and workshop automobile/electronics technicians conducting 200-point physical audits for a PKR 2,000–5,000 fee split.
  4. *Platform Admins & Compliance Officers*: Monitoring FBR sales tax compliance, CNIC fraud detection, and managing disputed escrow releases.
- **Key Value Proposition**: Recovers the 30–40% GMV leakage suffered by legacy classifieds by owning the transaction rather than merely displaying an ad.

---

### 2. User Experience & Visual Design

#### Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ROLE SWITCHER NAVIGATION                        │
│  [🛒 Buyer Marketplace]  [💼 Seller Hub]  [🔍 Inspector]  [🛡️ Admin]   │
└───────────────────┬────────────────────────────────────────────────────┘
                    │
   ┌────────────────┴───────────────┐
   ▼                                ▼
┌─────────────────────────┐    ┌─────────────────────────────────────────┐
│ BUYER FLOW              │    │ SELLER FLOW                             │
│ • Faceted Lahore Search │    │ • 3-Min Listing Form / WhatsApp Flow    │
│ • Verified Badge Filter │    │ • CNIC & NTN Verification Tiering       │
│ • View Inspection Report│    │ • Price Intelligence Guidance           │
│ • "Buy with Escrow"     │    │ • Weekly Payout Dashboard (7-day SLA)   │
│   (Raast/JazzCash/EP)   │    │ • Buyer Chat & Offer Manager            │
└───────────┬─────────────┘    └───────────────────┬─────────────────────┘
            │                                      │
            └──────────────────┬───────────────────┘
                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│ ESCROW & TRUST LIFECYCLE                                               │
│ Funds Held in Escrow Wallet ──► Delivery / Inspection ──► OTP Release  │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Buyer Marketplace View**:
   - Clean top search bar with Lahore locality selector (DHA, Gulberg, Johar Town, Bahria Town, All Lahore).
   - Category navigation: Mobiles & Tablets, Motors (Cars & Bikes), Electronics & Appliances.
   - Rich product cards highlighting: Verified Seller badge, Inspection Grade (A+/A/B), PTA Approval Status (Approved / Non-PTA / Geared), and Escrow Protection eligibility.
   - Interactive Product Detail Modal with:
     - High-res photo gallery & condition audit.
     - Price Intelligence meter: "PKR 185,000 · 8% below Lahore market average".
     - Digital Inspection Sheet viewer with 200-point breakdown.
     - Direct CTA: "Buy with Bharoosa Escrow" or "Chat on WhatsApp (Masked)".
2. **Escrow Checkout Modal**:
   - Select payment method: **Raast (Instant SBP Bank Transfer)**, **JazzCash**, **Easypaisa**, or **Cash on Delivery with Protection**.
   - Transparent fee breakdown: Item price + 1% platform escrow fee + optional inspection fee.
   - Simulation of payment confirmation, funds locked in holding state, and unique Handover OTP generation.
3. **Seller Hub View**:
   - Verification status card: Tier 1 (Phone Verified) → Tier 2 (CNIC Verified) → Tier 3 (Business NTN Registered).
   - "New Listing in 3 Minutes" wizard with dynamic category attributes (e.g. Car: Make, Model, Mileage, Registration City, Transmission; Mobile: Model, Storage, PTA status, Battery Health).
   - WhatsApp listing simulator: simulate sending photos and description to WhatsApp bot `+92 300 0592000` to auto-parse and create a draft listing.
   - Financial Payout Tracker: Clear weekly payout schedule (every Tuesday), total escrow balance, cleared payouts, and automated 1% fee invoices.
4. **Certified Inspector Portal**:
   - Pending inspection assignments in Lahore (e.g., Honda Civic 2021 in Gulberg III, iPhone 15 Pro in DHA Phase 5).
   - Interactive 200-point diagnostic checklist with real-time score calculation (Accident history, Engine compression, Suspension, Frame/Seal integrity, Screen & FaceID check).
   - One-click certificate generation and auto-attachment to listing.
5. **Trust & Safety Admin Command Center**:
   - Live escrow wallet ledger with total locked GMV (PKR).
   - Fraud detection flags: duplicate CNIC detections across multiple phone numbers, abnormal price drop alerts, and banned keyword triggers.
   - Dispute management queue with mediation workflow (evidence review, buyer refund, or seller release).

#### Visual Identity & Theme

- **Color Palette**:
  - Dominant Canvas (60%): Clean white (`#ffffff`) and cool slate off-white (`#f8fafc`).
  - Structural Surfaces (30%): Dark corporate slate-teal (`#002f34` — iconic OLX Pakistan heritage), subtle borders (`#e2e8f0`), and soft neutral cards (`#f1f5f9`).
  - Accent Budget (10%): Bharoosa Trust Emerald (`#0f766e` and `#10b981`) for verification badges and escrow guarantees; vibrant saffron accent (`#f59e0b`) for featured listings.
- **Typography & Hierarchy**:
  - Headings: Bold, architectural neo-grotesque (`Plus Jakarta Sans`), balanced with `text-wrap: balance`.
  - Body: Legible geometric sans with tabular numerals (`tabular-nums`) for currency values (PKR).
  - Urdu Support: Noto Nastaliq / clean Urdu sans typography for bilingual mode.
- **Zero-Pill Discipline**:
  - Metadata rendered as unboxed inline typography with `·` separators (e.g., `Lahore DHA Phase 6 · 2022 · 42,000 km · 1st Owner`).
  - Strict functional distinction between interactive filter segmented controls and quiet informational labels.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive Multi-Role Switcher**
  - *Chosen Approach*: Embed an accessible top role-switcher banner so the user can freely toggle between Buyer, Seller, Inspector, and Admin modes without logging out or reloading.
  - *Why*: Allows instant verification of all 10 business modules outlined in the research brief in one continuous, cohesive demonstration.
- **Decision 2: Realistic Pakistani Payment Simulation (Raast, JazzCash, Easypaisa)**
  - *Chosen Approach*: Build a functional escrow state machine that transitions listings from `Available` → `Funds Held in Escrow` → `Out for Delivery / Inspected` → `Delivered & Verified via OTP` → `Payout Dispatched to Seller`.
  - *Why*: Demonstrates the core strategic insight: capturing transaction GMV and ending the 30-day payout delay that plagues OLX.
- **Decision 3: Category Taxonomy & Attribute Depth for Lahore**
  - *Chosen Approach*: Deeply model the 3 priority verticals (Mobiles, Electronics, Motors) with Pakistan-specific attributes (PTA status, Registered City, Marla/Kanal reference in property, DHA/Gulberg sectors, Marque inspection points).
  - *Why*: Generic e-commerce fields fail in Pakistan; hyper-localized attributes create authentic trust and instant domain credibility.

---

### 4. Technical Architecture & Data Strategy

#### Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        APP ENTRY & ROLE PROVIDER                       │
│             (Active Role: Buyer | Seller | Inspector | Admin)          │
└───────────────────┬────────────────────────────────────────────────────┘
                    │
    ┌───────────────┼─────────────────────────┬──────────────────────┐
    ▼               ▼                         ▼                      ▼
┌──────────────┐ ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ BUYER        │ │ SELLER HUB   │      │ INSPECTION   │      │ ADMIN TRUST  │
│ VIEW         │ │ VIEW         │      │ PORTAL       │      │ CONSOLE      │
├──────────────┤ ├──────────────┤      ├──────────────┤      ├──────────────┤
│ • Search &   │ │ • Listing    │      │ • Assigned   │      │ • Escrow     │
│   Filters    │ │   Wizard     │      │   Audits     │      │   Ledger     │
│ • Catalog    │ │ • WhatsApp   │      │ • 200-Point  │      │ • CNIC Fraud │
│   Grid       │ │   Bot Sim    │      │   Scorer     │      │   Detector   │
│ • Escrow     │ │ • Weekly     │      │ • Issue      │      │ • Dispute    │
│   Checkout   │ │   Payouts    │      │   Reports    │      │   Mediation  │
└──────────────┘ └──────────────┘      └──────────────┘      └──────────────┘
    │               │                         │                      │
    └───────────────┼─────────────────────────┴──────────────────────┘
                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 CENTRALIZED MARKETPLACE STORE (Zustand/Hooks)          │
│ • Listings Store (Mobiles, Motors, Electronics in Lahore)              │
│ • Escrow & Transaction Ledger (Raast / JazzCash / Easypaisa)           │
│ • Verification State (CNIC, Phone OTP, Business NTN)                   │
│ • Inspection Reports & Certificates                                    │
│ • LocalStorage Sync for Persistent Prototype Interactivity             │
└────────────────────────────────────────────────────────────────────────┘
```

#### Key Data Models & State

- **`Listing`**: ID, title, titleUrdu, category (`mobiles` | `motors` | `electronics`), price (PKR), city (`Lahore`), locality (`DHA Phase 5`, `Gulberg III`, etc.), seller (`id`, `name`, `rating`, `tier`: `unverified` | `phone_verified` | `cnic_verified` | `business_ntn`), images, attributes (PTA status, warranty, mileage, engine, transmission), inspectionReportId, escrowEligible, status (`active` | `in_escrow` | `sold`).
- **`EscrowTransaction`**: ID, listingId, buyerName, buyerPhone, amountPKR, platformFeePKR (1%), paymentMethod (`raast` | `jazzcash` | `easypaisa` | `cod_guaranteed`), status (`holding` | `item_shipped` | `disputed` | `released`), handoverOtp, createdAt, scheduledPayoutDate.
- **`InspectionReport`**: ID, listingId, inspectorName, scoreOverall (out of 100), grade (`A+` | `A` | `B` | `C`), checklistItems (mechanical, body/chassis, electronics, road test), photos, certificateHash.
- **`DisputeTicket`**: ID, transactionId, reason, complainant, evidenceUrls, status (`under_review` | `refund_buyer` | `release_seller`).

---

### Step-by-Step Execution Plan

1. **Brand & Shell Configuration**:
   - Update `metadata.json` and `index.html` with title `OLX Pakistan 2.0 — Trust-First Managed Marketplace` and Pakistani meta tags.
   - Establish Tailwind color palette tokens, typography (`Plus Jakarta Sans`), and clean zero-pill styling in `src/index.css`.
2. **Domain Data & State Store**:
   - Create mock Lahore listings across Mobiles, Electronics, and Motors with authentic Pakistani data (PTA status, local Lahore neighborhoods, realistic PKR price benchmarks).
   - Build state management with localStorage synchronization for escrow balances, listings, and verification statuses.
3. **Core Marketplace Components**:
   - Top Bar contract with single brand wordmark `olx.com.pk`, clean navigation links, language toggle (English / اردو), and multi-role simulator selector.
   - Search & faceted discovery bar with Lahore location radius, price range, and "Bharoosa Inspected" filter.
   - Contiguous listing detail modal with price intelligence meter, inspection report viewer, and "Buy with Escrow" CTA.
4. **Escrow & Payment Flow (Raast & Wallets)**:
   - Interactive checkout modal with Raast IBAN / QR, JazzCash, Easypaisa, and COD.
   - Real-time escrow lock demonstration with Handover OTP generation and delivery release button.
5. **Seller Studio & WhatsApp Flow**:
   - Listing creation wizard with dynamic category attributes.
   - Simulated WhatsApp listing bot modal ("Upload photos via WhatsApp").
   - Seller payout dashboard displaying 7-day weekly payout countdown and 1% fee accounting.
6. **Certified Inspector Portal & Diagnostic Checklist**:
   - 200-point vehicle and device inspection tool with auto-grading (A+, A, B, C).
7. **Trust & Admin Command Center**:
   - Escrow balance ledger, CNIC fraud detection simulator, and dispute resolution queue.
8. **Verification & Polish**:
   - Run `compile_applet` and verify zero TypeScript or layout errors across desktop and mobile viewports.
