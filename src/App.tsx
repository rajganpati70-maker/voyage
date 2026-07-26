import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import Guidelines from './components/Guidelines';
import GridAbout from './components/GridAbout';
import FAQ from './components/FAQ';
import Register from './components/Register';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <Sponsors />
      <Guidelines />
      <GridAbout />
      <FAQ />
      <Register />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
