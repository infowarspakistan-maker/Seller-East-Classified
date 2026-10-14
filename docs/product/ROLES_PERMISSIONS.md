# ROLES_PERMISSIONS.md — RBAC Matrix

## Roles (hierarchy: higher inherits lower)
| Level | Role | Scope |
|---|---|---|
| L0 | Super Admin | Platform |
| L1 | Admin | Platform |
| L2 | Manager | Vertical (Motors/Property/Moderation) |
| L3 | Staff/Moderator | Task queue |
| L4 | Store Owner | Own store |
| L5 | Store Staff | Assigned store |
| L6 | Registered Seller | Own account |
| L7 | Visitor | Public |

## Permission Matrix
| Action | SA | A | M | S | SO | SS | RS | V |
|---|---|---|---|---|---|---|---|---|
| Create listing | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | — |
| Edit own listing | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | — |
| Edit any listing | ✅ | ✅ | ✅ | Mod | — | — | — | — |
| Delete own listing | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | — |
| Approve listing | ✅ | ✅ | ✅ | ✅ | — | — | — | — |
| Manage users | ✅ | ✅ | — | — | — | — | — | — |
| Manage categories | ✅ | ✅ | — | — | — | — | — | — |
| View financials | ✅ | ✅ | — | — | Own | — | Own | — |
| Manage disputes | ✅ | ✅ | ✅ | — | — | — | — | — |
| Platform settings | ✅ | — | — | — | — | — | — | — |
| Create admin/staff | ✅ | — | — | — | — | — | — | — |
| Invite store staff | — | — | — | — | ✅ | — | — | — |
| Browse | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Implementation
- JWT claims: `{ userId, role, scope: { storeId?, vertical? } }`
- Middleware chain: `authenticate → authorize(role) → scopeCheck → ownership`
- PostgreSQL RLS enforces isolation at DB layer
- Every new endpoint MUST declare `@Roles()` and `@Scope()`

## Verification Agent (special role)
- Read-only access to assigned listings
- Can upload inspection reports
- Cannot modify listings or see buyer PII
