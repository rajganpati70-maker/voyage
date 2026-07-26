import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Who can participate in Voyage 2026?',
    a: 'Voyage is open to all undergraduate students (1st Year - 4th Year). You don\'t need prior hackathon experience — just a willingness to build and explore beyond the horizon.',
  },
  {
    q: 'Do I need a team, and how big should it be?',
    a: 'You can participate as a team of 3-4 students. We encourage team participation to bring diverse skill sets together. Team matching sessions may also be hosted before the event.',
  },
  {
    q: 'Is there a registration fee?',
    a: 'No, Voyage is completely free to participate in. There are no hidden charges. Just register, show up, and be ready to build.',
  },
  {
    q: 'Is the hackathon online or in-person?',
    a: 'Voyage is a 36-hour in-person hackathon. The exact venue will be announced closer to the event. Participants are expected to stay in the arena for the full duration.',
  },
  {
    q: 'What should I bring to the hackathon?',
    a: 'Each participant must bring their own laptop, charger, and power backup. You must also wear your participant ID at all times inside the hackathon arena. Food, refreshments, and workspace will be provided.',
  },
  {
    q: 'Will there be mentors available?',
    a: 'Yes! Industry professionals from our partner organizations — Algorand, OSEN, and Mewayz Global Corporation — will be available throughout the hackathon for guidance and mentorship sessions.',
  },
  {
    q: 'How will projects be judged?',
    a: 'Projects will be evaluated on innovation, technical depth, business impact, presentation quality, and feasibility. A panel of expert judges will assess the final submissions during the judges round.',
  },
  {
    q: 'What are the tracks available?',
    a: 'Voyage features six themed tracks: Devil\'s Triangle (AI/ML), Tortuga Market (Blockchain/Web3), Dead Men\'s Ledger (FinTech), Fountain of Youth (Healthcare), Davy Jones\' Vault (Cybersecurity), and Shipwreck Cove (Open Innovation).',
  },
];

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #060d1c 0%, #030712 100%)',
      padding: '120px 48px',
      position: 'relative',
    }}>
      <div className="grid-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-label">QUESTIONS</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            marginTop: 16,
            color: 'var(--text-white)',
            lineHeight: 1,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Frequently <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Asked</span>
          </h2>
          <div className="ornament">
            <div className="ornament-line" />
            <div className="ornament-dot" />
            <div className="ornament-line" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
}> = ({ faq, isOpen, onToggle, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card"
      style={{
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: isOpen ? '0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,175,55,0.2)' : 'none',
        animation: visible ? `fadeInUp 0.6s ease ${index * 70}ms both` : 'none',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 30px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '16px',
          fontWeight: isOpen ? 600 : 500,
          color: isOpen ? 'var(--text-white)' : 'rgba(255,255,255,0.75)',
          lineHeight: 1.5,
          transition: 'color 0.2s',
        }}>{faq.q}</span>
        <span style={{
          flexShrink: 0,
          width: 36, height: 36, borderRadius: '50%',
          background: isOpen ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isOpen ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOpen ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
        }}>
          <ChevronDown size={18} />
        </span>
      </button>

      <div style={{
        maxHeight: isOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{
          padding: '0 30px 28px',
          borderTop: '1px solid rgba(212,175,55,0.1)',
          paddingTop: 22,
          marginLeft: 30,
          borderLeft: '2px solid rgba(212,175,55,0.2)',
          paddingLeft: 24,
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.9,
          }}>{faq.a}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
