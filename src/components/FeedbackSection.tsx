import { useState, useEffect } from 'react'

interface Suggestion {
  id: string
  text: string
  category: string
  votes: number
  time: string
  voted: boolean
}

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { id: '1', text: 'Add bulk rename feature for files inside ZIP', category: '✨ Feature', votes: 47, time: '2 days ago', voted: false },
  { id: '2', text: 'Support for Google Drive direct import', category: '🔗 Integration', votes: 38, time: '3 days ago', voted: false },
  { id: '3', text: 'Dark/light mode toggle', category: '🎨 Design', votes: 29, time: '5 days ago', voted: false },
  { id: '4', text: 'Add watermark option to preview images', category: '✨ Feature', votes: 22, time: '1 week ago', voted: false },
  { id: '5', text: 'Export metadata as CSV for bulk editing', category: '📊 Export', votes: 18, time: '1 week ago', voted: false },
]

const CATS = [
  { value: '✨ Feature',      label: '✨ New Feature' },
  { value: '🐛 Bug',         label: '🐛 Bug Report' },
  { value: '🎨 Design',      label: '🎨 Design' },
  { value: '🔗 Integration', label: '🔗 Integration' },
  { value: '📊 Export',      label: '📊 Export / Import' },
  { value: '💡 Idea',        label: '💡 General Idea' },
]

const MOODS = [
  { emoji: '😍', label: 'Love it' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😕', label: 'Needs work' },
]

const STARS_TEXT: Record<number, string> = {
  1: 'Poor — needs major improvement',
  2: 'Fair — some things need fixing',
  3: 'Good — works well',
  4: 'Great — really enjoying it!',
  5: 'Amazing — absolutely love it! 🔥',
}

const TW = 'https://twitter.com/intent/tweet?text=Just+found+AssetForge+Labs+%E2%80%94+best+digital+asset+packager+for+creators!+AI-powered+%26+100%25+browser-based+%F0%9F%94%A5&url=https://assetforgelabs.com'
const LI = 'https://www.linkedin.com/sharing/share-offsite/?url=https://assetforgelabs.com'

const inputBase: React.CSSProperties = {
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

export default function FeedbackSection() {
  const [list,       setList]       = useState<Suggestion[]>(DEFAULT_SUGGESTIONS)
  const [text,       setText]       = useState('')
  const [cat,        setCat]        = useState('💡 Idea')
  const [email,      setEmail]      = useState('')
  const [mood,       setMood]       = useState('')
  const [sent,       setSent]       = useState(false)
  const [sending,    setSending]    = useState(false)
  const [err,        setErr]        = useState('')
  const [tab,        setTab]        = useState<'suggest' | 'vote' | 'rate'>('suggest')
  const [stars,      setStars]      = useState(0)
  const [hover,      setHover]      = useState(0)
  const [rated,      setRated]      = useState(false)
  const [chars,      setChars]      = useState(0)

  useEffect(() => {
    try {
      const s = localStorage.getItem('afl_s')
      if (s) setList(JSON.parse(s))
      const r = localStorage.getItem('afl_r')
      if (r) { setStars(Number(r)); setRated(true) }
    } catch { /* ignore */ }
  }, [])

  function changeText(v: string) {
    if (v.length <= 200) { setText(v); setChars(v.length) }
  }

  async function submit() {
    if (text.trim().length < 10) { setErr('Please write at least 10 characters.'); return }
    setErr('')
    setSending(true)
    const item: Suggestion = {
      id: Date.now().toString(), text: text.trim(), category: cat, votes: 0, time: 'Just now', voted: false,
    }
    const next = [item, ...list]
    setList(next)
    try { localStorage.setItem('afl_s', JSON.stringify(next)) } catch { /* ignore */ }
    try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '0cd76dea-5efc-4afb-b4b2-5bccaca5d4ec',
        subject: 'New Suggestion — AssetForge Labs',
        from_name: 'AssetForge Labs Feedback',
        suggestion: text,
        category: cat,
        user_email: email || 'Anonymous',
        mood: mood || 'Not specified',
      }),
    })
    } catch { /* ignore */ }
    setSending(false)
    setSent(true)
    setText('')
    setEmail('')
    setChars(0)
  }

  function vote(id: string) {
    const next = list.map((s) => s.id === id && !s.voted ? { ...s, votes: s.votes + 1, voted: true } : s)
    setList(next)
    try { localStorage.setItem('afl_s', JSON.stringify(next)) } catch { /* ignore */ }
  }

  function rate(n: number) {
    setStars(n)
    setRated(true)
    try { localStorage.setItem('afl_r', String(n)) } catch { /* ignore */ }
  }

  function tabSt(on: boolean): React.CSSProperties {
    return {
      padding: '8px 18px', borderRadius: '8px', border: 'none',
      borderBottom: on ? '2px solid #6366f1' : '2px solid transparent',
      background: on ? 'rgba(99,102,241,0.2)' : 'transparent',
      color: on ? '#a5b4fc' : '#64748b',
      fontSize: '13px', fontWeight: on ? 600 : 400, cursor: 'pointer',
    }
  }

  function pillSt(on: boolean): React.CSSProperties {
    return {
      padding: '6px 14px', borderRadius: '99px', fontSize: '12px',
      border: on ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
      background: on ? 'rgba(99,102,241,0.15)' : 'transparent',
      color: on ? '#a5b4fc' : '#64748b', cursor: 'pointer',
    }
  }

  const ratingTweetUrl =
    'https://twitter.com/intent/tweet?text=Just+rated+AssetForge+Labs+' +
    String(stars) +
    '%2F5+stars!+Best+digital+asset+packager+for+creators+%F0%9F%94%A5&url=https://assetforgelabs.com'

  return (
    <section style={{ padding: '80px 24px', maxWidth: '760px', margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '99px', padding: '6px 16px', fontSize: '13px', color: '#6366f1', marginBottom: '16px' }}>
          🧠 Built with creators, for creators
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>You Shape AssetForge Labs</h2>
        <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
          Every feature in this tool came from creator feedback. Tell us what you need — the best ideas get built next.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {[['247', 'Suggestions received'], ['38', 'Features shipped'], ['94%', 'Users feel heard']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 800, color: '#6366f1', marginBottom: '2px' }}>{v}</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>

        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 20px', gap: '4px' }}>
          <button style={tabSt(tab === 'suggest')} onClick={() => setTab('suggest')}>💡 Suggest</button>
          <button style={tabSt(tab === 'vote')}    onClick={() => setTab('vote')}>🗳️ Vote</button>
          <button style={tabSt(tab === 'rate')}    onClick={() => setTab('rate')}>⭐ Rate Us</button>
        </div>

        <div style={{ padding: '24px' }}>

          {/* SUGGEST */}
          {tab === 'suggest' && sent && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: '#10b981' }}>Thank you! We got your suggestion.</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>We read every submission and will notify you when your idea ships.</p>
              <button onClick={() => setSent(false)} style={{ padding: '10px 24px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
                Submit another
              </button>
            </div>
          )}

          {tab === 'suggest' && !sent && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '10px', fontWeight: 500 }}>How are you feeling about AssetForge Labs today?</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {MOODS.map((m) => (
                    <button key={m.emoji} onClick={() => setMood(m.emoji)} style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '99px',
                      border: mood === m.emoji ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                      background: mood === m.emoji ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)',
                      color: mood === m.emoji ? '#a5b4fc' : '#94a3b8', fontSize: '13px', cursor: 'pointer',
                    }}>
                      <span style={{ fontSize: '18px' }}>{m.emoji}</span>{m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {CATS.map((c) => (
                    <button key={c.value} onClick={() => setCat(c.value)} style={pillSt(cat === c.value)}>{c.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>Your suggestion *</label>
                <textarea
                  rows={4}
                  placeholder="e.g. It would be amazing if I could import files directly from Google Drive..."
                  value={text}
                  onChange={(e) => changeText(e.target.value)}
                  style={{ ...inputBase, resize: 'vertical' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#f87171' }}>{err ? '⚠️ ' + err : ''}</span>
                  <span style={{ fontSize: '11px', color: chars > 180 ? '#f59e0b' : '#64748b' }}>{chars}/200</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>
                  Email <span style={{ color: '#475569', fontWeight: 400 }}>(optional — get notified when idea ships)</span>
                </label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputBase} />
              </div>

              <button
                onClick={submit}
                disabled={sending}
                style={{ padding: '14px', background: sending ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', fontSize: '14px', fontWeight: 700, borderRadius: '10px', border: 'none', cursor: sending ? 'not-allowed' : 'pointer' }}
              >
                {sending ? '📨 Sending...' : '🚀 Submit Suggestion'}
              </button>

              <p style={{ fontSize: '11px', color: '#475569', textAlign: 'center' }}>
                🔒 We read every single suggestion. The best ideas get built into the product.
              </p>
            </div>
          )}

          {/* VOTE */}
          {tab === 'vote' && (
            <div>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>Vote on suggestions. Top-voted ideas get built next.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[...list].sort((a, b) => b.votes - a.votes).map((s) => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: s.voted ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.02)', border: s.voted ? '1px solid rgba(99,102,241,0.2)' : '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                    <button onClick={() => vote(s.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '8px 12px', minWidth: '52px', background: s.voted ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)', border: s.voted ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', cursor: s.voted ? 'default' : 'pointer', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px' }}>{s.voted ? '✅' : '▲'}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: s.voted ? '#a5b4fc' : '#94a3b8' }}>{s.votes}</span>
                    </button>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 500, lineHeight: '1.5', marginBottom: '4px' }}>{s.text}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '2px 8px', borderRadius: '99px' }}>{s.category}</span>
                        <span style={{ fontSize: '11px', color: '#475569' }}>{s.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#475569', textAlign: 'center', marginTop: '16px' }}>Have a new idea? Switch to the Suggest tab.</p>
            </div>
          )}

          {/* RATE */}
          {tab === 'rate' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>

              {!rated && (
                <div>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌟</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>How would you rate AssetForge Labs?</h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '28px' }}>Your honest rating helps us improve</p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => rate(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                        style={{ fontSize: '40px', background: 'none', border: 'none', cursor: 'pointer', filter: (hover || stars) >= n ? 'none' : 'grayscale(100%)', transform: (hover || stars) >= n ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.15s ease' }}>
                        ⭐
                      </button>
                    ))}
                  </div>

                  <p style={{ fontSize: '13px', color: '#64748b', minHeight: '20px' }}>
                    {hover > 0 ? STARS_TEXT[hover] : 'Click a star to rate'}
                  </p>

                  <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>Love it? Share with other creators:</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      {/* Official Instagram Logo */}
                      <a 
                        href="https://www.instagram.com/assetforgelabs/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} 
                        onMouseOver={(e) => e.currentTarget.style.color = '#e1306c'} 
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5Z" />
                        </svg>
                      </a>

                      {/* Official X Logo */}
                      <a 
                        href={TW} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} 
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'} 
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
                        </svg>
                      </a>

                      {/* Official LinkedIn Logo */}
                      <a 
                        href={LI} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} 
                        onMouseOver={(e) => e.currentTarget.style.color = '#0a66c2'} 
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {rated && (
                <div>
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>{stars >= 4 ? '🤩' : stars === 3 ? '😊' : '🙏'}</div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>
                    {stars >= 4 ? 'You just made our day!' : 'Thanks for being honest!'}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
                    {'You rated us ' + String(stars) + '/5 stars.'}
                    {stars < 4 ? ' We will work hard to earn that 5th star!' : ''}
                  </p>
                  {stars >= 4 && (
                    <a href={ratingTweetUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '8px', color: 'white', fontSize: '13px', textDecoration: 'none', fontWeight: 700 }}>
                      🐦 Share on Twitter/X
                    </a>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#374151', marginTop: '20px' }}>
        Built in Rajkot, India — Loved by creators worldwide
      </p>

    </section>
  )
}