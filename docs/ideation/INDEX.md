# Ideation Index (SSOT)

**1-minute goal:** 이 문서만 열어도 다음 1~2개 실행 액션을 바로 고를 수 있어야 합니다.

## Start Here (Canonical Pointers)

- Repo docs entrypoint: [../INDEX.md](../INDEX.md)
- Workflow PRD SSOT: [../PRD.md](../PRD.md)
- Product PRD SSOT: [../PRODUCT_PRD.md](../PRODUCT_PRD.md)
- Execution backlog: [../next-actions.md](../next-actions.md)

## Recently Completed Cards

- [#123](https://github.com/higgs-jung/tf-prd-lab/issues/123) — docs reconcile (`docs/next-actions.md` + `docs/STATUS.md`) → merged via [PR #124](https://github.com/higgs-jung/tf-prd-lab/pull/124)
- [#115](https://github.com/higgs-jung/tf-prd-lab/issues/115) — backlog hygiene (`docs/next-actions.md` status/link cleanup) → merged via [PR #116](https://github.com/higgs-jung/tf-prd-lab/pull/116)

## Next 1–2 Actions (Pick One)

### 1) Close current docs sync loop (#125)
- Why now: 현재 오픈 이슈가 #125 1건이며, 문서 포인터 최신화가 완료되면 backlog 탐색 지연을 줄일 수 있음.
- Scope: `docs/next-actions.md`, `docs/ideation/INDEX.md`, run 1개, `.state.json` 동기화.
- Done: 이슈 #125 머지 완료 + 문서 간 포인터 불일치 0.
- Tracking issue: [#125](https://github.com/higgs-jung/tf-prd-lab/issues/125)

### 2) Next product-facing ticket 1건 발행
- Why now: 문서 정리 이슈가 거의 마무리 단계라, 다음 구현 사이클 진입을 위한 실행 단위 확보가 필요함.
- Scope: `docs/PRD.md`/`docs/PRODUCT_PRD.md` 기준으로 Small 사이즈 이슈 1건 정의.
- Done: Assignee/DoD가 명확한 새 이슈 1건 생성.

## Runs

- Active run template: [runs/TEMPLATE.md](./runs/TEMPLATE.md)
- Latest run: [runs/ideation-20260218-1951.md](./runs/ideation-20260218-1951.md)
- Archive index: [_archive/README.md](./_archive/README.md)
- Latest archived run: [_archive/ideation-20260214-0412.md](./_archive/ideation-20260214-0412.md)

## 운영 규칙 (간단)

- 새 아이디어는 먼저 run 문서로 기록 후, 검증되면 이슈/백로그로 승격
- 오래된 run은 삭제하지 말고 `docs/ideation/_archive/`로 이동
- 문서 탐색은 항상 `docs/INDEX.md`에서 시작 가능해야 함
