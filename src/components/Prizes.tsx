import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Shirt, Award, Gift, Sticker, Network, Users, MessageSquare } from 'lucide-react';

const prizes = [
  {
    rank: '1ST PRIZE',
    amount: '₹10,000',
    icon: <Trophy size={32} />,
    accent: 'linear-gradient(135deg, #ffe27a, #d4af37)',
    glow: 'rgba(255,226,122,0.5)',
    place: 'GOLD',
    height: 'auto',
  },
  {
    rank: '2ND PRIZE',
    amount: '₹7,000',
    icon: <Award size={32} />,
    accent: 'linear-gradient(135deg, #c0c0c0, #8a8a8a)',
    glow: 'rgba(192,192,192,0.4)',
    place: 'SILVER',
    height: 'auto',
  },
  {
    rank: '3RD PRIZE',
    amount: '₹5,000',
    icon: <Award size={32} />,
    accent: 'linear-gradient(135deg, #cd7f32, #8a4f15)',
    glow: 'rgba(205,127,50,0.4)',
    place: 'BRONZE',
    height: 'auto',
  },
];

const perks = [
  { icon: <Shirt size={20} />, label: 'Branded T-Shirts' },
  { icon: <Award size={20} />, label: 'Participation Certificates' },
  { icon: <Gift size={20} />, label: 'Participation Gifts' },
  { icon: <Sticker size={20} />, label: 'Exclusive Sticker Collection' },
  { icon: <Network size={20} />, label: 'Expand Your Professional Network' },
  { icon: <Users size={20} />, label: 'Mentorship Sessions' },
  { icon: <MessageSquare size={20} />, label: 'Interaction with Experts' },
];

const Prizes: React.FC = () => {
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
    <section id="prizes" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #060d1c 0%, #030712 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '5%', right: '5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">TREASURE COVE</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text-white)',
            lineHeight: 1,
            marginTop: 16,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Prizes & <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rewards</span>
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
            A total prize pool of <span style={{ color: 'var(--gold)', fontWeight: 600 }}>₹25,000</span> plus exclusive perks for every participant.
          </p>
        </div>

        {/* Prize podium */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 24,
          marginBottom: 60,
          alignItems: 'end',
        }}>
          {prizes.map((prize, i) => (
            <PrizeCard key={i} prize={prize} index={i} visible={visible} />
          ))}
        </div>

        {/* Perks */}
        <div className="glass-card" style={{
          padding: '48px 36px',
        }}>
          <p style={{
            fontFamily: "'Pirata One', serif",
            fontSize: '20px', color: 'var(--gold)',
            letterSpacing: '0.1em',
            textAlign: 'center', marginBottom: 36,
          }}>EVERYONE WINS</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}>
            {perks.map((perk, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                gap: 14,
                animation: visible ? `fadeInUp 0.6s ease ${i * 80}ms both` : 'none',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '14px',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212,175,55,0.2)';
                  e.currentTarget.style.transform = 'scale(1.12) rotate(-5deg)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                  e.currentTarget.style.transform = 'scale(1) rotate(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >{perk.icon}</div>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '13px', color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}>{perk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #prizes > div:last-child > div:nth-child(2) { grid-template-columns: 1fr !important; }
          #prizes > div:last-child > div:last-child > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

const PrizeCard: React.FC<{ prize: typeof prizes[0]; index: number; visible: boolean }> = ({ prize, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card"
      style={{
        padding: '44px 28px',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0)',
        boxShadow: hovered ? `0 28px 70px rgba(0,0,0,0.5), 0 0 50px ${prize.glow}` : 'none',
        animation: visible ? `fadeInUp 0.7s ease ${index * 150}ms both` : 'none',
        overflow: 'hidden',
        marginTop: index === 0 ? 0 : index === 1 ? 20 : 40,
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: prize.accent,
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.3s',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: -60, left: '50%',
        transform: 'translateX(-50%)',
        width: 200, height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${prize.glow} 0%, transparent 70%)`,
        opacity: hovered ? 0.6 : 0.2,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: hovered ? prize.accent : 'rgba(212,175,55,0.1)',
        border: `1px solid ${hovered ? 'transparent' : 'rgba(212,175,55,0.2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 28px',
        color: hovered ? '#000' : 'var(--gold)',
        transition: 'all 0.4s ease',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        boxShadow: hovered ? `0 0 30px ${prize.glow}` : 'none',
      }}>{prize.icon}</div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px', color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        marginBottom: 14,
      }}>{prize.rank}</p>

      <p style={{
        fontFamily: "'Pirata One', serif",
        fontSize: '32px',
        background: prize.accent,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 10,
        lineHeight: 1,
      }}>{prize.amount}</p>

      <p style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '11px', color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        fontWeight: 600,
      }}>{prize.place}</p>
    </div>
  );
};

export default Prizes;
