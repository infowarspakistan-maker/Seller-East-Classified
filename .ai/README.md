# .ai/README.md — AI Studio Context Loader

Load these files into Google AI Studio / Gemini system context in order:

1. `/docs/core/AGENTS.md`
2. `/docs/core/DO_NOT_BREAK.md`
3. `/docs/core/CONVENTIONS.md`
4. `/docs/core/BLUEPRINT.md`
5. `/docs/product/WORKFLOWS.md`
6. `/docs/product/ROLES_PERMISSIONS.md`
7. `/docs/product/CATEGORIES.md`
8. `/docs/product/LISTING_FORMS.md`
9. The specific module doc relevant to the current task
10. `/docs/core/CHANGELOG.md`

## Session Start Prompt (paste into AI Studio)

> You are working on PakClassifieds / olx.com.pk Trust Edition, a trust-first, escrow-native classifieds marketplace for Pakistan.
> Before doing anything, read AGENTS.md, DO_NOT_BREAK.md, CONVENTIONS.md, and BLUEPRINT.md in `/docs/core/`.
> Then read the specific module doc for this task.
> Follow the Session Protocol in AGENTS.md exactly.
> Do not touch any file in DO_NOT_BREAK.md without explicit written approval.
> Always output in the format specified in AGENTS.md §8.

## Session End Checklist
- [ ] Tests pass
- [ ] CHANGELOG.md updated
- [ ] No frozen files modified
- [ ] Schema migrations added (if any)
- [ ] Docs updated (if behaviour changed)
