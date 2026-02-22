# Changelog 항목 작성 가이드

`/changelog` 페이지의 카드 형식을 유지하기 위한 작성 규칙입니다.

👉 최신 변경 내역은 [`/changelog`](http://localhost:3000/changelog)에서 확인하세요.

- 대상 파일: `app/changelog/page.tsx`
- 대상 타입: `ChangelogItem`

## 작성 규칙

### 1) 날짜 (`date`)

- 형식: `YYYY-MM-DD` (예: `2026-02-21`)
- 숫자 2자리 월/일을 고정합니다.
- 실제 반영(merge) 날짜 기준으로 작성합니다.

### 2) 요약 (`summary`)

- 1문장 권장(최대 2문장)
- 무엇이 바뀌었는지 + 왜 바꿨는지를 함께 적습니다.
- 릴리즈 노트처럼 사용자/운영자 관점에서 읽히도록 작성합니다.

### 3) 링크 (`links`)

- 관련 PR은 필수로 추가합니다.
- 관련 이슈가 있으면 함께 추가합니다.
- 형식:
  - `{ type: "PR", number: <번호> }`
  - `{ type: "Issue", number: <번호> }`
- 최신 항목이 위에 오도록 배열 상단에 삽입합니다.

## 예시

```ts
{
  date: "2026-02-21",
  title: "Changelog 작성 가이드 추가",
  summary: "changelog 항목 작성 규칙(날짜/요약/링크) 문서를 추가해 업데이트 품질과 일관성을 높였습니다.",
  links: [
    { type: "PR", number: 143 },
    { type: "Issue", number: 143 },
  ],
}
```

```ts
{
  date: "2026-02-22",
  title: "실험 카드 로딩 성능 개선",
  summary: "초기 렌더링 시 불필요한 계산을 줄여 홈 화면 진입 체감 속도를 개선했습니다.",
  links: [{ type: "PR", number: 150 }],
}
```

## 체크리스트

- [ ] `date`가 `YYYY-MM-DD` 형식인가?
- [ ] `summary`가 변경점 + 목적을 담고 있는가?
- [ ] 관련 PR 링크를 넣었는가?
- [ ] (있다면) 관련 Issue 링크를 넣었는가?
- [ ] 최신 항목을 배열 상단에 추가했는가?
