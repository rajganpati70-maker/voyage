import { useEffect, useRef } from 'react'

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [ref])
}

function StatCard({ icon, val, label }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-icon">
        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <div className="stat-val">{val}</div>
      <div className="stat-key">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid">
          {/* Left */}
          <div>
            <span className="s-label">About Voyage 2026</span>
            <h2 className="about-pixel-title">
              Sail Beyond Limits.<br />
              Build Beyond Horizons.
            </h2>
            <div className="about-body">
              <p>Voyage 2026 is GRID Community's flagship 36-hour national hackathon, organised in collaboration with Algorand, OSEN, and Mewayz Global Corporation.</p>
              <p>Over 36 hours, participants design, build, and deploy production-ready solutions solving real enterprise and social challenges using modern cloud infrastructure, AI models, and collaborative development tools.</p>
              <p>Whether you're passionate about AI, Blockchain, FinTech, Healthcare, or Open Innovation, Voyage provides the perfect environment to learn, experiment, and grow.</p>
            </div>
            <div className="about-divider" />
          </div>

          {/* Right – stat cards */}
          <div className="stat-cards">
            <StatCard
              icon='<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'
              val="36 Hrs"
              label="Build Duration"
            />
            <StatCard
              icon='<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
              val="160+"
              label="Participants"
            />
          </div>
        </div>

        <p className="about-quote">
          Building <span className="hl">enterprise-grade solutions</span> that create measurable real-world impact.
        </p>
      </div>
    </section>
  )
}
