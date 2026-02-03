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

---

## Ticket 2: Scaffold Next.js app + Vercel-ready baseline ✅ DONE

**Priority:** P1
**Estimated:** Medium (1-2h)
**PR:** https://github.com/higgs-ai/tf-prd-lab-20260203/pull/2 (merged)

### Acceptance Criteria
1. ✅ Create a Next.js (App Router + TypeScript) app at repo root.
2. ✅ Add routes: `/`, `/experiments`, `/about` (content can be minimal).
3. ✅ Add a placeholder experiment list driven from a local file (no DB).
4. ✅ Keep it deployable on Vercel without any secrets.

### How to Validate
- ✅ `pnpm install && pnpm dev` starts.
- ✅ Build succeeds: `pnpm build`.
- ✅ Visiting `/experiments` renders at least 1 placeholder experiment card.

### Changes
- Next.js 15.5.11 with App Router
- TypeScript 5.9.3
- Tailwind CSS 3.4.19
- Routes: /, /experiments, /about
- experiments/index.json for placeholder data
- Vercel-ready (no secrets required)

---

## Ticket 3: Add viz-001 interactive particles experiment ✅ DONE

**Priority:** P1
**Estimated:** Medium (1-2h)
**Assignee:** worker
**PR:** https://github.com/higgs-ai/tf-prd-lab-20260203/pull/4 (merged)

### 목표
마우스/터치 인터랙션이 가능한 파티클 애니메이션 실험 추가

### 구현 범위
- `experiments/viz-001/demo.tsx`: React Client 컴포넌트 (캔버스 기반)
- `experiments/viz-001/spec.md`: 실험 스펙 (목적, 방법, 제약)
- `app/experiments/viz-001/page.tsx`: 페이지 라우트 ('use client')
- `experiments/index.ts`: viz-001 메타 등록

### Done 정의
- [x] 파티클 데모 컴포넌트 완성 (150개 파티클, 마우스 상호작용)
- [x] 모든 파일 빌드 성공 (pnpm build)
- [x] 태그 설정: viz, interactive, animation
- [x] 브랜치 생성 및 Draft PR 제출
- [x] Judge 검토 PASS 후 머지 완료

### 검증 방법
- [x] 로컬에서 `pnpm build` 실행 (에러 없음)
- [x] Vercel Preview 배포 확인
- [x] 데모 페이지에서 파티클 애니메이션 동작 확인

### 참고
- 빌드 에러 해결: 'use client', import 경로, TypeScript 타입

---

## Ticket 4: Fix Vercel deployment configuration ✅ DONE

**Priority:** P0 (배포 차단)
**Estimated:** Small (30m)
**Assignee:** worker
**PR:** https://github.com/higgs-ai/tf-prd-lab-20260203/pull/6 (merged)

### 목표
Vercel 프로덕션 배포가 실패하는 문제 해결

### 문제
```
Error: No Output Directory named "public" found after the Build completed.
```

Next.js는 `.next` 폴더에 빌드하지만 Vercel이 `public` 폴더를 찾고 있음

### 구현 범위
- `vercel.json` 생성 또는 Vercel 프로젝트 설정 수정
- Next.js App Router 올바른 빌드 설정:
  - Build Command: `next build`
  - Output Directory: `.` (또는 `.next`)

### Done 정의
- [x] vercel.json 생성 (또는 Vercel 웹에서 설정 수정)
- [x] 로컬 빌드 성공 확인
- [x] Vercel 프로덕션 배포 성공

### 검증 방법
- [x] Vercel 배포 로그에서 "No Output Directory" 에러 사라짐
- [x] `/experiments/viz-001` 페이지 접근 가능

---

## Ticket 5: Add tool-001 color picker/gradient generator experiment 🚧 IN_PROGRESS

**Priority:** P1 (Milestone 1 실험 2/3)
**Estimated:** Medium (1-2h)
**PR:** https://github.com/higgs-ai/tf-prd-lab-20260203/pull/5
**Milestone:** 1 - Experiments V1 (tool category)

### 목표
색상 선택 및 그라데이션 생성 툴 실험 추가 (tool 카테고리)

### 구현 범위
- `experiments/tool-001/demo.tsx`: React Client 컴포넌트 (색상 선택기 + 그라데이션 프리뷰)
- `experiments/tool-001/spec.md`: 실험 스펙 (목적, 방법, 제약)
- `app/experiments/tool-001/page.tsx`: 페이지 라우트 ('use client')
- `experiments/index.ts`: tool-001 메타 등록

### 기능 요구사항
- 색상 선택기 (Color Picker) - 최소 2개 색상 지원
- 그라데이션 방향/타입 선택 (linear/radial, 각도)
- 실시간 CSS 코드 생성 및 복사 버튼
- CSS 코드 출력 형식: `background: linear-gradient(...)` 또는 `background: radial-gradient(...)`

### Done 정의
- [x] 색상 선택기 컴포넌트 완성 (최소 2색, linear/radial 지원)
- [x] 그라데이션 프리뷰 실시간 업데이트
- [x] CSS 코드 복사 기능
- [x] 모든 파일 빌드 성공 (pnpm build)
- [x] 태그 설정: tool, color, generator
- [x] 브랜치 생성 및 Draft PR 제출

### 검증 방법
- [x] 로컬에서 `pnpm build` 실행 (에러 없음)
- [x] Vercel Preview 배포 확인 (PR #5)
- [x] 데모 페이지에서 색상/그라데이션 동작 확인
- [x] CSS 코드 복사 기능 동작 확인

### 참고
- PRD 준수: 실험은 작고 독립적 (다른 실험과 의존성 없음)
- 접근성 고려: 키보드 조작 가능한 기본 UI
- 최대 5개 색상까지 지원
- 빠른 프리셋 제공 (4가지 일반적인 그라데이션)
