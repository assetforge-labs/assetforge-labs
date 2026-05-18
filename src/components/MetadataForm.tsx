import { useState } from 'react'
import { generateMetadata, type AssetCategory, type MetadataInput } from '../utils/seoOptimizer'

interface Props {
  productName: string
  onMetadataGenerated: (markdown: string) => void
}

const categories: { value: AssetCategory; label: string; icon: string; platform: string }[] = [
  { value: 'graphic-design', label: 'Graphic Design', icon: '🎨', platform: 'Any platform' },
  { value: 'procreate',      label: 'Procreate',      icon: '🖌️', platform: 'App Store' },
  { value: 'notion',         label: 'Notion Template', icon: '📋', platform: 'Gumroad / Etsy' },
  { value: 'canva',          label: 'Canva Template',  icon: '✨', platform: 'Etsy / Creative Market' },
  { value: 'shopify',        label: 'Shopify Theme',   icon: '🛍️', platform: 'Envato / Direct' },
  { value: 'photography',    label: 'Lightroom Preset',icon: '📸', platform: 'Creative Market' },
  { value: 'font',           label: 'Font / Typeface', icon: '✍️', platform: 'Creative Fabrica' },
  { value: 'kdp',            label: 'KDP Interior',    icon: '📚', platform: 'Amazon KDP' },
  { value: 'teacherspay',    label: 'Classroom Resource', icon: '🍎', platform: 'Teachers Pay Teachers' },
  { value: 'figma',          label: 'Figma UI Kit',    icon: '🎯', platform: 'Gumroad / Figma Community' },
  { value: 'lottie',         label: 'Lottie Animation',icon: '✨', platform: 'LottieFiles / Envato' },
  { value: 'ui-kit',         label: 'UI Kit',          icon: '🧩', platform: 'Envato / Gumroad' },
  { value: 'general',        label: 'General Digital',  icon: '📦', platform: 'Any platform' },
]

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  color: '#94a3b8',
  marginBottom: '6px',
  fontWeight: '500',
}

export default function MetadataForm({ productName, onMetadataGenerated }: Props) {
  const [category,    setCategory]    = useState<AssetCategory>('general')
  const [features,    setFeatures]    = useState('')
  const [fileFormats, setFileFormats] = useState('')
  const [license,     setLicense]     = useState('Personal and commercial use allowed. Do not resell or redistribute.')
  const [preview,     setPreview]     = useState('')
  const [copied,      setCopied]      = useState(false)

  function handleGenerate() {
    const input: MetadataInput = {
      productTitle: productName || 'My Digital Product',
      category, features, fileFormats, license,
    }
    const markdown = generateMetadata(input)
    setPreview(markdown)
    onMetadataGenerated(markdown)
  }

  function handleCopy() {
    navigator.clipboard.writeText(preview)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>✨</div>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f8fafc' }}>SEO Metadata Generator</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Works for Etsy, Gumroad, Amazon KDP, Envato, Teachers Pay Teachers, Creative Fabrica, Figma Community + more</p>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Category grid */}
        <div>
          <label style={labelStyle}>What type of asset are you selling?</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: category === cat.value ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                  background: category === cat.value ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)',
                  color: category === cat.value ? '#a5b4fc' : '#94a3b8',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{cat.icon}</div>
                <div style={{ fontWeight: '600', marginBottom: '2px' }}>{cat.label}</div>
                <div style={{ fontSize: '9px', opacity: 0.6 }}>{cat.platform}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <label style={labelStyle}>What's included</label>
          <textarea
            rows={3}
            placeholder={'- 50 unique brush stamps\n- 10 texture overlays\n- Commercial license'}
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical' as const }}
          />
        </div>

        {/* File formats */}
        <div>
          <label style={labelStyle}>File formats included</label>
          <input
            type="text"
            placeholder="e.g. .brushset, .PNG, .PDF, .OTF, .fig, .json"
            value={fileFormats}
            onChange={(e) => setFileFormats(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* License */}
        <div>
          <label style={labelStyle}>License terms</label>
          <input
            type="text"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleGenerate}
          style={{ padding: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: '14px', fontWeight: '600', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
        >
          ✨ Generate SEO Metadata
        </button>
      </div>

      {preview && (
        <div className="fade-in" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc' }}>✅ Generated Listing Description</span>
            <button onClick={handleCopy} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', cursor: 'pointer' }}>
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <pre style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px', fontSize: '12px', color: '#94a3b8', lineHeight: '1.7', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '320px', overflowY: 'auto', fontFamily: 'Inter, sans-serif' }}>
            {preview}
          </pre>
        </div>
      )}
    </div>
  )
}