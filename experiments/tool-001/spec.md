# tool-001: Color Picker & Gradient Generator

## 목적
사용자가 색상을 선택하고 그라데이션을 생성할 수 있는 간단하고 직관적인 도구를 제공합니다.

## 방법
- React Client 컴포넌트로 상태 관리 (useColorPicker hook)
- 네이티브 HTML5 color input 사용
- 실시간 CSS 코드 생성 및 복사 기능

## 입력/출력
- 입력: 색상 선택(최소 2개), 그라데이션 타입(linear/radial), 각도
- 출력: CSS 코드 문자열, 그라데이션 프리뷰

## 제약
- 클라이언트 사이드 전용 (외부 API 없음)
- 단일 파일 데모 컴포넌트
- 접근성 고려: 키보드 조작 가능
- 최대 5개 색상까지 지원
