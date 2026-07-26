import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Users, MapPin, Trophy } from 'lucide-react';

const useCountUp = (target: number, duration = 2000, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hours = useCountUp(36, 1800, visible);
  const members = useCountUp(2000, 2200, visible);
  const registrations = useCountUp(800, 2000, visible);

  return (
    <section id="about" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #030712 0%, #060d1c 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="grid-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-label">ABOUT VOYAGE</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: "'Pirata One', serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: 'var(--text-white)',
              lineHeight: 1,
              marginBottom: 8,
              animation: visible ? 'slideInLeft 0.8s ease forwards' : 'none',
            }}>
              Beyond the
            </h2>
            <h2 style={{
              fontFamily: "'Pirata One', serif",
              fontSize: 'clamp(48px, 7vw, 88px)',
              background: 'linear-gradient(180deg, #ffe27a, #d4af37, #8a6f30)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: 36,
              textShadow: '0 0 60px rgba(212,175,55,0.2)',
              animation: visible ? 'slideInLeft 0.8s ease 0.1s forwards' : 'none',
              opacity: 0,
            }}>
              Horizon
            </h2>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.9,
              marginBottom: 20,
            }}>
              Voyage – Beyond the Horizon is a premier 36-hour innovation challenge that brings together students, developers, designers, and innovators to solve real-world problems through technology.
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.9,
              marginBottom: 20,
            }}>
              Over 36 hours of continuous brainstorming, collaboration, and technical creativity, participants will transform ideas into impactful solutions while pushing the boundaries of innovation.
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.9,
              marginBottom: 36,
            }}>
              Whether you're passionate about AI, Blockchain, FinTech, Healthcare, or Open Innovation, Voyage provides the perfect environment to learn, experiment, and grow. Collaborate with like-minded innovators, receive mentorship from industry experts, and gain hands-on experience building solutions under pressure.
            </p>

            {/* Ornament divider */}
            <div className="ornament">
              <div className="ornament-line" />
              <div className="ornament-dot" />
              <div className="ornament-line" />
            </div>
          </div>

          {/* Right — stat cards */}
          <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <StatCard icon={<Calendar size={22} color="var(--gold)" />} value={`${hours} Hrs`} label="Build Duration" visible={visible} delay={0} />
              <StatCard icon={<Users size={22} color="var(--gold)" />} value={`${members}+`} label="GRID Members" visible={visible} delay={200} />
              <StatCard icon={<Trophy size={22} color="var(--gold)" />} value="₹25K" label="Prize Pool" visible={visible} delay={400} />
              <StatCard icon={<MapPin size={22} color="var(--gold)" />} value="TBD" label="Hosted At" visible={visible} delay={600} />
            </div>
          </div>
        </div>

        {/* Quote */}
        <div style={{
          marginTop: 80,
          textAlign: 'center',
          animation: visible ? 'fadeInUp 1s ease 0.5s both' : 'none',
        }}>
          <p style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.4,
            letterSpacing: '0.05em',
          }}>
            <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EXPLORE.</span>{' '}
            <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>INNOVATE.</span>{' '}
            <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TRANSFORM.</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          #about > div:last-child > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  visible: boolean;
  delay: number;
}> = ({ icon, value, label, visible, delay }) => {
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
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.2)' : 'none',
        animation: visible ? `fadeInUp 0.7s ease ${delay}ms both` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 48, height: 48,
        borderRadius: '12px',
        background: 'rgba(212,175,55,0.1)',
        border: '1px solid rgba(212,175,55,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)',
      }}>{icon}</div>
      <div style={{
        fontFamily: "'Pirata One', serif",
        fontSize: '28px',
        background: 'linear-gradient(180deg, #ffe27a, #d4af37)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 8,
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
};

export default About;
