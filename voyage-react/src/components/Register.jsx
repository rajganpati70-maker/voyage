import { useState } from 'react'

function MemberBlock({ num }) {
  return (
    <div className="member-wrap">
      <div className="member-label">Member {num}</div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name <span className="req">*</span></label>
          <input className="form-input" type="text" placeholder="Full Name" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address <span className="req">*</span></label>
          <input className="form-input" type="email" placeholder="email@example.com" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">College / University Name <span className="req">*</span></label>
          <input className="form-input" type="text" placeholder="e.g. NIT Patna" />
        </div>
        <div className="form-group">
          <label className="form-label">Year of Study <span className="req">*</span></label>
          <select className="form-select">
            <option value="">Select Year...</option>
            {['1st Year','2nd Year','3rd Year','4th Year','Postgraduate'].map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default function Register() {
  const [members, setMembers] = useState([1])
  const [captcha, setCaptcha] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const addMember = () => { if (members.length < 3) setMembers(m => [...m, m.length + 1]) }

  const handleSubmit = e => {
    e.preventDefault()
    if (!captcha) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="register">
      <div className="section-inner">
        <div className="reg-head">
          <span className="s-label">Registration Portal</span>
          <h2 className="reg-head s-title">Ready to Sail Beyond the Horizon?</h2>
        </div>
        <p className="reg-sub">Secure your team's spot and compete against India's top innovation talent. Build with cutting-edge technology in an intensive 36-hour sprint.</p>

        <div className="reg-card">
          <div className="reg-form-title">Registration Form</div>
          <form onSubmit={handleSubmit}>
            <div className="form-block-title">Team Information</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Team Name <span className="req">*</span></label>
                <input className="form-input" type="text" placeholder="e.g. Neural Nexus" required />
              </div>
              <div className="form-group">
                <label className="form-label">Target Focus Track <span className="req">*</span></label>
                <select className="form-select" required>
                  <option value="">Select a track...</option>
                  <option value="ai-biz">AI for Business Transformation</option>
                  <option value="ai-social">AI for Sustainable and Social Impact</option>
                  <option value="open">Open Innovation with AI</option>
                </select>
              </div>
            </div>

            <div className="form-block-title">Team Leader Information</div>
            <div className="form-row triple">
              <div className="form-group">
                <label className="form-label">Full Name <span className="req">*</span></label>
                <input className="form-input" type="text" placeholder="Leader Name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address <span className="req">*</span></label>
                <input className="form-input" type="email" placeholder="leader@example.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number <span className="req">*</span></label>
                <input className="form-input" type="tel" placeholder="10-digit number" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">College / University Name <span className="req">*</span></label>
                <input className="form-input" type="text" placeholder="e.g. MIT Bengaluru" required />
              </div>
              <div className="form-group">
                <label className="form-label">Year of Study <span className="req">*</span></label>
                <select className="form-select" required>
                  <option value="">Select Year...</option>
                  {['1st Year','2nd Year','3rd Year','4th Year','Postgraduate'].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            {/* Members */}
            <div className="form-members-row">
              <span className="form-members-label">Team Members ({members.length}/3 Additional)</span>
              {members.length < 3 && (
                <button type="button" className="add-btn" onClick={addMember}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  + ADD MEMBER
                </button>
              )}
            </div>
            {members.map(n => <MemberBlock key={n} num={n} />)}

            {/* Captcha */}
            <div className="captcha-row">
              <div className={`captcha-box${captcha ? ' checked' : ''}`} onClick={() => setCaptcha(c => !c)} />
              <span className="captcha-label">I'm not a robot</span>
              <div className="captcha-logo">reCAPTCHA<br />Privacy - Terms</div>
            </div>

            <button type="submit" className={`submit-btn${submitted ? ' success' : ''}`} disabled={!captcha}>
              {submitted ? '✓ REGISTRATION SUBMITTED!' : 'SUBMIT REGISTRATION'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
