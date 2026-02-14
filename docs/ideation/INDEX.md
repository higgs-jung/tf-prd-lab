# Ideation Index (SSOT)

**1-minute goal:** 이 문서만 열어도 다음 1~2개 실행 액션을 바로 고를 수 있어야 합니다.

## Start Here (Canonical Pointers)

- Repo docs entrypoint: [../INDEX.md](../INDEX.md)
- Workflow PRD SSOT: [../PRD.md](../PRD.md)
- Product PRD SSOT: [../PRODUCT_PRD.md](../PRODUCT_PRD.md)
- Execution backlog: [../next-actions.md](../next-actions.md)

## Next 1–2 Actions (Pick One)

### 1) Backlog hygiene: `docs/next-actions.md` 중복/상태 정리
- Why now: 중복 Ticket(예: Ticket 7)과 상태 혼재로 실행 판단 속도가 느림.
- Scope: 중복 제거, 상태 라벨(DONE/IN_PROGRESS/BLOCKED) 단일화, 링크 정규화.
- Done: 티켓별 단일 상태 + 깨진 링크 0.

### 2) Milestone snapshot 문서 추가 (`docs/STATUS.md`)
- Why now: 신규 참여자가 현재 상태를 한 번에 파악하기 어려움.
- Scope: Milestone별 완료/보류/리스크를 5~10줄로 요약.
- Done: `docs/INDEX.md`에서 접근 가능 + 1분 내 상태 설명 가능.

## Runs

- Active run template: [runs/TEMPLATE.md](./runs/TEMPLATE.md)
- Archive index: [_archive/README.md](./_archive/README.md)
- Latest archived run: [_archive/ideation-20260214-0412.md](./_archive/ideation-20260214-0412.md)

## 운영 규칙 (간단)

- 새 아이디어는 먼저 run 문서로 기록 후, 검증되면 이슈/백로그로 승격
- 오래된 run은 삭제하지 말고 `docs/ideation/_archive/`로 이동
- 문서 탐색은 항상 `docs/INDEX.md`에서 시작 가능해야 함
