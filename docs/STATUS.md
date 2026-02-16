# Milestone Snapshot

_Last updated: 2026-02-17 (Asia/Seoul)_

이 문서는 현재 milestone 진행 상태를 **DONE / IN_PROGRESS / BLOCKED / RISKS** 기준으로 빠르게 확인하기 위한 스냅샷입니다.

## Core docs (quick links)

- [PRD.md](./PRD.md)
- [PRODUCT_PRD.md](./PRODUCT_PRD.md)
- [next-actions.md](./next-actions.md)
- [INDEX.md](./INDEX.md)

## 운영 기반/문서 정비

- **DONE**: `docs/INDEX.md`를 SSOT entrypoint로 정리했고, 운영 기준 문서(`PRD.md`)와 제품 방향(`PRODUCT_PRD.md`) 분리가 완료됨.
- **DONE**: `docs/next-actions.md` 기준으로 티켓 이력/상태를 추적하는 운영 루프가 자리잡음.
- **IN_PROGRESS**: 문서 간 상호 링크와 최신성(최근 이슈/PR 반영) 유지 작업은 지속 필요.
- **BLOCKED**: 구조 자체를 막는 블로커는 현재 없음.
- **RISKS**: 문서 업데이트가 실작업 속도를 못 따라가면 상태 불일치가 누적될 수 있음.

## 실험 V1 (카테고리 실험)

- **DONE**: 실험 트랙/문서 템플릿이 정의되어 신규 실험 추가 경로는 확보됨.
- **IN_PROGRESS**: 일부 실험 결과가 PR 기준으로 정리 중이며, 리뷰-머지 완료가 필요함.
- **BLOCKED**: 배포/CI 신뢰도 이슈가 남아 실험 결과를 안정적으로 릴리즈하기 어려움.
- **RISKS**: Draft/대기 PR이 길어질수록 실험 결과의 최신성·재현성이 낮아질 수 있음.

## 배포 안정화

- **DONE**: 문제 구간(Workflow scope, Vercel 404)이 식별되어 대응 포인트는 명확함.
- **IN_PROGRESS**: CI workflow 권한/트리거 정비 및 Vercel 라우팅 점검 진행 중.
- **BLOCKED**: 위 이슈 해소 전에는 자동 배포 파이프라인을 신뢰하기 어려움.
- **RISKS**: 릴리즈 지연으로 운영 피드백 루프가 느려지고, 문서 상태와 실제 배포 상태 괴리가 커질 수 있음.

## Immediate focus (next)

1. CI workflow scope/권한 이슈 해결
2. Vercel 라우팅·배포 설정 확정
3. 열려 있는 실험 PR 리뷰/머지로 상태 정합성 회복
