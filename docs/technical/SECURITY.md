# SECURITY.md

## Auth
- OTP: 6-digit, 5-minute expiry, max 3 attempts, rate-limited per phone/IP
- JWT: access 15 min, refresh 30 days, rotated
- Session invalidation on password/device change

## Data Protection
- TLS 1.3 everywhere
- Encryption at rest (AES-256)
- CNIC stored as hash + encrypted blob (never plain)
- PII masked in logs
- GDPR/Pakistan data-protection-aligned consent

## Input Validation
- All DTOs validated at API boundary
- File uploads: magic-byte check, size limit (10MB), MIME allowlist
- SQL: parameterised queries only
- XSS: sanitise all user HTML

## RBAC
- Enforced at middleware AND database (RLS)
- Deny by default
- Audit every privileged action

## Payments
- Never store full card data
- PCI: outsource to PSP
- Escrow: dual-approval for manual releases > PKR 500,000

## Incident Response
1. Detect (monitoring, alerts)
2. Contain (revoke keys, block IPs)
3. Eradicate
4. Recover
5. Post-mortem in `/docs/incidents/`

## Compliance
- PECA 2016: 24-hour takedown on notice
- FBR: monthly seller reporting
- SBP: PSP-only fund handling
