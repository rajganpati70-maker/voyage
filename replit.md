# Voyage 2026 — GRID Community Hackathon Website

## Project Overview
A single-page hackathon website for **Voyage 2026**, organized by GRID Community. Dark navy/teal theme with pixel fonts, parallax hero with animated starfield and 3D floating objects, and full-page sections. Fully built in React + Vite.

## Stack
- **React 19 + Vite** (served from `voyage-react/`)
- No external UI libraries — pure CSS with CSS custom properties
- Google Fonts: Press Start 2P (pixel headings), Space Mono, Inter

## How to Run
The workflow runs automatically:
```
cd voyage-react && npm run dev
```
App serves on port 5000.

## File Structure
```
voyage-react/
  src/
    App.jsx            — root component, imports all sections
    App.css            — all global styles (CSS variables, responsive)
    main.jsx           — React entry point
    components/
      Navbar.jsx       — fixed top nav with hamburger menu
      Hero.jsx         — starfield canvas animation + floating SVG objects
      About.jsx        — about section + GRID Community stats
      Glimpses.jsx     — horizontal scrolling gallery
      Tracks.jsx       — 3 hackathon tracks
      Timeline.jsx     — alternating timeline with phases
      Rounds.jsx       — round 1/2 cards
      Prizes.jsx       — prize pool breakdown + perks
      Sponsors.jsx     — Algorand, OSEN, Mewayz cards
      FAQ.jsx          — accordion FAQ
      Contact.jsx      — Ganpati Raj & Krishna Raj Barnwal
      Register.jsx     — team registration form with dynamic members
      Footer.jsx       — navigation + contact footer
  index.html           — HTML shell
  vite.config.js       — Vite config (port 5000, host 0.0.0.0)

voyage/                — original static HTML version (kept for reference)
```

## Key Content
- **Event:** VOYAGE 2026 — 36-hour national hackathon
- **Organizer:** GRID Community (2000+ members)
- **Date:** 26–27 September 2026
- **Teams:** 40 teams, 3–4 members each
- **Prize Pool:** ₹25,000 (1st: ₹10k, 2nd: ₹7k, 3rd: ₹5k)
- **Tracks:** Devil's Triangle (AI/ML), Fountain of Youth (HealthTech), Open Seas (Open Innovation)
- **Sponsors:** Algorand, OSEN, Mewayz Global Corporation
- **Contacts:** Ganpati Raj (+91 9507542854), Krishna Raj Barnwal (+91 7362994375)

## User Preferences
- Only Ganpati Raj and Krishna Raj Barnwal in the Contact section
- All content sourced from the uploaded brochure PDF
- Design matches the HackVerse 2.0 style: dark navy, teal + gold accents, pixel font headings, animated starfield hero
- Site is fully React — do not revert to static HTML
