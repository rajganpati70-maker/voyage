import React, { useEffect, useRef, useState } from 'react';

const contacts = [
  { name: 'Ganpati Raj', phone: '+91 9507542854', role: 'Organizing Team' },
  { name: 'Krishna Raj Barnwal', phone: '+91 7320000215', role: 'Organizing Team' },
  { name: 'Ritusree Chanda', phone: '+91 7362994375', role: 'Organizing Team' },
  { name: 'Aditya Gaurav', phone: '+91 70291 62093', role: 'Organizing Team' },
  { name: 'Neeraj Sahu', phone: '+91 9336345475', role: 'Organizing Team' },
  { name: 'Moumita Mandal', phone: '+91 9229726302', role: 'Organizing Team' },
  { name: 'Omkar Kumar', phone: '+91 9631922222', role: 'Organizing Team' },
  { name: 'Mayank Raj', phone: '+91 8969212216', role: 'Organizing Team' },
];

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ContactCard: React.FC<{ c: typeof contacts[0]; delay: number; visible: boolean }> = ({ c, delay, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card"
      style={{
        padding: '28px 24px',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)' : 'none',
        animation: visible ? `fadeInUp 0.6s ease ${delay}ms both` : 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '8px', letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
        marginBottom: 14, display: 'block',
      }}>{c.role}</span>

      <h3 style={{
        fontFamily: "'Pirata One', serif",
        fontSize: '20px', color: 'var(--text-white)',
        marginBottom: 18, lineHeight: 1.2,
      }}>{c.name}</h3>

      <a href={`tel:${c.phone.replace(/[-\s]/g, '')}`} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'var(--font-sans)', fontSize: '14px',
        color: hovered ? 'var(--text-white)' : 'rgba(255,255,255,0.6)',
        textDecoration: 'none', transition: 'color 0.2s',
      }}>
        <span style={{
          width: 34, height: 34, borderRadius: 10,
          background: hovered ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hovered ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
          flexShrink: 0, transition: 'all 0.25s',
        }}><PhoneIcon /></span>
        {c.phone}
      </a>
    </div>
  );
};

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #060d1c 0%, #030712 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="grid-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-label">CONTACTS</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            marginTop: 16,
            color: 'var(--text-white)',
            lineHeight: 1,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Connect <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>With Us</span>
          </h2>
          <div className="ornament">
            <div className="ornament-line" />
            <div className="ornament-dot" />
            <div className="ornament-line" />
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14, color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8, maxWidth: 560, margin: '0 auto',
            animation: visible ? 'fadeInUp 0.8s ease 0.15s both' : 'none',
          }}>
            Have questions about Voyage 2026? Reach out to our organizing team — we're here to help you set sail.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {contacts.map((c, i) => (
            <ContactCard key={i} c={c} delay={i * 80} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div:last-child > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          #contact > div:last-child > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
