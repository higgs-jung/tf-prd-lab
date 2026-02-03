# Next Actions (Sandbox)

## Ticket 1: Add a minimal CI placeholder 🚧 IN_PROGRESS

**Priority:** P1
**Estimated:** Small (30-60m)
**PR:** https://github.com/higgs-ai/tf-prd-lab-20260203/pull/1

### Acceptance Criteria
1. Add a lightweight script under `scripts/` (e.g., `scripts/smoke.sh`) that exits 0.
2. Add a GitHub Actions workflow that runs the script on PRs.
3. Keep the workflow fast (<1m) and avoid secrets.

### How to Validate
- Open PR should show a passing GitHub Actions check.
