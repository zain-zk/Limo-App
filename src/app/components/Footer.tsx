import { Link } from 'react-router';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="text-[#D4AF37] text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
                High<span className="text-white">5</span>
              </div>
              <div className="text-white text-sm tracking-widest">LIMO</div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium limousine service across Canada. Experience luxury, punctuality, and professionalism in every ride.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4AF37] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Fleet', 'Book Now', 'Pricing'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#D4AF37] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Services
            </h4>
            <ul className="space-y-2">
              {['Airport Transfer', 'Wedding Service', 'Corporate Travel', 'Special Events', 'Long Distance', 'City Tours'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
                    >
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#D4AF37] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-[#D4AF37] text-sm">
                    +1 (234) 567-890
                  </a>
                  <p className="text-xs text-gray-400">24/7 Support</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@high5limo.com"
                  className="text-gray-300 hover:text-[#D4AF37] text-sm"
                >
                  info@high5limo.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Toronto, ON, Canada</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors group"
              >
                <Facebook className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0F0F0F]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors group"
              >
                <Instagram className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0F0F0F]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors group"
              >
                <Twitter className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0F0F0F]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 High5 Limo. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
