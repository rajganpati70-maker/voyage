import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Anchor } from 'lucide-react';

type Member = { fullName: string; email: string; college: string; year: string };
const emptyMember = (): Member => ({ fullName: '', email: '', college: '', year: '' });

const tracks = [
  { value: 'ai', label: "Devil's Triangle — AI / ML" },
  { value: 'web3', label: 'Tortuga Market — Blockchain / Web3' },
  { value: 'fintech', label: "Dead Men's Ledger — FinTech" },
  { value: 'health', label: 'Fountain of Youth — Healthcare' },
  { value: 'security', label: "Davy Jones' Vault — Cybersecurity" },
  { value: 'open', label: 'Shipwreck Cove — Open Innovation' },
];

const steps = ['VOYAGE', 'CAPTAIN', 'CREW', 'CONFIRM'];

const Register: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const [step, setStep] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [track, setTrack] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderMobile, setLeaderMobile] = useState('');
  const [leaderCollege, setLeaderCollege] = useState('');
  const [leaderYear, setLeaderYear] = useState('');
  const [members, setMembers] = useState<Member[]>([emptyMember()]);
  const [captcha, setCaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const addMember = () => {
    if (members.length < 3) setMembers([...members, emptyMember()]);
  };

  const updateMember = (idx: number, key: keyof Member, val: string) =>
    setMembers(members.map((m, i) => i === idx ? { ...m, [key]: val } : m));

  const canProceed = () => {
    if (step === 0) return teamName && track;
    if (step === 1) return leaderName && leaderEmail && leaderMobile && leaderCollege && leaderYear;
    if (step === 2) return true;
    if (step === 3) return captcha;
    return false;
  };

  const next = () => { if (canProceed() && step < 3) setStep(step + 1); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = () => {
    if (!captcha) return;
    setSubmitted(true);
  };

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'rgba(3,7,18,0.8)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: '14px 16px',
    color: '#fff',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '11px',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 8,
        display: 'block',
        fontWeight: 600,
      }}>
        {label} <span style={{ color: '#e44' }}>*</span>
      </span>
      {children}
    </div>
  );

  const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const [focused, setFocused] = useState(false);
    return <input {...props} style={{
      ...inputBase,
      borderColor: focused ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.08)',
      boxShadow: focused ? '0 0 0 3px rgba(212,175,55,0.1)' : 'none',
    }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />;
  };

  const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
    const [focused, setFocused] = useState(false);
    return <select {...props} style={{
      ...inputBase,
      borderColor: focused ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.08)',
      boxShadow: focused ? '0 0 0 3px rgba(212,175,55,0.1)' : 'none',
      appearance: 'none' as const,
      cursor: 'pointer',
    }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />;
  };

  const row = (cols: number): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: 16,
    marginBottom: 16,
  });

  return (
    <section id="register" ref={sectionRef} className="noise-texture" style={{
      background: 'linear-gradient(180deg, #030712 0%, #060d1c 100%)',
      padding: '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label">REGISTRATION PORTAL</span>
          <h2 style={{
            fontFamily: "'Pirata One', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            marginTop: 16,
            color: 'var(--text-white)',
            lineHeight: 1,
            animation: visible ? 'fadeInUp 0.8s ease' : 'none',
          }}>
            Ready to Set <span style={{ background: 'linear-gradient(180deg, #ffe27a, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sail?</span>
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
            Secure your team's spot and compete against India's top engineering talent. Build with modern technology in an intensive 36-hour sprint.
          </p>
        </div>

        {submitted ? (
          <div className="glass-card" style={{
            padding: '64px 48px',
            textAlign: 'center',
            animation: visible ? 'scale-in 0.6s ease' : 'none',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37, #8a6f30)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
              boxShadow: '0 0 40px rgba(212,175,55,0.4)',
            }}>
              <Check size={36} color="#000" />
            </div>
            <p style={{
              fontFamily: "'Pirata One', serif",
              fontSize: '28px', color: 'var(--gold)',
              marginBottom: 16, letterSpacing: '0.05em',
            }}>ANCHORS AWEIGH!</p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px', color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.8, maxWidth: 400, margin: '0 auto',
            }}>
              Your registration has been received. We'll be in touch with you soon with further details about Voyage 2026.
            </p>
          </div>
        ) : (
          <div className="glass-card" style={{
            padding: '48px 44px',
            animation: visible ? 'fadeInUp 0.8s ease 0.2s both' : 'none',
          }}>
            {/* Step indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
              marginBottom: 40,
            }}>
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: i < step ? 'linear-gradient(135deg, #d4af37, #8a6f30)' : i === step ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `2px solid ${i < step ? 'transparent' : i === step ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: i < step ? '#000' : i === step ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                      fontFamily: "'Pirata One', serif",
                      fontSize: '18px',
                      transition: 'all 0.3s ease',
                      boxShadow: i === step ? '0 0 20px rgba(212,175,55,0.3)' : 'none',
                    }}>
                      {i < step ? <Check size={20} /> : i + 1}
                    </div>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      color: i <= step ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                      fontWeight: 600,
                      transition: 'color 0.3s',
                    }}>{s}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: 60, height: 2,
                      background: i < step ? 'linear-gradient(90deg, #d4af37, #8a6f30)' : 'rgba(255,255,255,0.08)',
                      margin: '0 12px',
                      marginBottom: 28,
                      transition: 'background 0.3s',
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step content */}
            <div style={{ minHeight: 280, animation: `fadeInUp 0.4s ease` }} key={step}>
              {/* Step 0 — Voyage */}
              {step === 0 && (
                <>
                  <p style={{
                    fontFamily: "'Pirata One', serif",
                    fontSize: '22px', color: 'var(--text-white)',
                    marginBottom: 28, textAlign: 'center',
                  }}>Name Your Ship</p>
                  <div style={row(2)}>
                    <Field label="TEAM NAME">
                      <Input placeholder="e.g. The Black Pearl" value={teamName} onChange={e => setTeamName(e.target.value)} />
                    </Field>
                    <Field label="TARGET TRACK">
                      <Select value={track} onChange={e => setTrack(e.target.value)}>
                        <option value="">Select a track...</option>
                        {tracks.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </Select>
                    </Field>
                  </div>
                </>
              )}

              {/* Step 1 — Captain */}
              {step === 1 && (
                <>
                  <p style={{
                    fontFamily: "'Pirata One', serif",
                    fontSize: '22px', color: 'var(--text-white)',
                    marginBottom: 28, textAlign: 'center',
                  }}>Captain's Credentials</p>
                  <div style={row(2)}>
                    <Field label="FULL NAME">
                      <Input placeholder="Captain Name" value={leaderName} onChange={e => setLeaderName(e.target.value)} />
                    </Field>
                    <Field label="EMAIL ADDRESS">
                      <Input type="email" placeholder="captain@example.com" value={leaderEmail} onChange={e => setLeaderEmail(e.target.value)} />
                    </Field>
                  </div>
                  <div style={row(2)}>
                    <Field label="MOBILE NUMBER">
                      <Input placeholder="10-digit number" value={leaderMobile} onChange={e => setLeaderMobile(e.target.value)} />
                    </Field>
                    <Field label="YEAR OF STUDY">
                      <Select value={leaderYear} onChange={e => setLeaderYear(e.target.value)}>
                        <option value="">Select Year...</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </Select>
                    </Field>
                  </div>
                  <div style={row(1)}>
                    <Field label="COLLEGE / UNIVERSITY NAME">
                      <Input placeholder="e.g. Haldia Institute of Technology" value={leaderCollege} onChange={e => setLeaderCollege(e.target.value)} />
                    </Field>
                  </div>
                </>
              )}

              {/* Step 2 — Crew */}
              {step === 2 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <p style={{
                      fontFamily: "'Pirata One', serif",
                      fontSize: '22px', color: 'var(--text-white)',
                    }}>Assemble Your Crew</p>
                    {members.length < 3 && (
                      <button type="button" onClick={addMember} style={{
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        color: 'var(--gold)',
                        fontFamily: "'Cinzel', serif",
                        fontSize: '11px', letterSpacing: '0.1em',
                        padding: '8px 18px', borderRadius: 8,
                        cursor: 'pointer', transition: 'all 0.2s',
                        fontWeight: 600,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(212,175,55,0.2)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                      }}
                      >+ ADD CREW</button>
                    )}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px', color: 'rgba(255,255,255,0.4)',
                    marginBottom: 20,
                  }}>
                    Add up to 3 additional crew members (your team can be 3-4 total including the captain).
                  </p>

                  {members.map((m, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(3,7,18,0.6)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 12,
                      padding: 22,
                      marginBottom: 16,
                    }}>
                      <p style={{
                        fontFamily: "'Pirata One', serif",
                        fontSize: '14px', color: 'var(--gold)',
                        marginBottom: 18, letterSpacing: '0.05em',
                      }}>CREW {idx + 1}</p>
                      <div style={row(2)}>
                        <Field label="FULL NAME">
                          <Input placeholder="Full Name" value={m.fullName} onChange={e => updateMember(idx, 'fullName', e.target.value)} />
                        </Field>
                        <Field label="EMAIL ADDRESS">
                          <Input type="email" placeholder="email@example.com" value={m.email} onChange={e => updateMember(idx, 'email', e.target.value)} />
                        </Field>
                      </div>
                      <div style={row(2)}>
                        <Field label="COLLEGE / UNIVERSITY NAME">
                          <Input placeholder="e.g. Haldia Institute of Technology" value={m.college} onChange={e => updateMember(idx, 'college', e.target.value)} />
                        </Field>
                        <Field label="YEAR OF STUDY">
                          <Select value={m.year} onChange={e => updateMember(idx, 'year', e.target.value)}>
                            <option value="">Select Year...</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </Select>
                        </Field>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Step 3 — Confirm */}
              {step === 3 && (
                <>
                  <p style={{
                    fontFamily: "'Pirata One', serif",
                    fontSize: '22px', color: 'var(--text-white)',
                    marginBottom: 28, textAlign: 'center',
                  }}>Confirm & Set Sail</p>

                  {/* Summary */}
                  <div style={{
                    background: 'rgba(3,7,18,0.6)',
                    border: '1px solid rgba(212,175,55,0.15)',
                    borderRadius: 14,
                    padding: '28px 28px',
                    marginBottom: 28,
                  }}>
                    <SummaryRow label="Team Name" value={teamName} />
                    <SummaryRow label="Track" value={tracks.find(t => t.value === track)?.label || ''} />
                    <SummaryRow label="Captain" value={leaderName} />
                    <SummaryRow label="Email" value={leaderEmail} />
                    <SummaryRow label="Mobile" value={leaderMobile} />
                    <SummaryRow label="College" value={leaderCollege} />
                    <SummaryRow label="Crew Members" value={`${members.length} additional`} last />
                  </div>

                  {/* Captcha */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${captcha ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 6, padding: '14px 20px',
                      minWidth: 280, maxWidth: 320,
                      transition: 'border-color 0.2s',
                    }}>
                      <input type="checkbox" id="captcha" checked={captcha} onChange={e => setCaptcha(e.target.checked)}
                        style={{ width: 18, height: 18, accentColor: 'var(--gold)', cursor: 'pointer', flexShrink: 0 }} />
                      <label htmlFor="captcha" style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                        I'm not a robot
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Anchor size={24} color="var(--gold)" />
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 8, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>Voyage Guard</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Navigation buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              marginTop: 12,
            }}>
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: step === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  border: `1px solid ${step === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)'}`,
                  color: step === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '13px', letterSpacing: '0.1em',
                  fontWeight: 600,
                  padding: '14px 24px',
                  borderRadius: 10,
                  cursor: step === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <ChevronLeft size={18} /> BACK
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed()}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: canProceed() ? 'linear-gradient(135deg, #d4af37, #8a6f30)' : 'rgba(255,255,255,0.05)',
                    border: 'none',
                    color: canProceed() ? '#000' : 'rgba(255,255,255,0.3)',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '13px', letterSpacing: '0.1em',
                    fontWeight: 700,
                    padding: '14px 28px',
                    borderRadius: 10,
                    cursor: canProceed() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: canProceed() ? '0 4px 16px rgba(212,175,55,0.3)' : 'none',
                  }}
                >
                  NEXT <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!captcha}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: captcha ? 'linear-gradient(135deg, #d4af37, #8a6f30)' : 'rgba(255,255,255,0.05)',
                    border: 'none',
                    color: captcha ? '#000' : 'rgba(255,255,255,0.3)',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '13px', letterSpacing: '0.1em',
                    fontWeight: 700,
                    padding: '14px 28px',
                    borderRadius: 10,
                    cursor: captcha ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: captcha ? '0 4px 16px rgba(212,175,55,0.3)' : 'none',
                  }}
                >
                  SET SAIL <Anchor size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 700px) {
          #register form > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          #register > div:last-child > div:last-child > div:nth-child(3) > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const SummaryRow: React.FC<{ label: string; value: string; last?: boolean }> = ({ label, value, last }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0',
    borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.05)',
  }}>
    <span style={{
      fontFamily: "'Cinzel', serif",
      fontSize: '13px', color: 'rgba(255,255,255,0.5)',
      fontWeight: 500,
    }}>{label}</span>
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontSize: '14px', color: 'var(--gold)',
      fontWeight: 500,
    }}>{value}</span>
  </div>
);

export default Register;
