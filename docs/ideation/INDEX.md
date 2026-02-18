# Ideation Index (SSOT)

**1-minute goal:** 이 문서만 열어도 다음 1~2개 실행 액션을 바로 고를 수 있어야 합니다.

## Start Here (Canonical Pointers)

- Repo docs entrypoint: [../INDEX.md](../INDEX.md)
- Workflow PRD SSOT: [../PRD.md](../PRD.md)
- Product PRD SSOT: [../PRODUCT_PRD.md](../PRODUCT_PRD.md)
- Execution backlog: [../next-actions.md](../next-actions.md)

## Recently Completed Cards

- [#127](https://github.com/higgs-jung/tf-prd-lab/issues/127) — deterministic "today's experiment" section resolution → merged via [PR #128](https://github.com/higgs-jung/tf-prd-lab/pull/128)
- [#125](https://github.com/higgs-jung/tf-prd-lab/issues/125) — ideation INDEX + next-actions refresh after recent merges → merged via [PR #126](https://github.com/higgs-jung/tf-prd-lab/pull/126)
- [#123](https://github.com/higgs-jung/tf-prd-lab/issues/123) — docs reconcile (`docs/next-actions.md` + `docs/STATUS.md`) → merged via [PR #124](https://github.com/higgs-jung/tf-prd-lab/pull/124)

## Next 1–2 Actions (Pick One)

### 1) Open next product-facing implementation issue (Small)
- Why now: 현재 오픈 Issue/PR가 없어 다음 실행 사이클 진입을 위한 작업 단위가 필요함.
- Scope: `docs/PRD.md`/`docs/PRODUCT_PRD.md` 기준으로 Small 사이즈 이슈 1건 정의.
- Done: Assignee/DoD가 명확한 새 이슈 1건 생성.

### 2) Keep docs pointers warm after first new issue lands
- Why now: 새 이슈 생성 직후 `next-actions`/`INDEX` 정합성을 유지하면 탐색 비용을 줄일 수 있음.
- Scope: 이슈 번호/상태/링크를 `docs/next-actions.md`와 본 문서에 즉시 반영.
- Done: 문서 간 상태 불일치 0 유지.

## Runs

- Active run template: [runs/TEMPLATE.md](./runs/TEMPLATE.md)
- Latest run: [runs/ideation-20260219-0458.md](./runs/ideation-20260219-0458.md)
- Archive index: [_archive/README.md](./_archive/README.md)
- Latest archived run: [_archive/ideation-20260214-0412.md](./_archive/ideation-20260214-0412.md)

## 운영 규칙 (간단)

- 새 아이디어는 먼저 run 문서로 기록 후, 검증되면 이슈/백로그로 승격
- 오래된 run은 삭제하지 말고 `docs/ideation/_archive/`로 이동
- 문서 탐색은 항상 `docs/INDEX.md`에서 시작 가능해야 함
