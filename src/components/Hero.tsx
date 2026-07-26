import React, { useEffect, useRef, useState } from 'react';

// Animated starfield + embers
const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      a: Math.random() * 0.6 + 0.2,
      tw: Math.random() * 0.015 + 0.003,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    const embers = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      r: Math.random() * 2 + 0.5,
      vy: -(Math.random() * 0.5 + 0.2),
      vx: (Math.random() - 0.5) * 0.3,
      a: 0,
      life: Math.random() * 300 + 200,
      age: 0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach(s => {
        s.a += s.tw * s.dir;
        if (s.a > 0.9 || s.a < 0.1) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,208,111,${s.a})`;
        ctx.fill();
      });

      // Embers
      embers.forEach(e => {
        e.age++;
        e.y += e.vy;
        e.x += e.vx;
        e.vx += (Math.random() - 0.5) * 0.05;
        const lifeRatio = e.age / e.life;
        e.a = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.8 ? (1 - lifeRatio) * 5 : 1;
        if (e.age >= e.life || e.y < -20) {
          e.x = Math.random() * canvas.width;
          e.y = canvas.height + 20;
          e.age = 0;
          e.vy = -(Math.random() * 0.5 + 0.2);
        }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
        grad.addColorStop(0, `rgba(255,180,60,${e.a * 0.8})`);
        grad.addColorStop(0.5, `rgba(212,175,55,${e.a * 0.3})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

// Animated ocean waves at bottom
const OceanWaves: React.FC = () => (
  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
    <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveMove 12s linear infinite' }}>
      <path d="M0,100 C320,160 420,40 720,100 C1020,160 1120,40 1440,100 L1440,200 L0,200 Z" fill="rgba(10,31,60,0.6)" />
    </svg>
    <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveMove 8s linear infinite reverse' }}>
      <path d="M0,120 C240,60 540,180 720,120 C960,60 1260,180 1440,120 L1440,200 L0,200 Z" fill="rgba(6,18,38,0.7)" />
    </svg>
    <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveMove 15s linear infinite' }}>
      <path d="M0,140 C360,100 480,180 720,140 C960,100 1080,180 1440,140 L1440,200 L0,200 Z" fill="rgba(3,7,18,0.9)" />
    </svg>
  </div>
);

// Pirate ship silhouette
const PirateShip: React.FC = () => (
  <svg viewBox="0 0 400 300" style={{ width: 'clamp(280px, 36vw, 460px)', height: 'auto', animation: 'floatShip 6s ease-in-out infinite', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))' }}>
    <defs>
      <linearGradient id="shipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a2540" />
        <stop offset="100%" stopColor="#0a1525" />
      </linearGradient>
      <linearGradient id="sailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(212,175,55,0.15)" />
        <stop offset="100%" stopColor="rgba(212,175,55,0.05)" />
      </linearGradient>
    </defs>
    {/* Hull */}
    <path d="M80,220 L320,220 L290,260 L110,260 Z" fill="url(#shipGrad)" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
    <path d="M80,220 L320,220 L315,210 L85,210 Z" fill="rgba(212,175,55,0.08)" />
    {/* Deck details */}
    <line x1="120" y1="220" x2="120" y2="260" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
    <line x1="200" y1="220" x2="200" y2="260" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
    <line x1="280" y1="220" x2="280" y2="260" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
    {/* Main mast */}
    <line x1="200" y1="210" x2="200" y2="40" stroke="rgba(212,175,55,0.4)" strokeWidth="2.5" />
    {/* Crossbeam */}
    <line x1="140" y1="80" x2="260" y2="80" stroke="rgba(212,175,55,0.4)" strokeWidth="2" />
    {/* Main sail */}
    <path d="M150,82 L250,82 L240,160 L160,160 Z" fill="url(#sailGrad)" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
    {/* Skull on sail */}
    <circle cx="200" cy="115" r="10" fill="rgba(212,175,55,0.2)" />
    <circle cx="196" cy="113" r="1.5" fill="rgba(212,175,55,0.4)" />
    <circle cx="204" cy="113" r="1.5" fill="rgba(212,175,55,0.4)" />
    {/* Front mast */}
    <line x1="130" y1="210" x2="130" y2="100" stroke="rgba(212,175,55,0.3)" strokeWidth="2" />
    <line x1="100" y1="130" x2="160" y2="130" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
    <path d="M105,132 L155,132 L150,180 L110,180 Z" fill="url(#sailGrad)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.8" />
    {/* Flag */}
    <path d="M200,40 L200,18 L230,24 L220,30 L230,36 L200,42" fill="rgba(192,57,43,0.6)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
    {/* Crow's nest */}
    <rect x="188" y="55" width="24" height="10" rx="2" fill="rgba(212,175,55,0.15)" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
    {/* Rope rigging */}
    <line x1="200" y1="65" x2="160" y2="210" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" />
    <line x1="200" y1="65" x2="240" y2="210" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" />
    <line x1="130" y1="100" x2="100" y2="210" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" />
    <line x1="130" y1="100" x2="160" y2="210" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" />
  </svg>
);

// Compass rose
const Compass: React.FC = () => (
  <div style={{
    position: 'relative',
    width: 'clamp(180px, 26vw, 300px)',
    height: 'clamp(180px, 26vw, 300px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <svg viewBox="0 0 200 200" style={{ position: 'absolute', width: '100%', height: '100%', animation: 'floatSlow 8s ease-in-out infinite' }}>
      <defs>
        <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(212,175,55,0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="needleN" x1="50%" y1="50%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#f4d06f" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#compassGlow)" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" strokeDasharray="3 3" />
      {['N','E','S','W'].map((d, i) => {
        const angle = (i * 90 * Math.PI) / 180;
        const x = 100 + Math.cos(angle - Math.PI / 2) * 80;
        const y = 100 + Math.sin(angle - Math.PI / 2) * 80;
        return <text key={d} x={x} y={y + 4} textAnchor="middle" fill="rgba(212,175,55,0.9)" fontFamily="'Pirata One', serif" fontSize="18">{d}</text>;
      })}
      {['NE','SE','SW','NW'].map((d, i) => {
        const angle = (i * 90 + 45) * Math.PI / 180;
        const x = 100 + Math.cos(angle - Math.PI / 2) * 68;
        const y = 100 + Math.sin(angle - Math.PI / 2) * 68;
        return <text key={d} x={x} y={y + 3} textAnchor="middle" fill="rgba(141,165,196,0.5)" fontFamily="'Space Mono', monospace" fontSize="7">{d}</text>;
      })}
      <g style={{ transformOrigin: '100px 100px', animation: 'compass-spin 40s linear infinite' }}>
        <polygon points="100,25 110,100 100,110 90,100" fill="url(#needleN)" />
        <polygon points="100,175 110,100 100,90 90,100" fill="rgba(45,184,166,0.5)" />
      </g>
      <circle cx="100" cy="100" r="7" fill="#d4af37" />
      <circle cx="100" cy="100" r="3" fill="#030712" />
    </svg>
  </div>
);

// Fog layers
const FogLayer: React.FC = () => (
  <>
    <div style={{ position: 'absolute', top: '20%', left: 0, width: '100%', height: 200, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '60%', height: '100%', background: 'radial-gradient(ellipse, rgba(141,165,196,0.08) 0%, transparent 70%)', animation: 'fog-drift 25s ease-in-out infinite' }} />
    </div>
    <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 250, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '50%', height: '100%', background: 'radial-gradient(ellipse, rgba(141,165,196,0.06) 0%, transparent 70%)', animation: 'fog-drift 35s ease-in-out infinite reverse', animationDelay: '5s' }} />
    </div>
  </>
);

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 20% 30%, rgba(10,31,60,0.7) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(13,37,67,0.5) 0%, transparent 50%), linear-gradient(180deg, #030712 0%, #061226 60%, #0a1f3c 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Parallax background layers */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, transform: `translateY(${scrollY * 0.3}px)`, pointerEvents: 'none' }}>
        {/* Distant island silhouette */}
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 180, width: '100%', height: 300, opacity: 0.3 }}>
          <path d="M0,300 C200,250 300,200 450,230 C600,260 700,180 900,210 C1100,240 1200,200 1440,250 L1440,400 L0,400 Z" fill="rgba(6,18,38,0.8)" />
        </svg>
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 1, transform: `translateY(${scrollY * 0.15}px)`, pointerEvents: 'none' }}>
        {/* Moon glow */}
        <div style={{ position: 'absolute', top: '8%', right: '12%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,208,111,0.15) 0%, rgba(244,208,111,0.05) 40%, transparent 70%)', filter: 'blur(20px)' }} />
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, rgba(244,208,111,0.6), rgba(212,175,55,0.2))', boxShadow: '0 0 60px rgba(244,208,111,0.3)' }} />
      </div>

      <ParticleField />
      <FogLayer />

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '120px 48px 60px',
        position: 'relative',
        zIndex: 5,
        gap: 40,
      }}>
        {/* Left */}
        <div style={{ flex: 1, maxWidth: 640 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '8px 18px',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: 100,
            marginBottom: 28,
            animation: 'fadeInUp 0.8s ease',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)', animation: 'glow-pulse 2s ease infinite' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              A 36-Hour National Hackathon
            </p>
          </div>

          <h1 ref={titleRef} style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(56px, 11vw, 140px)',
            lineHeight: 0.9,
            marginBottom: 24,
            background: 'linear-gradient(180deg, #ffe27a 0%, #d4af37 50%, #8a6f30 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(212,175,55,0.3)',
            letterSpacing: '0.02em',
          }}>
            VOYAGE
          </h1>

          <div style={{ marginBottom: 28 }}>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(16px, 2.2vw, 24px)',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.4,
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginBottom: 4,
            }}>
              SAIL BEYOND LIMITS.
            </p>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(16px, 2.2vw, 24px)',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.4,
              fontWeight: 400,
              letterSpacing: '0.05em',
            }}>
              BUILD BEYOND HORIZONS.
            </p>
          </div>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
            marginBottom: 40,
            maxWidth: 480,
            borderLeft: '2px solid rgba(212,175,55,0.3)',
            paddingLeft: 20,
          }}>
            Voyage — Beyond the Horizon is a premier 36-hour innovation challenge.
            Collaborate with like-minded innovators, receive mentorship from industry experts,
            and transform ideas into impactful solutions.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button
              onClick={() => scrollTo('register')}
              style={{
                background: 'linear-gradient(135deg, #d4af37, #8a6f30)',
                border: 'none',
                color: '#000',
                fontFamily: "'Cinzel', serif",
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '16px 32px',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,175,55,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.3)';
              }}
            >
              SET SAIL →
            </button>

            <button
              onClick={() => scrollTo('tracks')}
              style={{
                background: 'transparent',
                border: '1px solid rgba(212,175,55,0.4)',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: "'Cinzel', serif",
                fontSize: '14px',
                letterSpacing: '0.1em',
                padding: '16px 32px',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.8)';
                e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Explore Tracks
            </button>
          </div>
        </div>

        {/* Right — Ship + Compass */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          position: 'relative',
          transform: `translateY(${scrollY * -0.05}px)`,
        }}>
          <div style={{ position: 'relative' }}>
            <PirateShip />
            {/* Ship reflection */}
            <div style={{
              position: 'absolute', bottom: -40, left: '50%',
              transform: 'translateX(-50%)',
              width: '60%', height: 30,
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }} />
          </div>
          <Compass />
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(212,175,55,0.15)',
        background: 'rgba(3,7,18,0.6)',
        backdropFilter: 'blur(20px)',
        padding: '32px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
      }}>
        {[
          { label: 'DURATION', value: '36 HRS' },
          { label: 'TEAM SIZE', value: '3-4' },
          { label: 'PRIZE POOL', value: '₹25,000' },
          { label: 'DATES', value: '26 | 27 SEP' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
              fontFamily: "'Pirata One', serif",
              fontSize: 'clamp(22px, 3vw, 36px)',
              background: 'linear-gradient(180deg, #ffe27a, #d4af37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 6,
              lineHeight: 1,
            }}>{s.value}</div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}>{s.label}</div>
            {i < 3 && <div style={{ position: 'absolute', right: -12, top: '20%', height: '60%', width: 1, background: 'rgba(212,175,55,0.15)' }} />}
          </div>
        ))}
      </div>

      <OceanWaves />

      <style>{`
        @media (max-width: 820px) {
          #home > div:nth-of-type(1) { flex-direction: column !important; text-align: center !important; padding-top: 100px !important; }
          #home > div:nth-of-type(1) > div:first-child { max-width: 100% !important; }
          #home > div:nth-of-type(1) > div:first-child p[style*="borderLeft"] { borderLeft: none !important; paddingLeft: 0 !important; }
          #home > div:nth-of-type(1) > div:last-child { margin-top: 20px; }
          #home > div:last-of-type { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
