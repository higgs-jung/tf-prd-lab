# Next Actions

상태 라벨 표준: `DONE` | `IN_PROGRESS` | `BLOCKED`

## Active (IN_PROGRESS / BLOCKED)

### Ticket 1 — CI workflow push unblock (`workflow` scope)
- **Status:** BLOCKED
- **Priority:** P0
- **Estimated:** Small (10–15m)
- **Issue:** <https://github.com/higgs-jung/tf-prd-lab/issues/1>
- **PR:** <https://github.com/higgs-jung/tf-prd-lab/pull/1>
- **Blocker:** GitHub OAuth token에 `workflow` scope 없음
- **Next step:** scope 추가 후 workflow 커밋/푸시 재시도

### Ticket 8 — Vercel config for Next.js 404 fix
- **Status:** IN_PROGRESS
- **Priority:** P1
- **Estimated:** Small (30m)
- **Issue:** <https://github.com/higgs-jung/tf-prd-lab/issues/8>
- **PR:** <https://github.com/higgs-jung/tf-prd-lab/pull/8>
- **DoD:**
  - [ ] vercel.json 수정
  - [ ] `pnpm build` 성공
  - [ ] Vercel 404 해결
  - [ ] 리뷰 PASS 후 머지

### Ticket 7 — weird-001 weird category experiment
- **Status:** IN_PROGRESS
- **Priority:** P1
- **Estimated:** Medium (1–2h)
- **Issue:** <https://github.com/higgs-jung/tf-prd-lab/issues/7>
- **PR:** <https://github.com/higgs-jung/tf-prd-lab/pull/9>
- **Milestone:** 1 - Experiments V1 (weird category)
- **DoD:**
  - [x] weird-001 실험 컴포넌트 완성
  - [x] 빌드 성공 (`pnpm build`)
  - [x] 태그 설정 완료
  - [x] Draft PR 제출
  - [ ] 리뷰 PASS 후 머지

## Completed (DONE)

### Ticket 2 — Next.js baseline scaffold
- **Status:** DONE
- **Priority:** P1
- **Estimated:** Medium (1–2h)
- **Issue:** <https://github.com/higgs-jung/tf-prd-lab/issues/2>
- **PR:** <https://github.com/higgs-jung/tf-prd-lab/pull/2>

### Ticket 3 — viz-001 interactive particles
- **Status:** DONE
- **Priority:** P1
- **Estimated:** Medium (1–2h)
- **Issue:** <https://github.com/higgs-jung/tf-prd-lab/issues/3>
- **PR:** <https://github.com/higgs-jung/tf-prd-lab/pull/4>

### Ticket 4 — Vercel deployment configuration
- **Status:** DONE
- **Priority:** P0
- **Estimated:** Small (30m)
- **Issue:** <https://github.com/higgs-jung/tf-prd-lab/issues/4>
- **PR:** <https://github.com/higgs-jung/tf-prd-lab/pull/6>

### Ticket 5 — tool-001 color picker / gradient generator
- **Status:** DONE
- **Priority:** P1
- **Estimated:** Medium (1–2h)
- **Issue:** <https://github.com/higgs-jung/tf-prd-lab/issues/5>
- **PR:** <https://github.com/higgs-jung/tf-prd-lab/pull/5>
- **Milestone:** 1 - Experiments V1 (tool category)

## Notes
- 중복 항목 정리: 기존 Ticket 6(Workflow scope 설정)은 Ticket 1의 blocker/next-step에 병합함.
- 링크 형식 정규화: GitHub 링크를 angle bracket (`<...>`) 형태로 통일.
