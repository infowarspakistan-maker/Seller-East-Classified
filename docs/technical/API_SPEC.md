# API_SPEC.md — REST API Endpoints

## Base URL
- Dev: `http://localhost:3001/v1`
- Prod: `https://api.pakclassifieds.pk/v1`

## Conventions
- Response envelope: `{ data, meta, errors }`
- Errors: RFC 7807 problem+json
- Auth: `Authorization: Bearer <jwt>`
- Pagination: `?page=1&limit=20` → `meta: { total, page, pages }`

## Endpoints

### Auth
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/auth/otp/request` | public | body: { phone } |
| POST | `/auth/otp/verify` | public | body: { phone, code } |
| POST | `/auth/refresh` | any | |
| POST | `/auth/logout` | any | |

### Users
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/users/me` | any | Profile |
| PATCH | `/users/me` | any | Update |
| POST | `/users/me/cnic` | any | Upload CNIC + selfie |

### Listings
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/listings` | seller+ | Create draft |
| GET | `/listings/:id` | public | Get detail |
| PATCH | `/listings/:id` | owner+ | Update |
| DELETE | `/listings/:id` | owner+ | Soft delete |
| POST | `/listings/:id/publish` | owner+ | Submit for review |
| GET | `/listings/search` | public | Elasticsearch search |

### Chat
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/chats` | auth | List user conversations |
| POST | `/chats` | auth | body: { listingId } |
| GET | `/chats/:id/messages` | auth | Get thread |
| POST | `/chats/:id/messages` | auth | Send message |

### Escrow
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/escrow/initiate` | buyer | body: { listingId } |
| POST | `/escrow/:id/pay` | buyer | returns PSP redirect / Raast |
| POST | `/escrow/:id/confirm` | buyer | OTP validation & release |
| POST | `/escrow/:id/cancel` | buyer/seller | Dispute / cancel |

### Moderation (Admin)
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/admin/listings/pending` | staff+ | Queue |
| POST | `/admin/listings/:id/approve` | staff+ | Publish |
| POST | `/admin/listings/:id/reject` | staff+ | Reject with reason |

### Stores
| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/stores` | seller+ | Register business |
| GET | `/stores/:id` | public | Public profile |
| POST | `/stores/:id/staff` | store owner | Add employee |

### Admin & Compliance
| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/admin/reports` | staff+ | Abuse reports |
| GET | `/admin/transactions` | admin+ | Escrow ledger |
| GET | `/admin/fbr/monthly` | admin+ | Form 181 CSV export |

## Versioning
- Breaking change → new `/v2/`
- Deprecation window: 90 days
