import React, { useEffect, useRef, useState } from 'react';

const memories = [
  { id: 1, title: 'Opening Ceremony', src: 'https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=600', tag: '2024' },
  { id: 2, title: 'Team Collaboration', src: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600', tag: '2024' },
  { id: 3, title: 'Late Night Coding', src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600', tag: '2024' },
  { id: 4, title: 'Mentor Session', src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600', tag: '2024' },
  { id: 5, title: 'Project Showcase', src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600', tag: '2024' },
  { id: 6, title: 'Winners Podium', src: 'https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=600', tag: '2024' },
  { id: 7, title: 'Networking', src: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=recs&w=600' },
  { id: 8, title: 'Demo Day', src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600', tag: '2024' },
];

const PastMemories: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="memories" ref={sectionRef} style={{
      background: 'var(--bg-deep)',
      padding: '100px 48px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <span className="section-label">PAST MEMORIES</span>
          <h2 className="pixel-heading" style={{
            fontSize: 'clamp(22px, 3vw, 38px)',
            color: 'var(--text-white)',
            lineHeight: 1.4,
            marginTop: 8,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Moments from <span style={{ color: 'var(--gold)' }}>HackVerse 1.0</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {memories.map((mem, i) => (
            <div
              key={mem.id}
              onMouseEnter={() => setHovered(mem.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'var(--bg-card)',
                animation: visible ? `fadeInUp 0.6s ease ${i * 80}ms both` : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: hovered === mem.id ? 'translateY(-6px) scale(1.02)' : 'translateY(0)',
                boxShadow: hovered === mem.id ? '0 16px 48px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              <img
                src={mem.src}
                alt={mem.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease, filter 0.4s ease',
                  filter: hovered === mem.id ? 'saturate(1.2) brightness(1.1)' : 'saturate(0.7) brightness(0.85)',
                  transform: hovered === mem.id ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: hovered === mem.id
                  ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                transition: 'background 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 16,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  color: 'var(--gold)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  opacity: hovered === mem.id ? 1 : 0,
                  transform: hovered === mem.id ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 0.3s ease',
                  marginBottom: 6,
                }}>
                  {mem.tag} EDITION
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: '#fff',
                  fontWeight: 500,
                  opacity: hovered === mem.id ? 1 : 0.7,
                  transform: hovered === mem.id ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'all 0.3s ease 0.05s',
                }}>
                  {mem.title}
                </div>
              </div>

              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 24,
                height: 24,
                borderTop: '2px solid var(--gold)',
                borderRight: '2px solid var(--gold)',
                opacity: hovered === mem.id ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastMemories;
