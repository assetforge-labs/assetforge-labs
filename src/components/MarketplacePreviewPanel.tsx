import { useState } from 'react'
import ListingPreview from './ListingPreview'

interface Props {
  productName: string
  description: string
  fileCount: number
}

export default function MarketplacePreviewPanel({ productName, description, fileCount }: Props) {
  const [platform, setPlatform] = useState<'etsy' | 'gumroad'>('etsy')

  if (!productName) return null

  return (
    <div className="fade-in" style={{ marginTop: '24px' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>👁️</span>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#f8fafc' }}>Live Marketplace Preview</h2>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>See exactly how your listing looks before publishing</p>
          </div>
          <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontWeight: '700', border: '1px solid rgba(16,185,129,0.3)' }}>WORLD FIRST</span>
        </div>

        {/* Platform switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['etsy', 'gumroad'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                padding: '6px 16px',
                borderRadius: '7px',
                border: 'none',
                background: platform === p ? (p === 'etsy' ? '#F1641E' : '#FF90E8') : 'transparent',
                color: platform === p ? 'white' : '#94a3b8',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >
              {p === 'etsy' ? '🛒 Etsy' : '💜 Gumroad'}
            </button>
          ))}
        </div>
      </div>

      <ListingPreview
        productName={productName}
        description={description}
        fileCount={fileCount}
        platform={platform}
      />
    </div>
  )
}