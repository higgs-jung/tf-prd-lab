# Next Actions

상태 표기 규칙: `DONE` | `IN_PROGRESS` | `BLOCKED`

## Active First (IN_PROGRESS / BLOCKED)

### Ticket 6: Configure OAuth token with workflow scope for CI
- **Status:** BLOCKED
- **Priority:** P0
- **Estimated:** Small (manual config, 10-15m)
- **Issue:** https://github.com/higgs-jung/tf-prd-lab/issues/6
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/1

**Blocker:** GitHub OAuth token에 `workflow` scope가 없어 workflow 파일 push 불가

**Required Action:**
```bash
git add .github/workflows/smoke-test.yml
git commit -m "ci: add GitHub Actions workflow for smoke test"
git push
```

---

### Ticket 8: Fix Vercel config for Next.js
- **Status:** IN_PROGRESS
- **Priority:** P1
- **Estimated:** Small (30m)
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/8

**목표:** Vercel 배포 시 404 문제 해결 (Next.js 프레임워크 감지)

**Done 정의**
- [ ] vercel.json 수정
- [ ] pnpm build 성공
- [ ] Vercel 배포 404 해결
- [ ] Judge 검토 PASS 후 머지

---

### Ticket 7: Add weird-001 weird category experiment
- **Status:** IN_PROGRESS
- **Priority:** P1
- **Estimated:** Medium (1-2h)
- **Issue:** https://github.com/higgs-jung/tf-prd-lab/issues/7
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/9
- **Milestone:** 1 - Experiments V1 (weird category)

**목표:** "이상한/weird" 카테고리 실험 추가 (Milestone 1 완료)

**Done 정의**
- [x] weird-001 실험 컴포넌트 완성 (중력 반전 물리 시뮬레이션)
- [x] 모든 파일 빌드 성공 (pnpm build)
- [x] 태그 설정: weird, interactive, physics
- [x] 브랜치 생성 및 Draft PR 제출
- [ ] Judge 검토 PASS 후 머지

---

### Ticket 1: Add a minimal CI placeholder
- **Status:** BLOCKED
- **Priority:** P1
- **Estimated:** Small (30-60m)
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/1

**Blocker:** OAuth token missing `workflow` scope

**Local State**
- scripts/smoke.sh: 완료 및 반영
- .github/workflows/smoke-test.yml: 로컬 준비 완료, push 차단

---

## Completed (DONE)

### Ticket 2: Scaffold Next.js app + Vercel-ready baseline
- **Status:** DONE
- **Priority:** P1
- **Estimated:** Medium (1-2h)
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/2

---

### Ticket 3: Add viz-001 interactive particles experiment
- **Status:** DONE
- **Priority:** P1
- **Estimated:** Medium (1-2h)
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/4

---

### Ticket 4: Fix Vercel deployment configuration
- **Status:** DONE
- **Priority:** P0
- **Estimated:** Small (30m)
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/6

---

### Ticket 5: Add tool-001 color picker/gradient generator experiment
- **Status:** DONE
- **Priority:** P1
- **Estimated:** Medium (1-2h)
- **PR:** https://github.com/higgs-jung/tf-prd-lab/pull/5
- **Milestone:** 1 - Experiments V1 (tool category)
