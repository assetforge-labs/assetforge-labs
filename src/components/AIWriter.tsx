import { useState } from 'react'

interface Props {
  productName: string
  onGenerated: (text: string) => void
}

export default function AIWriter({ productName, onGenerated }: Props) {
  const [prompt,  setPrompt]  = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState('')
  const [copied,  setCopied]  = useState(false)
  const [error,   setError]   = useState('')

  async function handleGenerate() {
    console.log('API Key:', import.meta.env.VITE_ANTHROPIC_API_KEY ? 'EXISTS' : 'MISSING')

    if (!prompt.trim() && !productName.trim()) {
      setError('Please enter a product name or describe your product first.')
      return
    }

    const now = Date.now()
    const stored = localStorage.getItem('afl_ai_calls')
    const calls: number[] = stored ? JSON.parse(stored) : []
    const recent = calls.filter((t) => now - t < 60 * 60 * 1000)
    if (recent.length >= 5) {
      setError('You have used 5 free AI generations this hour. Please wait.')
      return
    }
    localStorage.setItem('afl_ai_calls', JSON.stringify([...recent, now]))

    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY as string,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are an expert Etsy SEO copywriter. Write a complete listing for:
Product: ${productName || prompt}
Details: ${prompt}

Format exactly like this:
TITLE: (SEO optimized, under 140 chars)

DESCRIPTION:
(3 paragraphs, benefit-focused, warm tone)

TAGS: (13 comma-separated tags under 20 chars each)

PRICE SUGGESTION: (brief reason)

Use 2026 trending keywords. Sound human and professional.`,
            },
          ],
        }),
      })

      if (!response.ok) {
        const errData = await response.json()
        console.error('API Error:', errData)
        throw new Error('API error ' + response.status)
      }

      const data = await response.json()
      const text = data.content?.[0]?.text || ''
      if (!text) throw new Error('Empty response from API')
      setResult(text)
      onGenerated(text)
    } catch (e) {
      console.error('AI Error:', e)
      setError('AI generation failed. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#f8fafc',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    resize: 'vertical',
  }

  return (
    <div style={{ marginTop: '32px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
          🤖
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#f8fafc' }}>AI Listing Writer</h2>
            <span style={{ fontSize: '10px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '2px 8px', borderRadius: '99px', fontWeight: 700 }}>EXCLUSIVE</span>
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Claude AI writes your entire listing — title, description, tags, price</p>
        </div>
      </div>

      <div style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '16px', padding: '20px' }}>

        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>
          Describe your product in a few words (AI does the rest)
        </label>

        <textarea
          rows={3}
          placeholder="e.g. Procreate brush set with 50 brushes, watercolor style, for digital artists on iPad"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <p style={{ color: '#f87171', fontSize: '12px', marginTop: '8px' }}>
            ⚠️ {error}
          </p>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '14px',
            background: loading ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: 'white',
            fontSize: '14px',
            fontWeight: 700,
            borderRadius: '10px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '🤖 AI is writing your listing...' : '🤖 Generate Complete Listing with AI'}
        </button>

        {loading && (
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#6366f1',
                    animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Writing title → description → tags → price...
            </p>
          </div>
        )}

        {result && (
          <div className="fade-in" style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>
                ✅ Complete Listing Generated!
              </span>
              <button
                onClick={handleCopy}
                style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.08)', color: '#10b981', cursor: 'pointer' }}
              >
                {copied ? '✓ Copied!' : '📋 Copy All'}
              </button>
            </div>
            <pre style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '10px',
              padding: '16px',
              fontSize: '12px',
              color: '#e2e8f0',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxHeight: '400px',
              overflowY: 'auto',
              fontFamily: 'Inter, sans-serif',
            }}>
              {result}
            </pre>
            <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px', textAlign: 'center' }}>
              💡 This AI listing is saved inside your ZIP package automatically
            </p>
          </div>
        )}

      </div>
    </div>
  )
}