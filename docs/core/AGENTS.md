# AGENTS.md — AI Agent Operating Manual

> **READ THIS FILE FIRST.** Every AI session (Gemini, AI Studio, Cursor, Copilot) must read this file, `DO_NOT_BREAK.md`, and `CONVENTIONS.md` before generating, editing, or deleting any code.

## 1. Project Identity
- **Name:** (working title) PakClassifieds / olx.com.pk Trust Edition
- **Type:** Trust-first, escrow-native classifieds marketplace for Pakistan
- **Stack:** Next.js 16 (web) · React Native New Architecture (Android) · NestJS (API) · PostgreSQL · Elasticsearch · Redis · Supabase Auth
- **Domain:** Classifieds + Escrow + Verification + Inspection
- **Target Market:** Pakistan (Lahore first, then Islamabad/Rawalpindi, then tier-2)

## 2. Agent Mandate
Your job is to **improve, extend, or fix** — never to redesign, rewrite, or "modernise" without explicit user approval. Treat this codebase as **frozen at the boundaries** listed in `DO_NOT_BREAK.md`.

## 3. Non-Negotiable Rules
1. **Read before write.** Always read the relevant doc in `/docs/` before touching a module.
2. **One concern per commit.** Do not mix refactors with features.
3. **Never delete a working feature** to make a new one easier. Extend via feature flags.
4. **Never modify** files listed in `DO_NOT_BREAK.md` without explicit written approval from the project owner.
5. **Never change** database schemas without adding a migration file in `/migrations`.
6. **Never hardcode** secrets, API keys, or CNIC numbers.
7. **Never bypass** RBAC middleware — every new endpoint must declare its required role.
8. **Never remove** policy pages, escrow logic, or verification gates.
9. **Always write tests** for new business logic (Jest for API, React Testing Library for web, Detox for RN).
10. **Always update** `CHANGELOG.md` after a change.

## 4. Session Protocol
For every task, the agent must:

1. **Restate the task** in one sentence.
2. **List files to be touched** and confirm none are in `DO_NOT_BREAK.md`.
3. **Identify the affected workflow** (from `WORKFLOWS.md`).
4. **Identify the affected role(s)** (from `ROLES_PERMISSIONS.md`).
5. **Propose the change** with a diff plan.
6. **Wait for confirmation** if the change touches auth, payments, escrow, or schema.
7. **Implement.**
8. **Run tests.**
9. **Update CHANGELOG.md.**

## 5. Escalation Triggers (STOP and Ask)
Stop and request human confirmation if your change:
- Alters escrow state machine
- Alters payment provider integration
- Alters RBAC permission matrix
- Alters auth flow (OTP, JWT, refresh)
- Adds/removes a database column
- Touches anything in `DO_NOT_BREAK.md`
- Removes a category or listing form step
- Changes pricing/monetisation logic

## 6. Forbidden Actions
- ❌ Rewriting a module "from scratch to be cleaner"
- ❌ Renaming folders/files arbitrarily
- ❌ Swapping libraries (e.g., replacing Elasticsearch with Postgres FTS) without approval
- ❌ Deleting "dead code" without confirming it's dead
- ❌ Changing UI copy that is legally required (policy pages)
- ❌ Introducing a new state-management library
- ❌ Adding analytics/trackers not on the approved list

## 7. AI Studio / Gemini Specific
- Load the following files as **system context** in this order:
  1. `AGENTS.md`
  2. `DO_NOT_BREAK.md`
  3. `CONVENTIONS.md`
  4. `BLUEPRINT.md`
  5. The specific module doc you're working on
- Do not rely on memory across sessions — always re-read.
- Prefer **code patches** over full file rewrites.
- When unsure, output a **plan**, not code.

## 8. Output Format Expected
Every agent response must include:
- **Task:** `<one-line restatement>`
- **Files Touched:** `path/to/file.ts (reason)`
- **Risk Level:** `[Low | Medium | High]`
- **Plan:** `...`
- **Tests:** `...`
- **Changelog Entry:** `...`
