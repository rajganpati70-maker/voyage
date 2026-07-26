import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)
  const lightningRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, raf
    let t = 0

    // Pre-generated stars
    let stars = []
    // Rain drops
    let rain = []
    // Clouds
    let clouds = []

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      initAll()
    }

    function initAll() {
      // Stars: dim, few, through storm clouds
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.45,
        r: Math.random() * 0.8 + 0.2,
        o: Math.random() * 0.25 + 0.05,
        flicker: Math.random() * 0.02 + 0.005,
      }))

      // Heavy wind-blown rain
      rain = Array.from({ length: 700 }, () => ({
        x: Math.random() * W * 1.6 - W * 0.3,
        y: Math.random() * H,
        len: Math.random() * 18 + 10,
        speed: Math.random() * 16 + 10,
        opacity: Math.random() * 0.28 + 0.08,
        width: Math.random() * 0.6 + 0.3,
      }))

      // Dark storm clouds
      clouds = Array.from({ length: 12 }, (_, i) => ({
        x: Math.random() * W * 1.4 - W * 0.2,
        y: Math.random() * H * 0.38,
        rx: Math.random() * 260 + 140,
        ry: Math.random() * 65 + 30,
        speed: Math.random() * 0.18 + 0.06,
        opacity: Math.random() * 0.55 + 0.5,
        layer: i % 3,
      }))
    }

    function drawSky() {
      const g = ctx.createLinearGradient(0, 0, 0, H * 0.72)
      g.addColorStop(0, '#000305')
      g.addColorStop(0.25, '#010a14')
      g.addColorStop(0.55, '#031020')
      g.addColorStop(0.75, '#04192e')
      g.addColorStop(1, '#051f38')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }

    function drawMoon() {
      const mx = W * 0.74, my = H * 0.17, mr = 38
      // Atmospheric glow
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, mr * 7)
      glow.addColorStop(0, 'rgba(180,160,80,0.07)')
      glow.addColorStop(0.5, 'rgba(150,130,60,0.03)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(mx, my, mr * 7, 0, Math.PI * 2)
      ctx.fill()

      // Moon inner glow
      const mg = ctx.createRadialGradient(mx - 8, my - 8, 0, mx, my, mr)
      mg.addColorStop(0, '#e8d890')
      mg.addColorStop(0.5, '#c8a840')
      mg.addColorStop(1, '#a07820')
      ctx.fillStyle = mg
      ctx.beginPath()
      ctx.arc(mx, my, mr, 0, Math.PI * 2)
      ctx.fill()

      // Crescent shadow (cloud occlusion)
      ctx.fillStyle = '#010b17'
      ctx.beginPath()
      ctx.arc(mx + 14, my - 6, mr * 0.88, 0, Math.PI * 2)
      ctx.fill()

      // Moon rim glow
      ctx.strokeStyle = 'rgba(220,190,100,0.12)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(mx, my, mr + 3, 0, Math.PI * 2)
      ctx.stroke()
    }

    function drawStars(t) {
      stars.forEach(s => {
        s.o += s.flicker * (Math.random() > 0.5 ? 1 : -1)
        s.o = Math.max(0.02, Math.min(0.3, s.o))
        ctx.globalAlpha = s.o
        ctx.fillStyle = '#c8d8f0'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    function drawClouds() {
      // Sort by layer for depth
      const sorted = [...clouds].sort((a, b) => a.layer - b.layer)
      sorted.forEach(c => {
        c.x -= c.speed
        if (c.x + c.rx < -50) c.x = W + c.rx + 50

        const alpha = c.layer === 0 ? c.opacity * 0.6 : c.layer === 1 ? c.opacity * 0.8 : c.opacity
        const darkBase = c.layer === 0 ? '#08182a' : c.layer === 1 ? '#060f1e' : '#040c18'

        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, Math.max(c.rx, c.ry))
        grad.addColorStop(0, darkBase)
        grad.addColorStop(0.65, `rgba(4,12,22,${alpha * 0.7})`)
        grad.addColorStop(1, 'transparent')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawRain() {
      // Wind angle: blowing slightly left (~75deg from horizontal)
      const windX = -0.42 // horizontal component per unit vertical
      ctx.lineCap = 'round'
      rain.forEach(r => {
        r.y += r.speed
        r.x += r.speed * windX
        if (r.y > H + 20) {
          r.y = -30
          r.x = Math.random() * W * 1.6 - W * 0.3
        }
        ctx.globalAlpha = r.opacity
        ctx.strokeStyle = 'rgba(130,175,210,0.9)'
        ctx.lineWidth = r.width
        ctx.beginPath()
        ctx.moveTo(r.x, r.y)
        ctx.lineTo(r.x + r.len * windX, r.y + r.len)
        ctx.stroke()
      })
      ctx.globalAlpha = 1
    }

    function drawOcean(t) {
      const baseY = H * 0.64

      // --- Layer 1: far deep background ---
      ctx.beginPath()
      ctx.moveTo(0, H)
      for (let x = 0; x <= W; x += 6) {
        const y = baseY + 30
          + Math.sin(x * 0.008 + t * 0.3) * 12
          + Math.sin(x * 0.016 + t * 0.18) * 7
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      const d1 = ctx.createLinearGradient(0, baseY, 0, H)
      d1.addColorStop(0, '#021018')
      d1.addColorStop(1, '#010810')
      ctx.fillStyle = d1
      ctx.fill()

      // --- Layer 2: mid waves ---
      ctx.beginPath()
      ctx.moveTo(0, H)
      for (let x = 0; x <= W; x += 5) {
        const y = baseY + 14
          + Math.sin(x * 0.012 + t * 0.55 + 1.2) * 17
          + Math.sin(x * 0.024 + t * 0.35) * 9
          + Math.sin(x * 0.005 + t * 0.22) * 14
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      const d2 = ctx.createLinearGradient(0, baseY, 0, H)
      d2.addColorStop(0, '#031420')
      d2.addColorStop(1, '#010c18')
      ctx.fillStyle = d2
      ctx.fill()

      // --- Layer 3: near turbulent waves ---
      ctx.beginPath()
      ctx.moveTo(0, H)
      for (let x = 0; x <= W; x += 4) {
        const y = baseY
          + Math.sin(x * 0.018 + t * 0.9 + 2.4) * 20
          + Math.sin(x * 0.036 + t * 0.6) * 10
          + Math.sin(x * 0.007 + t * 0.3 + 1) * 16
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      const d3 = ctx.createLinearGradient(0, baseY, 0, H)
      d3.addColorStop(0, '#041825')
      d3.addColorStop(1, '#020e1c')
      ctx.fillStyle = d3
      ctx.fill()

      // --- Whitecap foam on near wave ---
      ctx.save()
      ctx.strokeStyle = 'rgba(160,210,240,0.12)'
      ctx.lineWidth = 1.8
      ctx.beginPath()
      for (let x = 0; x <= W; x += 4) {
        const y = baseY
          + Math.sin(x * 0.018 + t * 0.9 + 2.4) * 20
          + Math.sin(x * 0.036 + t * 0.6) * 10
          + Math.sin(x * 0.007 + t * 0.3 + 1) * 16
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Second foam line (offset)
      ctx.strokeStyle = 'rgba(150,200,230,0.08)'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      for (let x = 0; x <= W; x += 4) {
        const y = baseY + 5
          + Math.sin(x * 0.014 + t * 0.75 + 3.5) * 18
          + Math.sin(x * 0.028 + t * 0.5 + 1) * 9
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()

      // --- Ocean glow / moonlight reflection ---
      const reflectX = W * 0.73
      const rg = ctx.createRadialGradient(reflectX, baseY, 0, reflectX, baseY + 40, W * 0.35)
      rg.addColorStop(0, 'rgba(200,180,90,0.04)')
      rg.addColorStop(0.4, 'rgba(180,160,70,0.015)')
      rg.addColorStop(1, 'transparent')
      ctx.fillStyle = rg
      ctx.fillRect(0, baseY - 10, W, H - baseY + 10)
    }

    function drawShip(t) {
      const baseY = H * 0.64
      const bob = Math.sin(t * 0.65) * 5 + Math.sin(t * 1.05) * 3
      const tilt = Math.sin(t * 0.45) * 0.028 + Math.sin(t * 0.85) * 0.012

      const sx = W * 0.5
      const sy = baseY + bob

      ctx.save()
      ctx.translate(sx, sy)
      ctx.rotate(tilt)

      // Scale ship relative to screen
      const scale = Math.min(W / 1100, 1.0) * 0.95
      ctx.scale(scale, scale)

      // ----- HULL -----
      ctx.beginPath()
      ctx.moveTo(-185, 0)
      ctx.bezierCurveTo(-195, 15, -180, 42, -110, 58)
      ctx.lineTo(110, 58)
      ctx.bezierCurveTo(180, 42, 195, 15, 185, 0)
      ctx.bezierCurveTo(175, -12, 130, -18, 90, -18)
      ctx.lineTo(-90, -18)
      ctx.bezierCurveTo(-130, -18, -175, -12, -185, 0)
      ctx.fillStyle = '#00080f'
      ctx.fill()
      ctx.strokeStyle = 'rgba(20,50,75,0.4)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Hull planks (subtle lines)
      ctx.strokeStyle = 'rgba(10,30,45,0.5)'
      ctx.lineWidth = 0.8
      for (let i = 1; i < 4; i++) {
        const py = i * 14
        ctx.beginPath()
        ctx.moveTo(-160 + i * 5, py - 5)
        ctx.quadraticCurveTo(0, py + 5, 160 - i * 5, py - 5)
        ctx.stroke()
      }

      // Port holes
      ctx.fillStyle = 'rgba(180,140,50,0.08)'
      ;[-120, -80, -40, 0, 40, 80, 120].forEach(px => {
        ctx.beginPath()
        ctx.arc(px, 22, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(30,60,80,0.5)'
        ctx.lineWidth = 0.8
        ctx.stroke()
      })

      // ----- DECK -----
      ctx.beginPath()
      ctx.moveTo(-145, -18)
      ctx.lineTo(145, -18)
      ctx.lineTo(135, -30)
      ctx.lineTo(-135, -30)
      ctx.closePath()
      ctx.fillStyle = '#000c18'
      ctx.fill()

      // Deck rail
      ctx.strokeStyle = 'rgba(15,40,60,0.6)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(-145, -18)
      ctx.lineTo(145, -18)
      ctx.stroke()

      // Bowsprit (diagonal front mast)
      ctx.save()
      ctx.translate(-145, -26)
      ctx.rotate(-0.32)
      ctx.fillStyle = '#00080f'
      ctx.fillRect(0, -3, 110, 6)
      ctx.restore()

      // ----- MASTS -----
      const mastColor = '#000a14'
      // Foremast
      ctx.fillStyle = mastColor
      ctx.fillRect(-88, -30, 7, -165)
      // Mainmast (tallest)
      ctx.fillRect(-4, -30, 8, -210)
      // Mizzenmast
      ctx.fillRect(78, -30, 7, -120)

      // ----- YARDS (horizontal spars) -----
      ctx.fillStyle = '#00080f'
      // Main mast yards
      ctx.fillRect(-72, -228, 144, 5)   // top yard
      ctx.fillRect(-62, -185, 124, 5)   // upper yard
      ctx.fillRect(-52, -145, 104, 5)   // lower yard
      ctx.fillRect(-40, -108, 80, 4)    // course yard
      // Fore mast yards
      ctx.fillRect(-54, -187, 108, 5)
      ctx.fillRect(-44, -155, 88, 4)
      ctx.fillRect(-36, -120, 72, 4)
      // Mizzen
      ctx.fillRect(60, -140, 68, 4)
      ctx.fillRect(65, -110, 58, 4)

      // ----- SAILS -----
      const windBlow = Math.sin(t * 0.8) * 18 + Math.sin(t * 1.3) * 8

      // Main topsail
      ctx.beginPath()
      ctx.moveTo(-2, -228)
      ctx.quadraticCurveTo(50 + windBlow, -205, 68 + windBlow, -187)
      ctx.lineTo(-2, -187)
      ctx.closePath()
      ctx.fillStyle = 'rgba(5,15,25,0.92)'
      ctx.fill()

      // Main upper sail
      ctx.beginPath()
      ctx.moveTo(-2, -185)
      ctx.quadraticCurveTo(42 + windBlow * 0.85, -163, 58 + windBlow * 0.85, -147)
      ctx.lineTo(-2, -147)
      ctx.closePath()
      ctx.fillStyle = 'rgba(4,12,22,0.9)'
      ctx.fill()

      // Main lower sail
      ctx.beginPath()
      ctx.moveTo(-2, -145)
      ctx.quadraticCurveTo(32 + windBlow * 0.7, -125, 44 + windBlow * 0.7, -110)
      ctx.lineTo(-2, -110)
      ctx.closePath()
      ctx.fillStyle = 'rgba(3,10,18,0.88)'
      ctx.fill()

      // Fore topsail
      ctx.beginPath()
      ctx.moveTo(-85, -187)
      ctx.quadraticCurveTo(-45 + windBlow * 0.75, -168, -34 + windBlow * 0.75, -155)
      ctx.lineTo(-85, -155)
      ctx.closePath()
      ctx.fillStyle = 'rgba(4,12,22,0.85)'
      ctx.fill()

      // Fore lower sail
      ctx.beginPath()
      ctx.moveTo(-85, -155)
      ctx.quadraticCurveTo(-50 + windBlow * 0.65, -136, -40 + windBlow * 0.65, -120)
      ctx.lineTo(-85, -120)
      ctx.closePath()
      ctx.fillStyle = 'rgba(3,10,18,0.85)'
      ctx.fill()

      // Mizzen sail
      ctx.beginPath()
      ctx.moveTo(81, -140)
      ctx.quadraticCurveTo(108 + windBlow * 0.5, -122, 115 + windBlow * 0.5, -108)
      ctx.lineTo(81, -108)
      ctx.closePath()
      ctx.fillStyle = 'rgba(4,11,20,0.85)'
      ctx.fill()

      // Bowsprit sail
      ctx.save()
      ctx.translate(-145, -26)
      ctx.rotate(-0.32)
      ctx.beginPath()
      ctx.moveTo(0, -3)
      ctx.quadraticCurveTo(40 + windBlow * 0.5, -28, 90, -22)
      ctx.lineTo(90, 0)
      ctx.closePath()
      ctx.fillStyle = 'rgba(3,10,18,0.8)'
      ctx.fill()
      ctx.restore()

      // ----- RIGGING -----
      ctx.strokeStyle = 'rgba(5,18,30,0.85)'
      ctx.lineWidth = 0.9
      const riggings = [
        [-2, -235, -88, -30],   // main to fore
        [-2, -235, 78, -30],    // main to mizzen
        [-88, -192, -145, -25], // fore shrouds
        [-88, -192, -10, -25],
        [78, -145, 145, -25],   // mizzen shrouds
        [78, -145, 30, -25],
        [-2, -235, -145, -25],  // main shrouds
        [-2, -235, 145, -25],
        [-88, -155, -2, -100],  // cross stays
        [-2, -155, -88, -100],
      ]
      riggings.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      })

      // ----- JOLLY ROGER FLAG -----
      const fw = Math.sin(t * 2.2) * 14 + Math.sin(t * 3.5) * 6
      const fh = Math.sin(t * 1.8) * 4
      ctx.beginPath()
      ctx.moveTo(-2, -240)
      ctx.lineTo(38 + fw, -230 + fh)
      ctx.lineTo(36 + fw, -218 + fh)
      ctx.lineTo(-2, -228)
      ctx.closePath()
      ctx.fillStyle = '#000'
      ctx.fill()
      // Skull
      ctx.fillStyle = 'rgba(210,210,210,0.5)'
      ctx.beginPath()
      ctx.arc(18 + fw * 0.45, -230 + fh * 0.5, 5, 0, Math.PI * 2)
      ctx.fill()
      // Crossbones dots
      ctx.fillStyle = 'rgba(190,190,190,0.35)'
      ;[[8 + fw * 0.4, -220 + fh * 0.4], [28 + fw * 0.5, -222 + fh * 0.5]].forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()

      // ----- SHIP WATER SPLASH / WAKE -----
      const wakeY = sy + bob * 0 // relative to canvas
      ctx.save()
      ctx.translate(sx, wakeY)
      ctx.scale(scale, scale)

      // Foam/spray at bow
      ctx.strokeStyle = 'rgba(140,190,220,0.1)'
      ctx.lineWidth = 1.5
      ;[-185, 185].forEach(bx => {
        for (let i = 0; i < 3; i++) {
          const angle = bx < 0 ? Math.PI + 0.2 + i * 0.15 : -0.2 - i * 0.15
          const len = 15 + i * 8
          ctx.beginPath()
          ctx.moveTo(bx, 0)
          ctx.lineTo(bx + Math.cos(angle) * len, Math.sin(angle) * len * 0.5)
          ctx.stroke()
        }
      })
      ctx.restore()
    }

    // Fog/mist at horizon
    function drawMist(t) {
      const baseY = H * 0.64
      const mg = ctx.createLinearGradient(0, baseY - 60, 0, baseY + 30)
      mg.addColorStop(0, 'transparent')
      mg.addColorStop(0.5, 'rgba(8,20,35,0.18)')
      mg.addColorStop(1, 'transparent')
      ctx.fillStyle = mg
      ctx.fillRect(0, baseY - 60, W, 90)

      // Moving mist bands
      for (let i = 0; i < 3; i++) {
        const mx = ((t * 25 * (i % 2 === 0 ? 1 : -1) + i * W * 0.35) % (W * 1.3)) - W * 0.15
        const mistG = ctx.createRadialGradient(mx, baseY, 0, mx, baseY, W * 0.4)
        mistG.addColorStop(0, 'rgba(10,25,40,0.08)')
        mistG.addColorStop(1, 'transparent')
        ctx.fillStyle = mistG
        ctx.beginPath()
        ctx.ellipse(mx, baseY, W * 0.4, 35, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Vignette overlay
    function drawVignette() {
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9)
      vg.addColorStop(0, 'transparent')
      vg.addColorStop(1, 'rgba(0,2,5,0.65)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, W, H)
    }

    function draw() {
      t += 0.016
      drawSky()
      drawStars(t)
      drawMoon()
      drawClouds()
      drawRain()
      drawOcean(t)
      drawShip(t)
      drawMist(t)
      drawVignette()
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  // Lightning effect — every ~2 seconds
  useEffect(() => {
    let timeout
    const flash = () => {
      const el = lightningRef.current
      if (!el) return
      // Double flash pattern
      el.style.opacity = '0.85'
      el.style.transition = 'opacity 0.04s'
      setTimeout(() => {
        el.style.opacity = '0.1'
        setTimeout(() => {
          el.style.opacity = '0.7'
          setTimeout(() => {
            el.style.opacity = '0'
            el.style.transition = 'opacity 0.2s'
          }, 55)
        }, 45)
      }, 65)
    }

    const schedule = () => {
      const delay = Math.random() * 2200 + 1400
      timeout = setTimeout(() => {
        flash()
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="hero">
      {/* Full storm canvas */}
      <canvas ref={canvasRef} id="starfield" />

      {/* Lightning flash overlay */}
      <div
        ref={lightningRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse at 72% 15%, rgba(180,220,255,0.9) 0%, rgba(120,180,240,0.4) 30%, transparent 70%)',
          opacity: 0, pointerEvents: 'none',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Rain streaks overlay (CSS layer for extra depth) */}
      <div className="rain-overlay" />

      {/* Content */}
      <div className="hero-body">
        <div className="hero-text">
          <div className="hero-eyebrow">⚓ SETTING SAIL INTO THE FUTURE</div>
          <h1 className="hero-title">
            VOYAGE <span>2026</span>
          </h1>
          <p className="hero-sub">
            Through the storm and the dark sea, the boldest navigators emerge.<br />
            Co-build transformative AI systems with industry leaders.<br />
            Chart your course. The horizon awaits.
          </p>
          <div className="hero-btns">
            <a href="#register" className="btn-gold">⚓ Set Sail — Register Now</a>
            <a href="#tracks" className="btn-outline">Explore Tracks →</a>
          </div>
        </div>
      </div>

      {/* Partner strip */}
      <div className="hero-partners">
        <div>
          <div className="partner-label">Organised By</div>
          <div className="partner-logos">
            <span className="partner-logo-tag">GRID COMMUNITY</span>
          </div>
        </div>
        <div>
          <div className="partner-label">Title Sponsor</div>
          <div className="partner-logos">
            <span className="partner-logo-tag">Algorand</span>
            <span className="partner-logo-tag">OSEN</span>
          </div>
        </div>
        <div>
          <div className="partner-label">In Partnership With</div>
          <div className="partner-logos">
            <span className="partner-logo-tag">Mewayz Global</span>
          </div>
        </div>
      </div>
    </section>
  )
}
