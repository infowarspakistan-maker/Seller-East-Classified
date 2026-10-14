# CONVENTIONS.md — Code & Naming Standards

## 1. Language & Style
- TypeScript strict mode — no `any`
- ESLint + Prettier enforced via pre-commit
- 2-space indent, single quotes, semicolons
- Naming: `camelCase` (vars), `PascalCase` (components/types), `SCREAMING_SNAKE` (constants), `kebab-case` (files/folders except React components)

## 2. Folder Conventions (Web / Next.js)
```text
/app/(public)/... → public pages
/app/(auth)/... → authenticated pages
/app/(legal)/... → policy pages (FROZEN)
/components/ui/... → design system primitives
/components/listing/... → listing-specific UI
/lib/api/... → API client
```

## 3. API Conventions (NestJS)
- Controllers thin; business logic in services
- DTOs validated with `class-validator`
- Every endpoint declares `@Roles(...)` and `@Scope(...)`
- Errors use RFC 7807 problem+json
- Response envelope: `{ data, meta, errors }`

## 4. Database
- Snake_case tables/columns
- Every table: `id (uuid), created_at, updated_at`
- Soft delete via `deleted_at` — never hard delete user data
- Migrations: one file per change; never edit applied migrations

## 5. Testing
- Unit: Jest (API), React Testing Library (web), Detox (RN)
- Coverage floor: 70% on services, 50% overall
- Test file naming: `*.spec.ts`

## 6. Git
- Branches: `feat/`, `fix/`, `chore/`, `docs/`
- Commits: Conventional Commits (`feat(escrow): ...`)
- PR must reference a doc in `/docs/`

## 7. Comments
- Comment **why**, not what
- Tag uncertain code with `// TODO(owner): ...`
- Tag frozen code with `// FROZEN — see DO_NOT_BREAK.md`

## 8. i18n
- All user-facing strings via `t('key')`
- Locale files: `locales/en.json`, `locales/ur.json`
- RTL handled globally via `dir` attribute

## 9. Security
- Never log PII (CNIC, phone, address)
- Secrets only via env vars; `.env.example` kept updated
- Validate all input at API boundary
