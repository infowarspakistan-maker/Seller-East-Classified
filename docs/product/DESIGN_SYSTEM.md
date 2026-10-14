# DESIGN_SYSTEM.md — PakClassifieds Design Tokens & Constitutions

## 1. Visual Identity & Brand Architecture
PakClassifieds / olx.com.pk Trust Edition operates on a trust-first visual hierarchy tailored to the Pakistani market, combining authority, local legibility, and anti-slop restraint.

### Color Tokens (60-30-10 Distribution)
| Token | Hex | Usage |
|---|---|---|
| `--color-canvas-bg` | `#F8FAFC` / `#FFFFFF` | 60% dominant neutral surface |
| `--color-surface-card` | `#FFFFFF` / `#F1F5F9` | 30% structural container |
| `--color-primary-green` | `#0F6E3E` | Official Pakistan green brand mark |
| `--color-brand-teal` | `#002F34` | High-authority header & primary CTAs |
| `--color-trust-emerald` | `#0F766E` / `#10B981` | 10% Trust & Escrow confirmation badges |
| `--color-accent-gold` | `#F59E0B` | Featured badges & price comparison highlights |
| `--color-border-subtle` | `#E2E8F0` | Hairline container divider (1px) |
| `--color-text-primary` | `#0F172A` | High-contrast WCAG AA display typography |
| `--color-text-muted` | `#64748B` | Unboxed secondary metadata with `·` |

## 2. Typography
- **Latin Display & Headings:** `Plus Jakarta Sans` (400, 600, 700)
- **Latin Body & UI:** `Plus Jakarta Sans` (14px–16px, line-height 1.5–1.6)
- **Tabular Figures:** Always apply `font-mono tabular-nums` to PKR prices, dates, mileage, and telephone numbers.
- **Urdu Script:** `Noto Nastaliq Urdu` / clean Urdu system sans with proper line-height compensation (1.8x) and RTL alignment (`dir="rtl"`).

## 3. Zero-Pill & Metadata Discipline
- **Banned:** Static pills, colored capsule tags, candy badges for metadata (e.g. `[Karachi]` `[2022]` `[Petrol]`).
- **Required:** Clean unboxed typography separated by typographic middots:
  `Lahore DHA Phase 6 · 2022 · 34,500 km · 1st Owner`
- **Interactive Controls Only:** Segmented filters and active toggle buttons may have discrete rounded-md backgrounds.

## 4. Spatial Geometry
- **Outer container padding:** $\ge 16\text{px}$ (`p-4` to `p-6`)
- **Card radius:** `12px` (`rounded-xl`)
- **Button radius:** `8px` (`rounded-lg`)
- **Nested radius rule:** $r_{\text{inner}} = r_{\text{outer}} - \text{padding}$
- **Touch targets:** $\ge 44\text{px}$ on mobile for one-hand usability.
