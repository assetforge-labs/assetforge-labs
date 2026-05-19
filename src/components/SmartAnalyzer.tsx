import { useEffect, useState } from 'react'
import type { IngestedFile } from '../hooks/useFileIngestion'

interface Props {
  files: IngestedFile[]
  productName: string
}

interface MarketData {
  category: string
  emoji: string
  bestPlatform: string
  priceRange: string
  competition: string
  competitionColor: string
  monthlyRevenue: string
  topKeywords: string[]
  tips: string[]
  demandScore: number
  platformScores: { name: string; score: number; color: string }[]
}

function detectCategory(files: IngestedFile[], productName: string): MarketData {
  const allNames = [...files.map(f => f.name.toLowerCase()), productName.toLowerCase()].join(' ')
  const exts = files.map(f => '.' + f.name.split('.').pop()?.toLowerCase())

  if (exts.some(e => ['.brushset', '.abr', '.brush'].includes(e)) || allNames.includes('brush') || allNames.includes('procreate')) {
    return {
      category: 'Procreate / Digital Brushes', emoji: '🖌️',
      bestPlatform: 'Etsy', priceRange: '$4 – $18',
      competition: 'Medium', competitionColor: '#f59e0b',
      monthlyRevenue: '$200 – $1,200',
      demandScore: 87,
      topKeywords: ['procreate brushes', 'digital art brush', 'ipad brush set', 'procreate texture', 'brush bundle'],
      platformScores: [{ name: 'Etsy', score: 92, color: '#F1641E' }, { name: 'Gumroad', score: 78, color: '#FF90E8' }, { name: 'Creative Market', score: 65, color: '#6366f1' }],
      tips: ['Include a preview video — sells 3x more', 'Bundle 20+ brushes for higher perceived value', 'Add "Commercial License" in title'],
    }
  }
  if (exts.some(e => ['.fig'].includes(e)) || allNames.includes('figma') || allNames.includes('ui kit') || allNames.includes('component')) {
    return {
      category: 'Figma / UI Kit', emoji: '🎯',
      bestPlatform: 'Gumroad', priceRange: '$15 – $79',
      competition: 'Low', competitionColor: '#10b981',
      monthlyRevenue: '$500 – $3,000',
      demandScore: 91,
      topKeywords: ['figma ui kit', 'figma template', 'design system', 'web ui components', 'figma wireframe'],
      platformScores: [{ name: 'Gumroad', score: 94, color: '#FF90E8' }, { name: 'Etsy', score: 61, color: '#F1641E' }, { name: 'Envato', score: 88, color: '#6366f1' }],
      tips: ['Show before/after screenshots', 'Include Figma Community free sample', 'Target developer-focused keywords'],
    }
  }
  if (exts.some(e => ['.xmp', '.lrtemplate', '.dng'].includes(e)) || allNames.includes('preset') || allNames.includes('lightroom')) {
    return {
      category: 'Lightroom Presets', emoji: '📸',
      bestPlatform: 'Etsy', priceRange: '$6 – $25',
      competition: 'High', competitionColor: '#ef4444',
      monthlyRevenue: '$150 – $800',
      demandScore: 74,
      topKeywords: ['lightroom preset', 'photo filter', 'moody preset', 'portrait preset', 'adobe preset pack'],
      platformScores: [{ name: 'Etsy', score: 88, color: '#F1641E' }, { name: 'Gumroad', score: 72, color: '#FF90E8' }, { name: 'Creative Market', score: 79, color: '#6366f1' }],
      tips: ['Show before/after photos', 'Create lifestyle niche bundles (Wedding, Travel)', 'Price in bundles of 10-20'],
    }
  }
  if (exts.some(e => ['.otf', '.ttf', '.woff', '.woff2'].includes(e)) || allNames.includes('font') || allNames.includes('typeface')) {
    return {
      category: 'Fonts / Typefaces', emoji: '✍️',
      bestPlatform: 'Creative Market', priceRange: '$10 – $45',
      competition: 'Medium', competitionColor: '#f59e0b',
      monthlyRevenue: '$300 – $2,000',
      demandScore: 83,
      topKeywords: ['commercial font', 'handwritten font', 'logo font', 'branding typeface', 'modern font bundle'],
      platformScores: [{ name: 'Creative Market', score: 95, color: '#6366f1' }, { name: 'Creative Fabrica', score: 89, color: '#8b5cf6' }, { name: 'Etsy', score: 71, color: '#F1641E' }],
      tips: ['Always include OTF + TTF + WOFF formats', 'Show logo mockups in preview images', 'Offer font family bundles for higher revenue'],
    }
  }
  if (allNames.includes('notion') || allNames.includes('template') || allNames.includes('planner')) {
    return {
      category: 'Notion / Digital Templates', emoji: '📋',
      bestPlatform: 'Gumroad', priceRange: '$5 – $35',
      competition: 'High', competitionColor: '#ef4444',
      monthlyRevenue: '$100 – $600',
      demandScore: 79,
      topKeywords: ['notion template', 'digital planner', 'productivity system', 'notion dashboard', 'life planner notion'],
      platformScores: [{ name: 'Gumroad', score: 91, color: '#FF90E8' }, { name: 'Etsy', score: 85, color: '#F1641E' }, { name: 'Payhip', score: 70, color: '#6366f1' }],
      tips: ['Show a screen recording of the template in use', 'Offer a free version to build email list', 'Bundle multiple templates for higher price'],
    }
  }
  if (exts.some(e => ['.svg', '.ai', '.eps', '.pdf'].includes(e)) || allNames.includes('graphic') || allNames.includes('vector') || allNames.includes('design element')) {
    return {
      category: 'Graphic Design Assets', emoji: '🎨',
      bestPlatform: 'Creative Market', priceRange: '$8 – $40',
      competition: 'Medium', competitionColor: '#f59e0b',
      monthlyRevenue: '$200 – $1,500',
      demandScore: 85,
      topKeywords: ['graphic design elements', 'vector bundle', 'svg elements', 'design assets', 'canva elements'],
      platformScores: [{ name: 'Creative Market', score: 90, color: '#6366f1' }, { name: 'Etsy', score: 84, color: '#F1641E' }, { name: 'Envato', score: 77, color: '#8b5cf6' }],
      tips: ['Include transparent PNG + SVG + EPS formats', 'Show use cases in mockups', 'Bundle 50+ elements for $15+ pricing'],
    }
  }
  if (exts.some(e => ['.json'].includes(e)) || allNames.includes('lottie') || allNames.includes('animation')) {
    return {
      category: 'Lottie / Animations', emoji: '✨',
      bestPlatform: 'LottieFiles', priceRange: '$5 – $30',
      competition: 'Low', competitionColor: '#10b981',
      monthlyRevenue: '$400 – $2,500',
      demandScore: 93,
      topKeywords: ['lottie animation', 'json animation', 'web animation', 'animated icon', 'motion graphics'],
      platformScores: [{ name: 'LottieFiles', score: 97, color: '#6366f1' }, { name: 'Envato', score: 82, color: '#8b5cf6' }, { name: 'Gumroad', score: 68, color: '#FF90E8' }],
      tips: ['Low competition — huge opportunity right now!', 'Show preview GIFs of each animation', 'Bundle 20+ animations for $20+ pricing'],
    }
  }
  // Default
  return {
    category: 'Digital Download', emoji: '📦',
    bestPlatform: 'Etsy', priceRange: '$5 – $25',
    competition: 'Medium', competitionColor: '#f59e0b',
    monthlyRevenue: '$100 – $800',
    demandScore: 72,
    topKeywords: ['digital download', 'instant download', 'commercial use', 'digital product', 'creative asset'],
    platformScores: [{ name: 'Etsy', score: 85, color: '#F1641E' }, { name: 'Gumroad', score: 78, color: '#FF90E8' }, { name: 'Payhip', score: 65, color: '#6366f1' }],
    tips: ['Add a detailed description with 200+ words', 'Use all 13 Etsy tags', 'Price competitively — check top sellers first'],
  }
}

export default function SmartAnalyzer({ files, productName }: Props) {
  const [data, setData] = useState<MarketData | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (files.length > 0 || productName.length > 2) {
      const result = detectCategory(files, productName)
      setData(result)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [files, productName])

  if (!visible || !data) return null

  return (
    <div className="fade-in" style={{ marginTop: '24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
          🧠
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#f8fafc' }}>Smart Market Analyzer</h2>
            <span style={{ fontSize: '10px', background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', padding: '2px 8px', borderRadius: '99px', fontWeight: 700 }}>WORLD FIRST</span>
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Instant market intelligence — best platform, price, keywords & revenue estimate</p>
        </div>
      </div>

      <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '16px', padding: '20px' }}>

        {/* Detected Category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>{data.emoji}</span>
            <div>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>Detected Category</p>
              <p style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc' }}>{data.category}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 12px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Market Demand</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: data.demandScore >= 85 ? '#10b981' : data.demandScore >= 70 ? '#f59e0b' : '#ef4444' }}>
              {data.demandScore}/100
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: '💰 Price Range', value: data.priceRange, color: '#10b981' },
            { label: '🏆 Best Platform', value: data.bestPlatform, color: '#6366f1' },
            { label: '📈 Est. Monthly Revenue', value: data.monthlyRevenue, color: '#f59e0b' },
            { label: '⚔️ Competition', value: data.competition, color: data.competitionColor },
          ].map((m) => (
            <div key={m.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px' }}>
              <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{m.label}</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: m.color }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Platform Scores */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px', fontWeight: 500 }}>Best platforms for your asset type:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.platformScores.map((p) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8', width: '120px', flexShrink: 0 }}>{p.name}</span>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '99px', height: '6px' }}>
                  <div style={{ width: `${p.score}%`, height: '6px', borderRadius: '99px', background: p.color, transition: 'width 0.8s ease' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: p.color, width: '36px', textAlign: 'right' }}>{p.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Keywords */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px', fontWeight: 500 }}>🔍 Top 2026 keywords for your category:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.topKeywords.map((kw) => (
              <span
                key={kw}
                onClick={() => navigator.clipboard.writeText(kw)}
                title="Click to copy"
                style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '99px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc', cursor: 'pointer' }}
              >
                {kw}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '10px', color: '#475569', marginTop: '6px' }}>💡 Click any keyword to copy it</p>
        </div>

        {/* Pro Tips */}
        <div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px', fontWeight: 500 }}>⚡ Expert tips to sell more:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>{'💎'}</span>
                <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}