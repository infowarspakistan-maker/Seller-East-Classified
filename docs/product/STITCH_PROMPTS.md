# STITCH_PROMPTS.md — Google Stitch UI/UX Design Briefs

This document contains production-ready **Google Stitch generation prompts** for every primary screen in PakClassifieds / olx.com.pk Trust Edition. Use these prompts directly inside Google Stitch to generate high-fidelity, responsive UI layouts and export clean HTML/Tailwind CSS.

---

## Screen 1: Home & Hyperlocal Discovery Feed (Web & Mobile)

### 1. Context & Business Goal
- **Product:** PakClassifieds / olx.com.pk Trust Edition — Pakistan's trust-first, escrow-native classifieds marketplace.
- **Target Audience:** Pakistani buyers and sellers in Lahore seeking verified automobiles, smartphones (PTA approved), real estate (DHA/Bahria), and electronics without scams.
- **Primary Objective:** Establish immediate trust, showcase local density (Lahore), provide frictionless search, and guide users to escrow-protected transactions.

### 2. Visual Tone & Palette
- **Aesthetic Direction:** Authoritative, clean editorial marketplace. Strict anti-slop rules (no generic purple gradients, no floating pills, no neon glows).
- **Canvas (60%):** `#FFFFFF` and crisp cool off-white `#F8FAFC`.
- **Surfaces (30%):** Corporate dark teal-slate `#002F34`, hairline borders `border-slate-200`, and quiet card backgrounds.
- **Accents (10%):** Trust Emerald (`#0F766E` / `#10B981`) for verification seals and Escrow guarantees; warm saffron `#F59E0B` for featured markers.
- **Typography:** `Plus Jakarta Sans` with bold titles, balanced headlines (`text-wrap: balance`), and tabular numbers (`tabular-nums`) for currency (PKR).

### 3. Layout & Structure
- **Top Bar Contract (1 Row, 3 Zones):**
  - *Zone 1 (Brand):* Single wordmark `olx.com.pk` with `Trust Edition` badge.
  - *Zone 2 (Nav Links):* 4 single-line links (`Motors`, `Property`, `Mobiles`, `Raast Escrow`).
  - *Zone 3 (Action):* Single primary button `+ Post Verified Ad` and WhatsApp quick-list trigger.
- **Role Switcher Utility Bar:** Segmented bar toggling `Buyer Marketplace`, `Seller Studio`, `Certified Inspector`, and `Admin Vault`, with an Urdu (`اردو`) switch.
- **Search & Locality Bar:** Search input with instant typo tolerance, flanked by a Lahore locality selector dropdown (`DHA Phase 1-8`, `Gulberg`, `Johar Town`, `Bahria Town`).
- **3-Tier Category Grid:** 4 prominent department tiles:
  - 🚗 Motors (Sedans, SUVs, Bikes)
  - 🏡 Property & Projects (DHA, Bahria Houses & Plots)
  - 📱 Mobiles & Tablets (Official PTA DIRBS Approved)
  - ⚡ Appliances (Haier Inverters & Electronics)
- **Lahore Featured Grid:** 3-column responsive card grid adhering to zero-pill metadata discipline (`Locality · Year · Specs · Time`) with tabular PKR pricing and price delta comparison.

### 4. Interactive Affordances
- Search query and locality filter with immediate client-side reactive filtering.
- Category tabs switching active collections without page reloads.
- Trust filter checkboxes: `Grade Inspected Only` and `Raast Escrow Eligible`.
- Click on product card opens full detail modal; "Buy with Escrow" button triggers checkout modal.

---

## Screen 2: Listing Detail (PDP) with Contiguous Purchase Module

### 1. Context & Business Goal
- **Product:** Product Detail View for high-ticket Pakistani items (e.g., Honda Civic 2022 in Gulberg or 1 Kanal Villa in DHA Phase 6).
- **Primary Objective:** Convert hesitant buyers by providing 100% transparent proof: verified specs, price intelligence index, 200-point inspection score, and SBP Raast escrow protection.

### 2. Layout & Structure
- **Contiguous Purchase Architecture (2 Columns):**
  - **Left Column (7 cols):**
    - High-fidelity image preview container with inspection grade badge.
    - Verified Specs Grid:
      - *Motors:* Make, Model, Year, Mileage (km), Transmission, Local/Imported Assembly, Registration City.
      - *Property:* Area & Unit (Marla / Kanal), Society/Sector, Bedrooms, Possession Status, Verified NOC/Transfer Letter.
      - *Mobiles:* Brand, Storage, Official PTA DIRBS Approval, Battery Health %.
    - Verified Auditor Summary: Inspector badge number, date, tamper-proof SHA-256 hash, and "View Full 200-Point Audit" button.
  - **Right Column (5 cols):**
    - Contiguous Price Card: Large tabular PKR asking price.
    - **Lahore Market Price Index Gauge:** Visual bar indicating whether price is below or above Lahore 30-day average.
    - **Bharoosa Escrow Guarantee Box:** SBP Raast custody terms and 3-day inspection return window.
    - **Primary CTA:** Large `Buy with Bharoosa Escrow (Raast / Wallets)` button.
    - **Seller Trust Profile:** Name, Member since date, Rating, Total completed deals, and NADRA CNIC / FBR NTN verification badges.
    - Direct Contact: WhatsApp chat button with pre-filled inquiry and privacy-masked call button.

---

## Screen 3: 5-Step Refined Listing Creation Wizard

### 1. Context & Business Goal
- **Product:** Mobile-first listing creation flow designed for Pakistani sellers (completable in under 3 minutes).
- **Primary Objective:** Maximize listing completion rate (from 40% to 85%) using Baymard's "foot-in-the-door" principle, dynamic Pakistan fields (Marla/Kanal, PTA, Assembly), and continuous 20-second background autosave.

### 2. Multi-Step Flow Breakdown
- **Step Header:** Step indicator (`Step X of 5`), progress bar, and "Autosaved to draft" indicator.
- **Step 0 (Department & Vertical):** Visual 4-box card picker (Property, Motors, Mobiles, Appliances) to dynamically load downstream fields.
- **Step 1 (Core Identity):** Clean, category-specific fields (e.g., Property: House/Plot/Flat + Society Name + Area & Unit selector; Car: Make, Model, Year).
- **Step 2 (Technical Specifications):**
  - Property: Possession status (Ready/Under Construction), viewing schedule toggle.
  - Motors: Transmission, Local vs. Imported assembly.
  - Mobiles: Official PTA status (Approved / Non-PTA / Geared), Battery health %.
- **Step 3 (Guided Photo Audit):** Camera-first structured photo slots (Exterior Front 3/4, Rear angle, Interior/Dashboard/Odometer, Documents/NOC).
- **Step 4 (Pricing & Locality):** Price input in PKR + AI Price Intelligence guidance ("Similar listings in Lahore are transacting between PKR X and PKR Y") + Lahore Locality selector.
- **Step 5 (Review & Publish):** Summary preview card + `Publish to Lahore Marketplace` button.

---

## Screen 4: State Bank Raast Escrow Checkout & Delivery Handover OTP

### 1. Context & Business Goal
- **Product:** Escrow Payment Gateway and Handover Verification Screen.
- **Primary Objective:** Solve Pakistan's 90% Cash-on-Delivery trust barrier by holding buyer funds securely via SBP Raast or Mobile Wallets until physical handover.

### 2. Layout & Interactive Elements
- **Order Summary:** Item title, seller name, asking price.
- **Payment Rails Selector:**
  - `Raast Instant Transfer` (State Bank ISO-20022 instant interbank rails).
  - `JazzCash Mobile Wallet`.
  - `Easypaisa Account`.
  - `Guaranteed COD with OTP`.
- **Transparent 1% Fee Accounting:**
  - Item Price (PKR)
  - Platform Escrow Fee (1% flat)
  - Optional 200-Point Physical Inspection Fee
  - Total Locked Amount
- **Post-Payment Success State (Delivery OTP):**
  - Large 6-Digit Handover OTP code (e.g. `749216`) with one-click copy.
  - Plain-language instruction: *"Share this OTP code with the seller ONLY AFTER you have physically received and inspected the item."*

---

## Screen 5: Seller Studio & Guaranteed Tuesday Payout Ledger

### 1. Context & Business Goal
- **Product:** Seller Command Center addressing the critical OLX failure where sellers wait 30+ days for disbursements.
- **Primary Objective:** Deliver transparent 7-day Tuesday payouts, provide Handover OTP redemption, and track active Lahore listings.

### 2. Layout & Key Modules
- **Weekly Payout Countdown Strip:** Next payout date (`Tuesday, 20 Oct 2026`), pending escrow balance, and cleared earnings net of 1% platform fees.
- **Handover OTP Redemption Tool:** Form where seller/courier selects the order, types the buyer's 6-digit OTP, and triggers immediate fund release.
- **Active Listings Table:** Views counter, inquiry count, live price benchmark indicator, and status badge (`active`, `in_escrow`, `completed`).
- **NADRA / FBR Identity Tier Upgrade Modal:** Upload CNIC and FBR NTN to unlock high-ticket escrow sales (> PKR 50,000).

---

## Screen 6: Certified Inspector 200-Point Diagnostic Audit Suite

### 1. Context & Business Goal
- **Product:** Verification Agent & Inspector Workspace for physical car, mobile, and property audits in Lahore.
- **Primary Objective:** Empower freelance and workshop inspectors to audit items, generate scores (out of 100), and issue official digital certificates.

### 2. Layout & Key Modules
- **Assigned Lahore Queue:** List of vehicles, gadgets, and properties awaiting audit.
- **200-Point Diagnostic Checklist:**
  - Paint depth thickness gauge (<120 microns)
  - Chassis frame & pillar factory spot-welds
  - Engine compression PSI test
  - ECU OBD-II diagnostic scan (zero error codes)
  - PTA DIRBS official tax registration check
  - Screen TrueTone / original serial check
- **Real-Time Grade Projection:** Grade calculator (`A+`, `A`, `B`, `C`) based on passed diagnostic checks.
- **Issue Digital Certificate CTA:** Attaches cryptographic audit report to the listing and logs inspector revenue split.

---

## Screen 7: Trust, Safety & Admin Command Center

### 1. Context & Business Goal
- **Product:** Platform Administrator, Moderation & Compliance Console.
- **Primary Objective:** Monitor central escrow liquidity, detect fraudulent duplicate CNIC accounts, arbitrate buyer disputes, and export FBR monthly tax filings.

### 2. Layout & Key Modules
- **Central Escrow Liquidity Vault:** Total PKR held in ring-fenced SBP Raast custody accounts and captured 1% platform revenue.
- **NADRA Scammer Detection Radar:** Real-time AI alerts for multi-city rapid vehicle postings, duplicate engine numbers, or CPID/IMEI patch keywords.
- **Dispute Mediation Queue:** Case viewer with complainant claims, photographic evidence, and arbitration actions (`Refund Buyer via Raast` vs. `Release to Seller`).
- **FBR Form 181 Monthly Seller Reporting Table:** Full vendor registry with CNIC, STRN, NTN, monthly GMV, and one-click CSV export compliant with the Finance Act 2025.

---

## Screen 8: WhatsApp Quick-List Conversational Bot Simulation

### 1. Context & Business Goal
- **Product:** WhatsApp-Integrated Mobile Commerce Flow (`+92 300 0592000`).
- **Primary Objective:** Tap into Pakistan's de facto commerce habits where users prefer chatting and sending photos over complex web forms.

### 2. Layout & Key Modules
- **WhatsApp Chat Interface:** Authentic mobile chat design with verified business badge.
- **Automated AI Assistant:** Receives photos, device model, and demand price in plain Urdu or English.
- **Structured Listing Parser:** Extracts brand, specs, PTA status, and price, presenting a 1-click `Publish to Lahore Marketplace` card.
