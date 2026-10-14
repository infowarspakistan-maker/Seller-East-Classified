# INTEGRATIONS.md — External Services

| Service | Purpose | Env Vars | Owner |
|---|---|---|---|
| Supabase | Auth, Postgres, Realtime | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY` | Backend |
| Elasticsearch | Search | `ES_URL`, `ES_API_KEY` | Backend |
| Redis | Cache, sessions | `REDIS_URL` | Backend |
| S3 | Media | `S3_BUCKET`, `S3_REGION`, `AWS_*` | Infra |
| CloudFront | CDN | `CF_DIST_ID` | Infra |
| Raast | Instant payments | `RAAST_MERCHANT_ID`, `RAAST_KEY` | Payments |
| JazzCash | Wallet | `JC_MERCHANT_ID`, `JC_PASSWORD`, `JC_INTEGRITY_SALT` | Payments |
| Easypaisa | Wallet | `EP_STORE_ID`, `EP_HASH_KEY` | Payments |
| SMS Gateway | OTP | `SMS_API_KEY`, `SMS_SENDER_ID` | Auth |
| WhatsApp Business API | Chat | `WA_PHONE_ID`, `WA_TOKEN`, `WA_TEMPLATE_*` | Comms |
| FBR Portal | Tax reporting | manual upload v1 | Compliance |
| Google Maps | Location, geocoding | `GMAPS_KEY` | Web/Mobile |
| FCM | Push notifications | `FCM_SERVER_KEY` | Mobile |

## Rules
- Every integration must have a **sandbox mode** for dev/staging.
- All secrets in env vars — never in code.
- All webhooks must be idempotent and signature-verified.
- All third-party failures must degrade gracefully (circuit breaker).
