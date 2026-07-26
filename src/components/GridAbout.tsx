import React, { useEffect, useRef, useState } from 'react';
import { Users, Calendar, BookOpen, Network, Rocket } from 'lucide-react';

const stats = [
  { icon: <Users size={24} />, value: '2,000+', label: 'Community Members' },
  { icon: <Calendar size={24} />, value: '800+', label: 'Event Registrations' },
  { icon: <BookOpen size={24} />, value: 'AI · Web3 · Cyber', label: 'Expert-Led Sessions' },
  { icon: <Network size={24} />, value: 'Pan-India', label: 'College Reach' },
];

const GridAbout: React.FC = () => {
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
    <section id="grid-about" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #030712 0%, #060d1c 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(45,184,166,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">ABOUT US</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text-white)',
            lineHeight: 1,
            marginTop: 16,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            The <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GRID Community</span>
          </h2>
          <div className="ornament">
            <div className="ornament-line" />
            <div className="ornament-dot" />
            <div className="ornament-line" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          {/* Left — description */}
          <div style={{ animation: visible ? 'slideInLeft 0.8s ease forwards' : 'none' }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px', color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.9, marginBottom: 20,
            }}>
              In a short span, GRID Community has grown into a thriving ecosystem of passionate learners and innovators. With 2,000+ community members, 800+ registrations across online events from colleges throughout India, and expert-led sessions spanning AI/ML, Blockchain, Web Development, Cybersecurity, and emerging technologies — GRID continues to empower students through meaningful learning, collaboration, and innovation.
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px', color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.9, marginBottom: 32,
            }}>
              GRID Community is a student-led community of more than 2000 members dedicated to empowering students through collaboration, hands-on learning, and real-world opportunities. Our mission is to bridge the gap between academia and industry by organizing hackathons, workshops, bootcamps, webinars, networking events, and technical initiatives that inspire innovation, foster practical skills, and prepare students for future careers.
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '14px 24px',
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.25)',
              borderRadius: 100,
            }}>
              <Rocket size={18} color="var(--gold)" />
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '13px', color: 'var(--gold)',
                letterSpacing: '0.1em', fontWeight: 600,
              }}>STUDENT-LED · 2000+ MEMBERS</span>
            </div>
          </div>

          {/* Right — stat grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
            animation: visible ? 'slideInRight 0.8s ease forwards' : 'none',
          }}>
            {stats.map((s, i) => (
              <div key={i} className="glass-card" style={{
                padding: '32px 24px',
                transition: 'all 0.3s ease',
                animation: visible ? `fadeInUp 0.6s ease ${i * 100}ms both` : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '12px',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)', marginBottom: 20,
                  transition: 'all 0.3s ease',
                }}>{s.icon}</div>
                <div style={{
                  fontFamily: "'Pirata One', serif",
                  fontSize: '24px', color: 'var(--text-white)',
                  marginBottom: 8, lineHeight: 1.2,
                }}>{s.value}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px', color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #grid-about > div:last-child > div:nth-child(2) { grid-template-columns: 1fr !important; }
          #grid-about > div:last-child > div:nth-child(2) > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default GridAbout;
