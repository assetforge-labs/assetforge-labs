import { useState, useRef } from 'react'
import { useFileIngestion } from '../hooks/useFileIngestion'
import FileQueue from './FileQueue'

interface Props {
  ingestion: ReturnType<typeof useFileIngestion>
}

export default function DragDropZone({ ingestion }: Props) {
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragActive(true)
  }

  function handleDragLeave() {
    setIsDragActive(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files.length > 0) {
      ingestion.addFiles(e.dataTransfer.files)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      ingestion.addFiles(e.target.files)
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: isDragActive ? '2px dashed #6366f1' : '2px dashed var(--border)',
          borderRadius: '16px',
          padding: '48px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: isDragActive ? 'rgba(99,102,241,0.08)' : 'var(--surface-2)',
          boxShadow: isDragActive ? '0 0 30px rgba(99,102,241,0.2)' : 'none',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {isDragActive ? '📂' : '📁'}
        </div>
        <p style={{ color: isDragActive ? '#6366f1' : 'var(--text)', fontSize: '18px', fontWeight: '600', marginBottom: '8px', transition: 'color 0.4s ease' }}>
          {isDragActive ? 'Release to add files!' : 'Drag & drop your files here'}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', transition: 'color 0.4s ease' }}>
          or click to browse — all file types supported
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '99px', padding: '4px 12px', fontSize: '12px', color: '#6366f1'
        }}>
          🔒 Files never leave your device
        </div>
      </div>

      {ingestion.error && (
        <div className="fade-in" style={{ marginTop: '12px', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '14px' }}>
          ⚠️ {ingestion.error}
        </div>
      )}

      {ingestion.files.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', transition: 'color 0.4s ease' }}>
            <span>{ingestion.files.length} file{ingestion.files.length > 1 ? 's' : ''} queued</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>
              {formatSize(ingestion.totalSize)} / ∞ (Free Unlimited)
            </span>
          </div>
        </div>
      )}

      {ingestion.files.length > 0 && (
        <FileQueue ingestion={ingestion} formatSize={formatSize} />
      )}
    </div>
  )
}