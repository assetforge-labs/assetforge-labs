import { useState } from 'react'

export interface IngestedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
}

const FREE_LIMIT_BYTES = 50 * 1024 * 1024 // 50MB

const BLOCKED_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.sh', '.php',
  '.py', '.rb', '.msi', '.dll', '.scr',
]

export function useFileIngestion() {
  const [files,  setFiles]  = useState<IngestedFile[]>([])
  const [error,  setError]  = useState<string | null>(null)

  const totalSize = files.reduce((acc, f) => acc + f.size, 0)

  function addFiles(newFiles: FileList | File[]) {
    setError(null)
    const arr = Array.from(newFiles)

    // Block dangerous file types
    const dangerous = arr.find((f) => {
      const ext = '.' + (f.name.split('.').pop()?.toLowerCase() ?? '')
      return BLOCKED_EXTENSIONS.includes(ext)
    })

    if (dangerous) {
      setError('Executable files (.exe, .bat, .sh etc) cannot be packaged for security reasons.')
      return
    }

    // Block empty files
    const empty = arr.find((f) => f.size === 0)
    if (empty) {
      setError('Empty files cannot be added.')
      return
    }

    // Check 50MB free limit
    const incoming = arr.reduce((acc, f) => acc + f.size, 0)
    if (totalSize + incoming > FREE_LIMIT_BYTES) {
      setError('Free plan limit is 50MB. Upgrade to Pro for unlimited size.')
      return
    }

    const mapped: IngestedFile[] = arr.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
    }))

    setFiles((prev: IngestedFile[]) => [...prev, ...mapped])
  }

  function removeFile(id: string) {
    setFiles((prev: IngestedFile[]) => prev.filter((f) => f.id !== id))
  }

  function clearAll() {
    setFiles([])
    setError(null)
  }

  return { files, error, totalSize, addFiles, removeFile, clearAll }
}