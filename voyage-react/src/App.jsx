import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Glimpses from './components/Glimpses'
import Tracks from './components/Tracks'
import Timeline from './components/Timeline'
import Rounds from './components/Rounds'
import Prizes from './components/Prizes'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Register from './components/Register'
import Footer from './components/Footer'

/* Global rain overlay — thin CSS-only rain that persists across all sections */
function GlobalRain() {
  return <div className="global-rain-layer" aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <GlobalRain />
      <Navbar />
      <Hero />
      <About />
      <Glimpses />
      <Tracks />
      <Timeline />
      <Rounds />
      <Prizes />
      <Sponsors />
      <FAQ />
      <Contact />
      <Register />
      <Footer />
    </>
  )
}
