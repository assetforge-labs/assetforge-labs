import { useState, useRef } from 'react'
import { useFileIngestion } from '../hooks/useFileIngestion'
import FileQueue from './FileQueue'

interface Props {
  ingestion: ReturnType<typeof useFileIngestion>
}

export default function DragDropZone({ ingestion }: Props) {
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDragOver(e: React.DragEvent) { e.preventDefault(); setIsDragActive(true) }
  function handleDragLeave() { setIsDragActive(false) }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setIsDragActive(false);
    if (e.dataTransfer.files.length > 0) ingestion.addFiles(e.dataTransfer.files)
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        role="button"
        aria-label="Drag and drop files"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: '2px dashed var(--border)',
          borderRadius: '16px',
          padding: '48px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: 'var(--surface-2)',
        }}
      >
        <input ref={inputRef} type="file" multiple onChange={(e) => e.target.files && ingestion.addFiles(e.target.files)} style={{ display: 'none' }} />
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
        <p style={{ color: 'var(--text)', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Drag & drop your files here</p>
        <p style={{ color: '#475569', fontSize: '14px', marginBottom: '16px' }}>or click to browse — all file types supported</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99,102,241,0.1)', border: '1px solid #4f46e5', borderRadius: '99px', padding: '4px 12px', fontSize: '12px', color: '#4338ca', fontWeight: '600' }}>
          🔒 Files never leave your device
        </div>
      </div>
      {ingestion.files.length > 0 && <FileQueue ingestion={ingestion} formatSize={formatSize} />}
    </div>
  )
}
