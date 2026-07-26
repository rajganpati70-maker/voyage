import React, { useEffect, useRef, useState } from 'react';
import { Sunrise, Sun, Sunset, Moon, Utensils, Gamepad2, Users, Gavel, Flag } from 'lucide-react';

const schedule = [
  { time: 'Day 1', title: 'Orientation', icon: <Flag size={18} />, phase: 'start' },
  { time: 'Day 1', title: 'Hackathon Start', icon: <Sunrise size={18} />, phase: 'start' },
  { time: 'Day 1', title: 'Morning Session - 1', icon: <Sun size={18} />, phase: 'build' },
  { time: 'Day 1', title: 'Lunch', icon: <Utensils size={18} />, phase: 'break' },
  { time: 'Day 1', title: 'Evening Snacks - 1', icon: <Utensils size={18} />, phase: 'break' },
  { time: 'Day 1', title: 'Leisure Game - 1', icon: <Gamepad2 size={18} />, phase: 'fun' },
  { time: 'Day 1', title: 'Dinner', icon: <Utensils size={18} />, phase: 'break' },
  { time: 'Day 1', title: 'Mentoring Session - 2', icon: <Users size={18} />, phase: 'mentor' },
  { time: 'Day 1', title: 'Leisure Game - 2', icon: <Gamepad2 size={18} />, phase: 'fun' },
  { time: 'Day 2', title: 'Mentoring Session - 3', icon: <Users size={18} />, phase: 'mentor' },
  { time: 'Day 2', title: 'Judges Round + Submission Window Live', icon: <Gavel size={18} />, phase: 'judge' },
  { time: 'Day 2', title: 'Breakfast', icon: <Utensils size={18} />, phase: 'break' },
  { time: 'Day 2', title: 'Lunch', icon: <Utensils size={18} />, phase: 'break' },
  { time: 'Day 2', title: 'Closing Ceremony', icon: <Flag size={18} />, phase: 'end' },
  { time: 'Day 2', title: 'Hackathon Ends', icon: <Sunset size={18} />, phase: 'end' },
];

const phaseColors: Record<string, string> = {
  start: '#d4af37',
  build: '#2db8a6',
  break: '#8da5c4',
  fun: '#dc648c',
  mentor: '#4a90d9',
  judge: '#d4af37',
  end: '#d4af37',
};

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #030712 0%, #060d1c 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="grid-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">CAPTAIN'S LOG</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text-white)',
            lineHeight: 1,
            marginTop: 16,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            The 36-Hour <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Journey</span>
          </h2>
          <div className="ornament">
            <div className="ornament-line" />
            <div className="ornament-dot" />
            <div className="ornament-line" />
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.8,
          }}>
            From orientation to closing ceremony — here's how your 36 hours will unfold.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 0 }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.4) 8%, rgba(212,175,55,0.4) 92%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {schedule.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} style={{
                position: 'relative',
                display: 'flex',
                justifyContent: isLeft ? 'flex-end' : 'flex-start',
                marginBottom: 28,
                paddingRight: isLeft ? 'calc(50% + 40px)' : 0,
                paddingLeft: isLeft ? 0 : 'calc(50% + 40px)',
                animation: visible ? `fadeInUp 0.6s ease ${i * 60}ms both` : 'none',
              }}>
                {/* Node */}
                <div style={{
                  position: 'absolute',
                  left: '50%', top: 14,
                  width: 16, height: 16,
                  borderRadius: '50%',
                  background: phaseColors[item.phase],
                  border: '3px solid #030712',
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 16px ${phaseColors[item.phase]}`,
                  zIndex: 2,
                  animation: visible ? `glow-pulse 2s ease ${i * 60}ms infinite` : 'none',
                }} />

                <div
                  className="glass-card"
                  style={{
                    padding: '20px 24px',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px ${phaseColors[item.phase]}40`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: `${phaseColors[item.phase]}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: phaseColors[item.phase],
                    }}>{item.icon}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px', color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>{item.time}</span>
                  </div>
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '15px', color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500, lineHeight: 1.4,
                  }}>{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #timeline > div:last-child > div:nth-child(3) { left: 0 !important; transform: none !important; }
          #timeline > div:last-child > div:nth-child(3) > div { left: 8px !important; }
          #timeline > div:last-child > div[style*="justify-content"] {
            justify-content: flex-start !important;
            padding-right: 0 !important;
            padding-left: 44px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;
