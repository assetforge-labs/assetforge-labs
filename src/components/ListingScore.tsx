interface Props {
  productName: string
  description: string
  fileCount: number
  hasMetadata: boolean
  hasAIContent: boolean
}

interface ScoreItem {
  label: string
  passed: boolean
  tip: string
  points: number
}

export default function ListingScore({ productName, description, fileCount, hasMetadata, hasAIContent }: Props) {

  const checks: ScoreItem[] = [
    {
      label: 'Product name entered',
      passed: productName.length > 3,
      tip: 'Add a descriptive product name (min 4 characters)',
      points: 10,
    },
    {
      label: 'Product name has keywords',
      passed: productName.split(' ').length >= 3,
      tip: 'Use at least 3 words in your title for better SEO',
      points: 15,
    },
    {
      label: 'Files added to package',
      passed: fileCount > 0,
      tip: 'Add your digital files to the ZIP package',
      points: 20,
    },
    {
      label: 'Multiple files included',
      passed: fileCount >= 3,
      tip: 'Listings with 3+ files convert 40% better',
      points: 10,
    },
    {
      label: 'SEO metadata generated',
      passed: hasMetadata,
      tip: 'Generate your SEO metadata description above',
      points: 20,
    },
    {
  label: 'Market analysis done',
  passed: hasAIContent,
  tip: 'Type a product name to get Smart Market Analysis',
  points: 15,
},
    {
      label: 'Description has detail',
      passed: description.length > 100,
      tip: 'Your description needs more detail (100+ chars)',
      points: 10,
    },
  ]

  const totalPoints   = checks.reduce((a, c) => a + c.points, 0)
  const earnedPoints  = checks.filter(c => c.passed).reduce((a, c) => a + c.points, 0)
  const score         = Math.round((earnedPoints / totalPoints) * 100)

  const scoreColor = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  const scoreLabel = score >= 80 ? '🔥 Excellent — Ready to list!' : score >= 50 ? '⚡ Good — A few tweaks needed' : '🔴 Needs work — Follow the tips'

  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference

  return (
    <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
          📊
        </div>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#f8fafc' }}>Listing Health Score</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Real-time SEO readiness — like Grammarly for Etsy</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Score circle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div style={{ marginTop: '-80px', textAlign: 'center', pointerEvents: 'none' }}>
            <p style={{ fontSize: '28px', fontWeight: '800', color: scoreColor, lineHeight: 1 }}>{score}</p>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>/ 100</p>
          </div>
          <div style={{ marginTop: '36px', fontSize: '12px', color: scoreColor, fontWeight: '600', textAlign: 'center' }}>
            {scoreLabel}
          </div>
        </div>

        {/* Checklist */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
          {checks.map((check) => (
            <div
              key={check.label}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: check.passed ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.04)', borderRadius: '8px', border: `1px solid ${check.passed ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)'}` }}
            >
              <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>
                {check.passed ? '✅' : '❌'}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', fontWeight: '500', color: check.passed ? '#10b981' : '#f8fafc', marginBottom: check.passed ? 0 : '2px' }}>
                  {check.label}
                </p>
                {!check.passed && (
                  <p style={{ fontSize: '11px', color: '#94a3b8' }}>{check.tip}</p>
                )}
              </div>
              <span style={{ fontSize: '10px', color: '#64748b', flexShrink: 0 }}>+{check.points}pts</span>
            </div>
          ))}
        </div>
      </div>

      {score === 100 && (
        <div className="fade-in" style={{ marginTop: '16px', padding: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ fontWeight: '700', color: '#10b981', fontSize: '14px' }}>
            🎉 Perfect Score! Your listing is fully optimized and ready to sell!
          </p>
        </div>
      )}
    </div>
  )
}