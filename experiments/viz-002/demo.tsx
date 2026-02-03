'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Viewport {
  centerX: number
  centerY: number
  zoom: number
}

const WIDTH = 800
const HEIGHT = 600
const MAX_ITERATIONS_DEFAULT = 100

const COLOR_PALETTES = {
  fire: (iter: number, maxIter: number) => {
    const t = iter / maxIter
    return {
      r: Math.floor(255 * t),
      g: Math.floor(128 * t * t),
      b: Math.floor(50 * (1 - t))
    }
  },
  ocean: (iter: number, maxIter: number) => {
    const t = iter / maxIter
    return {
      r: Math.floor(50 * (1 - t)),
      g: Math.floor(100 * t),
      b: Math.floor(255 * Math.sqrt(t))
    }
  },
  psychedelic: (iter: number, maxIter: number) => {
    const t = iter / maxIter
    return {
      r: Math.floor(128 + 127 * Math.sin(t * Math.PI * 3)),
      g: Math.floor(128 + 127 * Math.sin(t * Math.PI * 5)),
      b: Math.floor(128 + 127 * Math.sin(t * Math.PI * 7))
    }
  },
  grayscale: (iter: number, maxIter: number) => {
    const v = Math.floor(255 * iter / maxIter)
    return { r: v, g: v, b: v }
  }
}

export default function FractalDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [viewport, setViewport] = useState<Viewport>({
    centerX: -0.5,
    centerY: 0,
    zoom: 1
  })
  const [maxIterations, setMaxIterations] = useState(MAX_ITERATIONS_DEFAULT)
  const [palette, setPalette] = useState<keyof typeof COLOR_PALETTES>('fire')
  const [isRendering, setIsRendering] = useState(false)
  const [renderTime, setRenderTime] = useState(0)

  const drawFractal = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsRendering(true)
    const startTime = performance.now()

    const imageData = ctx.createImageData(WIDTH, HEIGHT)
    const data = imageData.data

    const { centerX, centerY, zoom } = viewport
    const scale = 3.0 / (Math.min(WIDTH, HEIGHT) * zoom)

    for (let py = 0; py < HEIGHT; py++) {
      for (let px = 0; px < WIDTH; px++) {
        const x0 = centerX + (px - WIDTH / 2) * scale
        const y0 = centerY + (py - HEIGHT / 2) * scale

        let x = 0
        let y = 0
        let iteration = 0

        while (x * x + y * y <= 4 && iteration < maxIterations) {
          const xtemp = x * x - y * y + x0
          y = 2 * x * y + y0
          x = xtemp
          iteration++
        }

        const idx = (py * WIDTH + px) * 4

        if (iteration === maxIterations) {
          data[idx] = 0
          data[idx + 1] = 0
          data[idx + 2] = 0
        } else {
          const color = COLOR_PALETTES[palette](iteration, maxIterations)
          data[idx] = color.r
          data[idx + 1] = color.g
          data[idx + 2] = color.b
        }
        data[idx + 3] = 255
      }
    }

    ctx.putImageData(imageData, 0, 0)
    setRenderTime(performance.now() - startTime)
    setIsRendering(false)
  }, [viewport, maxIterations, palette])

  useEffect(() => {
    const timer = setTimeout(drawFractal, 100)
    return () => clearTimeout(timer)
  }, [drawFractal])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    const scale = 3.0 / (Math.min(WIDTH, HEIGHT) * viewport.zoom)
    const newCenterX = viewport.centerX + (px - WIDTH / 2) * scale
    const newCenterY = viewport.centerY + (py - HEIGHT / 2) * scale

    setViewport(prev => ({
      centerX: newCenterX,
      centerY: newCenterY,
      zoom: prev.zoom * 2
    }))
  }

  const handleZoomOut = () => {
    setViewport(prev => ({
      ...prev,
      zoom: Math.max(0.5, prev.zoom / 2)
    }))
  }

  const handleReset = () => {
    setViewport({
      centerX: -0.5,
      centerY: 0,
      zoom: 1
    })
    setMaxIterations(MAX_ITERATIONS_DEFAULT)
    setPalette('fire')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Mandelbrot Fractal
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Click to zoom • Explore infinite complexity
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Canvas */}
          <div className="flex-1">
            <div className="relative inline-block">
              <canvas
                ref={canvasRef}
                width={WIDTH}
                height={HEIGHT}
                onClick={handleCanvasClick}
                className="border border-gray-700 cursor-crosshair max-w-full"
                style={{ imageRendering: 'pixelated' }}
              />
              {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-lg">Rendering...</span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Render time: {renderTime.toFixed(1)}ms | 
              Zoom: {viewport.zoom.toFixed(2)}x |
              Center: ({viewport.centerX.toFixed(6)}, {viewport.centerY.toFixed(6)})
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-80 space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg space-y-4">
              <h2 className="text-lg font-semibold mb-4">Controls</h2>

              {/* Color Palette */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Color Palette
                </label>
                <select
                  value={palette}
                  onChange={(e) => setPalette(e.target.value as keyof typeof COLOR_PALETTES)}
                  className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                >
                  <option value="fire">Fire</option>
                  <option value="ocean">Ocean</option>
                  <option value="psychedelic">Psychedelic</option>
                  <option value="grayscale">Grayscale</option>
                </select>
              </div>

              {/* Max Iterations */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Max Iterations: {maxIterations}
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  onClick={handleZoomOut}
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  Zoom Out (½x)
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
                >
                  Reset View
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-gray-800 p-4 rounded-lg text-sm text-gray-400">
              <p className="mb-2"><strong>Mandelbrot Set:</strong></p>
              <p>z = z² + c</p>
              <p className="mt-2">
                Each point is colored by how quickly it escapes to infinity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
