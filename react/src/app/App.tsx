import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ContentProvider } from '../context/ContentContext';
import { PublicLayout } from './components/PublicLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Fleet } from './pages/Fleet';
import { BookNow } from './pages/BookNow';
import { Pricing } from './pages/Pricing';
import { Testimonials } from './pages/Testimonials';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { PaymentSuccess, PaymentCancelled } from './pages/PaymentResult';

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route element={<PublicLayout />}>
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
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancelled" element={<PaymentCancelled />} />
          </Route>
        </Routes>
      </Router>
    </ContentProvider>
  );
}
