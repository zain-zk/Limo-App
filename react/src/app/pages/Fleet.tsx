import { Car, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useContent } from '../../context/ContentContext';
import { fleetImageFor } from '../../lib/fleetImages';
import { PageHero } from '../../components/PageHero';
import { Seo } from '../../components/Seo';

export function Fleet() {
  const { home } = useContent();
  const vehicles = home.fleet;

  return (
    <div className="min-h-screen pt-20">
      <Seo title="Fleet | High5 Limo" description="Explore our luxury fleet — GMC Yukon XL, Yukon Denali, and Cadillac Escalade, maintained to the highest standard." path="/fleet" />
      <PageHero title="Our Luxury" titleHighlight="Fleet" subtitle="Premium vehicles maintained for comfort, style, and reliability." />

      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="group bg-[#1A1A1A] border-[#D4AF37]/15 hover:border-[#D4AF37]/50 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
                <div className="h-52 relative overflow-hidden bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]">
                  {fleetImageFor(vehicle.name, vehicle.image) ? (
                    <img
                      src={fleetImageFor(vehicle.name, vehicle.image)}
                      alt={vehicle.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-24 h-24 text-[#D4AF37]/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{vehicle.name}</h3>
                  <div className="flex gap-5 mb-5 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#D4AF37]" /> {vehicle.passengers} Passengers</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#D4AF37]" /> {vehicle.luggage} Bags</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {vehicle.features.map((f, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book">
                    <Button className="w-full bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#c9a12f] font-semibold transition-colors">Book This Vehicle</Button>
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
