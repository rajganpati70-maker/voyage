import { useEffect, useRef } from 'react'

function ContactCard({ name, role, phone }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div className="contact-card" ref={ref}>
      <span className="contact-badge">Contact Person</span>
      <div className="contact-name">{name}</div>
      <div className="contact-role">{role}</div>
      <a href={`tel:${phone.replace(/\s/g, '')}`} className="contact-row">
        <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16a2 2 0 0 1 .27.92z"/></svg>
        {phone}
      </a>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-inner">
        <div className="contact-head">
          <span className="s-label">Get In Touch</span>
          <h2 className="s-title">
            Connect <span className="pw">With Us</span>
          </h2>
        </div>
        <div className="contact-divider" />
        <p className="contact-sub">Have questions regarding Voyage 2026? Reach out to our organizing team through our official channels.</p>
        <div className="contact-grid">
          <ContactCard name="Ganpati Raj" role="Organizing Team, GRID Community" phone="+91 9507542854" />
          <ContactCard name="Krishna Raj Barnwal" role="Organizing Team, GRID Community" phone="+91 7362994375" />
        </div>
      </div>
    </section>
  )
}
