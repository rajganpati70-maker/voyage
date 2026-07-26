import React, { useEffect, useRef } from 'react';

const HexShape: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      if (ref.current) {
        const rx = Math.sin(frame * 0.008) * 20;
        const ry = frame * 0.4;
        const rz = Math.sin(frame * 0.005) * 10;
        ref.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const faces = [
    { transform: 'rotateY(0deg) translateZ(110px)', bg: 'rgba(24,60,80,0.85)' },
    { transform: 'rotateY(60deg) translateZ(110px)', bg: 'rgba(20,55,75,0.8)' },
    { transform: 'rotateY(120deg) translateZ(110px)', bg: 'rgba(16,50,70,0.75)' },
    { transform: 'rotateY(180deg) translateZ(110px)', bg: 'rgba(24,60,80,0.85)' },
    { transform: 'rotateY(240deg) translateZ(110px)', bg: 'rgba(20,55,75,0.8)' },
    { transform: 'rotateY(300deg) translateZ(110px)', bg: 'rgba(16,50,70,0.75)' },
    { transform: 'rotateX(90deg) translateZ(100px)', bg: 'rgba(10,40,60,0.9)' },
    { transform: 'rotateX(-90deg) translateZ(100px)', bg: 'rgba(10,40,60,0.9)' },
  ];

  return (
    <div style={{
      width: '260px',
      height: '260px',
      perspective: '800px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div ref={ref} style={{ width: '220px', height: '220px', position: 'relative', transformStyle: 'preserve-3d' }}>
        {/* Hexagonal prism using clip-path faces */}
        {faces.map((face, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '220px',
              height: '220px',
              top: 0,
              left: 0,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: face.bg,
              border: '1px solid rgba(100,200,180,0.12)',
              transform: face.transform,
              backfaceVisibility: 'hidden',
              backdropFilter: 'blur(2px)',
            }}
          />
        ))}
        {/* Glowing dots on hex */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const r = 70;
          const cx = 110 + r * Math.cos(angle);
          const cy = 110 + r * Math.sin(angle);
          return (
            <div key={`dot-${i}`} style={{
              position: 'absolute',
              left: cx - 3,
              top: cy - 3,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(100,220,180,0.9)',
              boxShadow: '0 0 8px rgba(100,220,180,0.8)',
              transform: 'translateZ(115px)',
              animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite`,
            }} />
          );
        })}
      </div>
    </div>
  );
};

export default HexShape;
