# viz-005 — Lissajous Playground

## 목적
간단한 수학 파라미터(a, b, delta)를 조절하며 Lissajous 곡선을 실시간으로 확인하는 인터랙티브 시각화 실험.

## 방법
- SVG path에 파라메트릭 곡선 점들을 연결해 렌더링
- 슬라이더 변경 시 즉시 재렌더
- Reset 버튼으로 기본값 복원

## 입력
- `a` (x축 주파수)
- `b` (y축 주파수)
- `delta` (위상차)
- `amplitude` (진폭)
- `samples` (샘플 수)

## 출력
- 중앙 기준 Lissajous 곡선 1개
- 현재 파라미터 값 표시

## 제약
- 모바일 뷰포트에서 동작
- SVG 기반 구현 (canvas 미사용)
- 외부 의존성 추가 없음
- 첫 로드 후 3초 이내 인터랙션 가능
