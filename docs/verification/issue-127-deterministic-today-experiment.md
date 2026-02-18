# Issue #127 Verification (Smoke)

## What changed
- `lib/todays-experiment.ts` adds date-seeded deterministic selection.
- `app/page.tsx` uses the helper for "오늘의 실험".
- Edge cases:
  - Empty experiment list => `null`
  - Single experiment list => always that experiment

## Smoke steps

1. Start local server.
   ```bash
   pnpm dev
   ```
2. Open `/` and note the shown "오늘의 실험" title.
3. Refresh multiple times on the same day.
   - Expected: same experiment stays selected.
4. Simulate next day by temporarily changing call site to:
   ```ts
   getDeterministicExperimentByDate(experiments, new Date("2026-02-20T09:00:00"))
   ```
   and compare with:
   ```ts
   getDeterministicExperimentByDate(experiments, new Date("2026-02-21T09:00:00"))
   ```
   - Expected: selected experiment changes when date changes (for list length > 1).
5. Edge-case quick check in browser console or temporary snippet:
   ```ts
   getDeterministicExperimentByDate([]) // null
   getDeterministicExperimentByDate([experiments[0]]) // experiments[0]
   ```
