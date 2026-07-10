import { Car, Users } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../../context/ContentContext';

export function Fleet() {
  const { home } = useContent();
  const vehicles = home.fleet;

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#0B1F3A] to-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Luxury <span className="text-[#D4AF37]">Fleet</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">Premium vehicles maintained for comfort, style, and reliability.</p>
        </div>
      </section>

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#D4AF37]/20 overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center">
                  <Car className="w-24 h-24 text-[#D4AF37]/30" />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{vehicle.name}</h3>
                  <div className="flex gap-4 mb-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#D4AF37]" /> {vehicle.passengers} Passengers</span>
                    <span>{vehicle.luggage} Bags</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {vehicle.features.map((f, i) => (
                      <li key={i} className="text-gray-400 text-sm">✓ {f}</li>
                    ))}
                  </ul>
                  <Link to="/book">
                    <Button className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#D4AF37]/90 font-semibold">Book This Vehicle</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
