import { useEffect, useRef } from 'react'

function TrackCard({ icon, name, desc, num }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div className="track-card" ref={ref}>
      <div className="track-icon">
        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: icon }} />
      </div>
      <div className="track-name">{name}</div>
      <p className="track-desc">{desc}</p>
      <div className="track-num">{num}</div>
    </div>
  )
}

export default function Tracks() {
  return (
    <section id="tracks">
      <div className="section-inner">
        <div className="tracks-head">
          <span className="s-label">Innovation Domains</span>
          <h2 className="s-title">
            Choose Your <span className="px">Track</span>
          </h2>
          <p className="s-desc">Build enterprise-grade AI solutions with modern frameworks. Every track is designed around real industry challenges and cutting-edge technology.</p>
        </div>
        <div className="tracks-grid">
          <TrackCard
            icon='<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
            name="AI For Business Transformation"
            desc="Integrate cognitive systems, intelligent predictive analytics, and automated decision-making engines to redefine corporate strategy, operations, and business models."
            num="Track 01"
          />
          <TrackCard
            icon='<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'
            name="AI For Sustainable and Social Impact"
            desc="Build accessible, ethical, and impact-driven AI technologies targeting climate action, environmental sustainability, healthcare, and digital empowerment."
            num="Track 02"
          />
          <TrackCard
            icon='<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
            name="Open Innovation with AI"
            desc="Unleash creativity with unrestricted development: explore cutting-edge concepts, multi-agent frameworks, and general AI capabilities addressing complex challenges."
            num="Track 03"
          />
        </div>
      </div>
    </section>
  )
}
