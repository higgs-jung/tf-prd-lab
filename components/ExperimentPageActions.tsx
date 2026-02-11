'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type ToastState = 'success' | 'failure' | null

type ExperimentPageActionsProps = {
  className?: string
  backClassName?: string
  copyClassName?: string
}

const SUCCESS_MESSAGE = 'Link copied'
const FAILURE_MESSAGE = 'Couldn’t copy — long-press to copy'
const SEARCH_PARAM = 'q'
const TAG_PARAM = 'tag'

function buildExperimentsBackHref(queryString: string): string {
  const sourceParams = new URLSearchParams(queryString)
  const nextParams = new URLSearchParams()

  const query = sourceParams.get(SEARCH_PARAM)?.trim()
  if (query && query.length > 0) {
    nextParams.set(SEARCH_PARAM, query)
  }

  sourceParams
    .getAll(TAG_PARAM)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .forEach((tag) => nextParams.append(TAG_PARAM, tag))

  const nextQueryString = nextParams.toString()
  return nextQueryString.length > 0 ? `/experiments?${nextQueryString}` : '/experiments'
}

async function copyLink(value: string): Promise<boolean> {
  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      // Continue to fallback path.
    }
  }

  if (typeof document === 'undefined') {
    return false
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'

  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, textarea.value.length)

  let copied = false

  try {
    copied = document.execCommand('copy')
  } catch {
    copied = false
  }

  document.body.removeChild(textarea)
  return copied
}

export function ExperimentPageActions({
  className = 'fixed top-4 right-4 z-10 flex items-center gap-2',
  backClassName = 'px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors',
  copyClassName = 'px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors',
}: ExperimentPageActionsProps) {
  const [toastState, setToastState] = useState<ToastState>(null)
  const [backHref, setBackHref] = useState('/experiments')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setBackHref(buildExperimentsBackHref(window.location.search))
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const showToast = (state: ToastState) => {
    setToastState(state)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setToastState(null)
      timeoutRef.current = null
    }, 2200)
  }

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') {
      showToast('failure')
      return
    }

    const copied = await copyLink(window.location.href)
    showToast(copied ? 'success' : 'failure')
  }

  return (
    <>
      <nav className={className}>
        <Link href={backHref} className={backClassName}>
          ← Back to Experiments
        </Link>
        <button type="button" onClick={handleCopyLink} className={copyClassName} aria-label="Copy link">
          Copy link
        </button>
      </nav>

      {toastState && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-4 z-20 -translate-x-1/2 rounded-md bg-slate-900 px-3 py-2 text-sm text-white shadow-lg"
        >
          {toastState === 'success' ? SUCCESS_MESSAGE : FAILURE_MESSAGE}
        </div>
      )}
    </>
  )
}
