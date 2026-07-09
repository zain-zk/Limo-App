import { Star } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Corporate Executive',
      rating: 5,
      date: 'March 2026',
      text: 'Exceptional service! The driver was professional, punctual, and the vehicle was pristine. High5 Limo made my airport transfer seamless. I highly recommend them for business travel.',
      service: 'Airport Transfer',
    },
    {
      name: 'Michael Chen',
      role: 'Groom',
      rating: 5,
      date: 'February 2026',
      text: 'Our wedding day transportation was perfect thanks to High5 Limo. The GMC Yukon XL was luxurious and accommodated our entire wedding party comfortably. The chauffeur went above and beyond!',
      service: 'Wedding Service',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Traveler',
      rating: 5,
      date: 'March 2026',
      text: 'I use High5 Limo for all my business trips. Reliable, professional, and always on time. The best limo service in Canada! The Wi-Fi and comfort make working on the go easy.',
      service: 'Corporate Travel',
    },
    {
      name: 'David Thompson',
      role: 'Event Organizer',
      rating: 5,
      date: 'January 2026',
      text: 'Organized transportation for a corporate event with 50+ attendees. High5 Limo coordinated everything flawlessly. Multiple vehicles, all on time, all professional. Highly impressed!',
      service: 'Corporate Event',
    },
    {
      name: 'Jennifer Lee',
      role: 'Mother of the Bride',
      rating: 5,
      date: 'December 2025',
      text: 'Made our daughter\'s wedding day stress-free. The Cadillac Escalade was stunning, and the service was impeccable. Every detail was perfect, from the red carpet to the champagne.',
      service: 'Wedding Service',
    },
    {
      name: 'Robert Martinez',
      role: 'CEO',
      rating: 5,
      date: 'March 2026',
      text: 'High5 Limo is our company\'s go-to for executive transportation. They understand the importance of punctuality and discretion. The service is consistently excellent.',
      service: 'Executive Travel',
    },
    {
      name: 'Amanda White',
      role: 'Tourist',
      rating: 5,
      date: 'February 2026',
      text: 'Visiting Toronto for the first time, and High5 Limo made our airport transfer so easy. The driver was knowledgeable about the city and gave us great recommendations!',
      service: 'Airport Transfer',
    },
    {
      name: 'James Wilson',
      role: 'Anniversary Celebration',
      rating: 5,
      date: 'January 2026',
      text: 'Booked High5 Limo for our 25th anniversary dinner. The experience was absolutely luxurious. Felt like VIPs from start to finish. Thank you for making our night special!',
      service: 'Special Occasion',
    },
    {
      name: 'Lisa Brown',
      role: 'Frequent Flyer',
      rating: 5,
      date: 'March 2026',
      text: 'Travel weekly for work and have tried many limo services. High5 Limo stands out for their consistency, professionalism, and attention to detail. Now my only choice!',
      service: 'Airport Transfer',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#0F0F0F]">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Client <span className="text-[#D4AF37]">Testimonials</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Read what our satisfied clients have to say about their High5 Limo experience.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '1000+', label: 'Successful Trips' },
              { number: '4.9', label: 'Average Rating' },
              { number: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl text-[#D4AF37] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{testimonial.date}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{testimonial.text}"</p>

                  <div className="pt-4 border-t border-[#D4AF37]/20">
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-[#D4AF37] text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-xs mt-1">{testimonial.service}</p>
                  </div>
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
            Become Our <span className="text-[#D4AF37]">Next Happy Client</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience the luxury and professionalism that our clients rave about.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button className="bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 text-lg px-8 py-6 font-semibold">Book Your Ride</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F] text-lg px-8 py-6 font-semibold">
                Leave a Review
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
