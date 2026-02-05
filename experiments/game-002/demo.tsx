'use client'

import { useEffect, useRef, useState } from 'react'

type GameStatus = 'idle' | 'running' | 'paused' | 'ended'

interface Target {
  x: number
  y: number
  r: number
  spawnedAt: number
}

const GAME_WIDTH = 900
const GAME_HEIGHT = 600
const ROUND_MS = 30_000
const BEST_KEY = 'game-002:best-score'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function mapPointerToGamePoint(canvas: HTMLCanvasElement, clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect()
  const scaleX = GAME_WIDTH / rect.width
  const scaleY = GAME_HEIGHT / rect.height
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  }
}

function formatSeconds(ms: number) {
  const clamped = Math.max(0, ms)
  return (clamped / 1000).toFixed(1)
}

export default function AimTrainerGameDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  const gameStatusRef = useRef<GameStatus>('idle')
  const startTsRef = useRef<number | undefined>(undefined)
  const elapsedMsRef = useRef(0)
  const targetRef = useRef<Target | null>(null)

  const uiLastTickRef = useRef<number | undefined>(undefined)
  const scoreRef = useRef(0)
  const bestRef = useRef(0)

  const [gameStatus, setGameStatus] = useState<GameStatus>('idle')
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [timeLeftMs, setTimeLeftMs] = useState(ROUND_MS)

  const setStatus = (next: GameStatus) => {
    gameStatusRef.current = next
    setGameStatus(next)
  }

  const setScoreBoth = (updater: number | ((prev: number) => number)) => {
    setScore(prev => {
      const next = typeof updater === 'function' ? (updater as (p: number) => number)(prev) : updater
      scoreRef.current = next
      return next
    })
  }

  const setBestBoth = (updater: number | ((prev: number) => number)) => {
    setBestScore(prev => {
      const next = typeof updater === 'function' ? (updater as (p: number) => number)(prev) : updater
      bestRef.current = next
      return next
    })
  }

  const spawnTarget = (now: number) => {
    const r = randomBetween(18, 34)
    const padding = 14
    const x = randomBetween(r + padding, GAME_WIDTH - r - padding)
    const y = randomBetween(r + 64, GAME_HEIGHT - r - padding)
    targetRef.current = { x, y, r, spawnedAt: now }
  }

  const resetRound = () => {
    startTsRef.current = undefined
    elapsedMsRef.current = 0
    setScoreBoth(0)
    setTimeLeftMs(ROUND_MS)
  }

  const startNew = () => {
    resetRound()
    const now = performance.now()
    startTsRef.current = now
    spawnTarget(now)
    setStatus('running')
  }

  const resume = () => {
    if (gameStatusRef.current !== 'paused') return
    const now = performance.now()
    startTsRef.current = now - elapsedMsRef.current
    setStatus('running')
  }

  const pause = () => {
    if (gameStatusRef.current !== 'running') return
    const now = performance.now()
    const startTs = startTsRef.current ?? now
    elapsedMsRef.current = now - startTs
    setStatus('paused')
  }

  const restart = () => {
    startNew()
  }

  const endRound = () => {
    elapsedMsRef.current = ROUND_MS
    setTimeLeftMs(0)
    setStatus('ended')
    setBestBoth(prev => {
      const next = Math.max(prev, scoreRef.current)
      try {
        localStorage.setItem(BEST_KEY, String(next))
      } catch {
        // ignore storage errors (private mode, etc.)
      }
      return next
    })
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BEST_KEY)
      const parsed = raw ? Number(raw) : 0
      if (Number.isFinite(parsed) && parsed > 0) {
        setBestBoth(Math.floor(parsed))
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawBackground = () => {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
      ctx.fillStyle = '#0b1220'
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x <= GAME_WIDTH; x += 60) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, GAME_HEIGHT)
        ctx.stroke()
      }
      for (let y = 0; y <= GAME_HEIGHT; y += 60) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(GAME_WIDTH, y)
        ctx.stroke()
      }
    }

    const drawTarget = (now: number) => {
      const t = targetRef.current
      if (!t) return
      const age = (now - t.spawnedAt) / 1000
      const pulse = 1 + Math.sin(age * 5) * 0.06
      const r = t.r * pulse

      // Outer ring
      ctx.beginPath()
      ctx.arc(t.x, t.y, r + 10, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(239,68,68,0.35)'
      ctx.lineWidth = 6
      ctx.stroke()

      // Target body
      ctx.beginPath()
      ctx.arc(t.x, t.y, r, 0, Math.PI * 2)
      ctx.fillStyle = '#ef4444'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Bullseye
      ctx.beginPath()
      ctx.arc(t.x, t.y, Math.max(6, r * 0.32), 0, Math.PI * 2)
      ctx.fillStyle = '#0b1220'
      ctx.fill()
    }

    const drawHud = () => {
      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      ctx.font = '16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
      ctx.fillText(`Score: ${scoreRef.current}`, 16, 28)
      ctx.fillText(`Best: ${bestRef.current}`, 16, 52)
      const seconds = formatSeconds(Math.max(0, ROUND_MS - elapsedMsRef.current))
      ctx.fillText(`Time: ${seconds}s`, GAME_WIDTH - 150, 28)
    }

    const step = (ts: number) => {
      rafRef.current = requestAnimationFrame(step)

      const status = gameStatusRef.current
      const now = ts
      let remaining = ROUND_MS - elapsedMsRef.current

      if (status === 'running') {
        const startTs = startTsRef.current ?? now
        const elapsed = now - startTs
        elapsedMsRef.current = elapsed
        remaining = ROUND_MS - elapsed
        if (remaining <= 0) {
          queueMicrotask(endRound)
          remaining = 0
        }
      }

      // Throttle React UI updates (keep canvas smooth)
      const lastUi = uiLastTickRef.current ?? 0
      if (now - lastUi >= 100 || status === 'ended' || status === 'idle') {
        uiLastTickRef.current = now
        setTimeLeftMs(Math.max(0, Math.floor(remaining)))
      }

      drawBackground()
      if (status !== 'idle') {
        drawTarget(now)
      }
      drawHud()

      if (status === 'idle') {
        ctx.fillStyle = 'rgba(255,255,255,0.75)'
        ctx.font = '18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
        ctx.fillText('Press Start, then tap targets to score.', 16, GAME_HEIGHT - 20)
      }

      if (status === 'paused') {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        ctx.fillStyle = 'rgba(255,255,255,0.92)'
        ctx.font = '28px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
        ctx.fillText('Paused', GAME_WIDTH / 2 - 48, GAME_HEIGHT / 2)
      }

      if (status === 'ended') {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        ctx.fillStyle = 'rgba(255,255,255,0.92)'
        ctx.font = '28px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
        ctx.fillText('Time!', GAME_WIDTH / 2 - 34, GAME_HEIGHT / 2 - 10)
        ctx.font = '18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
        ctx.fillText(`Final score: ${scoreRef.current}`, GAME_WIDTH / 2 - 60, GAME_HEIGHT / 2 + 24)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleTap = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (gameStatusRef.current !== 'running') return

    const point = mapPointerToGamePoint(canvas, clientX, clientY)
    const target = targetRef.current
    if (!target) return

    const dx = point.x - target.x
    const dy = point.y - target.y
    if (dx * dx + dy * dy <= target.r * target.r) {
      setScoreBoth(prev => prev + 1)
      spawnTarget(performance.now())
    }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    handleTap(e.clientX, e.clientY)
  }

  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    if (!touch) return
    e.preventDefault()
    handleTap(touch.clientX, touch.clientY)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-[920px]">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Aim Trainer Mini-Game</h1>
            <p className="text-white/70 text-sm">Tap (or click) the target as many times as you can in 30 seconds.</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  if (gameStatusRef.current === 'idle' || gameStatusRef.current === 'ended') startNew()
                  else resume()
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-medium disabled:opacity-50 disabled:hover:bg-blue-600"
                disabled={gameStatus === 'running'}
              >
                Start
              </button>
              <button
                onClick={pause}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors font-medium disabled:opacity-50 disabled:hover:bg-white/10"
                disabled={gameStatus !== 'running'}
              >
                Stop
              </button>
              <button
                onClick={restart}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors font-medium"
              >
                Restart
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="text-white/70">Score</div>
              <div className="font-semibold tabular-nums">{score}</div>
              <div className="text-white/70">Best</div>
              <div className="font-semibold tabular-nums">{bestScore}</div>
              <div className="text-white/70">Time</div>
              <div className="font-semibold tabular-nums">{formatSeconds(timeLeftMs)}s</div>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="w-full h-auto rounded-xl border border-white/10 bg-[#0b1220] select-none touch-none"
            onPointerDown={onPointerDown}
            onTouchStart={onTouchStart}
          />

          {gameStatus === 'ended' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-md w-[92%] rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 p-6 text-center">
                <h2 className="text-2xl font-semibold mb-1">Time&apos;s up</h2>
                <p className="text-white/70 mb-5 text-sm">
                  Final score: <span className="text-white font-semibold tabular-nums">{score}</span>
                </p>
                <button
                  onClick={restart}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-medium"
                >
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
