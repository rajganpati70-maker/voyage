import { useState, useEffect, useRef } from 'react'

const faqs = [
  { q: 'Who can participate in Voyage 2026?', a: "The hackathon is open to all undergraduate and postgraduate students (1st Year – Final Year) from any college across India. You don't need prior hackathon experience — just a willingness to build." },
  { q: 'Do I need a team, and how big should it be?', a: 'Teams must have 3–4 members. Individual or 2-member registrations are not accepted. Each team must nominate one Team Leader as the primary point of contact.' },
  { q: 'Is there a registration fee?', a: 'Registration details including any fee information will be announced soon. Stay tuned to our official channels for updates.' },
  { q: 'Is the hackathon online or in-person?', a: 'Voyage 2026 is an in-person hackathon. The venue will be announced soon. Participants must attend physically for the 36-hour sprint on 26–27 September 2026. Bring your own laptop, charger, and power backup.' },
  { q: 'What should I bring to the Grand Finale?', a: 'Each participant must bring their own laptop, charger, and power backup. Wear your participant ID at all times inside the hackathon arena. Use only permitted resources and APIs in accordance with hackathon rules.' },
  { q: 'Will there be mentors available?', a: 'Yes! Multiple mentorship sessions are scheduled throughout the hackathon. Industry experts and domain specialists will be available to guide your team, review your approach, and help you build better solutions.' },
  { q: 'How will projects be judged?', a: 'Projects will be evaluated on Innovation & Creativity, Technical Complexity, Problem-Solution Fit, Scalability, and Presentation Quality. An eminent jury of Industry Leaders, Startup Founders, and domain experts will judge all finalists.' },
]

function FAQItem({ q, a, open, onToggle }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div className={`faq-item${open ? ' open' : ''}`} ref={ref}>
      <button className="faq-q" onClick={onToggle}>
        {q}
        <svg className="faq-chevron" viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section id="faq">
      <div className="section-inner">
        <div className="faq-head">
          <span className="s-label">Questions</span>
          <h2 className="s-title">
            Frequently <span className="px">Asked</span>
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
