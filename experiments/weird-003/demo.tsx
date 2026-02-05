'use client'

import { useEffect, useRef, useState } from 'react'

type AudioRig = {
  ctx: AudioContext
  osc: OscillatorNode
  preGain: GainNode
  delay: DelayNode
  feedbackGain: GainNode
  feedbackFilter: BiquadFilterNode
  outputGain: GainNode
  limiter: DynamicsCompressorNode
}

const DELAY_MAX = 0.8
const FEEDBACK_MAX = 0.75
const TONE_MIN = 80
const TONE_MAX = 880
const GAIN_MAX = 0.15
const FILTER_CUTOFF_HZ = 2400

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function AudioFeedbackDelayToyDemo() {
  const rigRef = useRef<AudioRig | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [delaySec, setDelaySec] = useState(0.25)
  const [feedback, setFeedback] = useState(0.35)
  const [toneHz, setToneHz] = useState(220)
  const [outGain, setOutGain] = useState(0.08)

  const applyParams = (next?: {
    delaySec?: number
    feedback?: number
    toneHz?: number
    outGain?: number
  }) => {
    const rig = rigRef.current
    if (!rig) return

    const now = rig.ctx.currentTime
    const tc = 0.015

    const d = clamp(next?.delaySec ?? delaySec, 0, DELAY_MAX)
    const fb = clamp(next?.feedback ?? feedback, 0, FEEDBACK_MAX)
    const f = clamp(next?.toneHz ?? toneHz, TONE_MIN, TONE_MAX)
    const g = clamp(next?.outGain ?? outGain, 0, GAIN_MAX)

    rig.delay.delayTime.setTargetAtTime(d, now, tc)
    rig.feedbackGain.gain.setTargetAtTime(fb, now, tc)
    rig.osc.frequency.setTargetAtTime(f, now, tc)
    rig.outputGain.gain.setTargetAtTime(g, now, tc)
  }

  const stop = async () => {
    const rig = rigRef.current
    rigRef.current = null
    setIsRunning(false)

    if (!rig) return

    try {
      rig.osc.stop()
    } catch {
      // ignore
    }

    try {
      rig.osc.disconnect()
      rig.preGain.disconnect()
      rig.delay.disconnect()
      rig.feedbackGain.disconnect()
      rig.feedbackFilter.disconnect()
      rig.outputGain.disconnect()
      rig.limiter.disconnect()
    } catch {
      // ignore
    }

    try {
      await rig.ctx.close()
    } catch {
      // ignore
    }
  }

  const start = async () => {
    if (rigRef.current) return

    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext
    const ctx = new AudioContextCtor()

    const osc = ctx.createOscillator()
    osc.type = 'sine'

    const preGain = ctx.createGain()
    preGain.gain.value = 0.12

    const delay = ctx.createDelay(DELAY_MAX)
    const feedbackGain = ctx.createGain()
    const feedbackFilter = ctx.createBiquadFilter()
    feedbackFilter.type = 'lowpass'
    feedbackFilter.frequency.value = FILTER_CUTOFF_HZ
    feedbackFilter.Q.value = 0.707
    const outputGain = ctx.createGain()
    const limiter = ctx.createDynamicsCompressor()
    limiter.threshold.value = -18
    limiter.knee.value = 0
    limiter.ratio.value = 20
    limiter.attack.value = 0.003
    limiter.release.value = 0.25

    osc.connect(preGain)
    preGain.connect(delay)

    // feedback loop
    delay.connect(feedbackGain)
    feedbackGain.connect(feedbackFilter)
    feedbackFilter.connect(delay)

    // output
    delay.connect(outputGain)
    outputGain.connect(limiter)
    limiter.connect(ctx.destination)

    rigRef.current = { ctx, osc, preGain, delay, feedbackGain, feedbackFilter, outputGain, limiter }

    // Apply initial params (with clamps)
    const d = clamp(delaySec, 0, DELAY_MAX)
    const fb = clamp(feedback, 0, FEEDBACK_MAX)
    const f = clamp(toneHz, TONE_MIN, TONE_MAX)
    const g = clamp(outGain, 0, GAIN_MAX)

    delay.delayTime.value = d
    feedbackGain.gain.value = fb
    osc.frequency.value = f
    outputGain.gain.value = g

    // Start inside user gesture handler
    await ctx.resume()
    osc.start()
    setIsRunning(true)
  }

  useEffect(() => {
    return () => {
      void stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Audio Feedback Delay Toy</h1>
          <p className="text-slate-300">
            A tiny WebAudio feedback + delay loop. Start with low volume.
          </p>
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => void start()}
              disabled={isRunning}
              className="px-4 py-2 rounded-lg bg-emerald-600 disabled:bg-emerald-900/40 disabled:text-slate-400 hover:bg-emerald-500 transition-colors"
            >
              Start
            </button>
            <button
              onClick={() => void stop()}
              disabled={!isRunning}
              className="px-4 py-2 rounded-lg bg-rose-600 disabled:bg-rose-900/40 disabled:text-slate-400 hover:bg-rose-500 transition-colors"
            >
              Stop
            </button>
            <div className="text-sm text-slate-400">
              Status: {isRunning ? 'running' : 'stopped'}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Delay</label>
                <div className="text-xs text-slate-400">{delaySec.toFixed(2)}s</div>
              </div>
              <input
                type="range"
                min={0}
                max={DELAY_MAX}
                step={0.01}
                value={delaySec}
                onChange={(e) => {
                  const v = clamp(Number(e.target.value), 0, DELAY_MAX)
                  setDelaySec(v)
                  applyParams({ delaySec: v })
                }}
                className="w-full accent-sky-400"
                aria-label="Delay seconds"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Feedback (clamped)</label>
                <div className="text-xs text-slate-400">{feedback.toFixed(2)}</div>
              </div>
              <input
                type="range"
                min={0}
                max={FEEDBACK_MAX}
                step={0.01}
                value={feedback}
                onChange={(e) => {
                  const v = clamp(Number(e.target.value), 0, FEEDBACK_MAX)
                  setFeedback(v)
                  applyParams({ feedback: v })
                }}
                className="w-full accent-violet-400"
                aria-label="Feedback amount"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Tone</label>
                <div className="text-xs text-slate-400">{Math.round(toneHz)} Hz</div>
              </div>
              <input
                type="range"
                min={TONE_MIN}
                max={TONE_MAX}
                step={1}
                value={toneHz}
                onChange={(e) => {
                  const v = clamp(Number(e.target.value), TONE_MIN, TONE_MAX)
                  setToneHz(v)
                  applyParams({ toneHz: v })
                }}
                className="w-full accent-amber-400"
                aria-label="Tone frequency"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Output gain (clamped)</label>
                <div className="text-xs text-slate-400">{outGain.toFixed(3)}</div>
              </div>
              <input
                type="range"
                min={0}
                max={GAIN_MAX}
                step={0.005}
                value={outGain}
                onChange={(e) => {
                  const v = clamp(Number(e.target.value), 0, GAIN_MAX)
                  setOutGain(v)
                  applyParams({ outGain: v })
                }}
                className="w-full accent-emerald-400"
                aria-label="Output gain"
              />
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Safety: this is a feedback loop. Output gain is clamped and a limiter is enabled, but keep system volume low.
          </div>
        </div>
      </div>
    </main>
  )
}
