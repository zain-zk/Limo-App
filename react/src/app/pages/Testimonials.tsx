import { Star } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../../context/ContentContext';

export function Testimonials() {
  const { home } = useContent();
  const testimonials = home.testimonials;

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Client <span className="text-[#D4AF37]">Testimonials</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">What our clients say about High5 Limo.</p>
        </div>
      </section>

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{t.text}"</p>
                  <h4 className="text-white text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{t.name}</h4>
                  <p className="text-[#D4AF37] text-sm">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B1F3A] text-center">
        <Link to="/book">
          <Button className="bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 text-lg px-10 py-6 font-semibold">Book Your Ride</Button>
        </Link>
      </section>
    </div>
  );
}
