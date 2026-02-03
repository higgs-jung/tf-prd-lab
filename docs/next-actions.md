# Next Actions (Sandbox)

## Ticket 1: Add a minimal CI placeholder ⏸️ BLOCKED

**Priority:** P1
**Estimated:** Small (30-60m)
**PR:** https://github.com/higgs-ai/tf-prd-lab-20260203/pull/1

**Blocker:** OAuth token missing `workflow` scope - cannot push .github/workflows/smoke-test.yml

### Acceptance Criteria
1. ✅ Add a lightweight script under `scripts/` (e.g., `scripts/smoke.sh`) that exits 0.
2. ⏸️ Add a GitHub Actions workflow that runs script on PRs. (File ready locally, cannot push)
3. ✅ Keep the workflow fast (<1m) and avoid secrets.

### Local State
- scripts/smoke.sh: ✅ Committed and pushed
- .github/workflows/smoke-test.yml: ✅ Ready locally, ❌ Cannot push (workflow scope required)

### How to Unblock
Configure GitHub OAuth token with `workflow` scope, then run:
```bash
git add .github/workflows/smoke-test.yml && git commit -m "ci: add GitHub Actions workflow for smoke test" && git push
```

The workflow YAML is in the PR description for reference.

---

## Ticket 2: Scaffold Next.js app + Vercel-ready baseline ✅ READY

**Priority:** P1
**Estimated:** Medium (1-2h)

### Acceptance Criteria
1. Create a Next.js (App Router + TypeScript) app at repo root.
2. Add routes: `/`, `/experiments`, `/about` (content can be minimal).
3. Add a placeholder experiment list driven from a local file (no DB).
4. Keep it deployable on Vercel without any secrets.

### How to Validate
- `pnpm install && pnpm dev` starts.
- Build succeeds: `pnpm build`.
- Visiting `/experiments` renders at least 1 placeholder experiment card.
