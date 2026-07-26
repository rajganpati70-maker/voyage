export default function Prizes() {
  const perks = ['Branded T-Shirts', 'Participation Certificates', 'Exclusive Sticker Collection', 'Mentorship Sessions', 'Participation Gifts', 'Expert Network Access']

  return (
    <section id="prizes">
      <div className="section-inner">
        <div className="prizes-head">
          <span className="s-label">Rewards</span>
          <h2 className="s-title">
            Prizes &amp; <span className="px">Recognition</span>
          </h2>
          <p className="s-desc">Win cash prizes, exclusive mentorship, cloud credits and opportunities to showcase your innovation.</p>
        </div>

        <div className="prize-main">
          <div className="prize-amt">₹25,000</div>
          <p className="prize-lbl">Grand cash prize pool awarded to the top-performing teams demonstrating exceptional innovation and technical execution.</p>
        </div>

        <div className="prize-breakdown">
          <div className="prize-place p1">
            <div className="prize-place-rank">🥇 1st Prize</div>
            <div className="prize-place-amt">₹10,000</div>
          </div>
          <div className="prize-place p2">
            <div className="prize-place-rank">🥈 2nd Prize</div>
            <div className="prize-place-amt">₹7,000</div>
          </div>
          <div className="prize-place p3">
            <div className="prize-place-rank">🥉 3rd Prize</div>
            <div className="prize-place-amt">₹5,000</div>
          </div>
        </div>

        <div className="perks-grid">
          {perks.map(p => (
            <div key={p} className="perk-item">
              <div className="perk-dot" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
