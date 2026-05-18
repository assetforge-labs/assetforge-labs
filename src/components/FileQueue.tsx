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
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#f8fafc' }}>
          ✅ Files Ready to Package
        </span>
        <button
          onClick={ingestion.clearAll}
          style={{
            fontSize: '12px',
            color: '#94a3b8',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '4px 10px',
            cursor: 'pointer',
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
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px',
              padding: '10px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{getFileIcon(f.type)}</span>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#f8fafc', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {f.name}
                </p>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>{formatSize(f.size)}</p>
              </div>
            </div>
            <button
              onClick={() => ingestion.removeFile(f.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '18px',
                lineHeight: 1,
                padding: '4px',
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