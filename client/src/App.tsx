import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import HowItWorks from './pages/HowItWorks';
import Projects from './pages/Projects';
import Media from './pages/Media';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
