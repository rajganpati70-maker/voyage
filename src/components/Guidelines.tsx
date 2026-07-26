import React, { useEffect, useRef, useState } from 'react';
import { Laptop, Lock, IdCard, BookOpen } from 'lucide-react';

const guidelines = [
  { icon: <Laptop size={22} />, text: 'Each participant must bring their own laptop, charger, and power backup.' },
  { icon: <Lock size={22} />, text: 'No one will be allowed to go out of the arena after registration until the conclusion of the hackathon.' },
  { icon: <IdCard size={22} />, text: 'Wear your participant ID at all times inside the hackathon arena.' },
  { icon: <BookOpen size={22} />, text: 'Use only permitted resources and APIs in accordance with the hackathon rules.' },
];

const captainLog = [
  { label: 'Registration starts', value: 'To Be Decided' },
  { label: 'Registration ends', value: 'To Be Decided' },
  { label: 'Hackathon starts', value: '26 September 2026' },
  { label: 'Hackathon ends', value: '27 September 2026' },
];

const Guidelines: React.FC = () => {
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
    <section id="guidelines" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #060d1c 0%, #030712 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">GENERAL GUIDELINES</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text-white)',
            lineHeight: 1,
            marginTop: 16,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Rules of the <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Voyage</span>
          </h2>
          <div className="ornament">
            <div className="ornament-line" />
            <div className="ornament-dot" />
            <div className="ornament-line" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Left — guidelines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {guidelines.map((g, i) => (
              <div key={i} className="glass-card" style={{
                display: 'flex', gap: 18, alignItems: 'flex-start',
                padding: '24px 26px',
                transition: 'all 0.3s ease',
                animation: visible ? `fadeInUp 0.6s ease ${i * 100}ms both` : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,175,55,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)', flexShrink: 0,
                }}>{g.icon}</div>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7, paddingTop: 10,
                }}>{g.text}</p>
              </div>
            ))}
          </div>

          {/* Right — Captain's Log */}
          <div className="glass-card" style={{
            padding: '40px 36px',
            animation: visible ? 'fadeInUp 0.8s ease 0.3s both' : 'none',
            position: 'relative',
          }}>
            {/* Decorative corner */}
            <div style={{
              position: 'absolute', top: 16, right: 16,
              width: 40, height: 40,
              borderTop: '2px solid var(--gold)',
              borderRight: '2px solid var(--gold)',
              borderRadius: '0 8px 0 0',
              opacity: 0.4,
            }} />
            <div style={{
              position: 'absolute', bottom: 16, left: 16,
              width: 40, height: 40,
              borderBottom: '2px solid var(--gold)',
              borderLeft: '2px solid var(--gold)',
              borderRadius: '0 0 0 8px',
              opacity: 0.4,
            }} />

            <p style={{
              fontFamily: "'Pirata One', serif",
              fontSize: '24px', color: 'var(--gold)',
              marginBottom: 32, letterSpacing: '0.05em',
              textAlign: 'center',
            }}>CAPTAIN'S LOG</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {captainLog.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingBottom: 16,
                  borderBottom: i < captainLog.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <span style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '13px', color: 'rgba(255,255,255,0.5)',
                    fontWeight: 500,
                  }}>{item.label}</span>
                  <span style={{
                    fontFamily: "'Pirata One', serif",
                    fontSize: '16px', color: 'var(--gold)',
                  }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #guidelines > div:last-child > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Guidelines;
