# 실험 추가 가이드 (How to Add an Experiment)

tf-prd-lab에 새로운 실험을 추가하는 방법을 설명합니다. 이 프로젝트는 “작고 빠른 실험”을 반복하기 위한 샌드박스이므로, **구조만 지키고 내용은 자유롭게** 구현해도 됩니다.

## 파일 구조

실험은 보통 아래 4개 파일(최소)로 구성됩니다.

```
experiments/
├── {category}-{number}/
│   ├── demo.tsx       # 실험 핵심 로직 (React 컴포넌트)
│   └── spec.md        # 실험 스펙 (목적/방법/제약)
app/experiments/
└── {category}-{number}/
    └── page.tsx       # 페이지 라우트 (demo import)
experiments/index.ts   # 실험 메타데이터 등록 (수정)
```

## 네이밍 규칙

- `{category}-{number}` 형식 사용 (예: `viz-003`, `tool-002`, `weird-001`, `game-001`)
- 카테고리는 실험 성격에 맞게 선택합니다.

| 카테고리 | 설명 | 예시 |
|---|---|---|
| `viz` | 시각화/그래픽 | 파티클, 프랙탈, 웨이브 |
| `tool` | 유틸리티 | 컬러피커, 포맷터, 계산기 |
| `weird` | 실험적/기이함 | 글리치, 중력 반전, 이상한 물리 |
| `game` | 게임 | 캐치 게임, 간단한 아케이드 |

## 단계별 추가 방법

### 1) 디렉토리 생성

```bash
mkdir -p experiments/{category}-{number}
mkdir -p app/experiments/{category}-{number}
```

예시:
- `experiments/viz-003`
- `app/experiments/viz-003`

### 2) `spec.md` 작성

`experiments/{category}-{number}/spec.md`에 “의도”만 간단히 기록합니다.

```md
# {category}-{number}: Experiment Title

## 목적 (Purpose)
이 실험이 무엇을 보여주려는지 1~3문장.

## 방법 (Method)
- 핵심 아이디어/알고리즘
- 주요 인터랙션(마우스/키보드/터치)

## 입출력 (Input/Output)
- Input: 사용자가 무엇을 조작하는지
- Output: 화면/소리/상태 변화가 무엇인지

## 제약 (Constraints)
- 클라이언트 사이드만 (외부 API/키 사용 금지)
- 성능 목표(예: 60fps) / 모바일 고려
```

### 3) `demo.tsx` 작성

`experiments/{category}-{number}/demo.tsx`는 **클라이언트 컴포넌트**로 작성합니다.

```tsx
'use client'

import { useEffect, useRef } from 'react'

export default function ExperimentDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // 실험 로직 작성
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="relative w-full h-screen bg-slate-900">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
```

필수 사항:
- 파일 상단에 `'use client'`
- `export default function` 형태로 노출
- 브라우저 API(Canvas/WebAudio 등)를 쓰면 SSR을 끄는 쪽으로 구성

### 4) `page.tsx` 작성

`app/experiments/{category}-{number}/page.tsx`에서 `demo.tsx`를 **dynamic import + `ssr: false`**로 로드합니다.

```tsx
'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'

const ExperimentDemo = dynamic(() => import('@/experiments/{category}-{number}/demo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-white/80">Loading experiment...</div>
    </div>
  ),
})

export default function ExperimentPage() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-slate-900/50 backdrop-blur-sm text-white rounded-lg hover:bg-slate-900/70 transition-colors"
        >
          ← Back to Experiments
        </Link>
      </nav>

      <ExperimentDemo />
    </main>
  )
}
```

필수 사항:
- `ssr: false`로 설정(캔버스 등 클라이언트 API 사용)
- 로딩 상태 UI 제공

### 5) `experiments/index.ts` 등록

`experiments/index.ts`에 메타데이터를 추가합니다.

```ts
{
  id: '{category}-{number}',
  slug: '{category}-{number}',
  title: 'Experiment Title',
  description: 'Short description of the experiment',
  status: 'ready',
  createdAt: 'YYYY-MM-DD',
  category: '{category}', // 'viz' | 'tool' | 'weird' | 'game'
  tags: ['tag1', 'tag2'],
  demoComponent: () => import('./{category}-{number}/demo'),
}
```

## 체크리스트 (PR 올리기 전)

- [ ] `demo.tsx`에 `'use client'` 추가
- [ ] `page.tsx`가 dynamic import + `ssr: false`
- [ ] `spec.md` 작성
- [ ] `experiments/index.ts`에 등록
- [ ] `pnpm build` 성공
- [ ] `/experiments` 목록에 노출 확인
- [ ] `/experiments/{slug}` 페이지 로드 확인
- [ ] 브라우저 콘솔 에러가 없는지 확인

## 빌드/로컬 확인

```bash
pnpm install
pnpm build
pnpm dev
```

## 트러블슈팅

### “Module not found”
- import 경로가 `@/experiments/...` 형태인지 확인
- 파일/폴더명이 `{category}-{number}`와 일치하는지 확인

### Hydration mismatch / SSR 이슈
- `page.tsx`에서 `dynamic(..., { ssr: false })`를 사용했는지 확인
- 브라우저 전용 로직은 `demo.tsx` 내부(`useEffect`)로 이동

### 실험이 목록에 안 보임
- `experiments/index.ts`에 등록 여부 확인
- `demoComponent` import 경로가 올바른지 확인

## 예시 실험 참고

- `viz-001`: Interactive Particle System
- `weird-001`: Gravity Reversal
- `game-001`: Interactive Catch Game
