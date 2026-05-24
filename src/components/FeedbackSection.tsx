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
  { value: '✨ Feature',     label: '✨ New Feature' },
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
  background: 'var(--surface-2)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text)',
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
    } catch { }
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
    try { localStorage.setItem('afl_s', JSON.stringify(next)) } catch { }
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
    } catch { }
    setSending(false)
    setSent(true)
    setText('')
    setEmail('')
    setChars(0)
  }

  function vote(id: string) {
    const next = list.map((s) => s.id === id && !s.voted ? { ...s, votes: s.votes + 1, voted: true } : s)
    setList(next)
    try { localStorage.setItem('afl_s', JSON.stringify(next)) } catch { }
  }

  function rate(n: number) {
    setStars(n)
    setRated(true)
    try { localStorage.setItem('afl_r', String(n)) } catch { }
  }

  function tabSt(on: boolean): React.CSSProperties {
    return {
      padding: '8px 18px', borderRadius: '8px', border: 'none',
      borderBottom: on ? '2px solid #4338ca' : '2px solid transparent',
      background: on ? 'rgba(99,102,241,0.1)' : 'transparent',
      color: on ? '#4338ca' : '#334155',
      fontSize: '13px', fontWeight: on ? '600' : '400', cursor: 'pointer',
    }
  }

  function pillSt(on: boolean): React.CSSProperties {
    return {
      padding: '6px 14px', borderRadius: '99px', fontSize: '12px',
      border: on ? '1px solid #4338ca' : '1px solid var(--border)',
      background: on ? 'rgba(99,102,241,0.1)' : 'var(--surface-2)',
      color: on ? '#4338ca' : '#334155', cursor: 'pointer',
    }
  }

  const ratingTweetUrl =
    'https://twitter.com/intent/tweet?text=Just+rated+AssetForge+Labs+' +
    String(stars) +
    '%2F5+stars!+Best+digital+asset+packager+for+creators+%F0%9F%94%A5&url=https://assetforgelabs.com'

  return (
    <section style={{ padding: '80px 24px', maxWidth: '760px', margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '99px', padding: '6px 16px', fontSize: '13px', color: '#4338ca', marginBottom: '16px', fontWeight: '600' }}>
          🧠 Built with creators, for creators
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', color: 'var(--text)' }}>You Shape AssetForge Labs</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
          Every feature in this tool came from creator feedback. Tell us what you need — the best ideas get built next.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {[['247', 'Suggestions received'], ['38', 'Features shipped'], ['94%', 'Users feel heard']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginBottom: '2px' }}>{v}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden' }}>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '0 20px', gap: '4px' }}>
          <button style={tabSt(tab === 'suggest')} onClick={() => setTab('suggest')}>💡 Suggest</button>
          <button style={tabSt(tab === 'vote')}    onClick={() => setTab('vote')}>🗳️ Vote</button>
          <button style={tabSt(tab === 'rate')}    onClick={() => setTab('rate')}>⭐ Rate Us</button>
        </div>

        <div style={{ padding: '24px' }}>
          {tab === 'suggest' && sent && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--success)' }}>Thank you! We got your suggestion.</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>We read every submission and will notify you when your idea ships.</p>
              <button onClick={() => setSent(false)} style={{ padding: '10px 24px', background: 'none', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}>
                Submit another
              </button>
            </div>
          )}

          {tab === 'suggest' && !sent && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: '500' }}>How are you feeling about AssetForge Labs today?</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {MOODS.map((m) => (
                    <button key={m.emoji} onClick={() => setMood(m.emoji)} style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '99px',
                      border: mood === m.emoji ? '1px solid var(--primary)' : '1px solid var(--border)',
                      background: mood === m.emoji ? 'rgba(99,102,241,0.1)' : 'var(--surface-2)',
                      color: mood === m.emoji ? 'var(--primary)' : 'var(--text-muted)', fontSize: '13px', cursor: 'pointer',
                    }}>
                      <span style={{ fontSize: '18px' }}>{m.emoji}</span>{m.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {CATS.map((c) => (
                    <button key={c.value} onClick={() => setCat(c.value)} style={pillSt(cat === c.value)}>{c.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>Your suggestion *</label>
                <textarea
                  rows={4}
                  placeholder="e.g. It would be amazing if I could import files directly from Google Drive..."
                  value={text}
                  onChange={(e) => changeText(e.target.value)}
                  style={{ ...inputBase, resize: 'vertical' }}
                />
              </div>
              <button
                onClick={submit}
                disabled={sending}
                style={{ padding: '14px', background: sending ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', fontSize: '14px', fontWeight: '700', borderRadius: '10px', border: 'none', cursor: sending ? 'not-allowed' : 'pointer' }}
              >
                {sending ? '📨 Sending...' : '🚀 Submit Suggestion'}
              </button>
            </div>
          )}

          {tab === 'vote' && (
            <div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Vote on suggestions. Top-voted ideas get built next.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[...list].sort((a, b) => b.votes - a.votes).map((s) => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: s.voted ? 'rgba(99,102,241,0.06)' : 'var(--surface-2)', border: s.voted ? '1px solid rgba(99,102,241,0.2)' : '1px solid var(--border)', borderRadius: '12px' }}>
                    <button onClick={() => vote(s.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '8px 12px', minWidth: '52px', background: s.voted ? 'rgba(99,102,241,0.2)' : 'var(--surface)', border: s.voted ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border)', borderRadius: '10px', cursor: s.voted ? 'default' : 'pointer', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px' }}>{s.voted ? '✅' : '▲'}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: s.voted ? 'var(--primary)' : 'var(--text-muted)' }}>{s.votes}</span>
                    </button>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '500', lineHeight: '1.5', marginBottom: '4px' }}>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'rate' && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {!rated && (
                <div>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌟</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>How would you rate AssetForge Labs?</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => rate(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                        style={{ fontSize: '40px', background: 'none', border: 'none', cursor: 'pointer', filter: (hover || stars) >= n ? 'none' : 'grayscale(100%)', transform: (hover || stars) >= n ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.15s ease' }}>
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {rated && (
                <div>
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>{stars >= 4 ? '🤩' : '🙏'}</div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--success)' }}>Thanks for your rating!</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
