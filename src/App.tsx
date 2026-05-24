import LaunchBadges from './components/LaunchBadges';
import ThemeToggle from './ThemeToggle'
import FeedbackSection from './components/FeedbackSection'
import './index.css'
import { useState } from 'react'
import { useFileIngestion } from './hooks/useFileIngestion'
import { useZipGenerator } from './hooks/useZipGenerator'
import DragDropZone from './components/DragDropZone'
import MetadataForm from './components/MetadataForm'
import SmartAnalyzer from './components/SmartAnalyzer'
import MarketplacePreviewPanel from './components/MarketplacePreviewPanel'
import ListingScore from './components/ListingScore'

function App() {
  const isPro = true
  const ingestion = useFileIngestion(isPro)
  const zipper    = useZipGenerator()
  
  const [productName, setProductName] = useState('')
  const [metadata, setMetadata] = useState('')

  const fullDescription = metadata

  async function handleGenerate() {
    await zipper.generate(ingestion.files, productName, metadata)
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: 'Inter, sans-serif', transition: 'background-color 0.4s ease, color 0.4s ease' }}>

      <nav style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '12px 16px', 
        gap: '12px',
        flexWrap: 'wrap',
        borderBottom: '1px solid var(--border)', 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'var(--bg)', 
        backdropFilter: 'blur(12px)', 
        zIndex: 100,
        transition: 'background-color 0.4s ease, border-color 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
            <defs>
              <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8"/>
                <stop offset="100%" stopColor="#a855f7"/>
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="9" fill="url(#lg1)"/>
            <path d="M20 6L10 20h8l-2 10 12-16h-8l2-8z" fill="white" opacity="0.95"/>
          </svg>
          <span style={{ fontWeight: '800', fontSize: '16px', background: 'linear-gradient(135deg,#818cf8,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', whiteSpace: 'nowrap' }}>
            AssetForge Labs
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'nowrap' }}>
          <a href="#features" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.4s ease' }}>Features</a>
          <span style={{ fontSize: '12px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '4px 10px', borderRadius: '99px', whiteSpace: 'nowrap', fontWeight: '600' }}>✨ 100% Free Forever</span>
          <ThemeToggle />
        </div>
      </nav>

      <section className="fade-in" style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '99px', padding: '6px 16px', fontSize: '13px', color: '#6366f1', marginBottom: '24px', textAlign: 'left' }}>
          <span className="pulse-dot" style={{ width: '8px', height: '8px', minWidth: '8px', minHeight: '8px', borderRadius: '50%', background: '#6366f1', display: 'inline-block', flexShrink: 0 }} />
          <span>World&apos;s First Digital asset packaging tool for creators selling on Etsy, Gumroad, Creative Market & more+</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }}>
          Package. Optimize. Sell.<br />
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>All in Your Browser.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '560px', margin: '0 auto 32px', lineHeight: '1.7', transition: 'color 0.4s ease' }}>
          The only tool that packages your files, analyzes your market instantly, shows a live marketplace preview, and scores your SEO — all 100% free, no uploads, no servers.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { label: '🧠 Smart Analyzer', color: '#10b981' },
            { label: '👁️ Live Preview', color: '#8b5cf6' },
            { label: '📊 SEO Score', color: '#ec4899' },
            { label: '🔒 100% Private', color: '#10b981' },
          ].map((badge) => (
            <span key={badge.label} style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '99px', border: `1px solid ${badge.color}40`, color: badge.color, background: `${badge.color}10`, fontWeight: '600' }}>
              {badge.label}
            </span>
          ))}
        </div>
        <LaunchBadges />
      </section>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="product-name-input" style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>
            Product Name
          </label>
          <input
            id="product-name-input"
            type="text"
            placeholder="e.g. Procreate Watercolour Brush Pack Vol.1"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text)', fontSize: '15px', outline: 'none', fontFamily: 'Inter, sans-serif', fontWeight: '500', transition: 'background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease' }}
          />
        </div>

        <DragDropZone ingestion={ingestion} />
        <ListingScore
          productName={productName}
          description={fullDescription}
          fileCount={ingestion.files.length}
          hasMetadata={metadata.length > 50}
          hasAIContent={false}
        />
        <SmartAnalyzer
          files={ingestion.files}
          productName={productName}
        />
        <MetadataForm
          productName={productName}
          onMetadataGenerated={(md) => setMetadata(md)}
          isPro={isPro}
        />
        <MarketplacePreviewPanel
          productName={productName}
          description={fullDescription}
          fileCount={ingestion.files.length}
        />
      </main>

      <FeedbackSection />

      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center', transition: 'border-color 0.4s ease' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>© 2026 AssetForge Labs. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
