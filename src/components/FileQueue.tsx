import { useFileIngestion } from '../hooks/useFileIngestion'

interface Props {
  ingestion: ReturnType<typeof useFileIngestion>
  formatSize: (bytes: number) => string
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return '🖼️'
  if (type.includes('pdf')) return '📄'
  if (type.includes('zip') || type.includes('rar')) return '🗜️'
  if (type.includes('video')) return '🎬'
  if (type.includes('audio')) return '🎵'
  if (type.includes('font')) return '🔤'
  return '📎'
}

export default function FileQueue({ ingestion, formatSize }: Props) {
  return (
    <div style={{ marginTop: '16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', transition: 'color 0.4s ease' }}>
          ✅ Files Ready to Package
        </span>
        <button
          onClick={ingestion.clearAll}
          style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'color 0.4s ease, border-color 0.4s ease'
          }}
        >
          Clear All
        </button>
      </div>

      {/* File List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ingestion.files.map((f) => (
          <div
            key={f.id}
            className="fade-in"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '10px 14px',
              transition: 'background-color 0.4s ease, border-color 0.4s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{getFileIcon(f.type)}</span>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text)', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.4s ease' }}>
                  {f.name}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', transition: 'color 0.4s ease' }}>{formatSize(f.size)}</p>
              </div>
            </div>
            <button
              onClick={() => ingestion.removeFile(f.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '18px',
                lineHeight: 1,
                padding: '4px',
                transition: 'color 0.4s ease'
              }}
              title="Remove file"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
