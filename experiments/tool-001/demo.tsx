'use client'

import { useState } from 'react'

interface ColorStop {
  id: string
  color: string
}

export default function ColorPickerDemo() {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
  const [angle, setAngle] = useState(90)
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#3b82f6' },
    { id: '2', color: '#8b5cf6' }
  ])
  const [copied, setCopied] = useState(false)

  const generateCSS = (): string => {
    const colors = colorStops.map(stop => stop.color).join(', ')

    if (gradientType === 'linear') {
      return `background: linear-gradient(${angle}deg, ${colors})`
    } else {
      return `background: radial-gradient(circle, ${colors})`
    }
  }

  const handleCopy = async () => {
    const css = generateCSS()
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const addColorStop = () => {
    if (colorStops.length >= 5) return
    setColorStops([...colorStops, {
      id: Date.now().toString(),
      color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    }])
  }

  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) return
    setColorStops(colorStops.filter(stop => stop.id !== id))
  }

  const updateColor = (id: string, color: string) => {
    setColorStops(colorStops.map(stop =>
      stop.id === id ? { ...stop, color } : stop
    ))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Color Picker & Gradient Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Create beautiful CSS gradients with ease
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Preview
            </h2>
            <div
              className="w-full h-80 rounded-2xl shadow-lg transition-all duration-300"
              style={{
                background: gradientType === 'linear'
                  ? `linear-gradient(${angle}deg, ${colorStops.map(s => s.color).join(', ')})`
                  : `radial-gradient(circle, ${colorStops.map(s => s.color).join(', ')})`
              }}
            />

            {/* CSS Code */}
            <div className="mt-4 p-4 bg-gray-800 dark:bg-gray-950 rounded-lg">
              <code className="text-green-400 text-sm break-all block">
                {generateCSS()}
              </code>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="mt-4 w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              disabled={copied}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy CSS
                </>
              )}
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Gradient Type */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Gradient Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGradientType('linear')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    gradientType === 'linear'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setGradientType('radial')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    gradientType === 'radial'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Radial
                </button>
              </div>
            </div>

            {/* Angle (Linear only) */}
            {gradientType === 'linear' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Angle: {angle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0°</span>
                  <span>90°</span>
                  <span>180°</span>
                  <span>270°</span>
                  <span>360°</span>
                </div>
              </div>
            )}

            {/* Color Stops */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Colors ({colorStops.length}/5)
                </label>
                {colorStops.length < 5 && (
                  <button
                    onClick={addColorStop}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Color
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {colorStops.map((stop, index) => (
                  <div key={stop.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 flex-shrink-0">
                      <div
                        className="w-full h-full rounded cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: stop.color }}
                      >
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) => updateColor(stop.id, e.target.value)}
                          className="opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={stop.color}
                      onChange={(e) => updateColor(stop.id, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm font-mono"
                      placeholder="#000000"
                    />
                    {colorStops.length > 2 && (
                      <button
                        onClick={() => removeColorStop(stop.id)}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors"
                        aria-label="Remove color"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Quick Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['#3b82f6', '#8b5cf6'],
                  ['#ec4899', '#f43f5e'],
                  ['#10b981', '#06b6d4'],
                  ['#f59e0b', '#f97316']
                ].map((colors, index) => (
                  <button
                    key={index}
                    onClick={() => setColorStops(colors.map((color, i) => ({
                      id: Date.now().toString() + i,
                      color
                    })))}
                    className="h-10 rounded-lg transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(90deg, ${colors.join(', ')})`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
