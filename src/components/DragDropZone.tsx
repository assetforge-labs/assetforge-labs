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
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
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
          background: isDragActive ? 'rgba(67,56,202,0.08)' : 'var(--surface-2)',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{isDragActive ? '📂' : '📁'}</div>
        <p style={{ color: 'var(--text)', fontSize: '18px', fontWeight: '700' }}>
          {isDragActive ? 'Release to add files!' : 'Drag & drop your files here'}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>or click to browse</p>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(67,56,202,0.1)', border: '1px solid rgba(67,56,202,0.2)', borderRadius: '99px', padding: '4px 12px', fontSize: '12px', color: '#4338ca', marginTop: '16px', fontWeight: '700' }}>
          🔒 Files never leave your device
        </div>
      </div>

      {ingestion.error && (
        <div style={{ marginTop: '12px', padding: '12px', background: '#fee2e2', border: '1px solid #b91c1c', borderRadius: '10px', color: '#b91c1c', fontWeight: '700' }}>
          ⚠️ {ingestion.error}
        </div>
      )}

      {ingestion.files.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text)' }}>
            <span>{ingestion.files.length} file queued</span>
            <span style={{ fontWeight: '700', color: '#047857' }}>{formatSize(ingestion.totalSize)}</span>
          </div>
          <FileQueue ingestion={ingestion} formatSize={formatSize} />
        </div>
      )}
    </div>
  )
}
