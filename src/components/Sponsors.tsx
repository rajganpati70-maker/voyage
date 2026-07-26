import React, { useEffect, useRef, useState } from 'react';

const sponsors = [
  {
    name: 'Algorand',
    tagline: 'Leading Layer-1 Blockchain for the Future of Web3',
    description: 'A high-performance Layer-1 blockchain platform designed for speed, security, and scalability. It enables developers to build decentralized applications, digital assets, and enterprise-grade blockchain solutions with near-instant finality and low transaction costs. Its energy-efficient Pure Proof-of-Stake consensus makes it a sustainable choice for the next generation of Web3 innovation.',
    category: 'BLOCKCHAIN PARTNER',
    accent: '#4a90d9',
    glow: 'rgba(74,144,217,0.3)',
  },
  {
    name: 'OSEN',
    tagline: 'Empowering Hackathons & Developer Communities Across India',
    description: 'A technology-driven organization that supports hackathons, workshops, and developer communities by providing sponsorships, mentorship, speakers, swags, and community growth opportunities. It collaborates with colleges, student communities, and ecosystem partners to help aspiring builders transform innovative ideas into impactful projects.',
    category: 'COMMUNITY PARTNER',
    accent: '#d4af37',
    glow: 'rgba(212,175,55,0.3)',
  },
  {
    name: 'Mewayz Global Corporation',
    tagline: 'AI-Powered Business Operating Platform for the Next Generation of Startups',
    description: 'A part of Orcrys Technologies, Mewayz is an AI-powered Business Operating Platform helping startups, creators, and enterprises scale through intelligent automation. With engineering and AI product teams in Kolkata, Mewayz develops advanced AI orchestration, Web3 solutions, CRM systems, website builders, payment management, and marketing tools within a unified platform. The company also collaborates with leading academic institutions to foster innovation, entrepreneurship, and startup development.',
    category: 'AI & TECH PARTNER',
    accent: '#2db8a6',
    glow: 'rgba(45,184,166,0.3)',
  },
];

const Sponsors: React.FC = () => {
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
    <section id="sponsors" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #030712 0%, #060d1c 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="grid-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">OUR SPONSORS</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: 'var(--text-white)',
            lineHeight: 1,
            marginTop: 16,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Backed by the <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Best</span>
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
            Industry leaders powering Voyage 2026 with technology, mentorship, and resources.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sponsors.map((s, i) => (
            <SponsorCard key={i} sponsor={s} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SponsorCard: React.FC<{ sponsor: typeof sponsors[0]; index: number; visible: boolean }> = ({ sponsor, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card"
      style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 0,
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${sponsor.glow}` : 'none',
        animation: visible ? `fadeInUp 0.7s ease ${index * 120}ms both` : 'none',
      }}
    >
      {/* Left — logo area */}
      <div style={{
        background: `linear-gradient(135deg, ${sponsor.glow}, transparent)`,
        borderRight: `1px solid ${sponsor.accent}30`,
        padding: '44px 36px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 120, height: 120, borderRadius: '50%',
          background: `radial-gradient(circle, ${sponsor.glow} 0%, transparent 70%)`,
          opacity: hovered ? 0.6 : 0.2,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px', color: sponsor.accent,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: 18,
          position: 'relative', zIndex: 1,
        }}>{sponsor.category}</span>
        <h3 style={{
          fontFamily: "'Pirata One', serif",
          fontSize: '28px', color: 'var(--text-white)',
          lineHeight: 1.2, marginBottom: 16,
          position: 'relative', zIndex: 1,
          textShadow: hovered ? `0 0 20px ${sponsor.glow}` : 'none',
          transition: 'text-shadow 0.3s',
        }}>{sponsor.name}</h3>
        <div style={{
          width: 48, height: 3,
          background: sponsor.accent,
          borderRadius: 2,
          boxShadow: `0 0 10px ${sponsor.glow}`,
        }} />
      </div>

      {/* Right — description */}
      <div style={{ padding: '40px 40px' }}>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '16px', color: 'rgba(255,255,255,0.85)',
          fontWeight: 500, lineHeight: 1.5,
          marginBottom: 16,
        }}>{sponsor.tagline}</p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px', color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.9,
        }}>{sponsor.description}</p>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .sponsor-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Sponsors;
