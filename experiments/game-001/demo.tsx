'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type GameState = 'start' | 'playing' | 'gameover'

interface FallingObject {
  id: number
  x: number
  y: number
  radius: number
  vy: number
}

interface Basket {
  x: number
  y: number
  width: number
  height: number
}

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function mapPointerToGameX(canvas: HTMLCanvasElement, clientX: number) {
  const rect = canvas.getBoundingClientRect()
  const scaleX = GAME_WIDTH / rect.width
  return (clientX - rect.left) * scaleX
}

export default function CatchGameDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const lastTsRef = useRef<number | undefined>(undefined)
  const nextObjectIdRef = useRef(1)

  const objectsRef = useRef<FallingObject[]>([])
  const basketRef = useRef<Basket>({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - 46,
    width: 140,
    height: 18
  })

  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false })
  const spawnAccumulatorRef = useRef(0)

  const [gameState, setGameState] = useState<GameState>('start')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  const difficulty = useMemo(() => {
    // Starts easy and ramps up smoothly with score.
    const level = Math.floor(score / 100)
    const speedMultiplier = 1 + level * 0.12
    const spawnInterval = clamp(0.95 - level * 0.07, 0.35, 0.95) // seconds
    return { speedMultiplier, spawnInterval }
  }, [score])

  const resetGame = () => {
    objectsRef.current = []
    nextObjectIdRef.current = 1
    spawnAccumulatorRef.current = 0
    lastTsRef.current = undefined
    basketRef.current = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - 46,
      width: 140,
      height: 18
    }
    setScore(0)
    setLives(3)
  }

  const startGame = () => {
    resetGame()
    setGameState('playing')
  }

  const endGame = () => {
    setGameState('gameover')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        keysRef.current.left = true
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        keysRef.current.right = true
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if (gameState === 'start' || gameState === 'gameover') {
          e.preventDefault()
          startGame()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        keysRef.current.left = false
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        keysRef.current.right = false
      }
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('keyup', handleKeyUp, { passive: false })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const spawnObject = () => {
      const radius = 10 + Math.random() * 10
      const x = radius + Math.random() * (GAME_WIDTH - radius * 2)
      const baseVy = 170 + Math.random() * 90
      const obj: FallingObject = {
        id: nextObjectIdRef.current++,
        x,
        y: -radius,
        radius,
        vy: baseVy * difficulty.speedMultiplier
      }
      objectsRef.current.push(obj)
    }

    const checkCatch = (obj: FallingObject, basket: Basket) => {
      const closestX = clamp(obj.x, basket.x - basket.width / 2, basket.x + basket.width / 2)
      const closestY = clamp(obj.y, basket.y, basket.y + basket.height)
      const dx = obj.x - closestX
      const dy = obj.y - closestY
      return dx * dx + dy * dy <= obj.radius * obj.radius
    }

    const draw = () => {
      // Background
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
      ctx.fillStyle = '#0b1220'
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Ground
      ctx.fillStyle = 'rgba(255,255,255,0.08)'
      ctx.fillRect(0, GAME_HEIGHT - 10, GAME_WIDTH, 10)

      // Objects
      for (const obj of objectsRef.current) {
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#60a5fa'
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Basket
      const basket = basketRef.current
      const basketX = basket.x - basket.width / 2
      ctx.fillStyle = '#22c55e'
      ctx.fillRect(basketX, basket.y, basket.width, basket.height)
      ctx.strokeStyle = 'rgba(0,0,0,0.25)'
      ctx.lineWidth = 2
      ctx.strokeRect(basketX, basket.y, basket.width, basket.height)

      // Header text (drawn on canvas so it remains visible even without overlay)
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.font = '16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
      ctx.fillText(`Score: ${score}`, 16, 28)
      ctx.fillText(`Lives: ${lives}`, 16, 52)
    }

    const step = (ts: number) => {
      rafRef.current = requestAnimationFrame(step)
      if (gameState !== 'playing') {
        lastTsRef.current = ts
        draw()
        return
      }

      const lastTs = lastTsRef.current ?? ts
      lastTsRef.current = ts
      const dt = Math.min(0.04, (ts - lastTs) / 1000) // seconds, cap to avoid large jumps

      // Basket movement
      const basketSpeed = 420 * difficulty.speedMultiplier // px/sec
      const basket = basketRef.current
      if (keysRef.current.left) basket.x -= basketSpeed * dt
      if (keysRef.current.right) basket.x += basketSpeed * dt
      basket.x = clamp(basket.x, basket.width / 2, GAME_WIDTH - basket.width / 2)

      // Spawn objects
      spawnAccumulatorRef.current += dt
      while (spawnAccumulatorRef.current >= difficulty.spawnInterval) {
        spawnAccumulatorRef.current -= difficulty.spawnInterval
        spawnObject()
      }

      // Update objects & collisions
      let caughtThisFrame = 0
      let missedThisFrame = 0
      const remaining: FallingObject[] = []

      for (const obj of objectsRef.current) {
        const updated: FallingObject = { ...obj, y: obj.y + obj.vy * dt }

        if (checkCatch(updated, basket)) {
          caughtThisFrame += 1
          continue
        }

        if (updated.y - updated.radius > GAME_HEIGHT) {
          missedThisFrame += 1
          continue
        }

        remaining.push(updated)
      }

      objectsRef.current = remaining

      if (caughtThisFrame > 0) {
        setScore(prev => prev + caughtThisFrame * 10)
      }

      if (missedThisFrame > 0) {
        setLives(prev => {
          const next = prev - missedThisFrame
          if (next <= 0) {
            // End game on next tick after state update.
            queueMicrotask(endGame)
            return 0
          }
          return next
        })
      }

      draw()
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [difficulty.spawnInterval, difficulty.speedMultiplier, gameState, lives, score])

  const handlePointerMove = (clientX: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gameX = mapPointerToGameX(canvas, clientX)
    const basket = basketRef.current
    basket.x = clamp(gameX, basket.width / 2, GAME_WIDTH - basket.width / 2)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlePointerMove(e.clientX)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    if (!touch) return
    handlePointerMove(touch.clientX)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-[920px]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Catch Game</h1>
            <p className="text-white/70 text-sm">
              Move the basket to catch falling objects. Miss 3 and it&apos;s game over.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/70">Score</div>
            <div className="text-xl font-semibold tabular-nums">{score}</div>
          </div>
        </div>

        <div className="relative w-full">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="w-full h-auto rounded-xl border border-white/10 bg-[#0b1220] select-none touch-none"
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
          />

          {/* HUD */}
          <div className="absolute top-3 left-3 flex items-center gap-3">
            <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-sm">
              <div className="text-white/70 text-xs">Lives</div>
              <div className="font-semibold tabular-nums">{lives}</div>
            </div>
            {gameState !== 'playing' && (
              <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-sm text-white/70">
                {gameState === 'start' ? 'Press Enter / Space to start' : 'Press Enter / Space to restart'}
              </div>
            )}
          </div>

          {/* Overlay screens */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-md w-[92%] rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 p-6 text-center">
                <h2 className="text-2xl font-semibold mb-2">Ready?</h2>
                <p className="text-white/70 mb-5 text-sm">
                  Use <span className="text-white">←</span> / <span className="text-white">→</span> or move your
                  mouse/touch to control the basket.
                </p>
                <button
                  onClick={startGame}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-medium"
                >
                  Start
                </button>
              </div>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-md w-[92%] rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 p-6 text-center">
                <h2 className="text-2xl font-semibold mb-1">Game Over</h2>
                <p className="text-white/70 mb-5 text-sm">
                  Final score: <span className="text-white font-semibold tabular-nums">{score}</span>
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={startGame}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-medium"
                  >
                    Restart
                  </button>
                  <button
                    onClick={() => {
                      resetGame()
                      setGameState('start')
                    }}
                    className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors font-medium"
                  >
                    Back to Start
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

