import React from 'react';

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const InstaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navItems = [
  { label: 'About Voyage', id: 'about' },
  { label: 'Voyage Arena', id: 'tracks' },
  { label: "Captain's Log", id: 'timeline' },
  { label: 'Treasure Cove', id: 'prizes' },
  { label: 'Our Sponsors', id: 'sponsors' },
  { label: 'Guidelines', id: 'guidelines' },
  { label: 'FAQs', id: 'faq' },
];

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const linkStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: "'Cinzel', serif",
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none', border: 'none', padding: 0,
    textAlign: 'left' as const,
    transition: 'color 0.2s',
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #030712 0%, #020509 100%)',
      borderTop: '1px solid rgba(212,175,55,0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top decorative wave */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 40, opacity: 0.5 }}>
        <path d="M0,30 C360,50 720,10 1080,30 C1260,40 1380,20 1440,30 L1440,0 L0,0 Z" fill="rgba(212,175,55,0.04)" />
      </svg>

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '80px 48px 48px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '48px 64px',
        position: 'relative', zIndex: 1,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3" />
              <line x1="12" y1="22" x2="12" y2="8" />
              <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
            </svg>
            <p style={{
              fontFamily: "'Pirata One', serif",
              fontSize: '28px',
              background: 'linear-gradient(180deg, #ffe27a, #d4af37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em',
            }}>Voyage 2026</p>
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.9, maxWidth: 340, marginBottom: 20,
          }}>
            A 36-hour national hackathon by GRID Community. Sail beyond limits, build beyond horizons.
          </p>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '12px', color: 'var(--gold)',
            letterSpacing: '0.15em', fontWeight: 600,
          }}>26 | 27 SEPTEMBER 2026</p>
        </div>

        {/* Navigation */}
        <div>
          <p style={{
            fontFamily: "'Pirata One', serif",
            fontSize: '16px', color: 'var(--gold)',
            marginBottom: 24, letterSpacing: '0.05em',
          }}>NAVIGATION</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {navItems.map(item => (
              <li key={item.id}>
                <button onClick={() => scrollTo(item.id)} style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-white)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >{item.label}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p style={{
            fontFamily: "'Pirata One', serif",
            fontSize: '16px', color: 'var(--gold)',
            marginBottom: 24, letterSpacing: '0.05em',
          }}>CONNECT</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <li>
              <a href="mailto:gridcommunity@example.com" target="_blank" rel="noreferrer" style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              ><MailIcon /> gridcommunity@example.com</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              ><InstaIcon /> Instagram Page →</a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              ><LinkedinIcon /> LinkedIn Profile →</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        padding: '24px',
        fontFamily: "'Cinzel', serif",
        fontSize: '12px', color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.1em',
      }}>
        © 2026 GRID Community · All rights reserved
      </div>

      <style>{`
        @media (max-width: 800px) {
          footer > div:first-of-type { grid-template-columns: 1fr 1fr !important; }
          footer > div:first-of-type > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 500px) {
          footer > div:first-of-type { grid-template-columns: 1fr !important; padding: 48px 24px 32px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
