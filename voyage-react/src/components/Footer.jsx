export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <a href="#hero" className="footer-logo">VOYAGE <span>2026</span></a>
          <p className="footer-desc">
            A premier 36-hour National Hackathon hosted by GRID Community.<br />
            Sail Beyond Limits. Build Beyond Horizons.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Navigation</div>
          <ul className="footer-links">
            <li><a href="#about">About the Event</a></li>
            <li><a href="#tracks">Focus Areas &amp; Tracks</a></li>
            <li><a href="#timeline">Schedule &amp; Timeline</a></li>
            <li><a href="#prizes">Prices &amp; Tracks</a></li>
            <li><a href="#faq">Inquiry &amp; FAQs</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Contact &amp; Help</div>
          <a href="mailto:gridcommunity@example.com" className="footer-contact-row">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            gridcommunity@example.com
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener" className="footer-contact-row">
            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            Instagram Page →
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" className="footer-contact-row">
            <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn Profile →
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 GRID Community. All rights reserved.</span>
        <span className="footer-brand">VOYAGE 2026</span>
      </div>
    </footer>
  )
}
