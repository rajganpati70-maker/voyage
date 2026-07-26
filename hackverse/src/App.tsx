import { useState } from 'react'
import { Phone, Mail } from 'lucide-react'
import './App.css'

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

type Member = {
  fullName: string
  email: string
  college: string
  year: string
}

const emptyMember = (): Member => ({ fullName: '', email: '', college: '', year: '' })

export default function App() {
  const [teamName, setTeamName] = useState('')
  const [track, setTrack] = useState('')
  const [leaderName, setLeaderName] = useState('')
  const [leaderEmail, setLeaderEmail] = useState('')
  const [leaderMobile, setLeaderMobile] = useState('')
  const [leaderCollege, setLeaderCollege] = useState('')
  const [leaderYear, setLeaderYear] = useState('')
  const [members, setMembers] = useState<Member[]>([emptyMember()])
  const [captcha, setCaptcha] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const addMember = () => {
    if (members.length < 3) setMembers([...members, emptyMember()])
  }

  const updateMember = (idx: number, field: keyof Member, val: string) => {
    setMembers(members.map((m, i) => i === idx ? { ...m, [field]: val } : m))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!captcha) return
    setSubmitted(true)
  }

  return (
    <div className="hv-root">
      {/* NAVBAR */}
      <nav className="hv-nav">
        <div className="hv-nav-inner">
          <span className="hv-logo">HackVerse <strong>2.0</strong></span>
          <ul className="hv-nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#tracks">Tracks</a></li>
            <li><a href="#timeline">Timeline</a></li>
            <li><a href="#prizes">Prizes</a></li>
            <li><a href="#sponsors">Sponsors</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#register" className="hv-nav-cta">REGISTER NOW →</a>
        </div>
      </nav>

      {/* ── REGISTRATION PORTAL ── */}
      <section id="register" className="hv-section">
        <p className="hv-eyebrow">REGISTRATION PORTAL</p>
        <h2 className="hv-section-title pixel">READY TO BUILD THE FUTURE OF AI?</h2>
        <p className="hv-section-sub">
          Secure your team's spot and compete against India's top engineering talent. Build with<br />
          modern technology and cloud platforms in an intensive 36-hour sprint.
        </p>

        {submitted ? (
          <div className="hv-form-card hv-submitted">
            <p className="hv-submitted-msg">Registration submitted successfully! We'll be in touch soon.</p>
          </div>
        ) : (
          <form className="hv-form-card" onSubmit={handleSubmit} noValidate>
            <h3 className="hv-form-heading pixel">REGISTRATION FORM</h3>

            {/* Row 1 */}
            <div className="hv-form-row">
              <div className="hv-form-group">
                <label className="hv-label">TEAM NAME <span className="req">*</span></label>
                <input className="hv-input" placeholder="e.g. Neural Nexus" value={teamName} onChange={e => setTeamName(e.target.value)} required />
              </div>
              <div className="hv-form-group">
                <label className="hv-label">TARGET FOCUS TRACK <span className="req">*</span></label>
                <select className="hv-select" value={track} onChange={e => setTrack(e.target.value)} required>
                  <option value="">Select a track...</option>
                  <option value="ai">AI / Machine Learning</option>
                  <option value="web3">Web3 / Blockchain</option>
                  <option value="cloud">Cloud / DevOps</option>
                  <option value="open">Open Innovation</option>
                </select>
              </div>
            </div>

            {/* Team Leader */}
            <p className="hv-section-label">TEAM LEADER INFORMATION</p>
            <div className="hv-form-row hv-three-col">
              <div className="hv-form-group">
                <label className="hv-label">FULL NAME <span className="req">*</span></label>
                <input className="hv-input" placeholder="Leader Name" value={leaderName} onChange={e => setLeaderName(e.target.value)} required />
              </div>
              <div className="hv-form-group">
                <label className="hv-label">EMAIL ADDRESS <span className="req">*</span></label>
                <input className="hv-input" type="email" placeholder="leader@example.com" value={leaderEmail} onChange={e => setLeaderEmail(e.target.value)} required />
              </div>
              <div className="hv-form-group">
                <label className="hv-label">MOBILE NUMBER <span className="req">*</span></label>
                <input className="hv-input" placeholder="10-digit number" value={leaderMobile} onChange={e => setLeaderMobile(e.target.value)} required />
              </div>
            </div>
            <div className="hv-form-row">
              <div className="hv-form-group hv-flex2">
                <label className="hv-label">COLLEGE / UNIVERSITY NAME <span className="req">*</span></label>
                <input className="hv-input" placeholder="e.g. MIT Bengaluru" value={leaderCollege} onChange={e => setLeaderCollege(e.target.value)} required />
              </div>
              <div className="hv-form-group">
                <label className="hv-label">YEAR OF STUDY <span className="req">*</span></label>
                <select className="hv-select" value={leaderYear} onChange={e => setLeaderYear(e.target.value)} required>
                  <option value="">Select Year...</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            {/* Team Members */}
            <div className="hv-members-header">
              <p className="hv-section-label">TEAM MEMBERS ({members.length}/3 ADDITIONAL)</p>
              {members.length < 3 && (
                <button type="button" className="hv-add-btn" onClick={addMember}>+ ADD MEMBER</button>
              )}
            </div>

            {members.map((m, idx) => (
              <div key={idx} className="hv-member-card">
                <p className="hv-member-label pixel">MEMBER {idx + 1}</p>
                <div className="hv-form-row">
                  <div className="hv-form-group">
                    <label className="hv-label">FULL NAME <span className="req">*</span></label>
                    <input className="hv-input" placeholder="Full Name" value={m.fullName} onChange={e => updateMember(idx, 'fullName', e.target.value)} required />
                  </div>
                  <div className="hv-form-group">
                    <label className="hv-label">EMAIL ADDRESS <span className="req">*</span></label>
                    <input className="hv-input" type="email" placeholder="email@example.com" value={m.email} onChange={e => updateMember(idx, 'email', e.target.value)} required />
                  </div>
                </div>
                <div className="hv-form-row">
                  <div className="hv-form-group hv-flex2">
                    <label className="hv-label">COLLEGE / UNIVERSITY NAME <span className="req">*</span></label>
                    <input className="hv-input" placeholder="e.g. MIT Bengaluru" value={m.college} onChange={e => updateMember(idx, 'college', e.target.value)} required />
                  </div>
                  <div className="hv-form-group">
                    <label className="hv-label">YEAR OF STUDY <span className="req">*</span></label>
                    <select className="hv-select" value={m.year} onChange={e => updateMember(idx, 'year', e.target.value)} required>
                      <option value="">Select Year...</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Captcha mock */}
            <div className="hv-captcha-row">
              <div className="hv-captcha-box">
                <input type="checkbox" id="captcha" checked={captcha} onChange={e => setCaptcha(e.target.checked)} />
                <label htmlFor="captcha">I'm not a robot</label>
                <div className="hv-captcha-logo">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                    <circle cx="32" cy="32" r="30" stroke="#4a90d9" strokeWidth="4"/>
                    <path d="M20 32 Q32 12 44 32 Q32 52 20 32Z" fill="#4a90d9" opacity="0.5"/>
                  </svg>
                  <span className="hv-captcha-brand">reCAPTCHA</span>
                  <span className="hv-captcha-privacy">Privacy - Terms</span>
                </div>
              </div>
            </div>

            <button type="submit" className="hv-submit-btn pixel">SUBMIT REGISTRATION</button>
          </form>
        )}
      </section>

      {/* ── CONNECT WITH US ── */}
      <section id="contact" className="hv-section">
        <p className="hv-eyebrow">GET IN TOUCH</p>
        <h2 className="hv-section-title pixel">CONNECT <span className="hv-gold">WITH US</span></h2>
        <div className="hv-divider" />
        <p className="hv-section-sub">
          Have questions regarding HackVerse 2.0? Reach out to our organizing team or connect with<br />
          MITB ACM through our official channels.
        </p>

        <div className="hv-contact-grid">
          {[
            {
              name: 'Mr. Ashwin Gupta',
              role: 'EXECUTIVE MEMBER, ACM SIG SOFT',
              phone: '+91-7994360429',
              email: 'ashwin2.mitblr2024@learner.manipal.edu',
            },
            {
              name: 'Mr.Sai Tej Badiyaram',
              role: 'GENERAL SECRETARY, ACM SIG SOFT',
              phone: '+91-7396029151',
              email: 'saitej.mitblr2024@learner.manipal.edu',
            },
            {
              name: 'Mr. Thushar Maiya',
              role: 'EXECUTIVE SECRETARY, ACM SIG SOFT',
              phone: '+91-8095734514',
              email: 'thushar.mitblr2024@learner.manipal.edu',
            },
          ].map((c, i) => (
            <div key={i} className="hv-contact-card">
              <p className="hv-contact-eyebrow pixel">CONTACT PERSON</p>
              <h3 className="hv-contact-name pixel">{c.name}</h3>
              <p className="hv-contact-role">{c.role}</p>
              <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="hv-contact-info">
                <span className="hv-contact-icon"><Phone size={14} /></span>
                {c.phone}
              </a>
              <a href={`mailto:${c.email}`} className="hv-contact-info">
                <span className="hv-contact-icon"><Mail size={14} /></span>
                {c.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="hv-footer">
        <div className="hv-footer-inner">
          <div className="hv-footer-brand">
            <p className="hv-footer-logo pixel">HACKVERSE 2.0</p>
            <p className="hv-footer-tagline">Pan-India AI Hackathon hosted by Manipal Institute of Technology<br />Bengaluru in partnership with IBM and 1M1B.</p>
          </div>
          <div className="hv-footer-col">
            <p className="hv-footer-col-title pixel">NAVIGATION</p>
            <ul>
              <li><a href="#about">About the Event</a></li>
              <li><a href="#tracks">Focus Areas &amp; Tracks</a></li>
              <li><a href="#timeline">Schedule &amp; Timeline</a></li>
              <li><a href="#prizes">Prizes &amp; Tracks</a></li>
              <li><a href="#faq">Inquiry &amp; FAQs</a></li>
            </ul>
          </div>
          <div className="hv-footer-col">
            <p className="hv-footer-col-title pixel">CONTACT &amp; HELP</p>
            <ul>
              <li>
                <a href="mailto:hackversemitb@gmail.com" className="hv-footer-contact-link">
                  <Mail size={14} /> hackversemitb@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hv-footer-contact-link">
                  <InstagramIcon size={14} /> Instagram Page →
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hv-footer-contact-link">
                  <LinkedinIcon size={14} /> LinkedIn Profile →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="hv-footer-bottom">
          © 2026 Manipal Institute of Technology Bengaluru. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
