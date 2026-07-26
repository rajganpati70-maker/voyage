import { useEffect, useRef } from 'react'

function SponsorCard({ logoColor, logoText, name, desc, tags }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div className="sponsor-card" ref={ref}>
      <div className="sponsor-logo-box">
        <div className="sponsor-logo-txt" style={{ color: logoColor }}>{logoText}</div>
      </div>
      <div>
        <div className="sponsor-name">{name}</div>
        <p className="sponsor-desc">{desc}</p>
        <div className="sponsor-tags">{tags.map(t => <span key={t} className="s-tag">{t}</span>)}</div>
      </div>
    </div>
  )
}

export default function Sponsors() {
  return (
    <section id="sponsors">
      <div className="section-inner">
        <div className="sponsors-head">
          <span className="s-label">Backed By</span>
          <h2 className="s-title">
            Sponsors &amp; <span className="px">Partners</span>
          </h2>
          <p className="s-desc">Partnering with world-leading technology organizations and social impact initiatives to empower student innovation.</p>
        </div>
        <div className="sponsor-list">
          <SponsorCard
            logoColor="var(--teal)" logoText="Algorand"
            name="Algorand"
            desc="Algorand is a high-performance Layer-1 blockchain platform designed for speed, security, and scalability. It enables developers to build decentralized applications, digital assets, and enterprise-grade blockchain solutions with near-instant finality and low transaction costs. Its energy-efficient Pure Proof-of-Stake consensus makes it a sustainable choice for the next generation of Web3 innovation."
            tags={['#Algorand', '#Blockchain', '#Web3']}
          />
          <SponsorCard
            logoColor="var(--gold)" logoText="OSEN"
            name="OSEN"
            desc="OSEN is a technology-driven organization that supports hackathons, workshops, and developer communities by providing sponsorships, mentorship, speakers, swags, and community growth opportunities. It collaborates with colleges, student communities, and ecosystem partners to help aspiring builders transform innovative ideas into impactful projects."
            tags={['#OSEN', '#Community', '#Mentorship']}
          />
          <SponsorCard
            logoColor="var(--text2)" logoText="Mewayz"
            name="Mewayz Global Corporation"
            desc="Mewayz Global Corporation, a part of Orcrys Technologies, is an AI-powered Business Operating Platform helping startups, creators, and enterprises scale through intelligent automation. With engineering and AI product teams in Kolkata, Mewayz develops advanced AI orchestration, Web3 solutions, CRM systems, website builders, payment management, and marketing tools within a unified platform."
            tags={['#Mewayz', '#AI', '#Startup']}
          />
        </div>
      </div>
    </section>
  )
}
