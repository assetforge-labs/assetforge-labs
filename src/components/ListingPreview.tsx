interface Props {
  productName: string
  description: string
  fileCount: number
  platform: 'etsy' | 'gumroad'
}

export default function ListingPreview({ productName, description, fileCount, platform }: Props) {
  if (!productName) return null

  const title = productName || 'Your Product Title Here'
  const price = '$8.99'
  const rating = '4.9'
  const reviews = '2,847'

  if (platform === 'etsy') {
    return (
      <div style={{ marginTop: '8px' }}>
        {/* Etsy Chrome (Kept Brand Colors) */}
        <div style={{ background: '#F1641E', borderRadius: '12px 12px 0 0', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: '4px', padding: '3px 10px', fontSize: '11px', color: 'white' }}>
            etsy.com/listing/your-product
          </div>
        </div>

        {/* Etsy Listing Preview (Dynamic Theme Applied) */}
        <div style={{ background: 'var(--surface)', borderRadius: '0 0 12px 12px', padding: '16px', border: '1px solid var(--border)', borderTop: 'none', transition: 'background-color 0.4s ease, border-color 0.4s ease' }}>
          <div style={{ display: 'flex', gap: '16px' }}>

            {/* Mock image */}
            <div style={{ width: '180px', height: '180px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
              🎨
            </div>

            {/* Listing details */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', transition: 'color 0.4s ease' }}>Digital Download</p>
              <h3 style={{ fontSize: '15px', fontWeight: '400', color: 'var(--text)', lineHeight: '1.4', marginBottom: '8px', transition: 'color 0.4s ease' }}>
                {title}
              </h3>

              {/* Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} style={{ color: '#F1641E', fontSize: '13px' }}>{s}</span>
                ))}
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', transition: 'color 0.4s ease' }}>{rating} ({reviews})</span>
              </div>

              {/* Price */}
              <p style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text)', marginBottom: '8px', transition: 'color 0.4s ease' }}>{price}</p>

              {/* Instant download badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px', color: 'var(--text-muted)', transition: 'all 0.4s ease' }}>
                  ⚡ Instant Digital Download
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', transition: 'color 0.4s ease' }}>{fileCount} files</span>
              </div>

              {/* Add to cart */}
              <button style={{ background: '#F1641E', color: 'white', border: 'none', borderRadius: '99px', padding: '10px 24px', fontSize: '13px', fontWeight: '700', cursor: 'not-allowed', width: '100%', opacity: 0.9 }}>
                Add to cart
              </button>
            </div>
          </div>

          {/* Description preview */}
          {description && (
            <div style={{ marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '12px', transition: 'border-color 0.4s ease' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--text)', transition: 'color 0.4s ease' }}>Description</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', WebkitLineClamp: 4, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' as any, transition: 'color 0.4s ease' }}>
                {description.slice(0, 200)}...
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Gumroad preview
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ background: '#FF90E8', borderRadius: '12px 12px 0 0', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)' }} />
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.4)', borderRadius: '4px', padding: '3px 10px', fontSize: '11px', color: '#000' }}>
          gumroad.com/l/your-product
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: '0 0 12px 12px', padding: '20px', border: '1px solid var(--border)', borderTop: 'none', transition: 'background-color 0.4s ease, border-color 0.4s ease' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ width: '140px', height: '140px', background: 'linear-gradient(135deg, #FF90E8, #b060ff)', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
            🎨
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px', lineHeight: '1.3', transition: 'color 0.4s ease' }}>{title}</h3>
            <p style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', marginBottom: '12px', transition: 'color 0.4s ease' }}>{price}</p>
            {description && (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '12px', transition: 'color 0.4s ease' }}>
                {description.slice(0, 150)}...
              </p>
            )}
            <button style={{ background: 'var(--text)', color: 'var(--bg)', border: 'none', borderRadius: '6px', padding: '10px 24px', fontSize: '14px', fontWeight: '700', cursor: 'not-allowed', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
              I want this!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
