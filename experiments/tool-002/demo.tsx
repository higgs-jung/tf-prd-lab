'use client'

import { useState, useCallback } from 'react'

export default function JsonFormatterDemo() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON data')
      setOutput('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setOutput('')
    }
  }, [input])

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON data')
      setOutput('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setOutput('')
    }
  }, [input])

  const copyToClipboard = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Failed to copy to clipboard')
    }
  }, [output])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    if (file.size > 1024 * 1024) {
      setError('File too large (max 1MB)')
      return
    }

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setError('Please drop a JSON file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setInput(content)
      setError('')
      setOutput('')
    }
    reader.onerror = () => {
      setError('Failed to read file')
    }
    reader.readAsText(file)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
  }, [])

  const sampleJson = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "coding", "gaming"]
}`

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          JSON Formatter / Minifier
        </h1>
        <p className="text-gray-600 mb-8">
          Format, minify, and validate JSON data
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Input</h2>
              <button
                onClick={() => setInput(sampleJson)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Load Sample
              </button>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste JSON here or drop a .json file..."
                className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-center text-gray-400 text-sm mt-2">
                Drag & drop JSON file here
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={formatJson}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Format (Prettify)
              </button>
              <button
                onClick={minifyJson}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Minify
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Output</h2>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>

            <div className="relative">
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="w-full h-64 p-4 font-mono text-sm bg-gray-100 border border-gray-200 rounded resize-none"
              />
              {!output && !error && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                  <p>Click Format or Minify to process JSON</p>
                </div>
              )}
            </div>

            {/* Stats */}
            {output && (
              <div className="text-sm text-gray-600 space-y-1">
                <p>Input size: {input.length.toLocaleString()} chars</p>
                <p>Output size: {output.length.toLocaleString()} chars</p>
                <p>
                  Reduction: {' '}
                  {Math.round((1 - output.length / input.length) * 100)}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How to use</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Paste JSON data or drop a .json file into the input area</li>
            <li>Click "Format" to prettify with proper indentation</li>
            <li>Click "Minify" to compress into a single line</li>
            <li>Use "Copy" to copy the output to clipboard</li>
            <li>Syntax errors will be displayed in red</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
