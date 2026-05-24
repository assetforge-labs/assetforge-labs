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

  async function handleGenerate() {
    await zipper.generate(ingestion.files, productName, metadata)
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, backgroundColor: 'var(--bg)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: '800', fontSize: '16px', background: 'linear-gradient(135deg,#818cf8,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AssetForge Labs</span>
        </div>
        <ThemeToggle />
      </nav>

      <section className="fade-in" style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', marginBottom: '20px' }}>
          Package. Optimize. Sell.<br />
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>All in Your Browser.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
          World&apos;s First Digital asset packaging tool.
        </p>
        <LaunchBadges />
      </section>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 80px' }}>
        <DragDropZone ingestion={ingestion} />
        <ListingScore productName={productName} description={metadata} fileCount={ingestion.files.length} hasMetadata={metadata.length > 50} hasAIContent={false} />
        <SmartAnalyzer files={ingestion.files} productName={productName} />
        <MetadataForm productName={productName} onMetadataGenerated={setMetadata} isPro={isPro} />
        <MarketplacePreviewPanel productName={productName} description={metadata} fileCount={ingestion.files.length} />
      </main>

      <FeedbackSection />

      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>© 2026 AssetForge Labs.</p>
      </footer>
    </div>
  )
}

export default App
