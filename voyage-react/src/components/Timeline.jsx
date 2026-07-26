import { useEffect, useRef } from 'react'

function TLCard({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div className="tl-card" ref={ref}>{children}</div>
}

const phases = [
  {
    phase: 'Phase 1', date: 'Opens: TBD', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
    dateTag: 'OPENS: TBD',
    title: 'REGISTRATION',
    desc: 'Students register individually or as teams through the official hackathon portal to lock in their participation.'
  },
  {
    phase: 'Phase 2', date: 'TBD', icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    dateTag: 'TBD',
    title: 'IDEA SUBMISSION & VIRTUAL EVALUATION',
    desc: 'Teams submit a comprehensive proposal covering: Problem Statement, Proposed Solution, Innovation Approach, Technology Stack, Expected Impact, Architecture (optional), Pitch Deck (optional), and a Video Pitch (optional). A panel of industry experts and academic reviewers will evaluate all submissions. Evaluation focuses on innovation, relevance, technical feasibility, scalability, and potential impact. High-scoring teams advance.'
  },
  {
    phase: 'Phase 3', date: '26 Aug – 27 Sept', icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    dateTag: '26 SEPT – 27 SEPT',
    title: 'GRAND PROTOTYPE CHALLENGE',
    desc: 'Selected finalists participate in a high-intensity 36-hour innovation sprint hosted at the venue. Teams build functional prototypes, validate solutions, refine user experience, receive continuous mentorship, and prepare technical demonstrations under real-world development timelines.'
  },
  {
    phase: 'Grand Finale', date: '27 Sept 2026', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    dateTag: '27 SEPTEMBER 2026',
    title: 'JURY PRESENTATION & SHOWCASE',
    desc: 'Finalist teams present live prototype demonstrations, technical architecture, and business models before an eminent jury of IBM Experts, Industry Leaders, Startup Founders, and Venture Ecosystem Representatives.'
  },
  {
    phase: 'Valedictory', date: '27 Sept 2026', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    dateTag: '27 SEPT 2026 | 12:00 PM',
    title: 'PRIZE DISTRIBUTION & CLOSING',
    desc: 'The national challenge concludes with winner announcements, cash prize distribution, certificates, jury remarks, and an exclusive networking session.'
  },
]

export default function Timeline() {
  return (
    <section id="timeline">
      <div className="section-inner">
        <div className="timeline-head">
          <span className="s-label">Event Timeline</span>
          <h2 className="s-title">
            Hackathon <span className="px">Roadmap</span>
          </h2>
          <p className="s-desc">Follow the journey from registration to the grand finale and valedictory.</p>
        </div>

        <div className="tl-wrap">
          <div className="tl-line" />
          {phases.map((p, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-left">
                <div className="tl-phase">{p.phase}</div>
                <div className="tl-date">{p.date}</div>
              </div>
              <div className="tl-node">
                <div className="tl-dot">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: p.icon }} />
                </div>
              </div>
              <TLCard>
                <div className="tl-date-tag">{p.dateTag}</div>
                <div className="tl-title">{p.title}</div>
                <p className="tl-desc">{p.desc}</p>
              </TLCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
