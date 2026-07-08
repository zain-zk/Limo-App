import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Fleet } from './pages/Fleet';
import { BookNow } from './pages/BookNow';
import { Pricing } from './pages/Pricing';
import { Testimonials } from './pages/Testimonials';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { AdminWithProvider } from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0F0F0F] text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/book" element={<BookNow />} />
          <Route path="/booknow" element={<BookNow />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminWithProvider />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </Router>
  );
}