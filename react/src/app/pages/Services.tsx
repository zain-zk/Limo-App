import { Link } from 'react-router';
import { Plane, Heart, Briefcase, PartyPopper, MapPin, Timer } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Services() {
  const services = [
    {
      icon: Plane,
      title: 'Airport Transfers',
      description:
        'Reliable airport pickups and drop-offs with flight tracking. We monitor your flight to ensure timely arrivals at Toronto Pearson, Vancouver, Montreal, and all major Canadian airports.',
      features: ['Flight tracking', 'Meet & greet', 'Luggage assistance', 'Flexible scheduling'],
    },
    {
      icon: Briefcase,
      title: 'Corporate Transportation',
      description:
        'Executive travel for business meetings, conferences, and corporate events. Impress clients with professional chauffeurs and luxury GMC vehicles.',
      features: ['Corporate accounts', 'Conference transport', 'Multi-stop itineraries', 'Invoicing available'],
    },
    {
      icon: Heart,
      title: 'Weddings',
      description:
        'Make your special day unforgettable with elegant wedding transportation. From ceremony to reception, arrive in style with our luxury fleet.',
      features: ['Red carpet service', 'Decorated vehicles', 'Wedding party transport', 'Champagne service'],
    },
    {
      icon: PartyPopper,
      title: 'Special Events',
      description:
        'Luxury transportation for proms, anniversaries, birthdays, and celebrations. Customized experiences for every special occasion.',
      features: ['Customized experiences', 'Group accommodations', 'Special requests welcome', 'Photo opportunities'],
    },
    {
      icon: Timer,
      title: 'Hourly Chauffeur Service',
      description:
        'Flexible hourly bookings for events, shopping, or multi-stop itineraries. Your personal chauffeur at your pace.',
      features: ['Flexible hourly rates', 'Multi-stop trips', 'Wait time included', 'Premium vehicles'],
    },
    {
      icon: MapPin,
      title: 'Long Distance Transportation',
      description:
        'Travel between cities in comfort and style. Toronto to Ottawa, Vancouver to Whistler, and more with rest stops and amenities.',
      features: ['Intercity transfers', 'Rest stops included', 'Wi-Fi & entertainment', 'Refreshments available'],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Our <span className="text-[#D4AF37]">Premium Services</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            From airport transfers to special events, we provide luxury transportation for every occasion.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col h-full">
                <CardContent className="p-8 flex flex-col flex-1">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-gray-300 flex items-center">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book">
                    <Button className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 font-semibold">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Need a Custom <span className="text-[#D4AF37]">Service?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Have specific requirements? Contact us to discuss your unique transportation needs.
          </p>
          <Link to="/contact">
            <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg px-8 py-6 font-semibold">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
