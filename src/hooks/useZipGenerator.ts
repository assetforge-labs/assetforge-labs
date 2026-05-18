import { useState } from 'react'
import { generateZip } from '../utils/zipGenerator'
import type { IngestedFile } from './useFileIngestion'

export function useZipGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress,     setProgress]     = useState(0)
  const [isDone,       setIsDone]       = useState(false)
  const [error,        setError]        = useState<string | null>(null)

  async function generate(files: IngestedFile[], productName: string, metadata?: string) {
    if (files.length === 0) return
    setIsGenerating(true)
    setProgress(0)
    setIsDone(false)
    setError(null)
    try {
      await generateZip(files, productName, metadata, (p) => setProgress(p))
      setIsDone(true)
    } catch (err) {
      setError('Something went wrong generating the ZIP. Please try again.')
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  function reset() { setProgress(0); setIsDone(false); setError(null) }

  return { isGenerating, progress, isDone, error, generate, reset }
}