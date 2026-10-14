# WIREFRAMES.md — UI Specifications

> ASCII wireframes — replace with Figma links when available.

## WF1. Home (Mobile)
```text
┌─────────────────────────────┐
│ [Logo]       [🔍]      [👤] │
├─────────────────────────────┤
│ 🔍 Search anything...       │
├─────────────────────────────┤
│ [Motors] [Property] [Mobiles]│
│ [Electronics] [Jobs] [More] │
├─────────────────────────────┤
│ Featured Listings           │
│ ┌─────┐  ┌─────┐            │
│ │ IMG │  │ IMG │            │
│ │Price│  │Price│            │
│ └─────┘  └─────┘            │
├─────────────────────────────┤
│ [🏠 Home] [❤️ Saved] [💬 Chat] [👤 Me] │
└─────────────────────────────┘
```

## WF2. Listing Detail (Mobile)
```text
┌─────────────────────────────┐
│ [←]                 [♡] [↗] │
├─────────────────────────────┤
│      [ Photo Carousel ]     │
│          ● ○ ○ ○ ○          │
├─────────────────────────────┤
│ PKR 6,850,000               │
│ Honda Civic 2020            │
│ DHA Phase 5, Lahore         │
├─────────────────────────────┤
│ ✓ CNIC Verified             │
│ ✓ Escrow Protected          │
├─────────────────────────────┤
│ Specs (grid)                │
│ Mileage       45,000 km     │
│ Transmission  Automatic     │
│ Assembly      Local         │
├─────────────────────────────┤
│ Description...              │
├─────────────────────────────┤
│ [💬 Chat]  [📞 Call]  [Buy] │
└─────────────────────────────┘
```

## WF3. Multi-Step Listing Form
```text
Step 1/5 ▓▓▓░░░░░░ Category
Step 2/5 ▓▓▓▓▓░░░░ Specs
Step 3/5 ▓▓▓▓▓▓▓░░ Photos
Step 4/5 ▓▓▓▓▓▓▓▓▓ Price
Step 5/5 ▓▓▓▓▓▓▓▓▓ Review

[ Back ]              [ Next ]
```

## WF4. Admin Moderation Queue
```text
┌──────────┬──────────────────────────┐
│ Filters  │ Pending (42)             │
│ ▸ New    │ ┌──────────────────────┐ │
│ ▸ Flagged│ │ Listing #A123        │ │
│ ▸ Appeal │ │ [thumb] Honda Civic  │ │
│          │ │ Flag: duplicate image│ │
│          │ │ [Approve] [Reject]   │ │
│          │ └──────────────────────┘ │
└──────────┴──────────────────────────┘
```

## WF5. Store Profile Page
```text
┌─────────────────────────────┐
│ [Cover]                     │
│ [Logo] Al-Habib Motors      │
│ ✓ Verified Business · NTN   │
│ ⭐ 4.7 (128 reviews)         │
│ 📍 Lahore · 45 active       │
├─────────────────────────────┤
│ [Inventory] [About] [Reviews]│
│ Grid of listings...         │
└─────────────────────────────┘
```

## Design Tokens
- Primary: `#0F6E3E` (Pakistan green) or `#002F34` (Teal corporate)
- Accent: `#F4B400` / `#00A49F`
- Surface: `#FFFFFF` / Dark `#111827`
- Radius: 12px cards, 8px buttons
- Font: Plus Jakarta Sans / Inter (Latin), Noto Nastaliq Urdu (Urdu)
