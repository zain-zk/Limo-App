import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Phone, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useContent } from '../../context/ContentContext';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide transition-colors whitespace-nowrap ${
    isActive ? 'text-[#D4AF37] font-medium' : 'text-white hover:text-[#D4AF37]'
  }`;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { site, navigation } = useContent();
  const showPhone = site.showPhone !== false;

  const primaryNav = navigation.filter(
    (link) => !['/book', '/booknow', '/testimonials'].includes(link.path),
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-sm border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="text-[#D4AF37] text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
              High<span className="text-white">5</span>
            </div>
            <div className="text-white text-sm tracking-widest hidden sm:block">LIMO</div>
          </Link>

          <nav className="hidden xl:flex items-center gap-5 flex-1 justify-center min-w-0">
            {primaryNav.map((link) => (
              <NavLink key={link.path} to={link.path} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <Link to="/booking/status">
              <Button variant="outline" size="sm" className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 hidden xl:inline-flex">
                <Search className="w-4 h-4 mr-1.5" />
                Track Booking
              </Button>
            </Link>
            {showPhone && (
              <a href={phoneHref(site.phone)} className="hidden xl:flex items-center text-[#D4AF37] hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 mr-1.5" />
                Call
              </a>
            )}
            <Link to="/book">
              <Button size="sm" className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 font-semibold">
                Book Now
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#D4AF37] transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F0F] border-t border-[#D4AF37]/20 max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-6 space-y-1">
            {navigation.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-2 rounded-lg text-lg transition-colors ${
                    isActive ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-white hover:text-[#D4AF37]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/booking/status"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-3 px-2 rounded-lg text-lg transition-colors ${
                  isActive ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-white hover:text-[#D4AF37]'
                }`
              }
            >
              Track Booking
            </NavLink>
            <NavLink
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-3 px-2 rounded-lg text-lg transition-colors ${
                  isActive ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-white hover:text-[#D4AF37]'
                }`
              }
            >
              Blog
            </NavLink>
            <div className="pt-4 space-y-3 border-t border-[#D4AF37]/10 mt-4">
              <LanguageSwitcher />
              {showPhone && (
                <a
                  href={phoneHref(site.phone)}
                  className="flex items-center text-[#D4AF37] hover:text-white transition-colors text-lg py-2"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {site.phone}
                </a>
              )}
              <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 font-semibold py-6">
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
