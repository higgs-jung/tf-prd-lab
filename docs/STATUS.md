# Milestone Snapshot

_Last updated: 2026-02-18 16:22 (Asia/Seoul)_

빠른 컨텍스트 진입용 문서입니다. 자세한 기준/백로그는 아래 문서를 우선 참조하세요.

- 운영 SSOT: [docs/PRD.md](./PRD.md)
- 제품 SSOT: [docs/PRODUCT_PRD.md](./PRODUCT_PRD.md)
- 실행 백로그: [docs/next-actions.md](./next-actions.md)

## Milestone 0 — Foundation & Workflow
- **DONE:** 문서 진입점(PRD/PRODUCT_PRD/INDEX/next-actions) 및 운영 흐름 정리.
- **DONE:** Next.js baseline/기본 배포 구성/실험 템플릿 반영.
- **IN_PROGRESS:** 없음.
- **BLOCKED:** 없음.
- **RISKS:** 상태 문서 갱신 지연 시 스냅샷 신뢰도 저하 가능.

## Milestone 1 — Experiments V1
- **DONE:** `viz-001`, `tool-001`, `weird-001` 포함 기존 V1 핵심 실험 PR 머지 완료.
- **DONE:** 관련 핵심 티켓(예: #7) closed 상태.
- **IN_PROGRESS:** 없음.
- **BLOCKED:** 없음.
- **RISKS:** 신규 실험 카드 미정의 상태가 길어지면 milestone 이후 추진 속도 저하 가능.

## Milestone 2 — Deploy & Ops Reliability
- **DONE:** Vercel Next.js 404 대응 PR(#8) 머지 완료.
- **DONE:** repo healthcheck + CI 관련 최근 작업들 머지/close 완료.
- **IN_PROGRESS:** 없음(문서 정합성 개선 작업은 Issue #123로 별도 추적).
- **BLOCKED:** 없음(문서 기준으로 확인 가능한 오픈 blocker 없음).
- **RISKS:** CI/배포 이슈 재발 시 즉시 next-actions에 재등록 필요.

## 1-minute summary
- 현재 오픈 PR은 없음.
- 현재 오픈 Issue는 #123(문서 정합성 업데이트) 1건.
- milestone 관점의 기능/배포 blocker는 현재 기준으로 없음.
- 이 PR 머지 후 문서 상태와 GitHub 실제 상태가 다시 일치함.
