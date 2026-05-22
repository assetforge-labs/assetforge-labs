import ThemeToggle from './ThemeToggle'
import FeedbackSection from './components/FeedbackSection'
import './index.css'
import { useState, useEffect } from 'react'
import { useFileIngestion } from './hooks/useFileIngestion'
import { useZipGenerator } from './hooks/useZipGenerator'
import DragDropZone from './components/DragDropZone'
import MetadataForm from './components/MetadataForm'
import PricingSection from './components/PricingSection'
import ProGate from './components/ProGate'
import SmartAnalyzer from './components/SmartAnalyzer'
import MarketplacePreviewPanel from './components/MarketplacePreviewPanel'
import ListingScore from './components/ListingScore'

function App() {
  // 1. CHECK PRO STATUS FIRST (Crucial for passing down to tools)
  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('afl_pro_activated') === 'true'
  })

  // 2. INITIALIZE HOOKS WITH PRO STATUS
  const ingestion = useFileIngestion(isPro)
  const zipper    = useZipGenerator()
  
  const [productName, setProductName] = useState('')
  const [metadata, setMetadata] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [keyError, setKeyError] = useState('')

  const MASTER_UNLOCK_KEY = 'LAUNCH_2026_PRO' 
  const LIFETIME_UNLOCK_KEY = 'LIFETIME_FOUNDER_2026'

  // Catch automated URL callbacks coming from Razorpay button routines
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentStatus = urlParams.get('status')
    const incomingLicense = urlParams.get('key')

    if (paymentStatus === 'success' && (incomingLicense === MASTER_UNLOCK_KEY || incomingLicense === LIFETIME_UNLOCK_KEY)) {
      setIsPro(true)
      localStorage.setItem('afl_pro_activated', 'true')
      window.history.replaceState({}, document.title, window.location.pathname)
      alert('🎉 Payment Confirmed! Your AssetForge Labs premium license has been auto-activated on this device.')
    }
  }, [])

  function handleUnlockKey() {
    const cleanKey = secretKey.trim()
    if (cleanKey === MASTER_UNLOCK_KEY || cleanKey === LIFETIME_UNLOCK_KEY) {
      setIsPro(true)
      localStorage.setItem('afl_pro_activated', 'true')
      setKeyError('')
      alert('🎉 Key Verified! AssetForge Labs Premium Tier Active.')
    } else {
      setKeyError('❌ Invalid License Key. Please verify your purchase details.')
    }
  }

  function handleLogoutPro() {
    setIsPro(false)
    localStorage.removeItem('afl_pro_activated')
  }

  const [showPricing, setShowPricing] = useState(false)
  const fullDescription = metadata

  async function handleGenerate() {
    await zipper.generate(ingestion.files, productName, metadata)
  }

  function scrollToPricing() {
    setShowPricing(true)
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: 'Inter, sans-serif', transition: 'background-color 0.4s ease, color 0.4s ease' }}>

      {/* Sticky Navbar */}
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
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToPricing() }} style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.4s ease' }}>Pricing</a>
          {isPro
            ? <span style={{ fontSize: '12px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#6366f1', padding: '4px 10px', borderRadius: '99px', whiteSpace: 'nowrap' }}>⚡ Pro</span>
            : <button onClick={scrollToPricing} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', whiteSpace: 'nowrap' }}>Get Started</button>
          }
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="fade-in" style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '99px', padding: '6px 16px', fontSize: '13px', color: '#6366f1', marginBottom: '24px', textAlign: 'left' }}>
          <span className="pulse-dot" style={{ width: '8px', height: '8px', minWidth: '8px', minHeight: '8px', borderRadius: '50%', background: '#6366f1', display: 'inline-block', flexShrink: 0 }} />
          <span>World's First Digital asset packaging tool for creators selling on Etsy, Gumroad, Creative Market & more+</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }}>
          Package. Optimize. Sell.<br />
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>All in Your Browser.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '560px', margin: '0 auto 32px', lineHeight: '1.7', transition: 'color 0.4s ease' }}>
          The only tool that packages your files, analyzes your market instantly, shows a live marketplace preview, and scores your SEO — all 100% free, no uploads, no servers.
        </p>

        {/* Unique feature badges */}
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

        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {[
            { icon: '👥', text: '12,400+ creators' },
            { icon: '📦', text: '89,000+ ZIPs generated' },
            { icon: '⭐', text: '4.9/5 rating' },
          ].map((s) => (
            <div key={s.text} style={{ fontSize: '13px', color: 'var(--text-muted)', transition: 'color 0.4s ease' }}>{s.icon} {s.text}</div>
          ))}
        </div>
      </section>

      {/* Main App Container */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Free plan notice banner */}
        {!isPro && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: '10px', padding: '10px 16px', marginBottom: '24px', fontSize: '13px', flexWrap: 'wrap', gap: '8px', transition: 'background-color 0.4s ease, border-color 0.4s ease' }}>
            <span style={{ color: 'var(--text-muted)' }}>🆓 <strong style={{ color: 'var(--primary)' }}>Free Plan</strong> — 50MB limit · Upgrade for unlimited sizing</span>
            <button onClick={scrollToPricing} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', fontSize: '12px', padding: '5px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Upgrade ⚡
            </button>
          </div>
        )}

        {/* Pro / Lifetime Manual Activation Card */}
        <div style={{
          backgroundColor: isPro ? 'rgba(16,185,129,0.04)' : 'var(--surface)',
          border: isPro ? '1px solid rgba(16,185,129,0.2)' : '1px solid var(--border)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          transition: 'background-color 0.4s ease, border-color 0.4s ease'
        }}>
          {isPro ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '600' }}>
                ⚡ AssetForge Labs Premium Tier is Active on this Device
              </span>
              <button 
                onClick={handleLogoutPro}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Deactivate Key
              </button>
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Already purchased? Enter your License Key or Founder Key below to unlock:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Paste your license code here..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  style={{
                    flex: 1, padding: '8px 12px', backgroundColor: 'var(--surface-2)',
                    border: '1px solid var(--border)', borderRadius: '6px',
                    color: 'var(--text)', fontSize: '13px', outline: 'none',
                    transition: 'background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease'
                  }}
                />
                <button
                  onClick={handleUnlockKey}
                  style={{
                    padding: '8px 16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px',
                    fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  Activate License
                </button>
              </div>
              {keyError && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '6px' }}>{keyError}</p>}
            </div>
          )}
        </div>

        {/* Product Name Form Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g. Procreate Watercolour Brush Pack Vol.1"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text)', fontSize: '15px', outline: 'none', fontFamily: 'Inter, sans-serif', fontWeight: '500', transition: 'background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease' }}
          />
        </div>

        {/* Drop Zone Component Module */}
        <DragDropZone ingestion={ingestion} isPro={isPro} />

        {/* Listing Health Score Widget */}
        <ListingScore
          productName={productName}
          description={fullDescription}
          fileCount={ingestion.files.length}
          hasMetadata={metadata.length > 50}
          hasAIContent={false}
        />

        {/* Smart Market Analyzer Panel */}
        <SmartAnalyzer
          files={ingestion.files}
          productName={productName}
        />

        {/* SEO Metadata Form Processor */}
        <MetadataForm
          productName={productName}
          onMetadataGenerated={(md) => setMetadata(md)}
          isPro={isPro}
        />

        {/* Live Marketplace UI Sandbox */}
        <MarketplacePreviewPanel
          productName={productName}
          description={fullDescription}
          fileCount={ingestion.files.length}
        />

        {/* Premium Lockout Safeguard Guardrails */}
        {!isPro && (
          <ProGate feature="Batch Processing — Generate 10 ZIPs at once" onUpgrade={scrollToPricing} />
        )}

        {/* Core Generator Action Interface */}
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
            {metadata && ' + SEO'}
          </button>
        )}

        {/* Local Compression Progress Array */}
        {zipper.isGenerating && (
          <div className="fade-in" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span>⚙️ Packaging everything...</span>
              <span style={{ fontWeight: '600', color: '#6366f1' }}>{zipper.progress}%</span>
            </div>
            <div style={{ backgroundColor: 'var(--surface-2)', borderRadius: '99px', height: '6px' }}>
              <div style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)', height: '6px', borderRadius: '99px', width: `${zipper.progress}%`, transition: 'width 0.2s ease' }} />
            </div>
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Files never leave your device</p>
          </div>
        )}

        {/* Complete Success Interface Deployment Block */}
        {zipper.isDone && (
          <div className="fade-in" style={{ marginTop: '20px', padding: '28px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
            <p style={{ fontWeight: '800', fontSize: '20px', color: '#10b981', marginBottom: '4px' }}>Package Downloaded!</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Check your Downloads folder — SEO description + README all inside!
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => { zipper.reset(); ingestion.clearAll(); setProductName(''); setMetadata('') }}
                style={{ padding: '10px 20px', background: 'none', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '8px', color: '#10b981', fontSize: '14px', cursor: 'pointer', fontWeight: '600' }}
              >
                Package another →
              </button>
              {!isPro && (
                <button
                  onClick={scrollToPricing}
                  style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', cursor: 'pointer', fontWeight: '600' }}
                >
                  ⚡ Unlock Premium
                </button>
              )}
            </div>
          </div>
        )}

        {/* Runtime Exception Notification Box */}
        {zipper.error && (
          <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', color: '#f87171', fontSize: '14px' }}>
            ⚠️ {zipper.error}
          </div>
        )}
      </section>

      {/* Instructional Walkthrough Layer */}
      <section style={{ padding: '60px 32px', maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', marginBottom: '8px' }}>
          Ready in 3 simple steps
        </h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '15px', marginBottom: '40px', transition: 'color 0.4s ease' }}>
          From files to market-ready package in under 60 seconds
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { step: '01', icon: '📁', title: 'Drop Your Files', desc: 'Drag and drop any digital files. Images go to Preview folder, everything else to Source Files automatically.' },
            { step: '02', icon: '🧠', title: 'Get Market Intel', desc: 'SmartAnalyzer instantly detects your asset type and shows best platform, price, keywords and revenue estimate.' },
            { step: '03', icon: '⚡', title: 'Download Package', desc: 'One click generates a structured ZIP with SEO metadata, README and marketplace listing — ready to upload.' },
          ].map((s) => (
            <div key={s.step} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', position: 'relative', transition: 'background-color 0.4s ease, border-color 0.4s ease' }}>
              <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '11px', fontWeight: 800, color: 'var(--border)', letterSpacing: '0.05em' }}>{s.step}</span>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--text)', transition: 'color 0.4s ease' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', transition: 'color 0.4s ease' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlighting Grid Layout */}
      <section id="features" style={{ padding: '80px 32px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
            Features no one else has
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', transition: 'color 0.4s ease' }}>Built from scratch based on what digital asset sellers actually need</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { icon: '🧠', title: 'Smart Market Analyzer', desc: 'Instantly detects your asset type and shows best platform, price range, revenue estimate and top 2026 keywords. World first.', badge: 'WORLD FIRST' },
            { icon: '👁️', title: 'Live Marketplace Preview', desc: 'See pixel-perfect previews of your listing on Etsy and Gumroad before publishing. World first.', badge: 'WORLD FIRST' },
            { icon: '📊', title: 'Listing Health Score', desc: 'Real-time SEO scoring system tells you exactly what to fix before you list. Like Grammarly for Etsy.', badge: 'UNIQUE' },
            { icon: '📦', title: 'Smart ZIP Packaging', desc: 'Auto-organised folders for Source Files, Previews and Metadata. SEO description included inside.', badge: null },
            { icon: '🔒', title: '100% Browser Private', desc: 'Files never leave your device. No server. No upload. No privacy risk. Impossible to hack.', badge: null },
            { icon: '⚡', title: 'Instant Download', desc: 'Generate and download your complete ready-to-list package in seconds. No waiting.', badge: null },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', position: 'relative', transition: 'background-color 0.4s ease, border-color 0.4s ease' }}>
              {card.badge && (
                <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '9px', fontWeight: '800', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '3px 8px', borderRadius: '99px', letterSpacing: '0.05em' }}>
                  {card.badge}
                </span>
              )}
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
              <h3 style={{ fontWeight: '700', marginBottom: '8px', fontSize: '15px', color: 'var(--text)', transition: 'color 0.4s ease' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', transition: 'color 0.4s ease' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Matrix Component Mounting */}
      {showPricing && <PricingSection />}
       
      {/* Community Creator Feedback Board */}
      <FeedbackSection />

      {/* Application Footer Element */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center', transition: 'border-color 0.4s ease' }}>
        <div style={{ fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>AssetForge Labs</div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', transition: 'color 0.4s ease' }}>The world's most advanced digital asset packager</p>
        
        {/* Legal & Contact Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap', marginBottom: '24px' }}>
          <a href="/privacy.html" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/terms.html" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
          <a href="/refund.html" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Cancellation & Refund Policy</a>
          <a href="mailto:assetforgelabs@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</a>
        </div>

        {/* Social Media Logos */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          {/* Official Instagram Logo */}
          <a 
            href="https://www.instagram.com/assetforgelabs/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.color = '#e1306c'} 
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5Z" />
            </svg>
          </a>

          {/* Official X Logo */}
          <a 
            href="https://x.com/AssetForgeLabs" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'} 
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
            </svg>
          </a>

          {/* Official LinkedIn Logo */}
          <a 
            href="https://www.linkedin.com/in/assetforge-labs-914536410" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.color = '#0a66c2'} 
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>© 2026 AssetForge Labs. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default App