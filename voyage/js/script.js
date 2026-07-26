/* ---- STARS / PARTICLE CANVAS ---- */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], dots = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        o: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.15 + 0.02,
      });
    }
    dots = [];
    for (let i = 0; i < 18; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1.5,
        o: Math.random() * 0.4 + 0.2,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // stars
    stars.forEach(s => {
      s.o += s.speed * 0.01 * (Math.random() > 0.5 ? 1 : -1);
      s.o = Math.max(0.05, Math.min(0.85, s.o));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 230, 255, ${s.o})`;
      ctx.fill();
    });
    // teal glowing dots
    dots.forEach(d => {
      d.x += d.dx; d.y += d.dy;
      if (d.x < 0 || d.x > W) d.dx *= -1;
      if (d.y < 0 || d.y > H) d.dy *= -1;
      const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
      g.addColorStop(0, `rgba(77, 217, 201, ${d.o})`);
      g.addColorStop(1, 'rgba(77, 217, 201, 0)');
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize(); initStars(); draw();
})();

/* ---- PARALLAX MOUSE ---- */
(function () {
  const hero = document.getElementById('hero');
  const layers = hero ? hero.querySelectorAll('.float-obj') : [];
  if (!layers.length) return;
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    layers.forEach((el, i) => {
      const depth = (i + 1) * 8;
      el.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  });
})();

/* ---- NAVBAR HAMBURGER ---- */
(function () {
  const ham = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!ham || !links) return;
  ham.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- FAQ ACCORDION ---- */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---- DYNAMIC MEMBER ADD ---- */
(function () {
  const addBtn = document.getElementById('addMemberBtn');
  const container = document.getElementById('membersContainer');
  if (!addBtn || !container) return;
  let count = 1;
  addBtn.addEventListener('click', () => {
    if (count >= 3) return;
    count++;
    const block = document.createElement('div');
    block.className = 'member-block';
    block.innerHTML = `
      <div class="member-title">MEMBER ${count}</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Full Name <span class="req">*</span></label>
          <input class="form-input" type="text" placeholder="Full Name" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address <span class="req">*</span></label>
          <input class="form-input" type="email" placeholder="email@example.com" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">College / University <span class="req">*</span></label>
          <input class="form-input" type="text" placeholder="College name">
        </div>
        <div class="form-group">
          <label class="form-label">Year of Study <span class="req">*</span></label>
          <select class="form-select">
            <option value="">Select Year...</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
      </div>`;
    container.appendChild(block);
    if (count >= 3) addBtn.style.display = 'none';
    addBtn.querySelector('span').textContent = `+ ADD MEMBER (${count}/3 ADDITIONAL)`;
  });
})();

/* ---- FORM SUBMIT ---- */
(function () {
  const form = document.getElementById('regForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = '✓ REGISTRATION SUBMITTED!';
    btn.style.background = '#2ecc71';
    setTimeout(() => {
      btn.textContent = 'SUBMIT REGISTRATION →';
      btn.style.background = '';
    }, 3000);
  });
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.track-card, .tl-card, .stat-card, .sponsor-card, .faq-item, .contact-card, .round-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  document.addEventListener('animationend', () => {}, { once: true });
  // Trigger visible class
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
})();
