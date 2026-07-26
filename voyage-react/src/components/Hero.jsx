import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   PIRATE STORM NIGHT — Full cinematic canvas
   2 AM · Mid-ocean · Tempest · Lonely cold sea
═══════════════════════════════════════════════════════════════ */

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, raf, t = 0

    // ── Pre-generated data ──
    let stars = []
    let rainFront = []   // foreground rain — fast, thick
    let rainBack = []    // background rain — slow, thin, slightly transparent
    let cloudLayers = [] // 3 depth layers
    let sprayParticles = []

    // ── Lightning state ──
    let lightningBolt = null
    let lightningAlpha = 0
    let lightningFade = false
    let lightningTimeout

    // ── Resize & init ──
    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      initScene()
    }

    function initScene() {
      // Stars — very dim, barely through clouds
      stars = Array.from({ length: 60 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.42,
        r: Math.random() * 0.7 + 0.15,
        o: Math.random() * 0.18 + 0.03,
        flicker: Math.random() * 0.008 + 0.002,
      }))

      // Foreground rain — heavy, fast, wind-driven
      rainFront = Array.from({ length: 500 }, () => ({
        x: Math.random() * W * 1.8 - W * 0.4,
        y: Math.random() * H,
        len: Math.random() * 22 + 14,
        speed: Math.random() * 20 + 14,
        op: Math.random() * 0.38 + 0.15,
        w: Math.random() * 0.9 + 0.4,
      }))

      // Background rain — slower, thinner, atmospheric depth
      rainBack = Array.from({ length: 300 }, () => ({
        x: Math.random() * W * 1.5 - W * 0.25,
        y: Math.random() * H,
        len: Math.random() * 12 + 6,
        speed: Math.random() * 9 + 5,
        op: Math.random() * 0.12 + 0.04,
        w: Math.random() * 0.45 + 0.2,
      }))

      // Cloud layers — 3 depths
      cloudLayers = [
        // Far clouds — slow, very dark
        Array.from({ length: 6 }, () => ({
          x: Math.random() * W * 1.6,
          y: Math.random() * H * 0.3,
          rx: Math.random() * 380 + 200,
          ry: Math.random() * 70 + 40,
          speed: 0.06 + Math.random() * 0.08,
          op: 0.6 + Math.random() * 0.3,
        })),
        // Mid clouds — medium speed
        Array.from({ length: 8 }, () => ({
          x: Math.random() * W * 1.5,
          y: Math.random() * H * 0.38,
          rx: Math.random() * 280 + 150,
          ry: Math.random() * 55 + 28,
          speed: 0.14 + Math.random() * 0.12,
          op: 0.7 + Math.random() * 0.25,
        })),
        // Near clouds — faster, darkest
        Array.from({ length: 5 }, () => ({
          x: Math.random() * W * 1.4,
          y: Math.random() * H * 0.25,
          rx: Math.random() * 200 + 100,
          ry: Math.random() * 45 + 22,
          speed: 0.22 + Math.random() * 0.18,
          op: 0.85 + Math.random() * 0.15,
        })),
      ]

      // Sea spray particles — born at wave crests
      sprayParticles = []
    }

    // ════════════════════════════════════════════
    // SKY
    // ════════════════════════════════════════════
    function drawSky() {
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, '#000204')
      g.addColorStop(0.18, '#000810')
      g.addColorStop(0.45, '#010f1e')
      g.addColorStop(0.68, '#021828')
      g.addColorStop(0.82, '#031f35')
      g.addColorStop(1, '#041a2d')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }

    // ════════════════════════════════════════════
    // STARS
    // ════════════════════════════════════════════
    function drawStars() {
      stars.forEach(s => {
        s.o += s.flicker * (Math.random() > 0.5 ? 1 : -1)
        s.o = Math.max(0.02, Math.min(0.22, s.o))
        ctx.globalAlpha = s.o
        ctx.fillStyle = '#b8cce0'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    // ════════════════════════════════════════════
    // MOON — large, dramatic, partial behind clouds
    // ════════════════════════════════════════════
    function drawMoon() {
      const mx = W * 0.76, my = H * 0.15, mr = 52

      // Outermost atmospheric corona
      const corona = ctx.createRadialGradient(mx, my, mr * 0.5, mx, my, mr * 9)
      corona.addColorStop(0, 'rgba(200,175,80,0.06)')
      corona.addColorStop(0.3, 'rgba(160,135,55,0.03)')
      corona.addColorStop(0.7, 'rgba(100,80,30,0.01)')
      corona.addColorStop(1, 'transparent')
      ctx.fillStyle = corona
      ctx.beginPath(); ctx.arc(mx, my, mr * 9, 0, Math.PI * 2); ctx.fill()

      // Mid glow halo
      const halo = ctx.createRadialGradient(mx, my, mr, mx, my, mr * 4)
      halo.addColorStop(0, 'rgba(210,185,95,0.15)')
      halo.addColorStop(0.5, 'rgba(180,155,65,0.05)')
      halo.addColorStop(1, 'transparent')
      ctx.fillStyle = halo
      ctx.beginPath(); ctx.arc(mx, my, mr * 4, 0, Math.PI * 2); ctx.fill()

      // Moon body gradient
      const mg = ctx.createRadialGradient(mx - 14, my - 12, 0, mx, my, mr)
      mg.addColorStop(0, '#f0e8b0')
      mg.addColorStop(0.4, '#d4bc60')
      mg.addColorStop(0.8, '#a88228')
      mg.addColorStop(1, '#7a5c10')
      ctx.fillStyle = mg
      ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill()

      // Crescent shadow (cloud passing over)
      ctx.fillStyle = '#010a15'
      ctx.beginPath(); ctx.arc(mx + 18, my - 5, mr * 0.9, 0, Math.PI * 2); ctx.fill()

      // Moonlight column reflecting on water
      const wStart = H * 0.62
      const col = ctx.createLinearGradient(mx, my + mr, mx, wStart)
      col.addColorStop(0, 'rgba(210,185,90,0.04)')
      col.addColorStop(0.5, 'rgba(180,155,65,0.015)')
      col.addColorStop(1, 'transparent')
      ctx.fillStyle = col
      ctx.beginPath()
      ctx.moveTo(mx - 8, my + mr)
      ctx.lineTo(mx - 60, wStart)
      ctx.lineTo(mx + 60, wStart)
      ctx.lineTo(mx + 8, my + mr)
      ctx.closePath()
      ctx.fill()
    }

    // ════════════════════════════════════════════
    // CLOUDS — 3 parallax depth layers
    // ════════════════════════════════════════════
    function drawClouds() {
      const colors = [
        ['#06141f', '#040d17'],   // far: slightly lighter
        ['#040f1a', '#030b14'],   // mid
        ['#020a12', '#010608'],   // near: darkest
      ]
      cloudLayers.forEach((layer, li) => {
        const [c1, c2] = colors[li]
        layer.forEach(c => {
          c.x -= c.speed
          if (c.x + c.rx < -50) c.x = W + c.rx + 80

          // Build cloud blob from multiple ellipses
          const numBlobs = 4 + li
          for (let b = 0; b < numBlobs; b++) {
            const bx = c.x + (b - numBlobs / 2) * c.rx * 0.35
            const by = c.y + Math.sin(b * 1.2) * c.ry * 0.4
            const brx = c.rx * (0.5 + Math.sin(b * 0.8) * 0.25)
            const bry = c.ry * (0.7 + Math.cos(b * 1.1) * 0.2)

            const grad = ctx.createRadialGradient(bx, by, 0, bx, by, Math.max(brx, bry))
            grad.addColorStop(0, c1)
            grad.addColorStop(0.5, `rgba(${li === 0 ? '6,20,31' : li === 1 ? '4,15,26' : '2,10,18'},${c.op * 0.8})`)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.ellipse(bx, by, brx, bry, 0, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })
    }

    // ════════════════════════════════════════════
    // RAIN — 2 layers for parallax depth
    // ════════════════════════════════════════════
    function drawRain() {
      const windAngle = -0.44 // wind-blown left
      ctx.lineCap = 'round'

      // Background rain (depth)
      rainBack.forEach(r => {
        r.y += r.speed; r.x += r.speed * windAngle
        if (r.y > H + 20) { r.y = -25; r.x = Math.random() * W * 1.5 - W * 0.25 }
        ctx.globalAlpha = r.op
        ctx.strokeStyle = 'rgba(100,145,185,0.7)'
        ctx.lineWidth = r.w
        ctx.beginPath()
        ctx.moveTo(r.x, r.y)
        ctx.lineTo(r.x + r.len * windAngle, r.y + r.len)
        ctx.stroke()
      })

      // Foreground rain (closer, more opaque, faster)
      rainFront.forEach(r => {
        r.y += r.speed; r.x += r.speed * windAngle
        if (r.y > H + 25) { r.y = -30; r.x = Math.random() * W * 1.8 - W * 0.4 }
        ctx.globalAlpha = r.op
        ctx.strokeStyle = 'rgba(130,175,215,0.85)'
        ctx.lineWidth = r.w
        ctx.beginPath()
        ctx.moveTo(r.x, r.y)
        ctx.lineTo(r.x + r.len * windAngle, r.y + r.len)
        ctx.stroke()
      })

      ctx.globalAlpha = 1
    }

    // ════════════════════════════════════════════
    // OCEAN — turbulent, phosphorescent, dramatic
    // ════════════════════════════════════════════
    function spawnSpray(x, y) {
      if (sprayParticles.length > 120) return
      for (let i = 0; i < 3; i++) {
        sprayParticles.push({
          x, y,
          vx: (Math.random() - 0.5) * 3,
          vy: -(Math.random() * 3 + 1),
          r: Math.random() * 2 + 0.5,
          life: 1,
          decay: Math.random() * 0.04 + 0.02,
        })
      }
    }

    function drawOcean(t) {
      const baseY = H * 0.62

      // ── Layer 1: far background ──
      ctx.beginPath(); ctx.moveTo(0, H)
      for (let x = 0; x <= W; x += 8) {
        const y = baseY + 40
          + Math.sin(x * 0.006 + t * 0.28) * 14
          + Math.sin(x * 0.013 + t * 0.15) * 8
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H)
      const g1 = ctx.createLinearGradient(0, baseY, 0, H)
      g1.addColorStop(0, '#010c16'); g1.addColorStop(1, '#000a12')
      ctx.fillStyle = g1; ctx.fill()

      // ── Layer 2: mid ocean ──
      ctx.beginPath(); ctx.moveTo(0, H)
      for (let x = 0; x <= W; x += 6) {
        const y = baseY + 22
          + Math.sin(x * 0.009 + t * 0.48 + 1.1) * 19
          + Math.sin(x * 0.019 + t * 0.3) * 11
          + Math.sin(x * 0.004 + t * 0.18) * 15
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H)
      const g2 = ctx.createLinearGradient(0, baseY, 0, H)
      g2.addColorStop(0, '#020f1c'); g2.addColorStop(1, '#010c16')
      ctx.fillStyle = g2; ctx.fill()

      // ── Layer 3: near waves ──
      const nearPts = []
      for (let x = 0; x <= W; x += 4) {
        const y = baseY
          + Math.sin(x * 0.014 + t * 0.85 + 2.3) * 22
          + Math.sin(x * 0.028 + t * 0.55) * 12
          + Math.sin(x * 0.006 + t * 0.25 + 1.0) * 18
        nearPts.push([x, y])
      }
      ctx.beginPath(); ctx.moveTo(0, H)
      nearPts.forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.lineTo(W, H); ctx.lineTo(0, H)
      const g3 = ctx.createLinearGradient(0, baseY, 0, H)
      g3.addColorStop(0, '#031828'); g3.addColorStop(1, '#020e1e')
      ctx.fillStyle = g3; ctx.fill()

      // ── Phosphorescent foam on near wave crests ──
      ctx.save()
      // Glow path
      ctx.shadowBlur = 12
      ctx.shadowColor = 'rgba(30,180,160,0.3)'
      ctx.strokeStyle = 'rgba(80,200,180,0.12)'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      nearPts.forEach(([x, y], i) => { if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y) })
      ctx.stroke()
      // White foam
      ctx.shadowBlur = 0
      ctx.strokeStyle = 'rgba(200,230,240,0.1)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      nearPts.forEach(([x, y], i) => { if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y) })
      ctx.stroke()
      ctx.restore()

      // ── Layer 4: foreground swells ──
      const fgPts = []
      for (let x = 0; x <= W; x += 4) {
        const y = baseY + 8
          + Math.sin(x * 0.022 + t * 1.15 + 3.8) * 16
          + Math.sin(x * 0.044 + t * 0.75 + 1.2) * 9
          + Math.sin(x * 0.008 + t * 0.38) * 12
        fgPts.push([x, y])
      }
      ctx.beginPath(); ctx.moveTo(0, H)
      fgPts.forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.lineTo(W, H); ctx.lineTo(0, H)
      const g4 = ctx.createLinearGradient(0, baseY, 0, H)
      g4.addColorStop(0, '#041c2e'); g4.addColorStop(0.4, '#031520'); g4.addColorStop(1, '#020e1a')
      ctx.fillStyle = g4; ctx.fill()

      // Spray on foreground wave crests
      if (Math.random() < 0.08) {
        const ri = Math.floor(Math.random() * fgPts.length)
        spawnSpray(fgPts[ri][0], fgPts[ri][1])
      }

      // Draw spray particles
      sprayParticles = sprayParticles.filter(p => p.life > 0)
      sprayParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.08
        p.life -= p.decay
        ctx.globalAlpha = p.life * 0.5
        ctx.fillStyle = 'rgba(180,220,240,0.7)'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalAlpha = 1

      // Moonlight shimmer on water
      const reflX = W * 0.75
      const refl = ctx.createLinearGradient(reflX - 80, baseY, reflX + 80, baseY)
      refl.addColorStop(0, 'transparent')
      refl.addColorStop(0.5, 'rgba(210,185,85,0.025)')
      refl.addColorStop(1, 'transparent')
      ctx.fillStyle = refl
      ctx.fillRect(reflX - 80, baseY - 5, 160, H - baseY + 5)
    }

    // ════════════════════════════════════════════
    // SHIP — massive, dominant, cinematic silhouette
    // ════════════════════════════════════════════
    function drawShip(t) {
      const baseY = H * 0.62
      const bob = Math.sin(t * 0.62) * 7 + Math.sin(t * 1.08) * 4 + Math.sin(t * 0.38) * 3
      const tilt = Math.sin(t * 0.44) * 0.032 + Math.sin(t * 0.88) * 0.015

      // Scale: ship fills the composition
      const baseScale = Math.min(W / 900, 1.3)

      ctx.save()
      ctx.translate(W * 0.5, baseY + bob)
      ctx.rotate(tilt)
      ctx.scale(baseScale, baseScale)

      // ── HULL ──
      // Main hull body
      ctx.beginPath()
      ctx.moveTo(-215, 5)
      ctx.bezierCurveTo(-230, 22, -210, 55, -130, 72)
      ctx.bezierCurveTo(-80, 82, 80, 82, 130, 72)
      ctx.bezierCurveTo(210, 55, 230, 22, 215, 5)
      ctx.bezierCurveTo(200, -8, 155, -16, 110, -18)
      ctx.lineTo(-110, -18)
      ctx.bezierCurveTo(-155, -16, -200, -8, -215, 5)
      ctx.fillStyle = '#00060e'
      ctx.fill()

      // Hull texture bands
      ctx.save()
      ctx.clip()
      ctx.strokeStyle = 'rgba(8,28,45,0.6)'
      ctx.lineWidth = 1.2
      for (let i = 1; i < 5; i++) {
        const py = i * 14
        ctx.beginPath()
        ctx.moveTo(-200 + i * 5, py - 3)
        ctx.bezierCurveTo(-100, py + 5, 0, py + 8, 100, py + 5)
        ctx.bezierCurveTo(150, py + 3, 190 - i * 5, py - 3, 200 - i * 5, py - 3)
        ctx.stroke()
      }
      ctx.restore()

      // Cannon ports (with subtle amber glow from inside)
      ;[-160, -120, -80, -40, 0, 40, 80, 120, 160].forEach((px, i) => {
        if (i % 2 === 0) {
          // Glow
          ctx.fillStyle = 'rgba(180,120,40,0.06)'
          ctx.beginPath(); ctx.arc(px, 30, 10, 0, Math.PI * 2); ctx.fill()
          // Port hole ring
          ctx.strokeStyle = 'rgba(20,50,75,0.7)'
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.arc(px, 30, 7, 0, Math.PI * 2); ctx.stroke()
          // Dark center
          ctx.fillStyle = 'rgba(0,3,8,0.8)'
          ctx.beginPath(); ctx.arc(px, 30, 5, 0, Math.PI * 2); ctx.fill()
        }
      })

      // ── CAPTAIN'S QUARTERS (rear structure) ──
      ctx.beginPath()
      ctx.moveTo(110, -18)
      ctx.lineTo(200, -18)
      ctx.lineTo(195, -52)
      ctx.lineTo(105, -52)
      ctx.closePath()
      ctx.fillStyle = '#000810'
      ctx.fill()
      ctx.strokeStyle = 'rgba(15,45,70,0.5)'
      ctx.lineWidth = 0.8; ctx.stroke()

      // Captain's windows (amber glow)
      ;[-4, 28, 60].forEach(wx => {
        const wax = wx + 130
        // Window glow
        const wg = ctx.createRadialGradient(wax, -35, 0, wax, -35, 16)
        wg.addColorStop(0, 'rgba(200,140,40,0.18)')
        wg.addColorStop(1, 'transparent')
        ctx.fillStyle = wg
        ctx.beginPath(); ctx.arc(wax, -35, 16, 0, Math.PI * 2); ctx.fill()
        // Window frame
        ctx.fillStyle = 'rgba(160,100,25,0.12)'
        ctx.fillRect(wax - 7, -43, 14, 16)
        ctx.strokeStyle = 'rgba(120,80,20,0.4)'
        ctx.lineWidth = 0.8
        ctx.strokeRect(wax - 7, -43, 14, 16)
      })

      // ── DECK ──
      ctx.beginPath()
      ctx.moveTo(-175, -18)
      ctx.lineTo(215, -18)
      ctx.lineTo(200, -32)
      ctx.lineTo(-160, -32)
      ctx.closePath()
      ctx.fillStyle = '#000c18'
      ctx.fill()
      ctx.strokeStyle = 'rgba(12,38,62,0.6)'
      ctx.lineWidth = 0.8; ctx.stroke()

      // Deck details
      ctx.strokeStyle = 'rgba(10,32,55,0.5)'
      for (let dx = -150; dx < 190; dx += 30) {
        ctx.beginPath(); ctx.moveTo(dx, -18); ctx.lineTo(dx, -32); ctx.stroke()
      }

      // ── BOWSPRIT ──
      ctx.save()
      ctx.translate(-170, -28)
      ctx.rotate(-0.3)
      ctx.fillStyle = '#000810'
      ctx.fillRect(0, -4, 130, 8)
      // Bowsprit sail
      const windB = Math.sin(t * 0.78) * 16
      ctx.beginPath()
      ctx.moveTo(5, -4)
      ctx.quadraticCurveTo(55 + windB * 0.4, -35, 110, -28)
      ctx.lineTo(100, 0)
      ctx.closePath()
      ctx.fillStyle = 'rgba(4,12,20,0.88)'
      ctx.fill()
      ctx.restore()

      // ── MASTS ──
      const mastFill = '#000810'

      // Foremast (left)
      ctx.fillStyle = mastFill
      ctx.fillRect(-98, -32, 9, -195)
      // Mainmast (tallest, center)
      ctx.fillRect(-5, -32, 10, -255)
      // Mizzenmast (right, shorter)
      ctx.fillRect(88, -32, 8, -140)

      // ── YARDS (cross spars) ──
      ctx.fillStyle = '#00080e'
      // Mainmast yards (4 levels)
      ctx.fillRect(-85, -278, 170, 7)   // royal
      ctx.fillRect(-75, -238, 150, 6)   // top gallant
      ctx.fillRect(-65, -195, 130, 6)   // topsail
      ctx.fillRect(-52, -150, 104, 5)   // main
      // Foremast yards (3 levels)
      ctx.fillRect(-65, -218, 130, 6)
      ctx.fillRect(-55, -180, 110, 5)
      ctx.fillRect(-44, -140, 88, 5)
      // Mizzen (2 levels)
      ctx.fillRect(72, -162, 72, 5)
      ctx.fillRect(77, -130, 62, 4)

      // ── SAILS — billowing, torn ──
      const w = Math.sin(t * 0.76) * 20 + Math.sin(t * 1.32) * 10

      // Main royal (top)
      ctx.beginPath()
      ctx.moveTo(-1, -278)
      ctx.quadraticCurveTo(52 + w, -255, 80 + w, -238)
      ctx.lineTo(-1, -238); ctx.closePath()
      ctx.fillStyle = 'rgba(5,14,24,0.9)'; ctx.fill()

      // Main top gallant
      ctx.beginPath()
      ctx.moveTo(-1, -238)
      ctx.quadraticCurveTo(48 + w * 0.9, -214, 70 + w * 0.9, -197)
      ctx.lineTo(-1, -197); ctx.closePath()
      ctx.fillStyle = 'rgba(4,12,22,0.88)'; ctx.fill()

      // Main topsail
      ctx.beginPath()
      ctx.moveTo(-1, -195)
      ctx.quadraticCurveTo(40 + w * 0.8, -172, 58 + w * 0.8, -152)
      ctx.lineTo(-1, -152); ctx.closePath()
      ctx.fillStyle = 'rgba(3,10,19,0.86)'; ctx.fill()

      // Main course (largest)
      ctx.beginPath()
      ctx.moveTo(-1, -150)
      ctx.quadraticCurveTo(34 + w * 0.65, -128, 46 + w * 0.65, -110)
      ctx.lineTo(-1, -110); ctx.closePath()
      ctx.fillStyle = 'rgba(3,9,17,0.84)'; ctx.fill()

      // Fore top (torn at top)
      ctx.beginPath()
      ctx.moveTo(-95, -218)
      ctx.quadraticCurveTo(-50 + w * 0.7, -196, -36 + w * 0.7, -180)
      ctx.lineTo(-95, -180); ctx.closePath()
      ctx.fillStyle = 'rgba(4,11,21,0.85)'; ctx.fill()

      // Fore topsail
      ctx.beginPath()
      ctx.moveTo(-95, -180)
      ctx.quadraticCurveTo(-55 + w * 0.6, -158, -42 + w * 0.6, -142)
      ctx.lineTo(-95, -142); ctx.closePath()
      ctx.fillStyle = 'rgba(3,10,19,0.83)'; ctx.fill()

      // Fore lower sail
      ctx.beginPath()
      ctx.moveTo(-95, -140)
      ctx.quadraticCurveTo(-58 + w * 0.55, -120, -46 + w * 0.55, -105)
      ctx.lineTo(-95, -105); ctx.closePath()
      ctx.fillStyle = 'rgba(3,9,17,0.82)'; ctx.fill()

      // Mizzen sail
      ctx.beginPath()
      ctx.moveTo(91, -162)
      ctx.quadraticCurveTo(122 + w * 0.45, -142, 130 + w * 0.45, -118)
      ctx.lineTo(91, -118); ctx.closePath()
      ctx.fillStyle = 'rgba(3,10,19,0.82)'; ctx.fill()

      // ── RIGGING ──
      ctx.save()
      ctx.strokeStyle = 'rgba(4,14,24,0.9)'
      ctx.lineWidth = 0.85
      const rigs = [
        [-1, -285, -98, -32], [-1, -285, 88, -32],  // main stay
        [-1, -285, -175, -28], [-1, -285, 185, -28],  // main shrouds wide
        [-95, -225, -175, -28], [-95, -225, -10, -32],  // fore shrouds
        [88, -168, 175, -28], [88, -168, 20, -32],  // mizzen shrouds
        [-95, -225, -1, -150],  // stays
        [-1, -195, -95, -140],
        [-95, -180, -1, -238],
        [-1, -238, 88, -165],
        [-1, -278, -95, -218],
      ]
      rigs.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      })
      // Ratlines (horizontal rope ladders on shrouds)
      for (let i = 0; i < 6; i++) {
        const py = -32 - i * 30
        ctx.beginPath()
        ctx.moveTo(-175 + i * 12, py)
        ctx.lineTo(-98, py - (175 - i * 12 - 98) * 1.2)
        ctx.stroke()
      }
      ctx.restore()

      // ── LANTERNS ──
      // Crow's nest / mast lantern
      ;[[-1, -248], [-95, -188]].forEach(([lx, ly]) => {
        const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 20)
        lg.addColorStop(0, 'rgba(220,160,40,0.22)')
        lg.addColorStop(0.5, 'rgba(200,130,30,0.08)')
        lg.addColorStop(1, 'transparent')
        ctx.fillStyle = lg
        ctx.beginPath(); ctx.arc(lx, ly, 20, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = 'rgba(230,170,50,0.5)'
        ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2); ctx.fill()
      })

      // ── JOLLY ROGER ──
      const fw = Math.sin(t * 2.4) * 18 + Math.sin(t * 3.8) * 8
      const fh = Math.sin(t * 1.9) * 4

      ctx.beginPath()
      ctx.moveTo(-3, -295)
      ctx.lineTo(42 + fw, -283 + fh)
      ctx.lineTo(40 + fw, -270 + fh)
      ctx.lineTo(-3, -282)
      ctx.closePath()
      ctx.fillStyle = '#000'
      ctx.fill()

      // Skull shape on flag
      ctx.save()
      ctx.translate(18 + fw * 0.42, -280 + fh * 0.5)
      ctx.fillStyle = 'rgba(220,220,220,0.55)'
      ctx.beginPath(); ctx.arc(0, -2, 5, 0, Math.PI * 2); ctx.fill()
      // Eye sockets
      ctx.fillStyle = '#000'
      ctx.beginPath(); ctx.arc(-2, -3, 1.5, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(2, -3, 1.5, 0, Math.PI * 2); ctx.fill()
      // Crossbones
      ctx.strokeStyle = 'rgba(200,200,200,0.45)'
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(-5, 2); ctx.lineTo(5, 8); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(5, 2); ctx.lineTo(-5, 8); ctx.stroke()
      ctx.restore()

      ctx.restore()

      // ── SHIP REFLECTION (subtle, on water) ──
      ctx.save()
      ctx.translate(W * 0.5, baseY + bob + 4)
      ctx.scale(baseScale, -baseScale * 0.12)
      ctx.globalAlpha = 0.06
      // Just the hull silhouette, flipped
      ctx.beginPath()
      ctx.moveTo(-215, 5)
      ctx.bezierCurveTo(-230, 22, -210, 55, -130, 72)
      ctx.bezierCurveTo(-80, 82, 80, 82, 130, 72)
      ctx.bezierCurveTo(210, 55, 230, 22, 215, 5)
      ctx.bezierCurveTo(200, -8, 155, -16, 110, -18)
      ctx.lineTo(-110, -18)
      ctx.bezierCurveTo(-155, -16, -200, -8, -215, 5)
      ctx.fillStyle = '#000810'
      ctx.fill()
      ctx.restore()
    }

    // ════════════════════════════════════════════
    // LIGHTNING BOLT — branching, canvas-drawn
    // ════════════════════════════════════════════
    function generateBolt(x1, y1, x2, y2, depth) {
      if (depth <= 0) return [[x1, y1, x2, y2]]
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * (Math.abs(y2 - y1) * 0.5)
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * 20
      const segs = []
      segs.push(...generateBolt(x1, y1, mx, my, depth - 1))
      segs.push(...generateBolt(mx, my, x2, y2, depth - 1))
      // Branch
      if (depth === 2 && Math.random() > 0.4) {
        const bx = mx + (Math.random() - 0.5) * 80
        const by = my + Math.random() * 80
        segs.push(...generateBolt(mx, my, bx, by, depth - 2))
      }
      return segs
    }

    function drawLightning() {
      if (lightningAlpha <= 0.02 || !lightningBolt) return

      // Sky flash
      const flashX = lightningBolt.startX
      const flashGrad = ctx.createRadialGradient(flashX, 0, 0, flashX, H * 0.3, W * 0.8)
      flashGrad.addColorStop(0, `rgba(180,220,255,${lightningAlpha * 0.7})`)
      flashGrad.addColorStop(0.4, `rgba(140,190,240,${lightningAlpha * 0.25})`)
      flashGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = flashGrad
      ctx.fillRect(0, 0, W, H)

      // Draw bolt segments
      ctx.save()
      lightningBolt.segments.forEach(([x1, y1, x2, y2]) => {
        const sw = Math.max(0.5, 3 - Math.abs(y2 - lightningBolt.startY) * 0.008)
        // Wide glow
        ctx.strokeStyle = `rgba(160,210,255,${lightningAlpha * 0.25})`
        ctx.lineWidth = sw * 6
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
        // Core
        ctx.strokeStyle = `rgba(220,240,255,${lightningAlpha * 0.9})`
        ctx.lineWidth = sw
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      })
      ctx.restore()

      // Fade
      if (lightningFade) lightningAlpha -= 0.06
    }

    function triggerLightning() {
      const sx = W * (0.3 + Math.random() * 0.5)
      const ex = sx + (Math.random() - 0.5) * W * 0.3
      const ey = H * (0.55 + Math.random() * 0.2)

      lightningBolt = {
        startX: sx, startY: 0,
        segments: generateBolt(sx, 0, ex, ey, 4),
      }

      // Flash sequence: bright → dim → bright → fade
      lightningAlpha = 0.95
      lightningFade = false
      setTimeout(() => { lightningAlpha = 0.2 }, 65)
      setTimeout(() => { lightningAlpha = 0.75 }, 120)
      setTimeout(() => { lightningFade = true }, 180)

      // Schedule next
      lightningTimeout = setTimeout(triggerLightning, Math.random() * 2200 + 1600)
    }

    // ════════════════════════════════════════════
    // FOG / MIST at horizon
    // ════════════════════════════════════════════
    function drawMist(t) {
      const baseY = H * 0.62
      for (let i = 0; i < 4; i++) {
        const speed = 18 + i * 12
        const mx = ((t * speed + i * W * 0.28) % (W * 1.4)) - W * 0.2
        const opa = 0.08 + i * 0.015
        const mg = ctx.createRadialGradient(mx, baseY - 10, 0, mx, baseY - 10, W * 0.3)
        mg.addColorStop(0, `rgba(10,28,44,${opa})`)
        mg.addColorStop(0.5, `rgba(8,20,34,${opa * 0.4})`)
        mg.addColorStop(1, 'transparent')
        ctx.fillStyle = mg
        ctx.beginPath()
        ctx.ellipse(mx, baseY - 10, W * 0.3, 55, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      // Dense fog bank near water
      const fg = ctx.createLinearGradient(0, baseY - 40, 0, baseY + 30)
      fg.addColorStop(0, 'transparent')
      fg.addColorStop(0.5, 'rgba(5,18,30,0.22)')
      fg.addColorStop(1, 'transparent')
      ctx.fillStyle = fg
      ctx.fillRect(0, baseY - 40, W, 70)
    }

    // ════════════════════════════════════════════
    // CINEMATIC VIGNETTE + FILM GRAIN
    // ════════════════════════════════════════════
    function drawVignette() {
      // Edge vignette — very dark
      const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.15, W / 2, H / 2, H * 0.95)
      v.addColorStop(0, 'transparent')
      v.addColorStop(0.6, 'rgba(0,2,5,0.25)')
      v.addColorStop(1, 'rgba(0,1,3,0.82)')
      ctx.fillStyle = v
      ctx.fillRect(0, 0, W, H)

      // Top darkness (deep space / black sky at top)
      const top = ctx.createLinearGradient(0, 0, 0, H * 0.12)
      top.addColorStop(0, 'rgba(0,1,3,0.9)')
      top.addColorStop(1, 'transparent')
      ctx.fillStyle = top
      ctx.fillRect(0, 0, W, H * 0.12)
    }

    // ════════════════════════════════════════════
    // MAIN LOOP
    // ════════════════════════════════════════════
    function draw() {
      t += 0.016
      drawSky()
      drawStars()
      drawMoon()
      drawClouds()
      drawRain()
      drawOcean(t)
      drawShip(t)
      drawMist(t)
      drawLightning()
      drawVignette()
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    triggerLightning()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      clearTimeout(lightningTimeout)
    }
  }, [])

  return (
    <section id="hero">
      <canvas ref={canvasRef} id="starfield" />

      {/* CSS rain overlay — layered on top for extra density */}
      <div className="rain-overlay" />
      <div className="rain-overlay rain-overlay-2" />

      {/* Content */}
      <div className="hero-body">
        <div className="hero-text">
          <div className="hero-eyebrow">⚓ &nbsp; Setting Sail · 2026</div>
          <h1 className="hero-title">
            VOYAGE <span>2026</span>
          </h1>
          <p className="hero-sub">
            Through the storm and the cold dark sea,<br />
            the boldest navigators chart their course.<br />
            Collaborate. Build. Conquer the horizon.
          </p>
          <div className="hero-btns">
            <a href="#register" className="btn-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              Register Now
            </a>
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
