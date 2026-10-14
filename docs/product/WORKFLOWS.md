# WORKFLOWS.md — User & System Flows

## W1. Visitor → Registered User
1. Visitor lands on listing (SEO via Next.js SSR)
2. Clicks "Contact Seller" → modal prompts phone number
3. OTP sent → verified → account created
4. Role = Registered Seller (default)

## W2. Seller Creates Listing (Mobiles example)
1. Tap "Sell" → category picker
2. Select Mobiles → Mobile Phones
3. Step 1: Brand, Model, Storage
4. Step 2: Condition, PTA Approved, Warranty, Battery Health
5. Step 3: Upload ≥4 photos (camera-first)
6. Step 4: Price (with AI price hint), City, Area, Contact prefs
7. Step 5: Review → Publish
8. AI moderation queue → auto-approve OR flag for human review

## W3. Buyer Searches → Chats → Buys
1. Search "Honda Civic 2020 Lahore"
2. Filter: price range, mileage, transmission
3. Open listing → view photos, price intelligence
4. Tap "Chat" → in-app chat opens
5. Buyer taps "Buy with Escrow"
6. Payment initiated (Raast/JazzCash/Easypaisa)
7. Funds held in escrow
8. Seller ships / buyer picks up
9. Buyer confirms → escrow releases → seller payout
10. Both parties rate each other

## W4. High-Value Verification (Car > PKR 50,000)
1. Seller creates car listing
2. Price > PKR 50,000 triggers CNIC verification gate
3. Seller uploads CNIC + selfie
4. Verification agent reviews (SLA 24h)
5. Approved → listing published with "CNIC Verified" badge

## W5. Inspection Service (Optional Add-on)
1. Buyer requests inspection on listing
2. Platform assigns inspector (nearest available)
3. Inspector visits seller → uploads report + photos
4. Buyer receives report → proceeds or cancels
5. Fee split: platform 30%, inspector 70%

## W6. Dispute Resolution
1. Buyer opens dispute within 3 days of delivery
2. Escrow frozen
3. Case assigned to Moderation Manager
4. Both parties submit evidence
5. Resolution within 7 days: full refund / partial / release
6. Outcome logged; seller rating impacted

## W7. Store Owner Onboarding
1. Business seller registers
2. Submits: business name, NTN, STRN, agency license (if applicable)
3. KYC review (SLA 48h)
4. Approved → Store Profile created
5. Store Owner invites Store Staff → they get scoped access

## W8. Listing Moderation
1. Every new listing enters queue
2. AI pre-screen: prohibited items, duplicate images, keyword flags
3. Auto-approve if confidence > 0.95 AND no flags
4. Human review otherwise
5. Rejected → seller notified with reason → can appeal

## W9. Monthly FBR Reporting
1. Cron job runs 1st of month
2. Aggregates: seller name, address, STRN, NTN, transaction count
3. Generates CSV → uploads to FBR portal (manual for v1)
4. Audit log written
