# PRD — Team Workflow Sandbox

## 목적
이 저장소는 **OpenClaw 팀 구성(Planner → Captain → Worker → Judge)** 을 PR 기반으로 검증하기 위한 샌드박스입니다.

- Planner가 티켓을 만들고
- Worker가 브랜치 + Draft PR을 만들고
- Judge가 PASS/CHANGES REQUIRED를 내리고
- Planner가 PASS인 PR을 자동 merge 하는 흐름을 확인합니다.

## 범위
### In-scope
- 문서/규칙 기반 티켓 운영(`docs/next-actions.md`)
- PR 생성/리뷰/자동 머지
- 작은 단위의 기능(문서/스크립트/간단한 코드) 추가

### Out-of-scope
- 배포(CI/CD, Vercel 등) 연동
- 외부 서비스 키/시크릿 운영

## 사용자 스토리
- Owner는 30분마다 요약 알림만 받고 싶다.
- 시스템은 PR이 없으면 스스로 작은 티켓을 만들고 PR을 생성해야 한다.
- 시스템은 PR이 PASS면 자동으로 merge 해야 한다.

## 성공 기준
- 24시간 내에 최소 3개의 PR이 생성되고, 그 중 2개 이상이 자동 merge 된다.
- 중복 PR/유령 IN_PROGRESS 티켓이 자동 정리된다.

## 운영 규칙(요약)
- main 직접 push 금지
- 모든 변경은 브랜치 + PR
- 티켓은 작게(<= 1~2시간)
- 검증 커맨드(가능한 범위) 포함
