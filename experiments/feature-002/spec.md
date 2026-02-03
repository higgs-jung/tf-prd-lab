# feature-002: Dark Mode Toggle

## 목적
전체 애플리케이션에서 다크 모드를 지원하고 사용자 선호도를 저장합니다.

## 방법
- Tailwind CSS `darkMode: 'class'` 설정
- React Hook for theme state management
- localStorage for persistence
- System preference detection via matchMedia
- Toggle button with sun/moon icons

## 입력/출력
- 입력: 사용자가 테마 토글 버튼 클릭
- 출력: 애플리케이션 테마 변경, 설정 저장

## 제약
- Hydration mismatch 방지 (suppressHydrationWarning)
- 시스템 선호도 변경 감지
- 페이지 새로고침 후에도 설정 유지
- Client-side only (localStorage)
