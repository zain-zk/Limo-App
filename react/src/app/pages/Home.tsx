import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Car, Clock, Shield, Headphones, Star, ChevronLeft, ChevronRight, Users, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Corporate Executive',
      rating: 5,
      text: 'Exceptional service! The driver was professional, punctual, and the vehicle was pristine. High5 Limo made my airport transfer seamless.',
    },
    {
      name: 'Michael Chen',
      role: 'Groom',
      rating: 5,
      text: 'Our wedding day transportation was perfect thanks to High5 Limo. The GMC Yukon XL was luxurious and accommodated our entire wedding party comfortably.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Traveler',
      rating: 5,
      text: 'I use High5 Limo for all my business trips. Reliable, professional, and always on time. The best limo service in Canada!',
    },
  ];

  const services = [
    {
      icon: Car,
      title: 'Airport Transfer',
      description: 'Reliable pickup and drop-off service to all major airports across Canada. Track your flight for timely arrivals.',
    },
    {
      icon: Users,
      title: 'Wedding Service',
      description: 'Make your special day unforgettable with our luxury fleet. Professional chauffeurs ensure a stress-free experience.',
    },
    {
      icon: Briefcase,
      title: 'Corporate Travel',
      description: 'Professional transportation for business meetings, conferences, and corporate events. Impress your clients.',
    },
  ];

  const whyChooseUs = [
    { icon: Clock, title: 'Always Punctual', description: '24/7 on-time service' },
    { icon: Car, title: 'Luxury Fleet', description: 'Premium GMC vehicles' },
    { icon: Shield, title: 'Licensed Drivers', description: 'Professional & safe' },
    { icon: Headphones, title: '24/7 Support', description: 'Always here for you' },
  ];

  const fleet = [
    {
      name: 'GMC Yukon XL',
      passengers: 6,
      luggage: 6,
      features: ['Wi-Fi', 'Leather Seats', 'Climate Control', 'Premium Sound'],
    },
    {
      name: 'GMC Yukon Denali',
      passengers: 6,
      luggage: 5,
      features: ['Wi-Fi', 'Heated Seats', 'Panoramic Roof', 'Entertainment System'],
    },
    {
      name: 'Cadillac Escalade',
      passengers: 7,
      luggage: 7,
      features: ['Wi-Fi', 'Premium Interior', 'Advanced Safety', 'Luxury Comfort'],
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTestimonial]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566124436323-1bfc77e208f5?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl mb-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Premium Limousine Service <span className="text-[#D4AF37]">Across Canada</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Airport Transfers, Weddings, Corporate Travel, and Special Events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg px-8 py-6">
                Book Now
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F] text-lg px-8 py-6"
              >
                Get a Quote
              </Button>
            </Link>
            <a href="https://wa.me/1234567890?text=Hello%20High5%20Limo%2C%20I%20would%20like%20to%20book%20a%20ride." target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0F0F0F] text-lg px-8 py-6"
              >
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Quote Widget */}
      <section className="py-12 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
            <CardContent className="p-6">
              <h3 className="text-2xl text-[#D4AF37] mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                Get an Instant Quote
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Pickup Location" className="bg-[#0F0F0F] border-[#D4AF37]/20 text-white" />
                <Input placeholder="Drop-off Location" className="bg-[#0F0F0F] border-[#D4AF37]/20 text-white" />
                <Input type="date" className="bg-[#0F0F0F] border-[#D4AF37]/20 text-white" />
                <Input type="time" className="bg-[#0F0F0F] border-[#D4AF37]/20 text-white" />
              </div>
              <Button className="w-full mt-4 bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90">Estimate Fare</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Our <span className="text-[#D4AF37]">Premium Services</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col h-full">
                <CardContent className="p-8 text-center flex flex-col flex-1">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">{service.description}</p>
                  <Link to="/services" className="text-[#D4AF37] hover:underline">
                    Learn More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Why Choose <span className="text-[#D4AF37]">High5 Limo</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Our Luxury <span className="text-[#D4AF37]">Fleet</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleet.map((vehicle, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center">
                  <Car className="w-24 h-24 text-[#D4AF37]/30" />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {vehicle.name}
                  </h3>
                  <div className="flex gap-4 mb-4 text-sm text-gray-400">
                    <span>👥 {vehicle.passengers} Passengers</span>
                    <span>🧳 {vehicle.luggage} Bags</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {vehicle.features.map((feature, i) => (
                      <li key={i} className="text-gray-400 text-sm">
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book">
                    <Button className="w-full bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90">
                      Book This Vehicle
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              What Our <span className="text-[#D4AF37]">Clients Say</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="relative">
            <Card className="bg-[#1A1A1A] border-[#D4AF37]/20">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
                <h4 className="text-xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-[#D4AF37]">{testimonials[currentTestimonial].role}</p>
              </CardContent>
            </Card>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#D4AF37] text-[#0F0F0F] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#D4AF37]/90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#D4AF37] text-[#0F0F0F] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#D4AF37]/90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-[#D4AF37] w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Ride in <span className="text-[#D4AF37]">Luxury?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your premium limousine service today and experience the High5 difference.
          </p>
          <Link to="/book">
            <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg px-12 py-6">
              Book Your Ride Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
