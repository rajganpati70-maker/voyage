import React, { useEffect, useRef, useState } from 'react';
import { Brain, Shield, Anchor, Heart, Coins, Compass } from 'lucide-react';

const tracks = [
  {
    id: 1,
    number: '01',
    icon: <Brain size={26} />,
    title: "Devil's Triangle",
    subtitle: 'AI / Machine Learning',
    description: 'Harness the power of AI and Machine Learning to conquer the unknown.',
    tags: ['LLMs', 'RAG', 'Agents', 'ML'],
    accent: '#d4af37',
    glow: 'rgba(212,175,55,0.4)',
  },
  {
    id: 2,
    number: '02',
    icon: <Anchor size={26} />,
    title: 'Tortuga Market',
    subtitle: 'Blockchain / Web3',
    description: 'Navigate the future with Blockchain and decentralized technologies.',
    tags: ['Smart Contracts', 'DeFi', 'dApps', 'Web3'],
    accent: '#4a90d9',
    glow: 'rgba(74,144,217,0.4)',
  },
  {
    id: 3,
    number: '03',
    icon: <Coins size={26} />,
    title: "Dead Men's Ledger",
    subtitle: 'FinTech',
    description: 'Redefine the world of Financial Technology through secure, scalable innovation.',
    tags: ['Payments', 'Banking', 'Fraud', 'Trading'],
    accent: '#50c88c',
    glow: 'rgba(80,200,140,0.4)',
  },
  {
    id: 4,
    number: '04',
    icon: <Heart size={26} />,
    title: 'Fountain of Youth',
    subtitle: 'Healthcare',
    description: 'Leverage technology to build smarter, more accessible Healthcare solutions.',
    tags: ['MedTech', 'Diagnostics', 'Telehealth', 'AI Health'],
    accent: '#dc648c',
    glow: 'rgba(220,100,140,0.4)',
  },
  {
    id: 5,
    number: '05',
    icon: <Shield size={26} />,
    title: "Davy Jones' Vault",
    subtitle: 'Cybersecurity',
    description: 'Build innovative solutions to secure the digital world against evolving cyber threats.',
    tags: ['AppSec', 'Crypto', 'Network', 'Forensics'],
    accent: '#a064dc',
    glow: 'rgba(160,100,220,0.4)',
  },
  {
    id: 6,
    number: '06',
    icon: <Compass size={26} />,
    title: 'Shipwreck Cove',
    subtitle: 'Open Innovation',
    description: 'Explore limitless possibilities and bring bold ideas to life across any domain.',
    tags: ['Any Domain', 'Creative', 'Bold Ideas'],
    accent: '#2db8a6',
    glow: 'rgba(45,184,166,0.4)',
  },
];

const Tracks: React.FC = () => {
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
    <section id="tracks" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #060d1c 0%, #030712 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '5%', left: '0', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">VOYAGE ARENA</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text-white)',
            lineHeight: 1,
            marginTop: 16,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Choose Your <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Domain</span>
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
            maxWidth: 540,
            margin: '0 auto',
            lineHeight: 1.8,
          }}>
            Six treasure-hunt themed tracks designed to challenge and inspire. Pick the one that aligns with your expertise and set sail.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {tracks.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #tracks > div:last-child > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #tracks > div:last-child > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const TrackCard: React.FC<{ track: typeof tracks[0]; index: number; visible: boolean }> = ({ track, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card"
      style={{
        padding: '36px 28px',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${track.glow}` : 'none',
        animation: visible ? `fadeInUp 0.7s ease ${index * 100}ms both` : 'none',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 150, height: 150,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${track.glow} 0%, transparent 70%)`,
        opacity: hovered ? 0.6 : 0.2,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 20, right: 28,
        fontFamily: "'Pirata One', serif",
        fontSize: '52px',
        color: 'rgba(255,255,255,0.04)',
        lineHeight: 1, pointerEvents: 'none',
      }}>{track.number}</div>

      <div style={{
        width: 56, height: 56, borderRadius: '14px',
        background: `linear-gradient(135deg, ${track.glow}, transparent)`,
        border: `1px solid ${track.accent}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: track.accent,
        marginBottom: 24,
        transition: 'all 0.4s ease',
        transform: hovered ? 'scale(1.15) rotate(-8deg)' : 'scale(1) rotate(0)',
        boxShadow: hovered ? `0 0 20px ${track.glow}` : 'none',
      }}>{track.icon}</div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px', color: track.accent,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        marginBottom: 10,
      }}>{track.subtitle}</div>

      <h3 style={{
        fontFamily: "'Pirata One', serif",
        fontSize: '26px', color: 'var(--text-white)',
        marginBottom: 16, lineHeight: 1.2,
      }}>{track.title}</h3>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px', color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.8, marginBottom: 24,
      }}>{track.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {track.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px', color: 'rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${track.accent}30`,
            padding: '5px 12px', borderRadius: '6px',
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
