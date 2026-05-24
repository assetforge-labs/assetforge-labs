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
    { label: 'Product name entered', passed: productName.length > 3, tip: 'Add a descriptive product name (min 4 characters)', points: 10 },
    { label: 'Product name has keywords', passed: productName.split(' ').length >= 3, tip: 'Use at least 3 words in your title for better SEO', points: 15 },
    { label: 'Files added to package', passed: fileCount > 0, tip: 'Add your digital files to the ZIP package', points: 20 },
    { label: 'Multiple files included', passed: fileCount >= 3, tip: 'Listings with 3+ files convert 40% better', points: 10 },
    { label: 'SEO metadata generated', passed: hasMetadata, tip: 'Generate your SEO metadata description above', points: 20 },
    { label: 'Market analysis done', passed: hasAIContent, tip: 'Type a product name to get Smart Market Analysis', points: 15 },
    { label: 'Description has detail', passed: description.length > 100, tip: 'Your description needs more detail (100+ chars)', points: 10 },
  ]

  const totalPoints = checks.reduce((a, c) => a + c.points, 0)
  const earnedPoints = checks.filter(c => c.passed).reduce((a, c) => a + c.points, 0)
  const score = Math.round((earnedPoints / totalPoints) * 100)

  const scoreColor = score >= 80 ? '#047857' : score >= 50 ? '#b45309' : '#b91c1c'
  const scoreLabel = score >= 80 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs work'

  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference

  return (
    <div style={{ marginTop: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📊</div>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)' }}>Listing Health Score</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time SEO readiness</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={scoreColor} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
          </svg>
          <div style={{ marginTop: '-80px', textAlign: 'center' }}>
            <p style={{ fontSize: '28px', fontWeight: '800', color: scoreColor, lineHeight: 1 }}>{score}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ 100</p>
          </div>
          <div style={{ marginTop: '36px', fontSize: '12px', color: scoreColor, fontWeight: '700' }}>{scoreLabel}</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
          {checks.map((check) => (
            <div key={check.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: check.passed ? 'rgba(4,120,87,0.05)' : 'rgba(185,28,28,0.05)', borderRadius: '8px', border: `1px solid ${check.passed ? '#047857' : '#b91c1c'}` }}>
              <span style={{ fontSize: '14px' }}>{check.passed ? '✅' : '❌'}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)', marginBottom: '2px' }}>{check.label}</p>
                {!check.passed && <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{check.tip}</p>}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+{check.points}pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
