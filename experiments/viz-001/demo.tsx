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
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const initialParticles: Particle[] = []
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']

    for (let i = 0; i < 150; i++) {
      initialParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.5
      })
    }

    setParticles(initialParticles)

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      setParticles(currentParticles => {
        return currentParticles.map((particle, index) => {
          // Update position
          let newX = particle.x + particle.vx
          let newY = particle.y + particle.vy

          // Mouse interaction
          const dx = mouseRef.current.x - newX
          const dy = mouseRef.current.y - newY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.vx += (dx / distance) * force * 0.5
            particle.vy += (dy / distance) * force * 0.5
          }

          // Boundary collision
          if (newX < particle.radius || newX > canvas.width - particle.radius) {
            particle.vx *= -0.9
            newX = Math.max(particle.radius, Math.min(canvas.width - particle.radius, newX))
          }
          if (newY < particle.radius || newY > canvas.height - particle.radius) {
            particle.vy *= -0.9
            newY = Math.max(particle.radius, Math.min(canvas.height - particle.radius, newY))
          }

          // Friction
          particle.vx *= 0.99
          particle.vy *= 0.99

          // Draw particle
          ctx.beginPath()
          ctx.arc(newX, newY, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.globalAlpha = particle.alpha
          ctx.fill()

          // Draw trail
          if (index > 0) {
            const prevParticle = currentParticles[index - 1]
            const trailDx = newX - prevParticle.x
            const trailDy = newY - prevParticle.y
            const trailDistance = Math.sqrt(trailDx * trailDx + trailDy * trailDy)

            if (trailDistance < 100) {
              ctx.beginPath()
              ctx.moveTo(newX, newY)
              ctx.lineTo(prevParticle.x, prevParticle.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = 0.2
              ctx.stroke()
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    mouseRef.current = {
      x: touch.clientX,
      y: touch.clientY
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      />
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-2">Interactive Particles</h2>
        <p className="text-white/80 text-sm">
          Move your mouse/touch to attract particles
        </p>
        <p className="text-white/60 text-xs mt-2">
          {particles.length} particles • 60fps
        </p>
      </div>
    </div>
  )
}
