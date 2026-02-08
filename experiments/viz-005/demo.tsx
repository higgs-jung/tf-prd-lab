'use client'

import { useMemo, useState } from 'react'

type Params = {
  a: number
  b: number
  delta: number
  amplitude: number
  samples: number
}

const DEFAULTS: Params = {
  a: 3,
  b: 2,
  delta: Math.PI / 2,
  amplitude: 0.8,
  samples: 1200
}

export default function LissajousDemo() {
  const [params, setParams] = useState<Params>(DEFAULTS)

  const points = useMemo(() => {
    const out: Array<[number, number]> = []
    for (let i = 0; i <= params.samples; i += 1) {
      const t = (i / params.samples) * Math.PI * 2
      const x = params.amplitude * Math.sin(params.a * t + params.delta)
      const y = params.amplitude * Math.sin(params.b * t)
      out.push([x, y])
    }
    return out
  }, [params])

  const handleNumber = (key: keyof Params, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-[1fr_320px]">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-3 md:p-4">
          <svg viewBox="-1 -1 2 2" className="w-full aspect-square bg-slate-950 rounded-lg">
            <path
              d={
                points
                  .map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${x} ${-y}`)
                  .join(' ') || ''
              }
              stroke="#22d3ee"
              strokeWidth="0.01"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </section>

        <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-4">
          <h1 className="text-lg font-semibold">viz-005 Lissajous</h1>

          {[
            { key: 'a', min: 1, max: 10, step: 1, label: 'a' },
            { key: 'b', min: 1, max: 10, step: 1, label: 'b' },
            { key: 'delta', min: 0, max: Math.PI, step: 0.01, label: 'delta' },
            { key: 'amplitude', min: 0.2, max: 0.95, step: 0.01, label: 'amplitude' },
            { key: 'samples', min: 200, max: 2000, step: 100, label: 'samples' }
          ].map((control) => (
            <label key={control.key} className="block text-sm">
              <div className="flex justify-between mb-1">
                <span>{control.label}</span>
                <span className="text-slate-400">
                  {Number(params[control.key as keyof Params]).toFixed(
                    control.key === 'delta' || control.key === 'amplitude' ? 2 : 0
                  )}
                </span>
              </div>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={params[control.key as keyof Params] as number}
                onChange={(e) => handleNumber(control.key as keyof Params, Number(e.target.value))}
                className="w-full"
              />
            </label>
          ))}

          <button
            type="button"
            onClick={() => setParams(DEFAULTS)}
            className="w-full rounded-md bg-cyan-500 px-3 py-2 text-slate-950 font-medium hover:bg-cyan-400 transition-colors"
          >
            Reset
          </button>
        </aside>
      </div>
    </div>
  )
}
