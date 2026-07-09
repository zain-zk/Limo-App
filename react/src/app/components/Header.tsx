import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { SITE_PHONE } from '../../lib/constants';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Book Now', href: '/book' },
    { name: 'Request Quote', href: '/pricing' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-sm border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-[#D4AF37] text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
              High<span className="text-white">5</span>
            </div>
            <div className="text-white text-sm tracking-widest">LIMO</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-white hover:text-[#D4AF37] transition-colors text-sm tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href={`tel:${SITE_PHONE}`} className="flex items-center text-[#D4AF37] hover:text-white transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">Call Now</span>
            </a>
            <Link to="/book">
              <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#D4AF37] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F0F] border-t border-[#D4AF37]/20">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-[#D4AF37] transition-colors text-lg py-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href={`tel:${SITE_PHONE}`}
                className="flex items-center text-[#D4AF37] hover:text-white transition-colors text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span>Call Now</span>
              </a>
              <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90">
                  Book Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
