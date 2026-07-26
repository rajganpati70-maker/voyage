export default function Glimpses() {
  const items = [
    { bg: 'linear-gradient(135deg,#0d2e28,#091a30)', emoji: '⛵', label: 'VOYAGE 2026', sub: 'First Edition — Coming Sep 2026' },
    { bg: 'linear-gradient(135deg,#1a2e0d,#091a30)', emoji: '🏆', label: 'GRID HACKATHON', sub: 'Workshop Series' },
    { bg: 'linear-gradient(135deg,#1a1a0d,#091a30)', emoji: '💡', label: 'BOOTCAMPS', sub: 'AI/ML & Blockchain' },
    { bg: 'linear-gradient(135deg,#2e0d1a,#091a30)', emoji: '🌐', label: 'WEBINARS', sub: 'Expert-Led Sessions' },
    { bg: 'linear-gradient(135deg,#0d1a2e,#1a0d2e)', emoji: '🤝', label: 'NETWORKING', sub: 'Industry Connect' },
  ]

  return (
    <section id="glimpses">
      <div className="glimpses-head">
        <span className="s-label" style={{ display: 'block', textAlign: 'center', marginBottom: 16 }}>Past Memories</span>
        <h2 className="s-title" style={{ textAlign: 'center', marginBottom: 0 }}>
          Glimpses From{' '}
          <span className="px">GRID Events</span>
        </h2>
      </div>
      <div className="gallery-track">
        {items.map((item, i) => (
          <div key={i} className="gallery-item" style={{ background: item.bg }}>
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{item.emoji}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--teal)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
