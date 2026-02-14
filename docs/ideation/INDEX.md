# Ideation Index (Next Run)

목표: 다음 실행에서 **무엇을 바로 이슈/작업으로 전환할지 1분 내 판단** 가능하게 유지.

## Current Focus (추천 실행 순서)

### Card A — docs/next-actions 정리 (중복/상태 정확화)
- **Why now:** `docs/next-actions.md`에 Ticket 7이 중복되고 상태 표기가 혼재되어 가독성이 떨어짐.
- **Scope:**
  - Ticket 중복 제거
  - DONE / IN_PROGRESS / BLOCKED 표기 규칙 통일
  - PR/Issue 링크를 `higgs-jung/tf-prd-lab` 기준으로 정규화
- **Done when:**
  - 중복 항목 0개
  - 각 Ticket에 상태 1개만 존재
  - 깨진 링크 없음(클릭 확인)

### Card B — Milestone snapshot 문서화
- **Why now:** 현재 실험/배포 상태를 한 번에 보기 어려움.
- **Scope:**
  - `docs/` 하위에 `STATUS.md` 추가
  - Milestone별 완료/보류/리스크 5줄 이내 요약
- **Done when:**
  - 신규 참여자가 `STATUS.md`만 읽고 현재 상태를 설명 가능

---

## Ideation Run Template (간단 체크리스트)

아래 템플릿을 복사해 새 이슈/PRD 메모를 만든다.

```md
### [제목]
- Goal (1문장):
- Why now (1문장):
- Scope (파일/경로):
- Out of scope:

#### Done Checklist
- [ ] 변경 파일이 1~3개 내로 유지됨
- [ ] 문서 엔트리( docs/INDEX.md )에서 탐색 가능함
- [ ] 중복/깨진 링크 점검 완료
- [ ] 다음 실행자가 1분 내 시작 가능함

#### Validation
- [ ] 로컬 미리보기/렌더 확인
- [ ] 링크 클릭 점검(상대경로 기준)
- [ ] PR 설명에 목표/범위/완료조건 기재
```

## Link Hygiene Rule

- 링크는 상대경로 우선 (`./`, `../`)
- 문서 엔트리는 `docs/INDEX.md`에서 반드시 연결
- 동일 티켓 중복 기재 금지 (상태 변경 시 기존 항목 갱신)
