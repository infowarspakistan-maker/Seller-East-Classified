# LISTING_FORMS.md — Multi-Step Form Specifications

## Universal Flow
Step 0 → Category · Step 1 → Core · Step 2 → Specs · Step 3 → Photos · Step 4 → Price/Location · Step 5 → Review

**Rules:**
- Autosave every 20s (localStorage + server draft)
- Progress bar on every step
- Inline validation per step
- Cannot proceed until required fields are valid

## Cars (Motors)
| Step | Fields |
|---|---|
| 1 | Make, Model, Year, Condition, Registration City, Reg Number (opt) |
| 2 | Transmission, Fuel, Engine (cc), Mileage, Body, Assembly (Local/Imported), Color, Documents, Owner Name |
| 3 | Min 6 photos (front 3/4, rear, interior, engine, tyres, damage if any) |
| 4 | Price (PKR), Negotiable, City/Area, Seller Type (Individual/Dealer), Description |
| 5 | Preview + Publish |

## Bikes
- Step 1: Make, Model, Year, Condition
- Step 2: Engine cc, Mileage, Registration City, Documents
- Step 3: Photos (min 4)
- Step 4: Price, Location, Seller Type
- Step 5: Review

## Property — For Sale
| Step | Fields |
|---|---|
| 1 | Property Type, Purpose, City, Area/Society, Project (if new) |
| 2 | Area + Unit (Marla/Kanal/Sq.Yd./Sq.Ft.), Beds, Baths, Floors, Furnished, Parking, Features, Possession, Documents |
| 3 | Photos (min 6) |
| 4 | Price, Seller Type (Owner/Agent/Agency/Developer), Contact Pref, Schedule Viewing |
| 5 | Review |

## Property — For Rent
- Step 1: Type, City/Area, Society
- Step 2: Area+Unit, Beds, Baths, Furnished, Floor
- Step 3: Monthly Rent, Deposit, Advance Months, Maintenance, Utilities, Negotiable
- Step 4: Photos, Contact, Tenant Preference
- Step 5: Review

## Mobiles
| Step | Fields |
|---|---|
| 1 | Brand, Model, Storage |
| 2 | Condition, **PTA Approved**, Warranty, Battery Health |
| 3 | Photos (front, back, screen on, about screen showing IMEI) |
| 4 | Price, Location, Accessories, Original Receipt |
| 5 | Review |

## Seller Types (Property & Vehicles)
- **Individual/Owner:** CNIC optional (recommended)
- **Dealer/Agent:** Business name, NTN, License #
- **Agency:** Store profile link, multiple agent accounts
- **Developer:** Project name, license, NOC reference

## Field Rules (Global)
- Price: PKR only; validate numeric; min 100
- Area: number + unit dropdown
- Phone: +92 format validation
- Never allow contact details in description (spam filter)
