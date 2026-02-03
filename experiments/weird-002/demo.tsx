'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export default function GlitchGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState('GLITCH')
  const [glitchIntensity, setGlitchIntensity] = useState(50)
  const [rgbShift, setRgbShift] = useState(10)
  const [pixelSort, setPixelSort] = useState(30)
  const [scanlines, setScanlines] = useState(true)
  const [noise, setNoise] = useState(20)
  
  const canvasWidth = 800
  const canvasHeight = 400

  const drawGlitch = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Base text rendering
    const fontSize = 120
    ctx.font = `bold ${fontSize}px monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2

    // RGB split effect
    if (rgbShift > 0) {
      // Red channel
      ctx.fillStyle = `rgba(255, 0, 0, ${0.8 + glitchIntensity / 200})`
      ctx.fillText(text, centerX - rgbShift, centerY)
      
      // Green channel
      ctx.fillStyle = `rgba(0, 255, 0, ${0.8 + glitchIntensity / 200})`
      ctx.fillText(text, centerX, centerY)
      
      // Blue channel
      ctx.fillStyle = `rgba(0, 0, 255, ${0.8 + glitchIntensity / 200})`
      ctx.fillText(text, centerX + rgbShift, centerY)
    }

    // Main white text
    ctx.fillStyle = '#fff'
    ctx.fillText(text, centerX, centerY)

    // Pixel sorting effect
    if (pixelSort > 0) {
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      const data = imageData.data
      
      for (let y = 0; y < canvasHeight; y += 4) {
        if (Math.random() * 100 < pixelSort) {
          const rowOffset = y * canvasWidth * 4
          const shiftAmount = Math.floor((Math.random() - 0.5) * glitchIntensity * 2)
          
          if (shiftAmount > 0) {
            for (let x = canvasWidth - 1; x >= shiftAmount; x--) {
              for (let c = 0; c < 4; c++) {
                data[rowOffset + x * 4 + c] = data[rowOffset + (x - shiftAmount) * 4 + c]
              }
            }
          } else if (shiftAmount < 0) {
            for (let x = 0; x < canvasWidth + shiftAmount; x++) {
              for (let c = 0; c < 4; c++) {
                data[rowOffset + x * 4 + c] = data[rowOffset + (x - shiftAmount) * 4 + c]
              }
            }
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
    }

    // Glitch blocks
    const numGlitches = Math.floor(glitchIntensity / 10)
    for (let i = 0; i < numGlitches; i++) {
      const y = Math.random() * canvasHeight
      const height = Math.random() * 20 + 5
      const shiftX = (Math.random() - 0.5) * glitchIntensity * 3
      
      const stripData = ctx.getImageData(0, y, canvasWidth, height)
      ctx.putImageData(stripData, shiftX, y)
    }

    // Scanlines
    if (scanlines) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      for (let y = 0; y < canvasHeight; y += 4) {
        ctx.fillRect(0, y, canvasWidth, 2)
      }
    }

    // Noise
    if (noise > 0) {
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() * 100 < noise) {
          const noiseVal = Math.random() * 255
          data[i] = noiseVal     // R
          data[i + 1] = noiseVal // G
          data[i + 2] = noiseVal // B
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
    }

    // Vignette
    const gradient = ctx.createRadialGradient(centerX, centerY, 100, centerX, centerY, 400)
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(1, 'rgba(0,0,0,0.5)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  }, [text, glitchIntensity, rgbShift, pixelSort, scanlines, noise])

  useEffect(() => {
    drawGlitch()
  }, [drawGlitch])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `glitch-${text.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const randomize = () => {
    setGlitchIntensity(Math.floor(Math.random() * 80) + 20)
    setRgbShift(Math.floor(Math.random() * 20) + 5)
    setPixelSort(Math.floor(Math.random() * 50) + 10)
    setNoise(Math.floor(Math.random() * 40) + 10)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center font-mono"
          style={{ textShadow: '2px 0 #ff0000, -2px 0 #00ff00' }}
        >
          GLITCH GENERATOR
        </h1>

        {/* Canvas */}
        <div className="mb-8 flex justify-center">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="border border-gray-700 max-w-full"
          />
        </div>

        {/* Controls */}
        <div className="space-y-6 bg-gray-900 p-6 rounded-lg">
          {/* Text Input */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white font-mono"
              maxLength={20}
            />
          </div>

          {/* Glitch Intensity */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Glitch Intensity: {glitchIntensity}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={glitchIntensity}
              onChange={(e) => setGlitchIntensity(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          {/* RGB Shift */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              RGB Shift: {rgbShift}px
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={rgbShift}
              onChange={(e) => setRgbShift(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          {/* Pixel Sort */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Pixel Sort: {pixelSort}%
            </label>
            <input
              type="range"
              min="0"
              max="80"
              value={pixelSort}
              onChange={(e) => setPixelSort(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />
          </div>

          {/* Noise */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Noise: {noise}%
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={noise}
              onChange={(e) => setNoise(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* Scanlines Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="scanlines"
              checked={scanlines}
              onChange={(e) => setScanlines(e.target.checked)}
              className="w-4 h-4 accent-cyan-500"
            />
            <label htmlFor="scanlines" className="text-gray-400">Scanlines</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={randomize}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-mono transition-colors"
            >
              Randomize
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded font-mono transition-colors"
            >
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
