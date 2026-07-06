import { Plane, Heart, Briefcase, PartyPopper, MapPin, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Services() {
  const services = [
    {
      icon: Plane,
      title: 'Airport Pickup & Drop-Off',
      description:
        'Start or end your journey stress-free with our reliable airport transfer service. We monitor flight times to ensure timely pickups, even if your flight is delayed. Available at all major Canadian airports including Toronto Pearson, Vancouver International, and Montreal-Trudeau.',
      features: [
        'Flight tracking for on-time service',
        'Meet & greet at arrivals',
        'Assistance with luggage',
        'Flexible scheduling',
      ],
    },
    {
      icon: MapPin,
      title: 'Short Routes',
      description:
        'Need a quick ride across town? Our short-route service is perfect for business meetings, dinner reservations, or any local transportation needs. Enjoy luxury and comfort even on shorter trips.',
      features: [
        'Ideal for city travel',
        'Professional chauffeurs',
        'Luxury vehicles',
        'Competitive pricing',
      ],
    },
    {
      icon: MapPin,
      title: 'Long Routes',
      description:
        'Travel between cities in comfort and style. Whether it\'s Toronto to Ottawa or Vancouver to Whistler, our long-distance service ensures a relaxing journey with all the amenities you need.',
      features: [
        'Intercity transfers',
        'Rest stops included',
        'Wi-Fi and entertainment',
        'Refreshments available',
      ],
    },
    {
      icon: Heart,
      title: 'Wedding Service',
      description:
        'Make your special day even more memorable with our elegant wedding transportation. From the ceremony to the reception, we ensure the bride, groom, and wedding party arrive in style and on time.',
      features: [
        'Red carpet service',
        'Decorated vehicles',
        'Multiple trip coordination',
        'Champagne service',
      ],
    },
    {
      icon: PartyPopper,
      title: 'Special Occasions',
      description:
        'Celebrate life\'s special moments with High5 Limo. Perfect for proms, anniversaries, birthdays, or any celebration. Our luxury vehicles and professional service will make your event unforgettable.',
      features: [
        'Customized experiences',
        'Group accommodations',
        'Special requests welcome',
        'Photo opportunities',
      ],
    },
    {
      icon: Briefcase,
      title: 'Corporate Travel',
      description:
        'Impress clients and ensure your team travels efficiently. Our corporate service includes executive vehicles, professional chauffeurs, and flexible scheduling to meet your business needs.',
      features: [
        'Corporate accounts available',
        'Conference transportation',
        'Multi-stop itineraries',
        'Invoicing and reporting',
      ],
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-gray-300 flex items-center">
                        <span className="text-[#D4AF37] mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90">Book Now</Button>
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
          <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg px-8 py-6">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
