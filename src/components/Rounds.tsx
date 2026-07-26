import React, { useEffect, useRef, useState } from 'react';
import { Award, Lock, Circle as HelpCircle } from 'lucide-react';

const Rounds: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverCard, setHoverCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="rounds" ref={sectionRef} style={{
      background: 'var(--bg-dark)',
      padding: '100px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid subtle */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-label">STRUCTURE</span>
          <h2 className="pixel-heading" style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            marginTop: 12,
            color: 'var(--text-white)',
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Round{' '}
            <span style={{ color: 'var(--gold)' }}>Details</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            color: 'rgba(255,255,255,0.5)',
            marginTop: 20,
            maxWidth: 540,
            margin: '20px auto 0',
            lineHeight: 1.7,
          }}>
            Understand the phase requirements, eligibility criteria, and progression steps for HackVerse.
          </p>
        </div>

        {/* Two round cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 28,
        }}>
          {/* Phase 01 — Active */}
          <div
            onMouseEnter={() => setHoverCard(1)}
            onMouseLeave={() => setHoverCard(null)}
            style={{
              background: hoverCard === 1 ? 'rgba(20,32,54,0.98)' : 'rgba(13,22,40,0.9)',
              border: `1px solid ${hoverCard === 1 ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.2)'}`,
              borderRadius: '18px',
              padding: '36px 36px 40px',
              transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              transform: hoverCard === 1 ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: hoverCard === 1 ? '0 24px 60px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.3)',
              animation: visible ? 'fadeInUp 0.7s ease 0.1s both' : 'none',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 320,
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'rgba(201,168,76,0.9)',
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.25)',
                padding: '5px 12px',
                borderRadius: '6px',
              }}>
                PHASE 01
              </span>
              <Award size={22} color="rgba(201,168,76,0.8)" />
            </div>

            {/* Title */}
            <h3 className="pixel-heading" style={{
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: 'var(--text-white)',
              marginBottom: 20,
              lineHeight: 1.4,
            }}>
              Round 1: Screening &amp; Certification
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
              flex: 1,
              marginBottom: 32,
            }}>
              Registered teams will be contacted via mail, and they would need to complete the following IBM certification to be eligible to participate.
            </p>

            {/* CTA button */}
            <button
              style={{
                background: 'var(--gold)',
                border: 'none',
                color: '#000',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '16px 28px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--gold-light)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Complete IBM Certification →
            </button>
          </div>

          {/* Phase 02 — Locked */}
          <div
            onMouseEnter={() => setHoverCard(2)}
            onMouseLeave={() => setHoverCard(null)}
            style={{
              background: 'rgba(11,18,34,0.85)',
              border: `1px solid ${hoverCard === 2 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: '18px',
              padding: '36px 36px 40px',
              transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              transform: hoverCard === 2 ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hoverCard === 2 ? '0 16px 40px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.2)',
              animation: visible ? 'fadeInUp 0.7s ease 0.25s both' : 'none',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 320,
              alignItems: 'stretch',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '5px 12px',
                borderRadius: '6px',
              }}>
                PHASE 02
              </span>
              <Lock size={20} color="rgba(255,255,255,0.25)" />
            </div>

            {/* Title */}
            <h3 className="pixel-heading" style={{
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 20,
              lineHeight: 1.4,
            }}>
              Round 2: Hackathon Finale
            </h3>

            {/* Locked body */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '24px 0',
            }}>
              <HelpCircle size={44} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
              <div style={{
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: 8,
                }}>
                  Details will be revealed soon
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.25)',
                  lineHeight: 1.6,
                  maxWidth: 260,
                  margin: '0 auto',
                }}>
                  Stay tuned as the official challenge timelines and tasks are unlocked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rounds;
