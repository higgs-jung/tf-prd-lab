# Milestone Snapshot

_Last updated: 2026-02-18 05:30 (Asia/Seoul)_

빠른 컨텍스트 진입용 문서입니다. 자세한 기준/백로그는 아래 문서를 우선 참조하세요.

- 운영 SSOT: [docs/PRD.md](./PRD.md)
- 제품 SSOT: [docs/PRODUCT_PRD.md](./PRODUCT_PRD.md)
- 실행 백로그: [docs/next-actions.md](./next-actions.md)

## Milestone 0 — Foundation & Workflow
- **DONE:** PRD/PRODUCT_PRD/INDEX/next-actions 기반의 문서 진입점과 운영 흐름(Planner→Captain→Worker→Judge) 정리 완료.
- **DONE:** Next.js baseline scaffold, 배포 설정 초안, 실험 템플릿/추가 가이드 확보.
- **IN_PROGRESS:** 문서 간 상태 동기화(실제 PR/Issue 상태와 스냅샷 정합성) 운영 루틴 고도화 중.
- **BLOCKED:** 없음(기반 자체는 동작).
- **RISKS:** 문서 업데이트가 늦어지면 “현재 상태” 신뢰도가 떨어질 수 있음.

## Milestone 1 — Experiments V1
- **DONE:** `viz-001`, `tool-001` 실험은 머지 완료 상태로 기능/빌드 기준 충족.
- **IN_PROGRESS:** `weird-001`는 구현/빌드/태깅 및 Draft PR까지 완료, 리뷰/승인 대기.
- **IN_PROGRESS:** 실험 카테고리 포트폴리오 확장을 위한 다음 카드 발굴은 ideation 트랙에서 지속 중.
- **BLOCKED:** 리뷰 PASS 전에는 milestone 완료로 확정 불가(`weird-001` PR 대기).
- **RISKS:** Draft 장기 방치 시 실험 트랙의 체감 진척도와 실제 코드 상태가 분리될 수 있음.

## Milestone 2 — Deploy & Ops Reliability
- **DONE:** Vercel 배포 설정 기본 작업은 완료되어 최소 배포 파이프라인 뼈대는 확보.
- **IN_PROGRESS:** Next.js 404 관련 설정 보정(`vercel.json`) 이슈가 오픈되어 해결 진행 중.
- **BLOCKED:** GitHub token `workflow` scope 부족으로 workflow 관련 커밋/푸시 경로가 막혀 있음.
- **BLOCKED:** 상기 blocker 해소 전에는 CI 기반 자동 검증/릴리즈 신뢰도 확보가 제한됨.
- **RISKS:** 배포/CI 불안정이 지속되면 PR PASS→merge 사이클이 느려지고 운영 비용이 증가함.

## 1-minute summary
- 문서/운영 뼈대는 준비됨(Foundation ✅).
- 실험 트랙은 일부 완료, 핵심 미해결은 `weird-001` 리뷰 대기.
- 현재 최우선 리스크는 배포/CI 신뢰도(`workflow` scope, Vercel 404).
- 이 두 blocker를 먼저 해소하면, 이후 실험 추가 속도와 merge 리듬이 안정화됨.
