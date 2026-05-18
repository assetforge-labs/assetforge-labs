import FeedbackSection from './components/FeedbackSection'
import './index.css'
import { useState } from 'react'
import { useFileIngestion } from './hooks/useFileIngestion'
import { useZipGenerator } from './hooks/useZipGenerator'
import DragDropZone from './components/DragDropZone'
import MetadataForm from './components/MetadataForm'
import PricingSection from './components/PricingSection'
import ProGate from './components/ProGate'
import AIWriter from './components/AIWriter'
import MarketplacePreviewPanel from './components/MarketplacePreviewPanel'
import ListingScore from './components/ListingScore'

function App() {
  const ingestion = useFileIngestion()
  const zipper    = useZipGenerator()
  const [productName,  setProductName]  = useState('')
  const [metadata,     setMetadata]     = useState('')
  const [aiContent,    setAiContent]    = useState('')
  const [isPro]                         = useState(false)
  const [showPricing,  setShowPricing]  = useState(false)

  const fullDescription = metadata + '\n\n' + aiContent

  async function handleGenerate() {
    const combined = [metadata, aiContent].filter(Boolean).join('\n\n---\n\n')
    await zipper.generate(ingestion.files, productName, combined)
  }

  function scrollToPricing() {
    setShowPricing(true)
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div style={{ background: '#0a0a0f', color: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Sticky Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* NEW */}
<svg width="34" height="34" viewBox="0 0 36 36" fill="none">
  <defs>
    <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#818cf8"/>
      <stop offset="100%" stopColor="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="36" height="36" rx="9" fill="url(#lg1)"/>
  <path d="M20 6L10 20h8l-2 10 12-16h-8l2-8z" fill="white" opacity="0.95"/>
</svg>
<span style={{ fontWeight: '800', fontSize: '17px', background: 'linear-gradient(135deg,#818cf8,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
  AssetForge Labs
</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="#features" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToPricing() }} style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none', cursor: 'pointer' }}>Pricing</a>
          {isPro
            ? <span style={{ fontSize: '13px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', padding: '4px 12px', borderRadius: '99px' }}>⚡ Pro</span>
            : <button onClick={scrollToPricing} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', fontSize: '14px', padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Get Started Free</button>
          }
        </div>
      </nav>

      {/* Hero */}
      <section className="fade-in" style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '99px', padding: '6px 16px', fontSize: '13px', color: '#6366f1', marginBottom: '24px' }}>
          <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
          World's first AI-powered digital asset packager
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }}>
          Package. Optimize. Sell.<br />
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>All in Your Browser.</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '560px', margin: '0 auto 32px', lineHeight: '1.7' }}>
          The only tool that packages your files, writes your Etsy listing with AI, shows you a live marketplace preview, and scores your SEO — all without uploading anything.
        </p>

        {/* Unique feature badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { label: '🤖 AI Listing Writer', color: '#6366f1' },
            { label: '👁️ Live Preview', color: '#8b5cf6' },
            { label: '📊 SEO Score', color: '#ec4899' },
            { label: '🔒 100% Private', color: '#10b981' },
          ].map((badge) => (
            <span key={badge.label} style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '99px', border: `1px solid ${badge.color}40`, color: badge.color, background: `${badge.color}10`, fontWeight: '600' }}>
              {badge.label}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {[
            { icon: '👥', text: '12,400+ creators' },
            { icon: '📦', text: '89,000+ ZIPs generated' },
            { icon: '⭐', text: '4.9/5 rating' },
          ].map((s) => (
            <div key={s.text} style={{ fontSize: '13px', color: '#64748b' }}>{s.icon} {s.text}</div>
          ))}
        </div>
      </section>

      {/* Main App */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Free plan banner */}
        {!isPro && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px', padding: '10px 16px', marginBottom: '24px', fontSize: '13px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#94a3b8' }}>🆓 <strong style={{ color: '#a5b4fc' }}>Free Plan</strong> — 50MB limit · Upgrade for unlimited</span>
            <button onClick={scrollToPricing} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', fontSize: '12px', padding: '5px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Upgrade ⚡
            </button>
          </div>
        )}

        {/* Product Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: '500' }}>
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g. Procreate Watercolour Brush Pack Vol.1"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f8fafc', fontSize: '15px', outline: 'none', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
          />
        </div>

        {/* Drag Drop */}
        <DragDropZone ingestion={ingestion} />

        {/* Listing Health Score — UNIQUE FEATURE 3 */}
        <ListingScore
          productName={productName}
          description={fullDescription}
          fileCount={ingestion.files.length}
          hasMetadata={metadata.length > 50}
          hasAIContent={aiContent.length > 50}
        />

        {/* AI Writer — UNIQUE FEATURE 1 */}
        <AIWriter
          productName={productName}
          onGenerated={(text) => setAiContent(text)}
        />

        {/* SEO Metadata Form */}
        <MetadataForm
          productName={productName}
          onMetadataGenerated={(md) => setMetadata(md)}
        />

        {/* Live Marketplace Preview — UNIQUE FEATURE 2 */}
        <MarketplacePreviewPanel
          productName={productName}
          description={fullDescription}
          fileCount={ingestion.files.length}
        />

        {/* Pro Gate */}
        {!isPro && (
          <ProGate feature="Batch Processing — Generate 10 ZIPs at once" onUpgrade={scrollToPricing} />
        )}

        {/* Generate ZIP Button */}
        {ingestion.files.length > 0 && !zipper.isGenerating && !zipper.isDone && (
          <button
            className="fade-in"
            onClick={handleGenerate}
            style={{
              marginTop: '28px', width: '100%', padding: '18px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white', fontSize: '16px', fontWeight: '700',
              borderRadius: '14px', border: 'none', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
              letterSpacing: '0.02em',
            }}
          >
            ⚡ Generate Complete Package ({ingestion.files.length} file{ingestion.files.length > 1 ? 's' : ''})
            {aiContent && ' + AI Listing'}
            {metadata && ' + SEO'}
          </button>
        )}

        {/* Progress */}
        {zipper.isGenerating && (
          <div className="fade-in" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
              <span>⚙️ Packaging everything...</span>
              <span style={{ fontWeight: '600', color: '#6366f1' }}>{zipper.progress}%</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '99px', height: '6px' }}>
              <div style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)', height: '6px', borderRadius: '99px', width: `${zipper.progress}%`, transition: 'width 0.2s ease' }} />
            </div>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>Files never leave your device</p>
          </div>
        )}

        {/* Success */}
        {zipper.isDone && (
          <div className="fade-in" style={{ marginTop: '20px', padding: '28px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
            <p style={{ fontWeight: '800', fontSize: '20px', color: '#10b981', marginBottom: '4px' }}>Package Downloaded!</p>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
              Check your Downloads folder — AI listing + SEO description + README all inside!
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => { zipper.reset(); ingestion.clearAll(); setProductName(''); setMetadata(''); setAiContent('') }}
                style={{ padding: '10px 20px', background: 'none', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '8px', color: '#10b981', fontSize: '14px', cursor: 'pointer', fontWeight: '600' }}
              >
                Package another →
              </button>
              {!isPro && (
                <button
                  onClick={scrollToPricing}
                  style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', cursor: 'pointer', fontWeight: '600' }}
                >
                  ⚡ Unlock Pro
                </button>
              )}
            </div>
          </div>
        )}

        {zipper.error && (
          <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', color: '#f87171', fontSize: '14px' }}>
            ⚠️ {zipper.error}
          </div>
        )}
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 32px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
            Features no one else has
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Built from scratch based on what Etsy sellers actually need</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { icon: '🤖', title: 'AI Listing Writer', desc: 'Claude AI writes your complete Etsy listing — title, description, 13 tags, price suggestion. Nobody else has this.', badge: 'EXCLUSIVE' },
            { icon: '👁️', title: 'Live Marketplace Preview', desc: 'See pixel-perfect previews of your listing on Etsy and Gumroad before publishing. World first.', badge: 'WORLD FIRST' },
            { icon: '📊', title: 'Listing Health Score', desc: 'Real-time SEO scoring system tells you exactly what to fix before you list. Like Grammarly for Etsy.', badge: 'UNIQUE' },
            { icon: '📦', title: 'Smart ZIP Packaging', desc: 'Auto-organised folders for Source Files, Previews and Metadata. AI listing included inside.', badge: null },
            { icon: '🔒', title: '100% Browser Private', desc: 'Files never leave your device. No server. No upload. No privacy risk. Impossible to hack.', badge: null },
            { icon: '⚡', title: 'Instant Download', desc: 'Generate and download your complete ready-to-list package in seconds. No waiting.', badge: null },
          ].map((card) => (
            <div key={card.title} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px', position: 'relative' }}>
              {card.badge && (
                <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '9px', fontWeight: '800', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '3px 8px', borderRadius: '99px', letterSpacing: '0.05em' }}>
                  {card.badge}
                </span>
              )}
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', fontSize: '15px' }}>{card.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      {showPricing && <PricingSection />}
       
      {/* Feedback Section */}
      <FeedbackSection />
      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>AssetForge Labs</div>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>The world's most advanced digital asset packager</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '13px', color: '#64748b', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Contact</a>
        </div>
        <p style={{ fontSize: '12px', color: '#374151', marginTop: '20px' }}>© 2026 AssetForge Labs. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default App