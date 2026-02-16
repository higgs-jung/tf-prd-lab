# Milestone Snapshot

_Last updated: 2026-02-16 (Asia/Seoul)_

- 현재 리포는 **문서/운영 체계는 정리됨**, 제품 구현은 일부 보류된 상태입니다.
- 단기 우선순위는 **배포/CI 안정화**(workflow scope, Vercel 404)입니다.
- 실험 트랙은 `weird-001`이 Draft PR 상태로 남아 있으며 리뷰/머지가 필요합니다.
- 과거 티켓 다수는 완료되었고, 현재는 backlog 정리 이후 문서 가시성 개선 단계입니다.
- 이번 스냅샷의 목적은 신규 참여자가 "지금 무엇이 막혀 있고 무엇이 준비됐는지"를 1분 내 파악하도록 돕는 것입니다.

## Milestone quick view

| Milestone | Status | Snapshot |
|---|---|---|
| 운영 기반/문서 정비 | ✅ Completed | PRD/INDEX/next-actions 구조가 정리되어 실행 흐름(Planner→Captain→Worker→Judge)을 따라갈 수 있음 |
| 실험 V1 (카테고리 실험) | 🟡 In Progress | 일부 실험은 완료되었으나 `weird-001`은 PR 리뷰 대기 |
| 배포 안정화 | 🟡 In Progress | Vercel 404 및 CI workflow scope 이슈로 완전 자동화/안정 배포는 미완 |
| 공개 운용 준비 | 🔴 Blocked | 상기 배포/CI 이슈 해소 전에는 신뢰 가능한 반복 릴리즈가 어려움 |

## Immediate focus

1. CI workflow push 권한(scope) 문제 해소
2. Vercel 라우팅/배포 설정 마무리
3. 열려 있는 실험 PR 리뷰/머지로 상태 정합성 회복
