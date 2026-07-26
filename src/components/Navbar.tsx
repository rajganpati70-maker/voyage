import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = ['ABOUT', 'TRACKS', 'TIMELINE', 'PRIZES', 'SPONSORS', 'FAQ', 'CONTACT'];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 24px',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1140px',
          background: scrolled ? 'rgba(3,7,18,0.92)' : 'rgba(3,7,18,0.6)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${scrolled ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.15)'}`,
          borderRadius: '14px',
          padding: '14px 32px',
          boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1)' : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.4s ease',
          position: 'relative',
        }}>
          {/* Corner ornaments */}
          {['', ''].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              [i === 0 ? 'top' : 'bottom']: -1,
              [i === 0 ? 'left' : 'right']: -1,
              width: 12, height: 12,
              borderTop: i === 0 ? '2px solid var(--gold)' : 'none',
              borderBottom: i === 1 ? '2px solid var(--gold)' : 'none',
              borderLeft: i === 0 ? '2px solid var(--gold)' : 'none',
              borderRight: i === 1 ? '2px solid var(--gold)' : 'none',
              borderRadius: 2,
            } as React.CSSProperties} />
          ))}

          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Anchor icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3" />
              <line x1="12" y1="22" x2="12" y2="8" />
              <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
            </svg>
            <span style={{
              fontFamily: "'Pirata One', serif",
              fontSize: '22px',
              color: 'var(--gold)',
              letterSpacing: '0.05em',
              textShadow: '0 0 20px rgba(212,175,55,0.4)',
            }}>Voyage</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.15em',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 4,
              padding: '2px 6px',
            }}>2026</span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  padding: '4px 0',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--gold)';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(212,175,55,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => scrollTo('register')}
              style={{
                background: 'linear-gradient(135deg, #d4af37, #8a6f30)',
                border: 'none',
                color: '#000',
                fontFamily: "'Cinzel', serif",
                fontSize: '12px',
                letterSpacing: '0.1em',
                fontWeight: 700,
                padding: '11px 22px',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,175,55,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.3)';
              }}
            >
              SET SAIL →
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px', left: '16px', right: '16px',
          zIndex: 999,
          background: 'rgba(3,7,18,0.98)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '14px',
          padding: '24px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}>
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                display: 'block',
                width: '100%',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: "'Cinzel', serif",
                fontSize: '13px',
                letterSpacing: '0.15em',
                padding: '16px 0',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
