'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Point = { x: number; y: number }

const TAU = Math.PI * 2

function clampInt(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)))
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function LissajousDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mountedRef = useRef(false)

  const [freqA, setFreqA] = useState(3)
  const [freqB, setFreqB] = useState(2)
  const [phase, setPhase] = useState(Math.PI / 2)
  const [trailLength, setTrailLength] = useState(900)

  const paramsRef = useRef({ freqA, freqB, phase, trailLength })
  useEffect(() => {
    paramsRef.current = { freqA, freqB, phase, trailLength }
  }, [freqA, freqB, phase, trailLength])

  const formattedPhase = useMemo(() => phase.toFixed(2), [phase])

  const pointsRef = useRef<Point[]>([])
  const sizeRef = useRef({ width: 0, height: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1))

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      sizeRef.current = { width, height }
    }

    resize()
    mountedRef.current = true

    let ro: ResizeObserver | null = null
    const onWindowResize = () => resize()

    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resize())
      ro.observe(container)
    } else {
      window.addEventListener('resize', onWindowResize, { passive: true })
    }

    let t = 0
    let last = performance.now()

    const draw = (now: number) => {
      if (!mountedRef.current) return
      const dt = Math.min(64, now - last)
      last = now

      const { width, height } = sizeRef.current
      const { freqA: a, freqB: b, phase: phi, trailLength: trail } = paramsRef.current

      t += dt * 0.002

      const radius = Math.min(width, height) * 0.42
      const cx = width / 2
      const cy = height / 2

      const x = cx + radius * Math.sin(a * t + phi)
      const y = cy + radius * Math.sin(b * t)

      const points = pointsRef.current
      points.push({ x, y })
      if (points.length > trail) points.splice(0, points.length - trail)

      ctx.fillStyle = 'rgb(3, 7, 18)'
      ctx.fillRect(0, 0, width, height)

      const hue = (t * 30) % 360
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1]
        const p1 = points[i]
        const alpha = i / points.length
        ctx.strokeStyle = `hsla(${hue}, 95%, 65%, ${0.9 * alpha})`
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()
      }

      ctx.fillStyle = `hsl(${hue}, 95%, 70%)`
      ctx.beginPath()
      ctx.arc(x, y, 3.5, 0, TAU)
      ctx.fill()

      if (!mountedRef.current) return
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      mountedRef.current = false
      ro?.disconnect()
      window.removeEventListener('resize', onWindowResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Lissajous Curve Playground</h1>
          <p className="text-slate-300">
            Tune the parameters to explore animated parametric curves.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          <section className="min-h-[55vh] sm:min-h-[65vh]">
            <div
              ref={containerRef}
              className="relative w-full h-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950"
            >
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
            <div className="mt-3 text-xs text-slate-400">
              x(t) = sin(A·t + φ), y(t) = sin(B·t)
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-4">
              <h2 className="text-lg font-semibold">Controls</h2>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-300">Frequencies</label>
                  <div className="text-xs text-slate-400">A: {freqA} • B: {freqB}</div>
                </div>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={1}
                    max={12}
                    step={1}
                    value={freqA}
                    onChange={(e) => setFreqA(clampInt(Number(e.target.value), 1, 12))}
                    className="w-full accent-sky-400"
                    aria-label="A frequency"
                  />
                  <input
                    type="range"
                    min={1}
                    max={12}
                    step={1}
                    value={freqB}
                    onChange={(e) => setFreqB(clampInt(Number(e.target.value), 1, 12))}
                    className="w-full accent-sky-400"
                    aria-label="B frequency"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-300">Phase shift (φ)</label>
                  <div className="text-xs text-slate-400">{formattedPhase} rad</div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={TAU}
                  step={0.01}
                  value={phase}
                  onChange={(e) => setPhase(clamp(Number(e.target.value), 0, TAU))}
                  className="w-full accent-violet-400"
                  aria-label="Phase shift"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-300">Trail length</label>
                  <div className="text-xs text-slate-400">{trailLength} points</div>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={25}
                  value={trailLength}
                  onChange={(e) => setTrailLength(clampInt(Number(e.target.value), 100, 2000))}
                  className="w-full accent-emerald-400"
                  aria-label="Trail length"
                />
              </div>

              <button
                onClick={() => {
                  pointsRef.current = []
                }}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
              >
                Clear trail
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300 space-y-2">
              <div className="text-slate-200 font-semibold">Tips</div>
              <p>Try simple ratios like 1:2, 2:3, 3:4 for closed patterns.</p>
              <p>Adjust φ near π/2 for classic “figure-eight” shapes.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
