# DATA_MODELS.md — Database Schema

## Conventions
- UUIDs for PKs
- `created_at`, `updated_at` on every table
- Soft delete via `deleted_at`
- All money in `BIGINT` (paisa) or `NUMERIC(14,2)` in PKR

## Core Tables

### users
| col | type | notes |
|---|---|---|
| id | uuid PK | |
| phone | text UNIQUE | +92xxxxxxxxxx |
| email | text NULL | |
| role | enum | see ROLES_PERMISSIONS |
| cnic_verified | bool | default false |
| cnic_hash | text NULL | never store raw |
| full_name | text NULL | |
| city | text NULL | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### stores
`id, owner_id → users, name, ntn, strn, license_no, verified_at, city, address`

### listings
`id, seller_id → users, store_id NULL, category, subcategory, title, description, price_pkr, negotiable, city, area, lat, lng, status (draft|pending|active|rejected|sold), attributes JSONB, created_at, updated_at, deleted_at`

### listing_media
`id, listing_id, url, order, type (image|video), width, height`

### listing_specs_vehicle
`listing_id PK, make, model, year, condition, transmission, fuel, engine_cc, mileage, body, assembly, color, documents[], owner_name, reg_city, reg_no`

### listing_specs_property
`listing_id PK, property_type, purpose, area_value, area_unit, beds, baths, floors, furnished, parking, features[], possession, documents[], society, project`

### listing_specs_mobile
`listing_id PK, brand, model, storage, condition, pta_approved, warranty_months, battery_health, accessories[]`

### transactions
`id, listing_id, buyer_id, seller_id, amount_pkr, status, escrow_state, created_at`

### escrow_events
`id, transaction_id, event, actor_id, payload JSONB, created_at`

### disputes
`id, transaction_id, opened_by, reason, status, resolution, resolved_by, created_at, resolved_at`

### inspections
`id, listing_id, inspector_id, report_url, findings JSONB, fee_pkr, created_at`

### ratings
`id, transaction_id, rater_id, ratee_id, score, comment, created_at`

### reports (moderation)
`id, listing_id, reporter_id, reason, status, resolved_by, created_at`

### audit_log
`id, actor_id, action, entity, entity_id, payload JSONB, ip, created_at`

## RLS Policies
- Users can read own rows; Store Staff can read rows where store_id matches.
- Listings readable by all if status = 'active'.
- Escrow rows readable only by buyer, seller, admin.

## Migrations
- Never edit applied migrations.
- Add new file: `migrations/YYYYMMDDHHMM_description.sql`.
