import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="navbar">
      <a href="#hero" className="nav-logo">VOYAGE <span>2026</span></a>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        <li><a href="#about" onClick={close}>About</a></li>
        <li><a href="#tracks" onClick={close}>Tracks</a></li>
        <li><a href="#timeline" onClick={close}>Timeline</a></li>
        <li><a href="#prizes" onClick={close}>Prizes</a></li>
        <li><a href="#sponsors" onClick={close}>Sponsors</a></li>
        <li><a href="#faq" onClick={close}>FAQ</a></li>
        <li><a href="#contact" onClick={close}>Contact</a></li>
      </ul>
      <a href="#register" className="nav-btn">REGISTER NOW →</a>
      <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
