import { Car, Users, Briefcase, Wifi, Snowflake, Music } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Fleet() {
  const vehicles = [
    {
      name: 'GMC Yukon XL',
      subtitle: 'The Ultimate Luxury SUV',
      passengers: 6,
      luggage: 6,
      features: [
        'Premium leather seats',
        'Climate control',
        'Wi-Fi connectivity',
        'Premium sound system',
        'Tinted windows',
        'Ample storage',
      ],
      description:
        'Our flagship GMC Yukon XL offers the perfect blend of luxury and space. Ideal for airport transfers, corporate events, and family travel.',
    },
    {
      name: 'GMC Yukon Denali',
      subtitle: 'Executive Class Comfort',
      passengers: 6,
      luggage: 5,
      features: [
        'Heated & cooled seats',
        'Panoramic sunroof',
        'Entertainment system',
        'Wi-Fi connectivity',
        'Adaptive cruise control',
        'Premium materials',
      ],
      description:
        'The Denali edition takes luxury to the next level with enhanced comfort features and cutting-edge technology for the discerning traveler.',
    },
    {
      name: 'Cadillac Escalade',
      subtitle: 'Icon of Luxury',
      passengers: 7,
      luggage: 7,
      features: [
        'Executive seating',
        'Advanced safety features',
        'Premium entertainment',
        'Luxury interior',
        'Magnetic ride control',
        'Power everything',
      ],
      description:
        'The Cadillac Escalade is synonymous with luxury. Perfect for making a statement at weddings, corporate events, and special occasions.',
    },
    {
      name: 'GMC Yukon',
      subtitle: 'Classic Elegance',
      passengers: 5,
      luggage: 5,
      features: [
        'Leather interior',
        'Spacious cabin',
        'Modern infotainment',
        'Wi-Fi hotspot',
        'Smooth ride',
        'Professional grade',
      ],
      description:
        'The classic GMC Yukon offers reliable luxury and comfort for smaller groups without compromising on style or amenities.',
    },
    {
      name: 'Cadillac XT6',
      subtitle: 'Modern Sophistication',
      passengers: 6,
      luggage: 4,
      features: [
        'Three-row seating',
        'Advanced technology',
        'Night vision',
        'Bose sound system',
        'Wireless charging',
        'Premium finishes',
      ],
      description:
        'The XT6 brings modern sophistication with advanced technology and refined comfort for business and leisure travel.',
    },
    {
      name: 'Chevrolet Suburban',
      subtitle: 'Spacious Luxury',
      passengers: 7,
      luggage: 8,
      features: [
        'Maximum space',
        'Flexible seating',
        'Entertainment system',
        'Power outlets',
        'Smooth handling',
        'Family-friendly',
      ],
      description:
        'Perfect for large groups and families, the Suburban offers unmatched space and comfort for longer journeys.',
    },
  ];

  const amenities = [
    { icon: Users, label: 'Spacious Seating' },
    { icon: Briefcase, label: 'Luggage Space' },
    { icon: Wifi, label: 'Wi-Fi' },
    { icon: Snowflake, label: 'Climate Control' },
    { icon: Music, label: 'Premium Audio' },
    { icon: Car, label: 'Smooth Ride' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Luxury <span className="text-[#D4AF37]">Fleet</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Meticulously maintained premium vehicles designed for your comfort and style.
          </p>
        </div>
      </section>

      {/* Standard Amenities */}
      <section className="py-12 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-white mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Standard <span className="text-[#D4AF37]">Amenities</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-6 text-center hover:border-[#D4AF37] transition-all"
              >
                <amenity.icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                <div className="text-white text-sm">{amenity.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all overflow-hidden flex flex-col h-full">
                <div className="h-56 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center relative">
                  <Car className="w-32 h-32 text-[#D4AF37]/30" />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0F0F0F] px-3 py-1 rounded-full text-xs font-bold">
                    LUXURY
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {vehicle.name}
                  </h3>
                  <p className="text-[#D4AF37] text-sm mb-4">{vehicle.subtitle}</p>

                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-1 text-[#D4AF37]" />
                      {vehicle.passengers} Passengers
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Briefcase className="w-4 h-4 mr-1 text-[#D4AF37]" />
                      {vehicle.luggage} Bags
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{vehicle.description}</p>

                  <div className="mb-6 flex-1">
                    <h4 className="text-white text-sm mb-3">Features:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {vehicle.features.map((feature, i) => (
                        <li key={i} className="text-gray-400 text-xs flex items-start">
                          <span className="text-[#D4AF37] mr-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90">
                    Book This Vehicle
                  </Button>
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
            Not Sure Which Vehicle <span className="text-[#D4AF37]">to Choose?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team can help you select the perfect vehicle for your needs and occasion.
          </p>
          <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg px-8 py-6">
            Get Expert Advice
          </Button>
        </div>
      </section>
    </div>
  );
}
