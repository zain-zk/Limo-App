import { Link } from 'react-router';
import { Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function Footer() {
  const { site, navigation } = useContent();

  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="text-[#D4AF37] text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
                High<span className="text-white">5</span>
              </div>
              <div className="text-white text-sm tracking-widest">LIMO</div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {site.tagline}. Experience luxury, punctuality, and professionalism in every ride.
            </p>
          </div>

          <div>
            <h4 className="text-[#D4AF37] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Services</h4>
            <ul className="space-y-2">
              {['Airport Transfers', 'Corporate Transportation', 'Wedding Transportation', 'Special Occasions', 'Hourly Chauffeur', 'Long Distance'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href={phoneHref(site.phone)} className="text-gray-300 hover:text-[#D4AF37] text-sm">{site.phone}</a>
                  <p className="text-xs text-gray-400">24/7 Support</p>
                  <a href={`mailto:${site.email}`} className="text-gray-300 hover:text-[#D4AF37] text-sm block mt-1">{site.email}</a>
                </div>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              {[{ Icon: Facebook }, { Icon: Instagram }, { Icon: Twitter }].map(({ Icon }, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors group">
                  <Icon className="w-5 h-5 text-[#D4AF37] group-hover:text-[#0B0B0B]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#D4AF37]/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 {site.name}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
