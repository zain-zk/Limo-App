import { Link } from 'react-router';
import { CalendarCheck, CreditCard, Search } from 'lucide-react';

const features = [
  {
    icon: CalendarCheck,
    title: 'Request a Quote',
    description: 'Submit trip details online — our team responds with a personalized price.',
    link: '/book',
    linkLabel: 'Book Now',
  },
  {
    icon: Search,
    title: 'Track Your Booking',
    description: 'Check status, view your quote, and pay online anytime.',
    link: '/booking/status',
    linkLabel: 'Track Status',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay by card via Stripe after your quote, or pay the driver in person.',
    link: '/pricing',
    linkLabel: 'How It Works',
  },
];

export function FeatureStrip() {
  return (
    <section className="py-12 bg-[#0B0B0B] border-y border-[#D4AF37]/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, link, linkLabel }) => (
            <div
              key={title}
              className="group p-6 rounded-xl bg-[#1A1A1A] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>
              <Link to={link} className="text-[#D4AF37] text-sm font-semibold hover:underline">
                {linkLabel} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
