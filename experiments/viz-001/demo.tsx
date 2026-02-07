'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
}

export default function ParticleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  // UI-only count (avoid per-frame React setState)
  const [particleCount, setParticleCount] = useState(150)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = (count: number) => {
      const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']
      const arr: Particle[] = []

      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          // Make particles more visible across devices (avoid near-invisible tiny/low-alpha dots)
          radius: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        })
      }

      particlesRef.current = arr
    }

    resizeCanvas()
    initParticles(particleCount)

    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      // Reset state each frame (prevents state leak causing blank/too-dark canvas)
      ctx.globalAlpha = 1

      // Clear to solid black each frame for maximum visibility (avoid accumulating near-black haze)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Debug marker (top-left) to confirm drawing is visible on screen
      ctx.fillStyle = '#ffffff'
      ctx.globalAlpha = 1
      ctx.fillRect(0, 0, 6, 6)

      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        let newX = p.x + p.vx
        let newY = p.y + p.vy

        // Mouse interaction (guard against NaN when distance ~ 0)
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - newX
          const dy = mouseRef.current.y - newY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 0.0001 && distance < 100) {
            const force = (100 - distance) / 100
            p.vx += (dx / distance) * force * 0.5
            p.vy += (dy / distance) * force * 0.5
          }
        }

        // Boundary collision
        if (newX < p.radius || newX > canvas.width - p.radius) {
          p.vx *= -0.9
          newX = Math.max(p.radius, Math.min(canvas.width - p.radius, newX))
        }
        if (newY < p.radius || newY > canvas.height - p.radius) {
          p.vy *= -0.9
          newY = Math.max(p.radius, Math.min(canvas.height - p.radius, newY))
        }

        // Friction
        p.vx *= 0.99
        p.vy *= 0.99

        // Draw particle
        ctx.beginPath()
        ctx.arc(newX, newY, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()

        // Draw trail (line to previous particle)
        if (i > 0) {
          const prev = particles[i - 1]
          const trailDx = newX - prev.x
          const trailDy = newY - prev.y
          const trailDistance = Math.sqrt(trailDx * trailDx + trailDy * trailDy)

          if (trailDistance < 100) {
            ctx.beginPath()
            ctx.moveTo(newX, newY)
            ctx.lineTo(prev.x, prev.y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = 0.5
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // commit state
        p.x = newX
        p.y = newY
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
    // particleCount intentionally excluded (we don't want re-init loops on state change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    mouseRef.current = { x: touch.clientX, y: touch.clientY, active: true }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={() => (mouseRef.current.active = false)}
      />
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-2">Interactive Particles</h2>
        <p className="text-white/80 text-sm">Move your mouse/touch to attract particles</p>
        <p className="text-white/60 text-xs mt-2">{particleCount} particles • 60fps</p>
      </div>
    </div>
  )
}
