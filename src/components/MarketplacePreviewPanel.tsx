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

      {/* FIXED HEADER: Perfectly aligned to match Smart Analyzer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
          👁️
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', transition: 'color 0.4s ease' }}>Live Marketplace Preview</h2>
            <span style={{ fontSize: '10px', background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', padding: '2px 8px', borderRadius: '99px', fontWeight: 700 }}>WORLD FIRST</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', transition: 'color 0.4s ease' }}>See exactly how your listing looks before publishing</p>
        </div>
      </div>

      {/* FIXED PLATFORM SWITCHER: Uses dynamic surface and text variables */}
      <div style={{ display: 'inline-flex', background: 'var(--surface)', borderRadius: '10px', padding: '4px', border: '1px solid var(--border)', transition: 'background-color 0.4s ease, border-color 0.4s ease', marginBottom: '16px' }}>
        {(['etsy', 'gumroad'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            style={{
              padding: '6px 16px',
              borderRadius: '7px',
              border: 'none',
              background: platform === p ? (p === 'etsy' ? '#F1641E' : '#FF90E8') : 'transparent',
              color: platform === p ? (p === 'gumroad' ? '#000' : 'white') : 'var(--text-muted)',
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

      {/* Renders the actual mockup */}
      <ListingPreview
        productName={productName}
        description={description}
        fileCount={fileCount}
        platform={platform}
      />
    </div>
  )
}
