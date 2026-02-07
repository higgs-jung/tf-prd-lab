'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Vec2 = { x: number; y: number }

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function rot(v: Vec2, radians: number): Vec2 {
  const c = Math.cos(radians)
  const s = Math.sin(radians)
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c }
}

function fmt(n: number, digits = 2) {
  return Number.isFinite(n) ? n.toFixed(digits) : String(n)
}

export default function MoireWarpPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [spacing, setSpacing] = useState(18)
  const [overlayRotationDeg, setOverlayRotationDeg] = useState(8)
  const [warpStrength, setWarpStrength] = useState(1.0)
  const [decay, setDecay] = useState(0.92)
  const [showOverlay, setShowOverlay] = useState(true)

  // A tiny displacement field on a coarse grid in normalized space.
  const field = useRef<{ w: number; h: number; dx: Float32Array; dy: Float32Array } | null>(null)

  const dpr = useMemo(
    () => (typeof window !== 'undefined' ? Math.max(1, Math.min(3, window.devicePixelRatio || 1)) : 1),
    []
  )

  useEffect(() => {
    const canvasEl = canvasRef.current
    const containerEl = containerRef.current
    if (!canvasEl || !containerEl) return

    const canvas = canvasEl
    const container = containerEl

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const g = ctx

    const FIELD_W = 64
    const FIELD_H = 36
    field.current = {
      w: FIELD_W,
      h: FIELD_H,
      dx: new Float32Array(FIELD_W * FIELD_H),
      dy: new Float32Array(FIELD_W * FIELD_H)
    }

    let raf = 0
    let mounted = true

    const pointer = {
      down: false,
      p: { x: 0, y: 0 } as Vec2
    }

    function resize() {
      const ctn = containerRef.current
      if (!ctn) return
      const rect = ctn.getBoundingClientRect()
      const w = Math.max(320, Math.floor(rect.width))
      const h = Math.max(420, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(container)
    resize()

    function fieldIndex(ix: number, iy: number) {
      return iy * FIELD_W + ix
    }

    function addImpulse(normX: number, normY: number, vx: number, vy: number) {
      const f = field.current
      if (!f) return
      const { w, h, dx, dy } = f

      const cx = normX * (w - 1)
      const cy = normY * (h - 1)

      const radius = 5
      for (let j = -radius; j <= radius; j++) {
        for (let i = -radius; i <= radius; i++) {
          const x = Math.floor(cx + i)
          const y = Math.floor(cy + j)
          if (x < 0 || y < 0 || x >= w || y >= h) continue
          const dist2 = i * i + j * j
          const falloff = Math.exp(-dist2 / 10)
          const k = fieldIndex(x, y)
          dx[k] += vx * falloff
          dy[k] += vy * falloff
        }
      }
    }

    function sampleField(normX: number, normY: number): Vec2 {
      const f = field.current
      if (!f) return { x: 0, y: 0 }
      const { w, h, dx, dy } = f

      const fx = clamp(normX, 0, 1) * (w - 1)
      const fy = clamp(normY, 0, 1) * (h - 1)
      const x0 = Math.floor(fx)
      const y0 = Math.floor(fy)
      const x1 = Math.min(w - 1, x0 + 1)
      const y1 = Math.min(h - 1, y0 + 1)
      const tx = fx - x0
      const ty = fy - y0

      const i00 = y0 * w + x0
      const i10 = y0 * w + x1
      const i01 = y1 * w + x0
      const i11 = y1 * w + x1

      const sx0 = lerp(dx[i00], dx[i10], tx)
      const sx1 = lerp(dx[i01], dx[i11], tx)
      const sy0 = lerp(dy[i00], dy[i10], tx)
      const sy1 = lerp(dy[i01], dy[i11], tx)

      return { x: lerp(sx0, sx1, ty), y: lerp(sy0, sy1, ty) }
    }

    function drawGrid(rotationRad: number, color: string, warp: boolean) {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const cx = w / 2
      const cy = h / 2

      g.save()
      g.translate(cx, cy)
      g.lineWidth = 1
      g.strokeStyle = color
      g.globalAlpha = 0.9

      const maxDim = Math.hypot(w, h)
      const half = maxDim / 2
      const step = clamp(spacing, 8, 40)

      g.beginPath()
      for (let t = -half; t <= half; t += step) {
        // horizontal
        const a = { x: -half, y: t }
        const b = { x: half, y: t }
        const A = rot(a, rotationRad)
        const B = rot(b, rotationRad)

        if (warp) {
          const nAx = (A.x + cx) / w
          const nAy = (A.y + cy) / h
          const nBx = (B.x + cx) / w
          const nBy = (B.y + cy) / h
          const da = sampleField(nAx, nAy)
          const db = sampleField(nBx, nBy)
          g.moveTo(A.x + da.x * 40 * warpStrength, A.y + da.y * 40 * warpStrength)
          g.lineTo(B.x + db.x * 40 * warpStrength, B.y + db.y * 40 * warpStrength)
        } else {
          g.moveTo(A.x, A.y)
          g.lineTo(B.x, B.y)
        }

        // vertical
        const av = { x: t, y: -half }
        const bv = { x: t, y: half }
        const AV = rot(av, rotationRad)
        const BV = rot(bv, rotationRad)
        if (warp) {
          const nAx = (AV.x + cx) / w
          const nAy = (AV.y + cy) / h
          const nBx = (BV.x + cx) / w
          const nBy = (BV.y + cy) / h
          const da = sampleField(nAx, nAy)
          const db = sampleField(nBx, nBy)
          g.moveTo(AV.x + da.x * 40 * warpStrength, AV.y + da.y * 40 * warpStrength)
          g.lineTo(BV.x + db.x * 40 * warpStrength, BV.y + db.y * 40 * warpStrength)
        } else {
          g.moveTo(AV.x, AV.y)
          g.lineTo(BV.x, BV.y)
        }
      }
      g.stroke()
      g.restore()
    }

    function tick() {
      if (!mounted) return

      const w = canvas.width / dpr
      const h = canvas.height / dpr

      // decay field
      const f = field.current
      if (f) {
        for (let i = 0; i < f.dx.length; i++) {
          f.dx[i] *= decay
          f.dy[i] *= decay
        }
      }

      g.clearRect(0, 0, w, h)
      g.fillStyle = '#020617'
      g.fillRect(0, 0, w, h)

      // base grid
      drawGrid(0, 'rgba(148, 163, 184, 0.55)', false)

      // overlay grid (rotated + warped)
      if (showOverlay) {
        const rotRad = (overlayRotationDeg * Math.PI) / 180
        drawGrid(rotRad, 'rgba(56, 189, 248, 0.60)', true)
      }

      if (pointer.down) {
        g.fillStyle = 'rgba(244, 114, 182, 0.85)'
        g.beginPath()
        g.arc(pointer.p.x, pointer.p.y, 4, 0, Math.PI * 2)
        g.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    function onPointerDown(e: PointerEvent) {
      pointer.down = true
      const rect = canvas.getBoundingClientRect()
      pointer.p = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      canvas.setPointerCapture(e.pointerId)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const prev = pointer.p
      pointer.p = { x, y }

      if (!pointer.down) return

      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const nx = clamp(x / w, 0, 1)
      const ny = clamp(y / h, 0, 1)

      const vx = (x - prev.x) / 80
      const vy = (y - prev.y) / 80
      addImpulse(nx, ny, vx, vy)
    }

    function onPointerUp(e: PointerEvent) {
      pointer.down = false
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {}
    }

    function reset() {
      const f = field.current
      if (!f) return
      f.dx.fill(0)
      f.dy.fill(0)
    }

    ;(window as any).__viz004_reset = reset

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)

    tick()

    return () => {
      mounted = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
    }
  }, [dpr, spacing, overlayRotationDeg, warpStrength, decay, showOverlay])

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] bg-slate-950 text-white overflow-hidden">
      <div className="absolute left-4 top-4 z-10 w-[320px] rounded-xl bg-slate-950/70 backdrop-blur border border-white/10 p-4">
        <div className="text-sm font-semibold">viz-004 — Moiré Warp</div>
        <div className="mt-1 text-xs text-white/70">Drag on the canvas to warp the overlay grid.</div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Spacing</span>
              <span>{spacing}px</span>
            </div>
            <input
              className="w-full accent-sky-400"
              type="range"
              min={8}
              max={40}
              step={1}
              value={spacing}
              onChange={(e) => setSpacing(Number(e.target.value))}
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Overlay rotation</span>
              <span>{overlayRotationDeg}°</span>
            </div>
            <input
              className="w-full accent-sky-400"
              type="range"
              min={0}
              max={25}
              step={1}
              value={overlayRotationDeg}
              onChange={(e) => setOverlayRotationDeg(Number(e.target.value))}
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Warp strength</span>
              <span>{fmt(warpStrength, 2)}</span>
            </div>
            <input
              className="w-full accent-sky-400"
              type="range"
              min={0.2}
              max={2.5}
              step={0.05}
              value={warpStrength}
              onChange={(e) => setWarpStrength(Number(e.target.value))}
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>Decay</span>
              <span>{fmt(decay, 2)}</span>
            </div>
            <input
              className="w-full accent-sky-400"
              type="range"
              min={0.85}
              max={0.99}
              step={0.01}
              value={decay}
              onChange={(e) => setDecay(Number(e.target.value))}
            />
          </label>

          <label className="flex items-center justify-between text-xs text-white/70">
            <span>Show overlay</span>
            <input type="checkbox" checked={showOverlay} onChange={(e) => setShowOverlay(e.target.checked)} />
          </label>

          <div className="flex gap-2">
            <button
              className="flex-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-sm"
              onClick={() => {
                ;(window as any).__viz004_reset?.()
              }}
            >
              Reset warp
            </button>
            <button
              className="rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-sm"
              onClick={() => {
                setSpacing(18)
                setOverlayRotationDeg(8)
                setWarpStrength(1)
                setDecay(0.92)
                ;(window as any).__viz004_reset?.()
              }}
            >
              Defaults
            </button>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
