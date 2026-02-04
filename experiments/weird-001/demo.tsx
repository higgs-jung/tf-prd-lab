'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  angle: number
}

const COLORS = [
  '#ff6b6b', '#4ecdc4', '#45b7d1',
  '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'
]

function initParticle(canvas: HTMLCanvasElement): Particle {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    radius: Math.random() * 10 + 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    angle: Math.random() * Math.PI * 2
  }
}

export default function GravityReversalDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  
  const [gravityReversed, setGravityReversed] = useState(false)
  const [gravityAngle, setGravityAngle] = useState(90)
  const [particleCount, setParticleCount] = useState(50)

  // Initialize canvas size
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvasSizeRef.current = { width: canvas.width, height: canvas.height }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize particles only when particleCount changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const currentCount = particlesRef.current.length
    
    if (currentCount < particleCount) {
      // Add particles
      for (let i = currentCount; i < particleCount; i++) {
        particlesRef.current.push(initParticle(canvas))
      }
    } else if (currentCount > particleCount) {
      // Remove particles
      particlesRef.current = particlesRef.current.slice(0, particleCount)
    }
  }, [particleCount])

  // Animation loop - runs continuously
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize particles on first mount
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(initParticle(canvas))
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gravityStrength = 0.15
      const gx = Math.cos(gravityAngle * Math.PI / 180) * gravityStrength
      const gy = Math.sin(gravityAngle * Math.PI / 180) * gravityStrength

      // Draw gravity direction indicator
      ctx.save()
      ctx.translate(canvas.width / 2, 50)
      ctx.rotate(gravityAngle * Math.PI / 180)
      ctx.fillStyle = gravityReversed ? '#ff6b6b' : '#4ecdc4'
      ctx.beginPath()
      ctx.moveTo(0, -30)
      ctx.lineTo(20, 20)
      ctx.lineTo(-20, 20)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // Draw gravity direction text
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(
        gravityReversed ? 'GRAVITY REVERSED' : 'Normal Gravity',
        canvas.width / 2,
        90
      )

      particlesRef.current.forEach(particle => {
        // Apply gravity
        particle.vx += gx
        particle.vy += gy

        // Mouse interaction - particles follow mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 300 && distance > 0) {
            const force = (300 - distance) / 300
            particle.vx += (dx / distance) * force * 0.5
            particle.vy += (dy / distance) * force * 0.5
          }
        }

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary collision with bounce
        if (particle.x < particle.radius) {
          particle.x = particle.radius
          particle.vx *= -0.8
        }
        if (particle.x > canvas.width - particle.radius) {
          particle.x = canvas.width - particle.radius
          particle.vx *= -0.8
        }
        if (particle.y < particle.radius) {
          particle.y = particle.radius
          particle.vy *= -0.8
        }
        if (particle.y > canvas.height - particle.radius) {
          particle.y = canvas.height - particle.radius
          particle.vy *= -0.8
        }

        // Draw particle with glow effect
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        const glowIntensity = Math.min(speed / 10, 1)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.7 + glowIntensity * 0.3
        ctx.fill()

        // Glow effect
        if (speed > 2) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.globalAlpha = glowIntensity * 0.3
          ctx.fill()
        }

        ctx.globalAlpha = 1

        // Draw trail for fast particles
        if (speed > 5) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x - particle.vx * 3, particle.y - particle.vy * 3)
          ctx.strokeStyle = particle.color
          ctx.lineWidth = particle.radius * 0.5
          ctx.globalAlpha = 0.5
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })

      // Mouse position indicator
      if (mouseRef.current.active) {
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 10, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gravityAngle, gravityReversed])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      active: true
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    mouseRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      active: true
    }
  }

  const handleMouseLeave = () => {
    mouseRef.current.active = false
  }

  const toggleGravity = () => {
    setGravityReversed(!gravityReversed)
    setGravityAngle(prev => (prev + 180) % 360)
  }

  const addParticles = () => {
    setParticleCount(prev => Math.min(prev + 10, 100))
  }

  const removeParticles = () => {
    setParticleCount(prev => Math.max(prev - 10, 10))
  }

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Controls */}
      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg border border-slate-700 space-y-4">
        <h2 className="text-white text-xl font-bold mb-3">
          Gravity Reversal
        </h2>

        <div className="space-y-2">
          <button
            onClick={toggleGravity}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
              gravityReversed
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {gravityReversed ? 'Reverse Gravity →' : '← Reverse Gravity'}
          </button>

          <div className="flex gap-2">
            <button
              onClick={removeParticles}
              className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              disabled={particleCount <= 10}
            >
              - Particles
            </button>
            <button
              onClick={addParticles}
              className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              disabled={particleCount >= 100}
            >
              + Particles
            </button>
          </div>
        </div>

        <div className="text-white/80 text-sm space-y-1">
          <p>Particles: {particleCount}/100</p>
          <p>Gravity: {gravityAngle}°</p>
        </div>

        <div className="text-white/60 text-xs">
          <p>Move mouse/touch to attract particles</p>
          <p>Click button to reverse gravity</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg">
        <p className="text-white/80 text-sm text-center">
          Weird experiment #001 • Gravity follows your movement • Reverse it for chaos
        </p>
      </div>
    </div>
  )
}
